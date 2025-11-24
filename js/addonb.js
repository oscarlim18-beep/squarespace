console.log("html2pdf exists?", typeof html2pdf);

// Check for html2pdf availability and load if needed
function ensureHtml2Pdf() {
  return new Promise((resolve, reject) => {
    if (typeof html2pdf !== 'undefined') {
      resolve();
      return;
    }
    
    // Try to load html2pdf if not available
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = resolve;
    script.onerror = () => {
      console.warn('html2pdf failed to load, using print fallback');
      resolve(); // Still resolve to continue with fallback
    };
    document.head.appendChild(script);
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== Get Theme from URL =====
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get("theme") || "Cocoa";
  document.getElementById("themeName").textContent = theme;

  // ===== UNIT TYPES =====
  const unitTypes = ["Type A", "Type B", "Type C", "Type D1", "Type D2", "Type E", "Type F"];
  const unitContainer = document.getElementById("unitTypeContainer");
  if (unitContainer) {
    unitTypes.forEach((type, index) => {
      const label = document.createElement("label");
      label.classList.add("addon-list");
      label.innerHTML = `
        <span class="addon-name">${type}</span>
        <div class="addon-right">
          <input type="radio" name="unitType" class="unit-type" data-name="${type}" ${index === 0 ? "checked" : ""}>
        </div>
      `;
      unitContainer.appendChild(label);
    });
  }

  // ===== ROOM TYPES =====
  const roomTypes = [
    {
      name: "2 Room",
      price: 8900,
      includedItems: [
        { item: "3-Seater Sofa", area: "Living Room", quantity: 1 },
        { item: "Coffee Table", area: "Living Room", quantity: 1 },
        { item: "TV Cabinet", area: "Living Room", quantity: 1 },
        { item: "4 pax Dining Set", area: "Dining Area", quantity: 1 },
        { item: "Queen Size Bed", area: "Master Bedroom", quantity: 1 },
        { item: "Side Table", area: "Master Bedroom", quantity: 1 },
        { item: "Single Size Bed", area: "Bedroom 2", quantity: 1 },
        { item: "Side Table", area: "Bedroom 2", quantity: 1 }
      ]
    },
    {
      name: "2 Room with Wardrobe",
      price: 10100,
      includedItems: [
        { item: "3-Seater Sofa", area: "Living Room", quantity: 1 },
        { item: "Coffee Table", area: "Living Room", quantity: 1 },
        { item: "TV Cabinet", area: "Living Room", quantity: 1 },
        { item: "4 pax Dining Set", area: "Dining Area", quantity: 1 },
        { item: "Queen Size Bed", area: "Master Bedroom", quantity: 1 },
        { item: "Side Table", area: "Master Bedroom", quantity: 1 },
        { item: "3-Door Wardrobe", area: "Master Bedroom", quantity: 1 },
        { item: "Single Size Bed", area: "Bedroom 2", quantity: 1 },
        { item: "Side Table", area: "Bedroom 2", quantity: 1 },
        { item: "2-Door Wardrobe", area: "Bedroom 2", quantity: 1 },
      ]
    },
    {
      name: "3 Room",
      price: 14190,
      includedItems: [
        { item: "3-Seater Sofa", area: "Living Room", quantity: 1 },
        { item: "Coffee Table", area: "Living Room", quantity: 1 },
        { item: "TV Cabinet", area: "Living Room", quantity: 1 },
        { item: "6 pax Dining Set", area: "Dining Area", quantity: 1 },
        { item: "Queen Size Bed", area: "Master Bedroom", quantity: 1 },
        { item: "Side Table", area: "Master Bedroom", quantity: 1 },
        { item: "3-Door Wardrobe", area: "Master Bedroom", quantity: 1 },
        { item: "Single Size Bed", area: "Bedroom 2", quantity: 1 },
        { item: "Side Table", area: "Bedroom 2", quantity: 1 },
        { item: "2-Door Wardrobe", area: "Bedroom 2", quantity: 1 },
        { item: "Queen Size Bed", area: "Bedroom 3", quantity: 1 },
        { item: "Side Table", area: "Bedroom 3", quantity: 1 },
        { item: "3-Door Wardrobe", area: "Bedroom 3", quantity: 1 },
      ]
    }
  ];

  const roomContainer = document.getElementById("roomContainer");
  roomTypes.forEach((room, index) => {
    const label = document.createElement("label");
    label.classList.add("addon-list");
    label.innerHTML = `
      <span class="addon-name">${room.name}</span>
      <div class="addon-right">
        <span>RM${room.price}</span>
        <input type="radio" name="roomType" class="room-type" data-name="${room.name}" data-price="${room.price}" ${index === 0 ? "checked" : ""}>
      </div>
    `;
    roomContainer.appendChild(label);
  });

  // ===== GROUPED ADD-ONS =====
  const groupedAddons = {
    "Furniture": [
      { name: "Dining Set Upgrade to 6pax", price: 490 },
      { name: "Low Kitchen Cabinet include Thick Quartz Stone and Kitchen Sink per ft", price: 820 },
      { name: "Kitchen Yard Cabinet(Including Quartz Stone, Aluminium Gas Cylinder Roller Slide & Gas Hob)" , price: 4600 },
      { name: "Customize Wardrobe (Melamine Finish) 2400mm Height per ft", price: 860},
      { name: "Customize Wardrobe (Melamine Finish) Full Height per ft", price: 980},
      { name: "Customize Wardrobe (Melamine Finish) 2400mm Height per ft", price: 980},
      { name: "Customize Wardrobe (Melamine Finish) Full Height per ft", price: 1200},
      { name: "White Mando 2-Door Wardrobe", price: 504},
      { name: "Black Mando 2-Door Wardrobe", price: 479},
      { name: "White Mando 3-Door Wardrobe", price: 773 },
      { name: "Black Mando 3-Door Wardrobe", price: 740},  
      { name: "Kitchen Wall Cabinet 700mm height per ft", price: 400},
      { name: "Kitchen Wall Cabinet 701-900mm height per ft", price: 500},
      { name: "Kitchen Wall Cabinet 901-1200mm height per ft", price: 640},
      { name: "Kitchen Wall Cabinet 1201-1500mm height per ft", price: 740},
      { name: "Kitchen Sliding Door per sq ft", price: 70},
      { name: "Customize Shoe Cabinet 900mm height per ft ", price: 400},  
      { name: "Customize Shoe Cabinet Full height per ft ", price: 920}, 
      { name: "Kitchen Island per ft ", price: 750}, 
      { name: "TV console per ft ", price: 415},
      { name: "TV Background per ft ", price: 45},
      { name: "Opened Wall Cupboard per ft 1200mm Height", price: 750},
      { name: "Closed Wall Cupboard per ft 1200mm Height", price: 640},
      { name: "Single-Sided Vestibule（玄关）per sq ft", price: 60},
      { name: "Double-Sided Vestibule（玄关）per sq ft", price: 95},
      { name: "Normal Study Table and Chair", price: 980},
      { name: "Egornable Study Table and Chair", price: 1800},
    ],
    "Electrical Components": [
      { name: "TV 55 inch", price: 2000 },
      { name: "Aircon 1HP Inverter (Midea)", price: 2080 },
      { name: "Aircon 2HP Inverter (Midea)", price: 3590 },
      { name: "Aircon 1HP Non-Inverter (Midea)", price: 1800 },
      { name: "Aircon 2HP Non-Inverter (Midea)", price: 3360 },
      { name: "Instant Water Heater", price: 400 },
      { name: "Fan (Deka) 56/46 inch", price: 285 },
      { name: "Lighting 12 Watt, 4000K", price: 15 },
      { name: "Lighting 18 Watt, 4000K", price: 20 },
      { name: "Lighting 24 Watt, 4000K", price: 25 },
      { name: "13 Amp Single Socket", price: 190 },
      { name: "Smart Door Lock", price: 1250 },
      { name: "Washing machine 7.5KG Frontload", price: 1450 },
      { name: "8.5KG/6KG Combo Washer and Dryer", price: 2000 },
      { name: "Fridge 250L Two Door", price: 1450 },
      { name: "NESH Indoor Water Filter I-Hot Water Dispenser", price: 2788},
      { name: "NESH Indoor Water Filter Ocean & Smart Tap", price: 3988},
      { name: "NESH Outdoor Water Filter Mini Queen", price: 2688},
      { name: "Scent Diffuser Set", price: 248},
      { name: "Refill Pack", price: 120},
      { name: "6 Month Subscription Scent Diffuser Set", price: 388},
      { name: "Radiant Lamp Set", price: 99.90}
    ],
    "Accessories": [
      { name: "Curtain", price: 3300, allowedUnits: ["Type A"] },
      { name: "Curtain", price: 3500, allowedUnits: ["Type B"] },
      { name: "Curtain", price: 3700, allowedUnits: ["Type C"] },
      { name: "Curtain", price: 4890, allowedUnits: ["Type D1"] },
      { name: "Curtain", price: 3600, allowedUnits: ["Type D2"] },
      { name: "Curtain", price: 4300, allowedUnits: ["Type E"] },
      { name: "Curtain", price: 5800, allowedUnits: ["Type F"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 600, allowedUnits: ["Type A"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 800, allowedUnits: ["Type B"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 700, allowedUnits: ["Type C"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 1200, allowedUnits: ["Type D1"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 800, allowedUnits: ["Type D2"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 900, allowedUnits: ["Type E"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 2099, allowedUnits: ["Type F"] },
      { name: "Yard Window per sq ft", price: 65 },
      { name: "Door Grill", price: 2100 },
      { name: "Shower Screen", price: 580 },
      { name: "Leveling and Tiles", price: 1800},
      { name: "Kitchen to Yard Wall Hacking", price: 1500},
    ],
    "Plaster Ceiling": [
      //Type A
      { name: "Living Area", price: 1104, allowedUnits: ["Type A"] },
      { name: "Dining Area", price: 1380, allowedUnits: ["Type A"] },
      { name: "Master Bedroom", price: 1080, allowedUnits: ["Type A"] },
      { name: "Bedroom 2", price: 1020, allowedUnits: ["Type A"] },
      //Type B
      { name: "Living Area", price: 2760, allowedUnits: ["Type B"] },
      { name: "Dining Area", price: 1344, allowedUnits: ["Type B"] },
      { name: "Master Bedroom", price: 1896, allowedUnits: ["Type B"] },
      { name: "Bedroom 2", price: 1140, allowedUnits: ["Type B"] },
      //Type C
      { name: "Living Area", price: 1500, allowedUnits: ["Type C"] },
      { name: "Dining Area", price: 1476, allowedUnits: ["Type C"] },
      { name: "Master Bedroom", price: 1692, allowedUnits: ["Type C"] },
      { name: "Bedroom 2", price: 1200, allowedUnits: ["Type C"] },
      { name: "Study Area", price: 1152, allowedUnits: ["Type C"] },
      //Type D1
      { name: "Living Area", price: 1920, allowedUnits: ["Type D1"] },
      { name: "Dining Area", price: 2580, allowedUnits: ["Type D1"] },
      { name: "Master Bedroom", price: 1800, allowedUnits: ["Type D1"] },
      { name: "Bedroom 2", price: 1392, allowedUnits: ["Type D1"] },
      { name: "Bedroom 3", price: 1128, allowedUnits: ["Type D1"] },
      //Type D2
      { name: "Living Area", price: 1920, allowedUnits: ["Type D2"] },
      { name: "Dining Area", price: 2580, allowedUnits: ["Type D2"] },
      { name: "Master Bedroom", price: 1800, allowedUnits: ["Type D2"] },
      { name: "Bedroom 2", price: 1392, allowedUnits: ["Type D2"] },
      { name: "Bedroom 3", price: 1128, allowedUnits: ["Type D2"] },
      //Type E
      { name: "Living Area", price: 1380, allowedUnits: ["Type E"] },
      { name: "Dining Area", price: 2496, allowedUnits: ["Type E"] },
      { name: "Master Bedroom", price: 1944, allowedUnits: ["Type E"] },
      { name: "Bedroom 2", price: 1200, allowedUnits: ["Type E"] },
      { name: "Bedroom 3", price: 1116, allowedUnits: ["Type E"] },
      { name: "Study Area", price: 1440, allowedUnits: ["Type E"] },
      //Type F
      { name: "Living Area", price: 1200, allowedUnits: ["Type F"] },
      { name: "Dining Area", price: 1740, allowedUnits: ["Type F"] },
      { name: "Master Bedroom", price: 1080, allowedUnits: ["Type F"] },
      { name: "Bedroom 2", price: 996, allowedUnits: ["Type F"] },
      { name: "Bedroom 3", price: 1032, allowedUnits: ["Type F"] },
      { name: "Family Living", price: 1020, allowedUnits: ["Type F"] },
      { name: "Closet", price: 1032, allowedUnits: ["Type F"] },
      { name: "Staircase", price: 912, allowedUnits: ["Type F"] },
    ]
  };

  const addonContainer = document.getElementById("addonItemsContainer");
  Object.keys(groupedAddons).forEach(group => {
    const groupHeader = document.createElement("h3");
    groupHeader.textContent = group;
    addonContainer.appendChild(groupHeader);

    groupedAddons[group].forEach(item => {
      const label = document.createElement("label");
      label.classList.add("addon-list");
      label.setAttribute("data-group", group);
      label.setAttribute("data-name", item.name);
      label.setAttribute("data-allowed", item.allowedUnits ? item.allowedUnits.join(",") : "all");
      label.innerHTML = `
        <span class="addon-name">${item.name}</span>
        <div class="addon-right">
          <span>RM${item.price}</span>
          <div class="qty-input" data-name="${item.name}" data-price="${item.price}" data-group="${group}">
            <button type="button" class="qty-btn minus">−</button>
            <input type="number" class="qty-value" min="1" value="1">
            <button type="button" class="qty-btn plus">+</button>
          </div>
          <input type="checkbox" class="addon-item" data-name="${item.name}" data-price="${item.price}" data-group="${group}">
        </div>
      `;
      addonContainer.appendChild(label);
    });
  });

  // ===== TOTAL CALCULATION =====
  const totalDisplay = document.getElementById("totalAmount");
  function calculateTotal() {
    const selectedRoom = document.querySelector(".room-type:checked");
    const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;

    const addonTotal = Array.from(document.querySelectorAll(".addon-item"))
      .filter(cb => cb.checked && cb.closest("label").style.display !== "none")
      .reduce((sum, cb) => {
        const qty = parseInt(cb.parentElement.querySelector(".qty-value").value) || 1;
        return sum + parseFloat(cb.dataset.price) * qty;
      }, 0);

    const total = roomPrice + addonTotal;
    totalDisplay.textContent = total.toFixed(2);
  }

  // ===== UNIVERSAL FILTER =====
  function applyFilters() {
    const selectedUnit = document.querySelector(".unit-type:checked")?.dataset.name;
    if (!selectedUnit) return;

    document.querySelectorAll("#addonItemsContainer label.addon-list").forEach(label => {
      const allowed = label.getAttribute("data-allowed");
      if (allowed === "all" || allowed.includes(selectedUnit)) {
        label.style.display = "flex";
      } else {
        label.style.display = "none";
        const checkbox = label.querySelector(".addon-item");
        if (checkbox) checkbox.checked = false;
      }
    });
    calculateTotal();
  }

  document.querySelectorAll(".unit-type").forEach(input => {
    input.addEventListener("change", applyFilters);
  });

  // ===== EVENT HANDLERS =====
  addonContainer.addEventListener("click", e => {
    if (e.target.classList.contains("qty-btn")) {
      const input = e.target.parentElement.querySelector(".qty-value");
      let value = parseInt(input.value) || 1;
      if (e.target.classList.contains("plus")) value++;
      if (e.target.classList.contains("minus") && value > 1) value--;
      input.value = value;
      calculateTotal();
    }
  });

  addonContainer.addEventListener("input", e => {
    if (e.target.classList.contains("qty-value")) {
      if (parseInt(e.target.value) < 1 || isNaN(e.target.value)) e.target.value = 1;
      calculateTotal();
    }
  });

  document.addEventListener("change", e => {
    if (e.target.classList.contains("room-type") || e.target.classList.contains("addon-item")) {
      calculateTotal();
    }
  });

  // Initial run
  applyFilters();
  calculateTotal();

  // ===== PDF GENERATION =====
  document.getElementById("generatePDF").addEventListener("click", async () => {
    try {
      // Ensure html2pdf is available
      await ensureHtml2Pdf();
      
      const name = document.querySelector('input[name="name"]').value || "-";
      const email = document.querySelector('input[name="email"]').value || "-";
      const phone = document.querySelector('input[name="phone"]').value || "-";
      const unit = document.querySelector('input[name="unit"]').value || "-";
      const selectedUnitType = document.querySelector(".unit-type:checked")?.dataset.name || "-";
      const selectedRoom = document.querySelector(".room-type:checked");
      const selectedRoomName = selectedRoom ? selectedRoom.dataset.name : "-";
      const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;
      const selectedRoomObj = roomTypes.find(r => r.name === selectedRoomName);
      const includedItems = selectedRoomObj?.includedItems || [];

      const selectedAddons = Array.from(document.querySelectorAll(".addon-item"))
        .filter(cb => cb.checked && cb.closest("label").style.display !== "none")
        .map(cb => {
          const qty = parseInt(cb.parentElement.querySelector(".qty-value").value) || 1;
          const price = parseFloat(cb.dataset.price);
          const group = cb.dataset.group;
          return { name: cb.dataset.name, price, qty, subtotal: price * qty, group };
        });

      const total = parseFloat(totalDisplay.textContent) || 0;

      // Add loading indicator
      const btn = document.getElementById("generatePDF");
      const originalText = btn.textContent;
      btn.textContent = "⏳ Generating PDF...";
      btn.disabled = true;

      // Create PDF content with EXACT same page break solution
      const pdfContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      font-size: 12px; 
      line-height: 1.4; 
      color: #333; 
      background: white; 
      margin: 0; 
      padding: 15mm;
    }
    
    .header { 
      display: flex; 
      align-items: center; 
      margin-bottom: 20px; 
      padding-bottom: 15px; 
      border-bottom: 2px solid #2c5aa0;
    }
    
    .logo { width: 120px; height: auto; margin-right: 25px; }
    
    .company-info h1 { margin: 0 0 5px 0; font-size: 22px; font-weight: bold; color: #2c5aa0; }
    .company-info p { margin: 2px 0; font-size: 11px; color: #666; }
    
    .title { 
      text-align: center; 
      margin-bottom: 25px; 
      padding: 15px; 
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
      border-radius: 8px; 
      border-left: 4px solid #2c5aa0;
    }
    
    .title h1 { margin: 0 0 8px 0; font-size: 18px; font-weight: bold; color: #2c5aa0; }
    .title h2 { margin: 0; font-size: 14px; font-weight: normal; color: #666; }
    
    .info-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-bottom: 25px; 
    }
    
    .info-table td { padding: 10px 5px; vertical-align: top; border-bottom: 1px solid #f0f0f0; }
    .info-table tr:last-child td { border-bottom: none; }
    .info-table strong { color: #2c5aa0; }
    
    .section-title { 
      font-size: 14px; 
      margin: 20px 0 10px 0; 
      padding-bottom: 6px; 
      border-bottom: 2px solid #2c5aa0; 
      color: #2c5aa0; 
      font-weight: bold;
    }
    
    /* TABLE STYLES */
    .items-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-bottom: 20px;
      font-size: 11px;
    }
    
    .items-table th, .items-table td { 
      padding: 8px 6px; 
      text-align: left; 
      border: 1px solid #ddd;
    }
    
    .items-table th { 
      background: #2c5aa0; 
      color: white; 
      font-weight: bold;
    }
    
    .items-table tbody tr:nth-child(even) { 
      background-color: #f8f9fa; 
    }
    
    .group-header { 
      background: #e3f2fd !important; 
      font-weight: bold; 
      color: #2c5aa0;
    }
    
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    
    /* TOTAL SECTION - EXACT SAME AS FIRST CODE */
    .total-section {
      text-align: right; 
      padding: 20px; 
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
      border-radius: 8px; 
      border: 2px solid #2c5aa0;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    
    .total-amount-text {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }
    
    .total-amount-value {
      font-size: 24px;
      font-weight: bold;
      color: #2c5aa0;
      margin: 12px 0;
    }
    
    .total-note {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }
    
    .total-note-light {
      font-size: 12px;
      color: #666;
      border-top: 1px solid #eee;
      padding-top: 6px;
      margin-top: 8px;
    }
    
    .signature { 
      margin-top: 60px; 
      display: flex; 
      justify-content: space-between;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    
    .signature-box { width: 45%; text-align: center; }
    .signature-line { margin: 30px 0 5px 0; border-top: 1px solid #333; }
    .signature-label { font-size: 11px; color: #666; }
    
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 10px;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 10px;
    }
    
    /* CRITICAL FIX: EXACT SAME as first code - both total and signature protected */
    @media print {
      .total-section {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      
      .signature {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      
      body {
        margin: 0 !important;
        padding: 15mm !important;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <img class="logo" src="../image/SS logo.png" alt="Logo" onerror="this.style.display='none'">
    <div class="company-info">
      <h1>SSpace Equity</h1>
      <p>B-21-06, Residensi Aradia, 102, Jalan Sibu, Taman Wahyu</p>
      <p>Phone: +60 12-689 4121 | Email: Liefong@squarespacemy.com</p>
    </div>
  </div>

  <div class="title">
    <h1>Basic Package Add-On Summary</h1>
    <h2>Theme: ${theme}</h2>
  </div>

  <h3 class="section-title">Client Information</h3>
  <table class="info-table">
    <tr>
      <td style="width:30%"><strong>Name:</strong></td>
      <td style="width:20%">${escapeHtml(name)}</td>
      <td style="width:20%"><strong>Phone:</strong></td>
      <td style="width:30%">${escapeHtml(phone)}</td>
    </tr>
    <tr>
      <td><strong>Email:</strong></td>
      <td>${escapeHtml(email)}</td>
      <td><strong>Unit:</strong></td>
      <td>${escapeHtml(unit)}</td>
    </tr>
    <tr>
      <td><strong>Unit Type:</strong></td>
      <td>${escapeHtml(selectedUnitType)}</td>
      <td><strong>Room Type:</strong></td>
      <td><strong>${escapeHtml(selectedRoomName)}</strong> (RM${roomPrice.toFixed(2)})</td>
    </tr>
  </table>

  <h3 class="section-title">Package Inclusions</h3>
  ${includedItems.length > 0 ? createInclusionsTable(includedItems) : '<p style="text-align:center;color:#666;margin:20px 0;">No items included</p>'}

  ${selectedAddons.length > 0 ? `
    <h3 class="section-title">Selected Add-Ons</h3>
    ${createAddonsTable(selectedAddons)}
  ` : ''}

  <!-- TOTAL SECTION - EXACT SAME STRUCTURE AS FIRST CODE -->
  <div class="total-section">
    <div class="total-amount-text">Total Amount</div>
    <div class="total-amount-value">RM ${total.toFixed(2)}</div>
    <div class="total-note">Inclusive of all selected items and package</div>
  </div>

  <!-- SIGNATURE SECTION - NOW PROTECTED FROM PAGE BREAKS -->
  <div class="signature">
    <div class="signature-box">
      <div class="signature-line"></div>
      <div class="signature-label">Client Signature</div>
      <div style="margin-top:15px; font-size:11px;">
        <div>Name: ___________________</div>
        <div>Date: ___________________</div>
      </div>
    </div>
    <div class="signature-box">
      <div class="signature-line"></div>
      <div class="signature-label">Company Representative</div>
      <div style="margin-top:15px; font-size:11px;">
        <div>Name: ___________________</div>
        <div>Date: ___________________</div>
      </div>
    </div>
  </div>

</body>
</html>
`;

      // Helper functions for table creation
      function createInclusionsTable(items) {
        return `
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-center">Area</th>
                <th class="text-center">Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${escapeHtml(item.item)}</td>
                  <td class="text-center">${escapeHtml(item.area)}</td>
                  <td class="text-center">${item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }

      function createAddonsTable(addons) {
        const grouped = {};
        addons.forEach(a => {
          const g = a.group || "Add-ons";
          if (!grouped[g]) grouped[g] = [];
          grouped[g].push(a);
        });
        
        let tableHtml = `
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-center">Qty</th>
                <th class="text-right">Price (RM)</th>
                <th class="text-right">Subtotal (RM)</th>
              </tr>
            </thead>
            <tbody>`;
        
        Object.keys(grouped).forEach(group => {
          tableHtml += `
            <tr class="group-header">
              <td colspan="4"><strong>${escapeHtml(group)}</strong></td>
            </tr>`;
          
          grouped[group].forEach(a => {
            tableHtml += `
            <tr>
              <td>${escapeHtml(a.name)}</td>
              <td class="text-center">${a.qty}</td>
              <td class="text-right">${a.price.toFixed(2)}</td>
              <td class="text-right">${a.subtotal.toFixed(2)}</td>
            </tr>`;
          });
        });
        
        tableHtml += `
          </tbody>
        </table>`;
        
        return tableHtml;
      }

      // create temp container and call html2pdf - EXACT SAME LOGIC
      const pdfContainerEl = document.createElement("div");
      pdfContainerEl.style.boxSizing = "border-box";
      pdfContainerEl.innerHTML = pdfContent;
      document.body.appendChild(pdfContainerEl);

      // If html2pdf is available use it; otherwise fallback to print
      if (typeof html2pdf !== "undefined") {
        await html2pdf().set({
          margin: [15, 15, 15, 15],
          filename: `Basic_Package_${selectedRoomName}_${new Date().toISOString().split('T')[0]}.pdf`,
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#FFFFFF",
            logging: false
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
          },
          // EXACT SAME page break configuration - NOW INCLUDES SIGNATURE
          pagebreak: { 
            mode: ['css'],
            avoid: ['.total-section', '.signature']
          }
        }).from(pdfContainerEl).save();
      } else {
        // fallback: open print window
        const w = window.open();
        w.document.write(pdfContent);
        w.document.close();
        w.focus();
        setTimeout(() => { w.print(); setTimeout(() => w.close(), 1000); }, 700);
      }

      // cleanup
      pdfContainerEl.remove();
      btn.textContent = originalText;
      btn.disabled = false;

    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed. See console for details.");
      const btn = document.getElementById("generatePDF");
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Generate PDF";
      }
    }
  });

// ===== ADD HELPER FUNCTIONS =====
function escapeHtml(str) {
  if (!str && str !== 0) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
});