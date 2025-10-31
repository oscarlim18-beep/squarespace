console.log("html2pdf exists?", typeof html2pdf);

// ===== Load html2pdf when needed =====
async function ensureHtml2Pdf() {
  return new Promise((resolve, reject) => {
    if (typeof html2pdf !== "undefined") {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = resolve;
    script.onerror = () => {
      console.warn("html2pdf failed to load.");
      resolve(); // fallback safe
    };
    document.head.appendChild(script);
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== Get Theme from URL =====
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get("theme") || "Modern";
  document.getElementById("themeName").textContent = theme;

  // ===== ROOM TYPES =====
  const roomTypes = [
    {
      name: "2 Room",
      price: 8900,
      includedItems: [
        { item: "3-Seater Sofa", area: "Living Room", quantity: 1 },
        { item: "Coffee Table", area: "Living Room", quantity: 1 },
        { item: "TV Console", area: "Living Room", quantity: 1 },
        { item: "4 pax Dining Set", area: "Dining Area", quantity: 1 },
        { item: "Queen Size Bed", area: "Master Bedroom", quantity: 1 },
        { item: "Side Table", area: "Master Bedroom", quantity: 1 },
        { item: "Single Size Bed", area: "Bedroom 2", quantity: 1 },
        { item: "Side Table", area: "Bedroom 2", quantity: 1 }
      ]
    },
    {
      name: "3 Room",
      price: 13700,
      includedItems: [
        { item: "3-Seater Sofa", area: "Living Room", quantity: 1 },
        { item: "Coffee Table", area: "Living Room", quantity: 1 },
        { item: "TV Console", area: "Living Room", quantity: 1 },
        { item: "4 pax Dining Set", area: "Dining Area", quantity: 1 },
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

  // ===== ROOM TYPE SELECTION =====
  const roomContainer = document.getElementById("roomContainer");
  if (roomContainer) {
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
  }

  // ===== GROUPED ADD-ONS WITH IMAGES =====
  const groupedAddons = {
    "Living Room": {
      "Sofas": [
        { name: "Modern Leather Sofa 3-Seater", price: 3200, img: "../image/leather-sofa.png", description: "Premium Italian leather, solid wood frame" },
        { name: "Fabric Sectional Sofa", price: 2800, img: "../image/sectional-sofa.png", description: "Modular design, premium fabric" },
        { name: "Compact Loveseat", price: 1500, img: "../image/loveseat.png", description: "Perfect for small spaces" },
        { name: "Recliner Sofa Set", price: 4200, img: "../image/recliner-sofa.png", description: "3-seater with dual recliners" },
      ],

      "TV Consoles": [
        { name: "Wall-Mounted TV Console", price: 1200, img: "../image/wall-tv.png", description: "Floating design with LED lighting" },
        { name: "Media Storage Cabinet", price: 950, img: "../image/media-cabinet.png", description: "Multiple compartments for organization" },
        { name: "Corner TV Stand", price: 780, img: "../image/corner-tv.png", description: "Space-saving corner design" },
        { name: "Entertainment Center", price: 1850, img: "../image/entertainment-center.png", description: "Complete media storage solution" },
      ],

      "Coffee Tables": [
        { name: "Glass Top Coffee Table", price: 650, img: "../image/glass-table.png", description: "Tempered glass with metal frame" },
        { name: "Nesting Coffee Tables", price: 890, img: "../image/nesting-tables.png", description: "Set of 3 nesting tables" },
        { name: "Storage Ottoman", price: 450, img: "../image/ottoman.png", description: "Dual function with hidden storage" },
        { name: "Wooden Coffee Table", price: 720, img: "../image/wooden-table.png", description: "Solid wood construction" },
      ],
    },

    "Dining Room": {
      "Dining Tables": [
        { name: "6-Seater Dining Table", price: 1800, img: "../image/6seater-table.png", description: "Solid wood, extends to 8-seater" },
        { name: "4-Seater Glass Table", price: 1200, img: "../image/4seater-glass.png", description: "Tempered glass top" },
        { name: "Round Dining Table", price: 950, img: "../image/round-table.png", description: "Compact round design" },
        { name: "Extendable Dining Table", price: 2200, img: "../image/extendable-table.png", description: "Extends to seat 10 people" },
      ],

      "Dining Chairs": [
        { name: "Upholstered Dining Chair", price: 280, img: "../image/upholstered-chair.png", description: "Comfortable padded seat" },
        { name: "Wooden Dining Chair", price: 180, img: "../image/wooden-chair.png", description: "Classic wooden design" },
        { name: "Modern Plastic Chair", price: 120, img: "../image/plastic-chair.png", description: "Stackable, easy clean" },
        { name: "Bench Seat", price: 450, img: "../image/bench-seat.png", description: "Seats 2-3 people" },
      ],
    },

    "Master Bedroom": {
      "Beds": [
        { name: "King Size Storage Bed", price: 2200, img: "../image/king-bed.png", description: "With hydraulic storage system" },
        { name: "Queen Upholstered Bed", price: 1800, img: "../image/queen-bed.png", description: "Tufted headboard, premium fabric" },
        { name: "Single Platform Bed", price: 850, img: "../image/single-bed.png", description: "Minimalist design, sturdy construction" },
      ],

      "Wardrobes": [
        { name: "4-Door Sliding Wardrobe", price: 1900, img: "../image/4door-wardrobe.png", description: "Mirror doors, internal lighting" },
        { name: "3-Door Built-in Wardrobe", price: 1600, img: "../image/3door-wardrobe.png", description: "Customizable interior" },
        { name: "2-Door Wardrobe", price: 1200, img: "../image/2door-wardrobe.png", description: "Compact storage solution" },
      ],

      "Dressing Tables": [
        { name: "Vanity Table with Mirror", price: 750, img: "../image/vanity-table.png", description: "LED mirror, multiple drawers" },
        { name: "Compact Dressing Table", price: 520, img: "../image/compact-dressing.png", description: "Space-saving design" },
      ]
    },

    "Bedroom 2": {
      "Beds": [
        { name: "Single Platform Bed", price: 850, img: "../image/single-bed.png", description: "Minimalist design, sturdy construction" },
        { name: "Queen Upholstered Bed", price: 1800, img: "../image/queen-bed.png", description: "Tufted headboard, premium fabric" },
        { name: "Bunk Bed with Storage", price: 1650, img: "../image/bunk-bed.png", description: "Perfect for kids' room" },
      ],

      "Wardrobes": [
        { name: "2-Door Wardrobe", price: 1200, img: "../image/2door-wardrobe.png", description: "Compact storage solution" },
        { name: "3-Door Wardrobe", price: 1600, img: "../image/3door-wardrobe.png", description: "Customizable interior" },
      ],

      "Study Desks": [
        { name: "Study Desk with Shelf", price: 450, img: "../image/study-desk.png", description: "Built-in bookshelf" },
        { name: "Compact Writing Desk", price: 320, img: "../image/writing-desk.png", description: "Space-saving design" },
      ]
    },

    "Bedroom 3": {
      "Beds": [
        { name: "Single Platform Bed", price: 850, img: "../image/single-bed.png", description: "Minimalist design, sturdy construction" },
        { name: "Queen Upholstered Bed", price: 1800, img: "../image/queen-bed.png", description: "Tufted headboard, premium fabric" },
        { name: "Bunk Bed with Storage", price: 1650, img: "../image/bunk-bed.png", description: "Perfect for kids' room" },
      ],

      "Wardrobes": [
        { name: "2-Door Wardrobe", price: 1200, img: "../image/2door-wardrobe.png", description: "Compact storage solution" },
        { name: "3-Door Wardrobe", price: 1600, img: "../image/3door-wardrobe.png", description: "Customizable interior" },
      ],

      "Study Desks": [
        { name: "Study Desk with Shelf", price: 450, img: "../image/study-desk.png", description: "Built-in bookshelf" },
        { name: "Compact Writing Desk", price: 320, img: "../image/writing-desk.png", description: "Space-saving design" },
      ]
    },

    "Electrical & Smart Home": [
      { name: "65-inch Smart TV", price: 3200, img: "../image/smart-tv.png" },
      { name: "Soundbar with Subwoofer", price: 680, img: "../image/soundbar.png" },
      { name: "Smart Thermostat", price: 280, img: "../image/smart-thermostat.png" },
      { name: "Video Doorbell", price: 220, img: "../image/video-doorbell.png" },
      { name: "Smart Lock", price: 320, img: "../image/smart-lock.png" },
      { name: "Smart Lighting Kit", price: 180, img: "../image/smart-lighting.png" },
      { name: "Security Camera System", price: 650, img: "../image/security-camera.png" },
    ]
  };

  const addonContainer = document.getElementById("addonItemsContainer");
  if (!addonContainer) {
    console.warn("No #addonItemsContainer found in DOM.");
    return;
  }
  addonContainer.innerHTML = ""; // clear existing

// ===== LOOP THROUGH GROUPS =====
Object.keys(groupedAddons).forEach(group => {
  const category = document.createElement("section");
  category.classList.add("addon-category");

  // === Main category header (collapsible)
  const header = document.createElement("div");
  header.classList.add("addon-category-header");
  header.innerHTML = `<span>${group}</span><span>▶</span>`;
  category.appendChild(header);

  // === Category content (grid container)
  const content = document.createElement("div");
  content.classList.add("addon-category-content");

  const subGroup = groupedAddons[group];

  // CASE 1: Group has sub-categories (e.g. Furniture)
  if (typeof subGroup === "object" && !Array.isArray(subGroup)) {
    Object.keys(subGroup).forEach(sub => {
      // Subcategory title (collapsible)
      const subTitle = document.createElement("h4");
      subTitle.classList.add("addon-subtitle");
      subTitle.innerHTML = `${sub} <span class="arrow">▶</span>`;
      content.appendChild(subTitle);

      // Collapsible container for this subcategory
      const subContent = document.createElement("div");
      subContent.classList.add("addon-sub-content", "collapsed");

      // USE THE SAME CARD CREATION FUNCTION FOR SUBCATEGORIES
      subGroup[sub].forEach(item => {
        const card = createAddonCard(group, item);
        subContent.appendChild(card);
      });

      content.appendChild(subContent);
    });
  } else {
    // CASE 2: Flat list (e.g. Electrical Components)
    // USE THE SAME CARD CREATION FUNCTION FOR MAIN CATEGORIES
    subGroup.forEach(item => {
      const card = createAddonCard(group, item);
      content.appendChild(card);
    });
  }

  category.appendChild(content);
  addonContainer.appendChild(category);
});


// ===== Collapsible SUBCATEGORIES =====
document.querySelectorAll(".addon-subtitle").forEach(subTitle => {
  subTitle.style.cursor = "pointer";

  subTitle.addEventListener("click", () => {
    const subContent = subTitle.nextElementSibling;
    if (!subContent || !subContent.classList.contains("addon-sub-content")) return;

    const arrow = subTitle.querySelector(".arrow");
    subContent.classList.toggle("collapsed");
    
    if (arrow) {
      arrow.textContent = subContent.classList.contains("collapsed") ? "▶" : "▼";
    }
  });
});

// ===== Helper: Create Add-on Card =====
function createAddonCard(group, item) {
  const imgSrc = item.img || "../image/default-addon.png";
  const card = document.createElement("div");
  card.classList.add("addon-card");
  card.setAttribute("data-group", group);
  card.setAttribute("data-name", item.name);
  card.setAttribute("data-allowed", item.allowedUnits ? item.allowedUnits.join(",") : "all");
  card.innerHTML = `
    <img src="${imgSrc}" alt="${item.name}">
    <div class="addon-card-name">${item.name}</div>
    ${item.description ? `<div class="addon-card-desc">${item.description}</div>` : ''}
    <div class="addon-card-price">RM${item.price}</div>
    <div class="addon-card-controls">
      <div class="qty-input" data-name="${item.name}" data-price="${item.price}" data-group="${group}">
        <button type="button" class="qty-btn minus">−</button>
        <input type="number" class="qty-value" min="1" value="1">
        <button type="button" class="qty-btn plus">+</button>
      </div>
      <label class="addon-card-checkbox">
        <input type="checkbox" class="addon-item" data-name="${item.name}" data-price="${item.price}" data-group="${group}">
        Select
      </label>
    </div>
  `;
  return card;
}


// Collapse all addon categories by default
document.querySelectorAll(".addon-category-header").forEach(header => {
  const content = header.nextElementSibling;
  const icon = header.querySelector("span:last-child");

  // collapsed by default
  header.classList.remove("active");
  content.classList.add("collapsed");
  if (icon) icon.textContent = "▶";
});

// ===== Collapsible MAIN Categories =====
document.querySelectorAll(".addon-category-header").forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector("span:last-child");

    header.classList.toggle("active");
    content.classList.toggle("collapsed");
    if (icon) icon.textContent = header.classList.contains("active") ? "▼" : "▶";
  });
});

  // ===== TOTAL CALCULATION =====
  const totalDisplay = document.getElementById("totalAmount");
  function calculateTotal() {
    const selectedRoom = document.querySelector(".room-type:checked");
    const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;

    const addonTotal = Array.from(document.querySelectorAll(".addon-item"))
      .filter(cb => cb.checked)
      .reduce((sum, cb) => {
        const qtyInput = cb.closest(".addon-card").querySelector(".qty-value");
        const qty = parseInt(qtyInput?.value) || 1;
        return sum + parseFloat(cb.dataset.price) * qty;
      }, 0);

    const total = roomPrice + addonTotal;
    if (totalDisplay) totalDisplay.textContent = total.toFixed(2);
  }

  // ===== FILTER BY UNIT TYPE & ROOM TYPE =====
function applyFilters() {
  const selectedUnit = document.querySelector(".unit-type:checked")?.dataset.name;
  const selectedRoom = document.querySelector(".room-type:checked")?.dataset.name;
  
  if (!selectedUnit) return;

  // Filter cards by unit type
  document.querySelectorAll(".addon-card").forEach(card => {
    const allowed = card.getAttribute("data-allowed");
    if (allowed === "all" || !allowed || allowed.includes(selectedUnit)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
      const checkbox = card.querySelector(".addon-item");
      if (checkbox) checkbox.checked = false;
    }
  });

  // Filter entire categories based on room type
  document.querySelectorAll(".addon-category").forEach(category => {
    const categoryHeader = category.querySelector(".addon-category-header");
    const categoryContent = category.querySelector(".addon-category-content");
    const categoryName = categoryHeader.querySelector("span:first-child").textContent.trim();
    
    if (selectedRoom === "2 Room") {
      // Hide Bedroom 3 for 2 Room
      if (categoryName === "Bedroom 3") {
        category.style.display = "none";
        // Uncheck all items in hidden category
        categoryContent.querySelectorAll(".addon-item").forEach(checkbox => {
          checkbox.checked = false;
        });
      } else {
        category.style.display = "block";
      }
    } else if (selectedRoom === "3 Room") {
      // Show all categories for 3 Room
      category.style.display = "block";
    }
  });

  calculateTotal();
}

  document.querySelectorAll(".unit-type, .room-type").forEach(input => {
    input.addEventListener("change", applyFilters);
  });

  // ===== EVENT HANDLERS =====
  addonContainer.addEventListener("click", e => {
    if (e.target.classList.contains("qty-btn")) {
      const input = e.target.closest(".qty-input").querySelector(".qty-value");
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

  // ===== INITIAL RUN =====
  applyFilters();
  calculateTotal();
}); // end DOMContentLoaded

// ================================
// PDF generation (single, robust handler)
// - Now includes room type selection
// - Reads "Selected Theme" from URL parameter
// - Keeps your PDF styling and table layout
// ================================
document.addEventListener("click", (e) => {
  // ensure the listener exists even if button added later; match id "generatePDF"
  if (!e.target || e.target.id !== "generatePDF") return;

  (async () => {
    try {
      await ensureHtml2Pdf();

      // Read client fields safely
      const name = (document.querySelector('input[name="name"]')?.value) || "-";
      const email = (document.querySelector('input[name="email"]')?.value) || "-";
      const phone = (document.querySelector('input[name="phone"]')?.value) || "-";
      const unit = (document.querySelector('input[name="unit"]')?.value) || "-";
      const selectedUnitType = document.querySelector(".unit-type:checked")?.dataset.name || "-";
      const selectedRoom = document.querySelector(".room-type:checked");
      const selectedRoomName = selectedRoom ? selectedRoom.dataset.name : "-";
      const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;
      const selectedRoomObj = roomTypes.find(r => r.name === selectedRoomName);
      const includedItems = selectedRoomObj?.includedItems || [];

      // Get theme from URL parameter (same as your code)
      const urlParams = new URLSearchParams(window.location.search);
      const selectedTheme = urlParams.get("theme") || "Modern";

      // Build selected addons by reading each .addon-card
      const selectedAddons = Array.from(document.querySelectorAll(".addon-card"))
        .map(card => {
          const checkbox = card.querySelector(".addon-item");
          if (!checkbox?.checked) return null;
          const qty = parseInt(card.querySelector(".qty-value")?.value) || 1;
          const priceText = card.querySelector(".addon-card-price")?.textContent || "0";
          const price = parseFloat(priceText.toString().replace(/[^0-9.-]+/g, "")) || 0;
          const group = card.dataset.group || "Add-ons";
          return {
            name: card.querySelector(".addon-card-name")?.textContent || "",
            price,
            qty,
            subtotal: price * qty,
            group
          };
        })
        .filter(Boolean);

      const total = parseFloat(document.getElementById("totalAmount").textContent) || 0;

      // Save original button state and show busy text
      const btn = document.getElementById("generatePDF");
      const originalText = btn ? btn.textContent : null;
      if (btn) {
        btn.textContent = "⏳ Generating PDF...";
        btn.disabled = true;
      }

// Build PDF HTML with better total section placement
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
    
    /* TOTAL SECTION - FIXED: Allow page break before but not inside */
    .total-container {
      margin: 30px 0;
    }
    
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
    
    /* CRITICAL FIX: Remove page-break-before from total section */
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
      <h1>Square Space Solution</h1>
      <p>B-21-06, Residensi Aradia, 102, Jalan Sibu, Taman Wahyu</p>
      <p>Phone: +60 12-689 4121 | Email: Liefong@squarespacemy.com</p>
    </div>
  </div>

  <div class="title">
    <h1>Custom Furniture Selection</h1>
    <h2>Theme: ${selectedTheme}</h2>
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
      <td><strong>Selected Theme:</strong></td>
      <td>${escapeHtml(selectedTheme)}</td>
      <td><strong>Unit Type:</strong></td>
      <td>${escapeHtml(selectedUnitType)}</td>
    </tr>
    <tr>
      <td><strong>Room Type:</strong></td>
      <td colspan="3"><strong>${escapeHtml(selectedRoomName)}</strong> (RM${roomPrice.toFixed(2)})</td>
    </tr>
  </table>

  <h3 class="section-title">Package Inclusions</h3>
  ${includedItems.length > 0 ? createInclusionsTable(includedItems) : '<p style="text-align:center;color:#666;margin:20px 0;">No items included</p>'}

  ${selectedAddons.length > 0 ? `
    <h3 class="section-title">Selected Add-Ons</h3>
    ${createAddonsTable(selectedAddons)}
  ` : ''}

  <!-- TOTAL SECTION - SIMPLIFIED: No wrapper, just the section -->
  <div class="total-section">
    <div class="total-amount-text">Total Amount</div>
    <div class="total-amount-value">RM ${total.toFixed(2)}</div>
    <div class="total-note">Inclusive of all selected items and package</div>
  </div>

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

// Helper function for inclusions table
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

// Table creation function
function createAddonsTable(selectedAddons) {
  const grouped = {};
  selectedAddons.forEach(i => {
    const g = i.group || "Add-ons";
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(i);
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

      // create temp container and call html2pdf
      const pdfContainerEl = document.createElement("div");
      pdfContainerEl.style.boxSizing = "border-box";
      pdfContainerEl.innerHTML = pdfContent;
      document.body.appendChild(pdfContainerEl);

      // If html2pdf is available use it; otherwise fallback to print
      if (typeof html2pdf !== "undefined") {
        await html2pdf().set({
          margin: [15, 15, 15, 15],
          filename: `Custom_Furniture_${selectedTheme}_${new Date().toISOString().split('T')[0]}.pdf`,
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
          // SIMPLIFIED page break configuration
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
      if (btn) {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation failed. See console for details.");
      const btn = document.getElementById("generatePDF");
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Generate PDF";
      }
    }
  })();
});

// ===== helpers =====
function escapeHtml(str) {
  if (!str && str !== 0) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}