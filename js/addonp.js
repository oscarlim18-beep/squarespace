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

// Detect Honor / MagicOS / Huawei-like devices
function isHonorDevice() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('honor') || ua.includes('magicos') || ua.includes('huawei');
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== Get Theme from URL =====
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get("theme") || "Rustic";
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
      price: 38000,
      includedItems: [
        { item: "L Shape Sofa with Cushion", area: "Living Room", quantity: 1 },
        { item: "Coffee Table", area: "Living Room", quantity: 1 },
        { item: "TV Console", area: "Living Room", quantity: 1 },
        { item: "55 inches Smart TV", area: "Living Room", quantity: 1 },
        { item: "Feature Wall", area: "Living Room", quantity: 1 },
        { item: "Carpet", area: "Living Room", quantity: 1 },
        { item: "Tinted", area: "Living Room", quantity: 1 },
        { item: "Window Bay Cushion & Pillows", area: "Living Room", quantity: 1 },
        { item: "Dining Table", area: "Dining Area", quantity: 1 },
        { item: "Dining Chair", area: "Dining Area", quantity: 4 },
        { item: "Pendant", area: "Dining Area", quantity: 1 },
        { item: "Fridge", area: "Kitchen & Yard", quantity: 1 },
        { item: "Dressing Table & Chair", area: "Master Bedroom", quantity: 1 },
        { item: "Queen Size Bed Frame & Mattress", area: "Master Bedroom", quantity: 1 },
        { item: "Side Tables", area: "Master Bedroom", quantity: 2 },
        { item: "Bedding Set", area: "Master Bedroom", quantity: 1 },
        { item: "Window Bay Cushion & Pillows", area: "Master Bedroom", quantity: 1 },
        { item: "Queen Size Bed Frame & Mattress", area: "Bedroom 2", quantity: 1 },
        { item: "Bedding Set", area: "Bedroom 2", quantity: 1 },
        { item: "Side Table", area: "Bedroom 2", quantity: 1 },
        { item: "Decorative Mirror", area: "Toilets", quantity: 2 },
        { item: "Shoe Rack", area: "Foyer Area", quantity: 1 },
        { item: "Door Bell", area: "Foyer Area", quantity: 1 },
        { item: "LED Downlight 12W", area: "Overall", quantity: 11 },
        { item: "LED Downlight 18W", area: "Overall", quantity: 2 },
        { item: "LED Downlight 24W", area: "Overall", quantity: 1 },
        { item: "Deka 56' Fan", area: "Overall", quantity: 2 },
        { item: "Curtain & Sheer", area: "Overall", quantity: 1 },
        { item: "Accessories", area: "Overall", quantity: 1 },
        { item: "Logistice & Installation", area: "Overall", quantity: 1 },
      ]
    },
    {
      name: "3 Room",
      price: 41700,
      includedItems: [
        { item: "L Shape Sofa with Cushion", area: "Living Room", quantity: 1 },
        { item: "Coffee Table", area: "Living Room", quantity: 1 },
        { item: "TV Console", area: "Living Room", quantity: 1 },
        { item: "55 inches Smart TV", area: "Living Room", quantity: 1 },
        { item: "Feature Wall", area: "Living Room", quantity: 1 },
        { item: "Carpet", area: "Living Room", quantity: 1 },
        { item: "Tinted", area: "Living Room", quantity: 1 },
        { item: "Window Bay Cushion & Pillows", area: "Living Room", quantity: 1 },
        { item: "Dining Table", area: "Dining Area", quantity: 1 },
        { item: "Dining Chair", area: "Dining Area", quantity: 4 },
        { item: "Pendant", area: "Dining Area", quantity: 1 },
        { item: "Fridge", area: "Kitchen & Yard", quantity: 1 },
        { item: "Dressing Table & Chair", area: "Master Bedroom", quantity: 1 },
        { item: "Queen Size Bed Frame & Mattress", area: "Master Bedroom", quantity: 1 },
        { item: "Side Tables", area: "Master Bedroom", quantity: 2 },
        { item: "Bedding Set", area: "Master Bedroom", quantity: 1 },
        { item: "Window Bay Cushion & Pillows", area: "Master Bedroom", quantity: 1 },
        { item: "Queen Size Bed Frame & Mattress", area: "Bedroom 2", quantity: 1 },
        { item: "Bedding Set", area: "Bedroom 2", quantity: 1 },
        { item: "Side Table", area: "Bedroom 2", quantity: 1 },
        { item: "Queen Size Bed Frame & Mattress", area: "Bedroom 3", quantity: 1 },
        { item: "Bedding Set", area: "Bedroom 3", quantity: 1 },
        { item: "Side Table", area: "Bedroom 3", quantity: 1 },
        { item: "Decorative Mirror", area: "Toilets", quantity: 2 },
        { item: "Shoe Rack", area: "Foyer Area", quantity: 1 },
        { item: "Door Bell", area: "Foyer Area", quantity: 1 },
        { item: "LED Downlight 12W", area: "Overall", quantity: 11 },
        { item: "LED Downlight 18W", area: "Overall", quantity: 2 },
        { item: "LED Downlight 24W", area: "Overall", quantity: 1 },
        { item: "Deka 56' Fan", area: "Overall", quantity: 2 },
        { item: "Curtain & Sheer", area: "Overall", quantity: 1 },
        { item: "Accessories", area: "Overall", quantity: 1 },
        { item: "Logistice & Installation", area: "Overall", quantity: 1 },
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
      { name: "Dining Set Upgrade to 6pax", price: 580 },
      { name: "Kitchen Cabinet include Thick Quartz Stone", price: 6900},
      { name: "Kitchen Yard Cabinet(Including Quartz Stone, Aluminium Gas Cylinder Roller Slide & Gas Hob)", price: 4600},
      { name: "Customize Wardrobe (Melamine Finish) per ft", price: 890},
      { name: "Kitchen Sliding Door per sq ft", price: 70},
      { name: "Upgrade Fixed Shoe Cabinet per ft ", price: 450},      
    ],
    "Electrical Components": [
      { name: "TV 55 inch", price: 2000 },
      { name: "Aircon 1HP Inverter (Midea)", price: 2080 },
      { name: "Aircon 2HP Inverter (Midea)", price: 3590 },
      { name: "Instant Water Heater", price: 400 },
      { name: "Fan (Deka) 56/48 inch", price: 285 },
      { name: "Lighting 12 Watt, 4000K", price: 25 },
      { name: "Lighting 18 Watt, 4000K", price: 30 },
      { name: "Lighting 24 Watt, 4000K", price: 35 },
      { name: "13 Amp Single Socket", price: 190 },
      { name: "Smart Door Lock", price: 1250 },
      { name: "Washing machine 7.5KG Frontload", price: 1450 },
      { name: "8.5KG/6KG Combo Washer and Dryer", price: 2000 },
      { name: "Fridge 240L Two Door", price: 1450 }
    ],
    "Accessories": [
      { name: "Curtain", price: 3300, allowedUnits: ["Type A"] },
      { name: "Curtain", price: 3500, allowedUnits: ["Type B"] },
      { name: "Curtain", price: 3700, allowedUnits: ["Type C"] },
      { name: "Curtain", price: 4890, allowedUnits: ["Type D1"] },
      { name: "Curtain", price: 3600, allowedUnits: ["Type D2"] },
      { name: "Curtain", price: 4300, allowedUnits: ["Type E"] },
      { name: "Curtain", price: 5800, allowedUnits: ["Type F"] },
      { name: "Tinted IonMax Series", price: 1099, allowedUnits: ["Type A"] },
      { name: "Tinted IonMax Series", price: 1399, allowedUnits: ["Type B"] },
      { name: "Tinted IonMax Series", price: 1199, allowedUnits: ["Type C"] },
      { name: "Tinted IonMax Series", price: 2099, allowedUnits: ["Type D1"] },
      { name: "Tinted IonMax Series", price: 1499, allowedUnits: ["Type D2"] },
      { name: "Tinted IonMax Series", price: 1499, allowedUnits: ["Type E"] },
      { name: "Tinted IonMax Series", price: 4399, allowedUnits: ["Type F"] },
      { name: "Yard Grill", price: 1300 },
      { name: "Door Grill", price: 2100 },
      { name: "Shower Screen", price: 800 }
    ],
    "Plaster Ceiling": [
      //Type A
      { name: "Living Area", price: 644, allowedUnits: ["Type A"] },
      { name: "Dining Area", price: 805, allowedUnits: ["Type A"] },
      { name: "Master Bedroom", price: 630, allowedUnits: ["Type A"] },
      { name: "Bedroom 2", price: 595, allowedUnits: ["Type A"] },
      //Type B
      { name: "Living Area", price: 1610, allowedUnits: ["Type B"] },
      { name: "Dining Area", price: 784, allowedUnits: ["Type B"] },
      { name: "Master Bedroom", price: 1106, allowedUnits: ["Type B"] },
      { name: "Bedroom 2", price: 665, allowedUnits: ["Type B"] },
      //Type C
      { name: "Living Area", price: 875, allowedUnits: ["Type C"] },
      { name: "Dining Area", price: 861, allowedUnits: ["Type C"] },
      { name: "Master Bedroom", price: 987, allowedUnits: ["Type C"] },
      { name: "Bedroom 2", price: 700, allowedUnits: ["Type C"] },
      { name: "Study Area", price: 672, allowedUnits: ["Type C"] },
      //Type D1
      { name: "Living Area", price: 1120, allowedUnits: ["Type D1"] },
      { name: "Dining Area", price: 1505, allowedUnits: ["Type D1"] },
      { name: "Master Bedroom", price: 1050, allowedUnits: ["Type D1"] },
      { name: "Bedroom 2", price: 812, allowedUnits: ["Type D1"] },
      { name: "Bedroom 3", price: 658, allowedUnits: ["Type D1"] },
      //Type D2
      { name: "Living Area", price: 1120, allowedUnits: ["Type D2"] },
      { name: "Dining Area", price: 1505, allowedUnits: ["Type D2"] },
      { name: "Master Bedroom", price: 1050, allowedUnits: ["Type D2"] },
      { name: "Bedroom 2", price: 812, allowedUnits: ["Type D2"] },
      { name: "Bedroom 3", price: 658, allowedUnits: ["Type D2"] },
      //Type E
      { name: "Living Area", price: 805, allowedUnits: ["Type E"] },
      { name: "Dining Area", price: 1456, allowedUnits: ["Type E"] },
      { name: "Master Bedroom", price: 1134, allowedUnits: ["Type E"] },
      { name: "Bedroom 2", price: 700, allowedUnits: ["Type E"] },
      { name: "Bedroom 3", price: 651, allowedUnits: ["Type E"] },
      { name: "Study Area", price: 840, allowedUnits: ["Type E"] },
      //Type F
      { name: "Living Area", price: 700, allowedUnits: ["Type F"] },
      { name: "Dining Area", price:1015, allowedUnits: ["Type F"] },
      { name: "Master Bedroom", price: 630, allowedUnits: ["Type F"] },
      { name: "Bedroom 2", price: 581, allowedUnits: ["Type F"] },
      { name: "Bedroom 3", price: 602, allowedUnits: ["Type F"] },
      { name: "Family Living", price: 595, allowedUnits: ["Type F"] },
      { name: "Closet", price: 602, allowedUnits: ["Type F"] },
      { name: "Staircase", price: 532, allowedUnits: ["Type F"] },
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
      const originalText = document.getElementById("generatePDF").textContent;
      document.getElementById("generatePDF").textContent = "⏳ Generating PDF...";
      document.getElementById("generatePDF").disabled = true;

      // Create PDF content with improved styling
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
              max-width: 190mm;
            }
            .header { 
              display: flex; 
              align-items: center; 
              margin-bottom: 25px; 
              padding-bottom: 20px; 
              border-bottom: 2px solid #2c5aa0; 
            }
            .logo { 
              width: 120px; 
              height: auto; 
              margin-right: 25px; 
            }
            .company-info h1 {
              margin: 0 0 5px 0; 
              font-size: 22px; 
              font-weight: bold;
              color: #2c5aa0;
            }
            .company-info p {
              margin: 2px 0;
              font-size: 11px;
              color: #666;
            }
            .title { 
              text-align: center; 
              margin-bottom: 30px;
              padding: 15px;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border-radius: 8px;
              border-left: 4px solid #2c5aa0;
            }
            .title h1 {
              margin: 0 0 8px 0; 
              font-size: 18px; 
              font-weight: bold;
              color: #2c5aa0;
            }
            .title h2 {
              margin: 0; 
              font-size: 14px; 
              font-weight: normal;
              color: #666;
            }
            .info-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 30px; 
            }
            .info-table td { 
              padding: 8px 0; 
              vertical-align: top; 
              border-bottom: 1px solid #f0f0f0;
            }
            .info-table tr:last-child td {
              border-bottom: none;
            }
            .info-table strong {
              color: #2c5aa0;
            }
            .section-title {
              font-size: 14px; 
              margin: 25px 0 12px 0; 
              padding-bottom: 8px; 
              border-bottom: 2px solid #2c5aa0;
              color: #2c5aa0;
              font-weight: bold;
            }
            .data-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 25px; 
              border: 1px solid #ddd;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .data-table th, 
            .data-table td { 
              padding: 10px 8px; 
              text-align: left; 
              border: 1px solid #ddd; 
            }
            .data-table th { 
              background: #2c5aa0; 
              color: white;
              font-weight: bold;
              font-size: 11px;
            }
            .data-table tr:nth-child(even) {
              background-color: #f8f9fa;
            }
            .group-header {
              background: #e3f2fd !important;
              font-weight: bold;
              color: #2c5aa0;
              font-size: 11px;
            }
            .total-section {
              text-align: right; 
              margin: 35px 0; 
              padding: 20px;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border-radius: 8px;
              border: 2px solid #2c5aa0;
            }
            .total-amount {
              font-size: 24px; 
              font-weight: bold;
              color: #2c5aa0;
              margin: 10px 0;
            }
            .signature { 
              margin-top: 80px; 
              display: flex; 
              justify-content: space-between; 
            }
            .signature-box {
              width: 45%;
              text-align: center;
            }
            .signature-line {
              margin: 40px 0 5px 0;
              border-top: 1px solid #333;
            }
            .signature-label {
              font-size: 11px;
              color: #666;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 10px;
              color: #999;
              border-top: 1px solid #eee;
              padding-top: 10px;
            }
            @media print {
              body { margin: 0; padding: 15mm; }
              .total-section {
                border: 2px solid #2c5aa0 !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img class="logo" src="${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/../image/SS logo.png" alt="Square Space Solution Logo" onerror="this.style.display='none'">
            <div class="company-info">
              <h1>Square Space Solution</h1>
              <p>B-21-06, Residensi Aradia, 102, Jalan Sibu, Taman Wahyu</p>
              <p>Phone: +60 12-345 6789 | Email: info@squarespace.com</p>
            </div>
          </div>

          <div class="title">
            <h1>Premium Package Add-On Summary</h1>
            <h2>Theme: ${theme}</h2>
          </div>

          <h3 class="section-title">Client Information</h3>
          <table class="info-table">
            <tr>
              <td style="width: 25%;"><strong>Name:</strong></td>
              <td style="width: 25%;">${name}</td>
              <td style="width: 25%;"><strong>Phone:</strong></td>
              <td style="width: 25%;">${phone}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${email}</td>
              <td><strong>Unit:</strong></td>
              <td>${unit}</td>
            </tr>
            <tr>
              <td><strong>Unit Type:</strong></td>
              <td>${selectedUnitType}</td>
              <td><strong>Room Type:</strong></td>
              <td><strong>${selectedRoomName}</strong> (RM${roomPrice.toFixed(2)})</td>
            </tr>
          </table>

          <h3 class="section-title">Package Inclusions</h3>
          ${includedItems.length ? `
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 50%;">Item</th>
                  <th style="width: 30%;">Area</th>
                  <th style="width: 20%; text-align: center;">Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${includedItems.map(i => `
                  <tr>
                    <td>${i.item}</td>
                    <td>${i.area}</td>
                    <td style="text-align: center;">${i.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<p style="text-align: center; color: #666; margin: 20px 0;">No base inclusions</p>'}

          ${selectedAddons.length > 0 ? `
            <h3 class="section-title">Selected Add-Ons</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 45%;">Item</th>
                  <th style="width: 15%; text-align: center;">Qty</th>
                  <th style="width: 20%; text-align: right;">Price (RM)</th>
                  <th style="width: 20%; text-align: right;">Subtotal (RM)</th>
                </tr>
              </thead>
              <tbody>
                ${(() => {
                  const grouped = {};
                  selectedAddons.forEach(a => {
                    if (!grouped[a.group]) grouped[a.group] = [];
                    grouped[a.group].push(a);
                  });
                  
                  let rows = '';
                  Object.keys(grouped).forEach(group => {
                    rows += `<tr class="group-header"><td colspan="4">${group}</td></tr>`;
                    grouped[group].forEach(a => {
                      rows += `
                        <tr>
                          <td>${a.name}</td>
                          <td style="text-align: center;">${a.qty}</td>
                          <td style="text-align: right;">${a.price.toFixed(2)}</td>
                          <td style="text-align: right;">${a.subtotal.toFixed(2)}</td>
                        </tr>
                      `;
                    });
                  });
                  return rows;
                })()}
              </tbody>
            </table>
          ` : '<p style="text-align: center; color: #666; margin: 20px 0;">No add-ons selected</p>'}

          <div class="total-section">
            <div style="font-size: 14px; color: #666;">Total Amount</div>
            <div class="total-amount">RM${total.toFixed(2)}</div>
            <div style="font-size: 11px; color: #999;">Inclusive of all selected items and package</div>
          </div>

          <div class="signature">
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Client Signature</div>
              <div style="margin-top: 15px; font-size: 11px;">
                <div>Name: ___________________</div>
                <div>Date: ___________________</div>
              </div>
            </div>
            <div class="signature-box">
              <div class="signature-line"></div>
              <div class="signature-label">Company Representative</div>
              <div style="margin-top: 15px; font-size: 11px;">
                <div>Name: ___________________</div>
                <div>Date: ___________________</div>
              </div>
            </div>
          </div>

          <div class="footer">
            Generated on ${new Date().toLocaleDateString()} | Square Space Solution - Premium Package Add-On Summary
          </div>
        </body>
        </html>
      `;

      // Method 1: Try html2pdf first, unless Honor device
      try {
        const honor = isHonorDevice();

        if (!honor && typeof html2pdf !== 'undefined') {
          const pdfContainer = document.createElement('div');
          pdfContainer.innerHTML = pdfContent;
          document.body.appendChild(pdfContainer);

          const options = {
            margin: 10,
            filename: `Premium_AddOn_Summary_${selectedUnitType}_${new Date().toISOString().split('T')[0]}.pdf`,
            html2canvas: { 
              scale: 2, // Higher scale for better quality
              useCORS: true,
              logging: false,
              backgroundColor: "#FFFFFF",
              width: 794,
              height: pdfContainer.scrollHeight,
              scrollX: 0,
              scrollY: 0
            },
            jsPDF: { 
              unit: "mm", 
              format: "a4", 
              orientation: "portrait"
            }
          };

          await html2pdf().set(options).from(pdfContainer).save();
          pdfContainer.remove();
        } else {
          // Honor device or html2pdf not available → print fallback
          console.warn('Using print fallback (Honor device or html2pdf unavailable).');
          const printWindow = window.open('', '_blank');
          printWindow.document.write(pdfContent);
          printWindow.document.close();

          setTimeout(() => {
            printWindow.print();
            setTimeout(() => printWindow.close(), 1000);
          }, 1000);
        }
        
      } catch (pdfError) {
        console.log('html2pdf failed, trying print method:', pdfError);
        
        // Method 2: Print fallback
        const printWindow = window.open('', '_blank');
        printWindow.document.write(pdfContent);
        printWindow.document.close();
        
        setTimeout(() => {
          printWindow.print();
          setTimeout(() => printWindow.close(), 1000);
        }, 1000);
      }

      document.getElementById("generatePDF").textContent = originalText;
      document.getElementById("generatePDF").disabled = false;

    } catch (error) {
      console.error('PDF generation completely failed:', error);
      document.getElementById("generatePDF").textContent = "❌ Use Print";
      document.getElementById("generatePDF").disabled = false;
      
      // Final fallback: Simple alert with data
      const simpleContent = `
        Square Space Solution - Premium Package
        Client: ${name}
        Total: RM${total.toFixed(2)}
        Please take a screenshot of this page.
      `;
      alert(simpleContent);
      
      setTimeout(() => {
        document.getElementById("generatePDF").textContent = originalText;
      }, 3000);
    }
  });
});