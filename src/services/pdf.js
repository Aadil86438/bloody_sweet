import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { formatCurrency, formatDate } from './format.js'
import { businessSettings } from './mockData.js'

/**
 * Generate and download a professional PDF Invoice / Order Receipt
 */
export function downloadOrderPDF(order) {
  const doc = new jsPDF()

  // Header Background
  doc.setFillColor(107, 29, 42) // Burgundy #6B1D2A
  doc.rect(0, 0, 210, 40, 'F')

  // Header Title
  doc.setTextColor(255, 248, 240) // Cream #FFF8F0
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('BLOODY Sweet by fafa', 15, 22)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('BAKERY  •  JUICES  •  SWEETS', 15, 30)

  // Document Badge
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('INVOICE / RECEIPT', 195, 25, { align: 'right' })

  // Business Info Right
  doc.setTextColor(61, 50, 40)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('BLOODY Sweet by fafa', 15, 50)
  doc.setFont('helvetica', 'normal')
  doc.text(`Phone: ${businessSettings.phone}`, 15, 55)
  doc.text(`Manager: ${businessSettings.contactPerson}`, 15, 60)
  doc.text('Orders Undertaken', 15, 65)

  // Order Details Right
  doc.setFont('helvetica', 'bold')
  doc.text(`Order No: ${order.order_number}`, 195, 50, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.text(`Date: ${formatDate(order.created_at)}`, 195, 55, { align: 'right' })
  doc.text(`Delivery Type: ${(order.delivery_type || 'Pickup').toUpperCase()}`, 195, 60, { align: 'right' })
  doc.text(`Status: ${(order.status || 'CONFIRMED').toUpperCase()}`, 195, 65, { align: 'right' })

  // Divider line
  doc.setDrawColor(220, 200, 190)
  doc.setLineWidth(0.5)
  doc.line(15, 72, 195, 72)

  // Customer Details Box
  doc.setFillColor(250, 247, 242)
  doc.roundedRect(15, 76, 180, 24, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('CUSTOMER DETAILS', 20, 84)
  doc.setFont('helvetica', 'normal')
  doc.text(`Name: ${order.customer_name}`, 20, 91)
  doc.text(`Phone: ${order.customer_phone}`, 110, 91)
  if (order.address) {
    doc.text(`Address: ${order.address}`, 20, 96)
  }

  // Items Table
  const tableData = (order.items || []).map((item, idx) => [
    idx + 1,
    item.product_name + (item.variant_name ? ` (${item.variant_name})` : ''),
    item.quantity,
    formatCurrency(item.unit_price || item.price || 0),
    formatCurrency((item.unit_price || item.price || 0) * item.quantity),
  ])

  doc.autoTable({
    startY: 106,
    head: [['#', 'Item Description', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    headStyles: {
      fillColor: [107, 29, 42],
      textColor: [255, 248, 240],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: [61, 50, 40],
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [250, 247, 242],
    },
    margin: { left: 15, right: 15 },
  })

  const finalY = doc.lastAutoTable.finalY + 10

  // Total Summary
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text(`Subtotal: ${formatCurrency(order.subtotal || order.total)}`, 195, finalY, { align: 'right' })
  if (order.delivery_fee) {
    doc.text(`Delivery Fee: ${formatCurrency(order.delivery_fee)}`, 195, finalY + 6, { align: 'right' })
  }
  doc.setFontSize(13)
  doc.setTextColor(107, 29, 42)
  doc.text(`TOTAL AMOUNT: ${formatCurrency(order.total)}`, 195, finalY + 14, { align: 'right' })

  // Footer Note
  doc.setTextColor(120, 100, 90)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.text('Thank you for choosing BLOODY Sweet by fafa!', 105, 280, { align: 'center' })
  doc.text('Made fresh. Made to be remembered.', 105, 285, { align: 'center' })

  // Save PDF
  doc.save(`${order.order_number}_Invoice.pdf`)
}

/**
 * Generate and download a Quote PDF
 */
export function downloadQuotePDF(quote) {
  const doc = new jsPDF()

  // Header Background
  doc.setFillColor(107, 29, 42)
  doc.rect(0, 0, 210, 40, 'F')

  // Header Title
  doc.setTextColor(255, 248, 240)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('BLOODY Sweet by fafa', 15, 22)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('BAKERY  •  JUICES  •  SWEETS', 15, 30)

  // Document Badge
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('QUOTATION ESTIMATE', 195, 25, { align: 'right' })

  // Business Info
  doc.setTextColor(61, 50, 40)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('BLOODY Sweet by fafa', 15, 50)
  doc.setFont('helvetica', 'normal')
  doc.text(`Phone: ${businessSettings.phone}`, 15, 55)
  doc.text(`Manager: ${businessSettings.contactPerson}`, 15, 60)
  doc.text('Catering • Party • Wedding', 15, 65)

  // Quote Info Right
  doc.setFont('helvetica', 'bold')
  doc.text(`Quote Ref: ${quote.quote_number}`, 195, 50, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.text(`Date: ${formatDate(quote.created_at)}`, 195, 55, { align: 'right' })
  if (quote.event_date) {
    doc.text(`Event Date: ${formatDate(quote.event_date)}`, 195, 60, { align: 'right' })
  }

  // Divider
  doc.setDrawColor(220, 200, 190)
  doc.setLineWidth(0.5)
  doc.line(15, 72, 195, 72)

  // Customer Details Box
  doc.setFillColor(250, 247, 242)
  doc.roundedRect(15, 76, 180, 28, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('CLIENT DETAILS', 20, 84)
  doc.setFont('helvetica', 'normal')
  doc.text(`Client Name: ${quote.customer_name}`, 20, 91)
  doc.text(`Phone: ${quote.customer_phone}`, 110, 91)
  if (quote.customer_email) {
    doc.text(`Email: ${quote.customer_email}`, 20, 97)
  }
  if (quote.location) {
    doc.text(`Location: ${quote.location}`, 110, 97)
  }

  // Event Details Table
  const quoteRows = [
    ['Occasion / Request Type', (quote.request_type || 'Custom Order').toUpperCase()],
    ['Quantity / Servings', quote.quantity || 'As Requested'],
    ['Budget Range', quote.budget || 'Custom'],
    ['Special Requirements', quote.requirements || 'Standard Luxury Catering'],
  ]

  doc.autoTable({
    startY: 110,
    head: [['Parameter', 'Details']],
    body: quoteRows,
    headStyles: {
      fillColor: [107, 29, 42],
      textColor: [255, 248, 240],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: [61, 50, 40],
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [250, 247, 242],
    },
    margin: { left: 15, right: 15 },
  })

  const finalY = doc.lastAutoTable.finalY + 12

  if (quote.quoted_amount) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(107, 29, 42)
    doc.text(`TOTAL QUOTED ESTIMATE: ${formatCurrency(quote.quoted_amount)}`, 195, finalY, { align: 'right' })
  } else {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(10)
    doc.setTextColor(107, 29, 42)
    doc.text('Quotation under review — Our team will contact you shortly.', 195, finalY, { align: 'right' })
  }

  // Terms & Conditions Box
  const termsY = finalY + 15
  doc.setFillColor(255, 248, 240)
  doc.roundedRect(15, termsY, 180, 25, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(107, 29, 42)
  doc.text('TERMS & GUARANTEES:', 20, termsY + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 70, 60)
  doc.text('1. All items handcrafted fresh using premium quality ingredients.', 20, termsY + 12)
  doc.text('2. Orders confirmed upon 50% advance deposit.', 20, termsY + 17)
  doc.text('3. Direct WhatsApp support: 9840293144.', 20, termsY + 22)

  // Footer
  doc.setTextColor(120, 100, 90)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.text('BLOODY Sweet by fafa — Made fresh. Made to be remembered.', 105, 285, { align: 'center' })

  // Save PDF
  doc.save(`${quote.quote_number}_Quotation.pdf`)
}

/**
 * Generate and download Official Menu Catalog PDF
 */
export function downloadMenuPDF() {
  const doc = new jsPDF()

  // Header Background
  doc.setFillColor(107, 29, 42)
  doc.rect(0, 0, 210, 45, 'F')

  doc.setTextColor(255, 248, 240)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.text('BLOODY Sweet by fafa', 105, 22, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('BAKERY  •  JUICES  •  SWEETS', 105, 30, { align: 'center' })
  doc.text('CATERING  •  PARTY  •  WEDDING', 105, 36, { align: 'center' })

  doc.setFontSize(9)
  doc.setTextColor(61, 50, 40)
  doc.setFont('helvetica', 'bold')
  doc.text('OFFICIAL MENU & PRICE LIST', 15, 55)
  doc.setFont('helvetica', 'normal')
  doc.text('Orders Undertaken | Phone: 9840293144 | Manager: Saleem Basha', 195, 55, { align: 'right' })

  doc.setDrawColor(220, 200, 190)
  doc.line(15, 60, 195, 60)

  const menuItems = [
    ['Muttā Mittai (Signature)', 'Traditional sweet with a unique crunchy jaggery & sesame taste', '50g cup: ₹50\n250g: ₹190\n500g: ₹350'],
    ['Fudge Brownie', 'Rich, chocolaty & fudgy square brownie slice', '₹50 / piece'],
    ['Red Velvet Brownie', 'Decadent red velvet brownie with white chocolate swirl', '₹70 / piece'],
    ['Tres Leches Cake', 'Soft sponge cake soaked in three kinds of milk', '₹60 / piece'],
    ['Rsamalai Tres Leches', 'Individual cup dessert soaked in saffron Rasamalai milk', '₹120 / cup'],
    ['Lychee Tres Leches', 'Individual cup dessert infused with fresh lychee cream', '₹120 / cup'],
    ['Blue Berry Tres Leches', 'Individual cup dessert topped with blueberry compote', '₹120 / cup'],
    ['Tender Coconut Pudding', 'Creamy, fresh & refreshing tender coconut dessert cup', '₹60 / cup'],
    ['Mango Milk / Milkshake', 'Made with real fresh mangoes — pure happiness', '₹40 (glass) / ₹60 (shake)'],
    ['Strawberry Milkshake', 'Classic creamy strawberry drink with real berries', '₹40 (glass) / ₹60 (shake)'],
    ['Blue Berry Milkshake', 'Refreshing thick blueberry milk drink', '₹40 (glass) / ₹60 (shake)'],
  ]

  doc.autoTable({
    startY: 65,
    head: [['Product Name', 'Description', 'Price']],
    body: menuItems,
    headStyles: {
      fillColor: [107, 29, 42],
      textColor: [255, 248, 240],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      textColor: [61, 50, 40],
      fontSize: 9,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 90 },
      2: { fontStyle: 'bold', cellWidth: 45, textColor: [107, 29, 42] },
    },
    alternateRowStyles: {
      fillColor: [250, 247, 242],
    },
    margin: { left: 15, right: 15 },
  })

  // Footer
  doc.setTextColor(120, 100, 90)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.text('To place an order or book catering: Call / WhatsApp 9840293144', 105, 282, { align: 'center' })
  doc.text('Instagram: @BLODYSWEET_BYFAFA', 105, 287, { align: 'center' })

  doc.save('BLOODY_Sweet_Official_Menu.pdf')
}
