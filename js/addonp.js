console.log("html2pdf exists?", typeof html2pdf);

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
  document.getElementById("generatePDF").addEventListener("click", () => {
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

    // ===== Create Professional PDF Layout =====
    const pdfContainer = document.createElement("div");
    pdfContainer.style.padding = "20px";
    pdfContainer.style.background = "#fff";
    pdfContainer.style.fontFamily = "Arial, sans-serif";
    pdfContainer.style.fontSize = "12px";
    pdfContainer.style.color = "#333";
    pdfContainer.style.lineHeight = "1.4";
    pdfContainer.style.maxWidth = "100%";
    pdfContainer.style.overflow = "hidden";

    // HEADER SECTION WITH LOGO
    pdfContainer.innerHTML = `
      <div style="display:flex; align-items:center; margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #ccc;">
        <img src="../image/SS logo.png" style="width:80px; height:auto; margin-right:20px;">
        <div style="flex:1;">
          <h1 style="margin:0; font-size:18px; font-weight:bold;">Square Space Solution</h1>
          <p style="margin:3px 0 0 0; font-size:11px; color:#666;">B-21-06, Residensi Aradia, 102, Jalan Sibu, Taman Wahyu</p>
        </div>
      </div>

      <!-- DOCUMENT TITLE -->
      <div style="text-align:center; margin-bottom:25px;">
        <h1 style="margin:0 0 5px 0; font-size:16px; font-weight:bold;">Premium Package Add-On Summary</h1>
        <h2 style="margin:0; font-size:14px; font-weight:normal;">Theme: ${theme}</h2>
      </div>

      <!-- CLIENT INFORMATION -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:25px;">
        <tr>
          <td style="padding:4px 0; width:25%;"><strong>Name:</strong></td>
          <td style="padding:4px 0; width:25%;">${name}</td>
          <td style="padding:4px 0; width:25%;"><strong>Phone:</strong></td>
          <td style="padding:4px 0; width:25%;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;"><strong>Email:</strong></td>
          <td style="padding:4px 0;">${email}</td>
          <td style="padding:4px 0;"><strong>Unit:</strong></td>
          <td style="padding:4px 0;">${unit}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;"><strong>Unit Type:</strong></td>
          <td style="padding:4px 0;">${selectedUnitType}</td>
          <td style="padding:4px 0;"><strong>Room Type:</strong></td>
          <td style="padding:4px 0;">${selectedRoomName} (RM${roomPrice.toFixed(2)})</td>
        </tr>
      </table>
    `;

    // PACKAGE INCLUSIONS SECTION
    pdfContainer.innerHTML += `
      <h2 style="font-size:14px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid #ccc;">Included in Package</h2>
      ${includedItems.length ? `
        <table style="width:100%; border:1px solid #ccc; border-collapse:collapse; margin-bottom:25px;">
          <thead>
            <tr style="background:#f8f8f8;">
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ccc;">Item</th>
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ccc;">Area</th>
              <th style="text-align:center; padding:8px; border-bottom:1px solid #ccc;">Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${includedItems.map(i => `
              <tr>
                <td style="padding:6px; border-top:1px solid #eee;">${i.item}</td>
                <td style="padding:6px; border-top:1px solid #eee;">${i.area}</td>
                <td style="text-align:center; padding:6px; border-top:1px solid #eee;">${i.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<p style="margin-bottom:25px;">No base inclusions</p>'}
    `;

    // ADD-ONS SECTION
    if (selectedAddons.length > 0) {
      // Group add-ons by category
      const groupedAddons = {};
      selectedAddons.forEach(a => {
        if (!groupedAddons[a.group]) groupedAddons[a.group] = [];
        groupedAddons[a.group].push(a);
      });

      let addonRows = '';
      Object.keys(groupedAddons).forEach(group => {
        addonRows += `
          <tr style="background:#e9e9e9;">
            <td colspan="4" style="padding:8px; font-weight:bold; border-top:1px solid #ccc;">${group}</td>
          </tr>
        `;
        
        groupedAddons[group].forEach(a => {
          addonRows += `
            <tr>
              <td style="padding:6px; border-top:1px solid #eee;">${a.name}</td>
              <td style="text-align:center; padding:6px; border-top:1px solid #eee;">${a.qty}</td>
              <td style="text-align:right; padding:6px; border-top:1px solid #eee;">${a.price.toFixed(2)}</td>
              <td style="text-align:right; padding:6px; border-top:1px solid #eee;">${a.subtotal.toFixed(2)}</td>
            </tr>
          `;
        });
      });

      pdfContainer.innerHTML += `
        <h2 style="font-size:14px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid #ccc;">Selected Add-Ons</h2>
        <table style="width:100%; border:1px solid #ccc; border-collapse:collapse; margin-bottom:25px;">
          <thead>
            <tr style="background:#f0f0f0;">
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ccc;">Item</th>
              <th style="text-align:center; padding:8px; border-bottom:1px solid #ccc;">Qty</th>
              <th style="text-align:right; padding:8px; border-bottom:1px solid #ccc;">Price (RM)</th>
              <th style="text-align:right; padding:8px; border-bottom:1px solid #ccc;">Subtotal (RM)</th>
            </tr>
          </thead>
          <tbody>${addonRows}</tbody>
        </table>
      `;
    } else {
      pdfContainer.innerHTML += `
        <h2 style="font-size:14px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid #ccc;">Selected Add-Ons</h2>
        <p style="margin-bottom:25px;">No add-ons selected.</p>
      `;
    }

    // TOTAL SECTION
    pdfContainer.innerHTML += `
      <div style="text-align:right; margin-bottom:30px;">
        <h2 style="margin:0; font-size:16px; font-weight:bold;">Total: RM${total.toFixed(2)}</h2>
      </div>
    `;

    // SIGNATURE SECTION
    pdfContainer.innerHTML += `
      <div style="margin-top:80px; padding-top:20px">
        <div style="display:flex; justify-content:space-between; font-size:12px;">
          <!-- Client Signature -->
          <div style="width:45%;">
            <div>_________________________</div>
            <div style="margin-top:5px;">Client Signature</div>
            <div style="margin-top:10px;">Name: ___________________</div>
            <div>Date: ___________________</div>
          </div>
          
          <!-- Company Representative -->
          <div style="width:45%; text-align:right;">
            <div>_________________________</div>
            <div style="margin-top:5px;">Company Representative</div>
            <div style="margin-top:10px;">Name: ___________________</div>
            <div>Date: ___________________</div>
          </div>
        </div>
      </div>
    `;

    // ===== Export to PDF =====
    document.body.appendChild(pdfContainer);
    
    // Fix for content cutoff - use proper PDF settings
    html2pdf()
      .set({
        margin: 10,
        filename: `Premium_AddOn_Summary_${selectedUnitType}.pdf`,
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          width: 794, // A4 width in pixels at 96 DPI
          height: pdfContainer.scrollHeight
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait" 
        }
      })
      .from(pdfContainer)
      .save()
      .then(() => {
        console.log("PDF generated successfully!");
        pdfContainer.remove();
      })
      .catch(err => {
        console.error("PDF generation failed:", err);
        pdfContainer.remove();
      });
  });
});