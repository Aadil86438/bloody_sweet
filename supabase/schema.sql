-- ========================================================
-- BLOODY Sweet by fafa — Complete Database Schema (Supabase)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    price INT NOT NULL, -- Stored in Rupees (integer)
    image TEXT,
    is_available BOOLEAN DEFAULT true,
    is_trending BOOLEAN DEFAULT false,
    is_signature BOOLEAN DEFAULT false,
    variants JSONB DEFAULT '[]'::jsonb, -- e.g. [{"id": "250g", "name": "250g", "price": 190}]
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_type TEXT CHECK (delivery_type IN ('pickup', 'delivery')) DEFAULT 'pickup',
    address TEXT,
    requested_date DATE,
    notes TEXT,
    subtotal INT NOT NULL,
    delivery_fee INT DEFAULT 0,
    total INT NOT NULL,
    status TEXT CHECK (status IN ('new', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')) DEFAULT 'new',
    payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
    items JSONB NOT NULL, -- Array of ordered items
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. QUOTES TABLE
CREATE TABLE IF NOT EXISTS public.quotes (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    quote_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    request_type TEXT NOT NULL,
    event_date DATE,
    quantity TEXT NOT NULL,
    budget TEXT,
    requirements TEXT NOT NULL,
    message TEXT,
    location TEXT,
    status TEXT CHECK (status IN ('new', 'contacted', 'quoted', 'accepted', 'declined', 'converted_to_order')) DEFAULT 'new',
    quoted_amount INT,
    owner_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. STOCK INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.stock (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    current_stock NUMERIC(10, 2) NOT NULL,
    unit TEXT NOT NULL, -- 'kg', 'L', 'pcs', 'g'
    min_level NUMERIC(10, 2) NOT NULL,
    status TEXT CHECK (status IN ('ok', 'low')) DEFAULT 'ok',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    category TEXT NOT NULL,
    amount INT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    payment_method TEXT DEFAULT 'cash',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- INITIAL SEED DATA (BLOODY Sweet Official Menu)
-- ========================================================

INSERT INTO public.categories (id, name, slug, description, image, sort_order) VALUES
('sweets', 'Sweets', 'sweets', 'Traditional handcrafted sweets', '/images/items/mutta-mittai.jpg', 1),
('cakes', 'Cakes & Brownies', 'cakes', 'Fresh brownies & Tres Leches cakes', '/images/items/tres-leches-cake.jpg', 2),
('brownies', 'Brownies', 'brownies', 'Fudge & Red Velvet brownies', '/images/items/fudge-brownie.jpg', 3),
('desserts', 'Tres Leches & Puddings', 'desserts', 'Artisan Tres Leches & tender coconut pudding', '/images/items/tender-coconut-pudding.jpg', 4),
('drinks', 'Fresh Milkshakes', 'drinks', 'Mango, Strawberry & Blueberry milk', '/images/items/mango-milk.jpg', 5),
('gifting', 'Gifting & Catering', 'gifting', 'Wedding, party & event catering', '/images/brand-hero-banner.jpeg', 6)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, slug, description, category_id, price, image, is_available, is_trending, is_signature, sort_order, variants) VALUES
('mutta-mittai', 'Muttā Mittai', 'mutta-mittai', 'Our signature traditional sweet with a unique crunchy taste. Made fresh daily.', 'sweets', 190, '/images/items/mutta-mittai.jpg', true, true, true, 1, '[{"id":"mm-50g","name":"50g cup","price":50},{"id":"mm-250","name":"250g","price":190},{"id":"mm-500","name":"500g","price":350}]'::jsonb),
('fudge-brownie', 'Fudge Brownie', 'fudge-brownie', 'Rich, chocolaty & fudgy chocolate brownie slice. Sweetness in every bite.', 'brownies', 50, '/images/items/fudge-brownie.jpg', true, true, false, 2, '[{"id":"fb-pc","name":"Per piece","price":50}]'::jsonb),
('red-velvet-brownie', 'Red Velvet Brownie', 'red-velvet-brownie', 'Decadent red velvet brownie with white chocolate swirl. Rich and delicious.', 'brownies', 70, '/images/items/red-velvet-brownie.jpg', true, true, false, 3, '[{"id":"rvb-pc","name":"Per piece","price":70}]'::jsonb),
('tres-leches-cake', 'Tres Leches Cake', 'tres-leches-cake', 'Soft sponge cake soaked in three kinds of milk with fresh strawberry top.', 'desserts', 60, '/images/items/tres-leches-cake.jpg', true, true, true, 4, '[{"id":"tlc-pc","name":"Per piece","price":60}]'::jsonb),
('rasmali-tres-leches', 'Rsamalai Tres Leches', 'rasmali-tres-leches', 'An indulgent fusion dessert soaked in three milks with cardamom and pistachios.', 'desserts', 120, '/images/items/rasmali-tres-leches.jpg', true, true, true, 5, '[]'::jsonb),
('lychee-tres-leches', 'Lychee Tres Leches', 'lychee-tres-leches', 'Light and floral tres leches infused with fresh lychee cream.', 'desserts', 120, '/images/items/lychee-tres-leches.jpg', true, false, false, 6, '[]'::jsonb),
('blueberry-tres-leches', 'Blue Berry Tres Leches', 'blueberry-tres-leches', 'Rich tres leches infused with fresh blueberry compote.', 'desserts', 120, '/images/items/blueberry-tres-leches.jpg', true, false, false, 7, '[]'::jsonb),
('tender-coconut-pudding', 'Tender Coconut Pudding', 'tender-coconut-pudding', 'Creamy, fresh & refreshing tender coconut dessert cup. Pure bliss.', 'desserts', 60, '/images/items/tender-coconut-pudding.jpg', true, true, true, 8, '[{"id":"tcp-cup","name":"Per cup","price":60}]'::jsonb),
('mango-milk', 'Mango Milkshake', 'mango-milk', 'Real Mango Real Happiness — classic thick mango milkshake.', 'drinks', 60, '/images/items/mango-milk.jpg', true, false, false, 9, '[{"id":"mm-glass","name":"Per glass","price":60}]'::jsonb),
('strawberry-milk', 'Strawberry Milkshake', 'strawberry-milk', 'Classic creamy strawberry drink — refreshing and yummy.', 'drinks', 60, '/images/items/strawberry-milk.jpg', true, false, false, 10, '[{"id":"sm-glass","name":"Per glass","price":60}]'::jsonb),
('blueberry-milk', 'Blue Berry Milk', 'blueberry-milk', 'Fresh & refreshing blueberry milk drink.', 'drinks', 40, '/images/items/juices-all.jpg', true, false, false, 11, '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories & products
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);

-- Allow public to insert orders & quotes
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Quotes" ON public.quotes FOR INSERT WITH CHECK (true);

-- Allow authenticated (Admin) full access
CREATE POLICY "Admin Full Categories" ON public.categories USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Products" ON public.products USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Orders" ON public.orders USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Quotes" ON public.quotes USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Stock" ON public.stock USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Expenses" ON public.expenses USING (auth.role() = 'authenticated');
