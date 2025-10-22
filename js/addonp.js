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
      { name: "Kitchen Cabinet include Thick Quartz Stone", price: 4600, allowedUnits: ["Type A"]},
      { name: "Kitchen Yard Cabinet(Including Quartz Stone, Aluminium Gas Cylinder Roller Slide & Gas Hob)", price: 4600, allowedUnits: ["Type A"] },
      { name: "Customize Wardrobe (Melamine Finish) per ft", price: 890, allowedUnits: ["Type A"] },
      { name: "Kitchen Sliding Door per sq ft", price: 70, allowedUnits: ["Type A"] },
      { name: "Upgrade Fixed Shoe Cabinet per ft ", price: 450, allowedUnits: ["Type A"] },      
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
      { name: "Tinted Film", price: 1099, allowedUnits: ["Type A"] },
      { name: "Tinted Film", price: 1399, allowedUnits: ["Type B"] },
      { name: "Tinted Film", price: 1199, allowedUnits: ["Type C"] },
      { name: "Tinted Film", price: 2099, allowedUnits: ["Type D1"] },
      { name: "Tinted Film", price: 1499, allowedUnits: ["Type D2"] },
      { name: "Tinted Film", price: 1499, allowedUnits: ["Type E"] },
      { name: "Tinted Film", price: 4399, allowedUnits: ["Type F"] },
      { name: "Yard Grill", price: 1300 },
      { name: "Door Grill", price: 2100 },
      { name: "Shower Screen", price: 800 }
    ],
    "Partition": [
      { name: "Partition per sq ft", price: 600, allowedUnits: ["Type A"] },
      { name: "Partition per sq ft", price: 800, allowedUnits: ["Type B"] },
      { name: "Partition per sq ft", price: 700, allowedUnits: ["Type C"] },
      { name: "Partition per sq ft", price: 1200, allowedUnits: ["Type D1"] },
      { name: "Partition per sq ft", price: 800, allowedUnits: ["Type D2"] },
      { name: "Partition per sq ft", price: 900, allowedUnits: ["Type E"] },
      { name: "Partition per sq ft", price: 2099, allowedUnits: ["Type F"] }
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
      { name: "Living Area", price: 600, allowedUnits: ["Type D1"] },
      { name: "Dining Area", price: 800, allowedUnits: ["Type D1"] },
      { name: "Master Bedroom", price: 700, allowedUnits: ["Type D1"] },
      { name: "Bedroom 2", price: 1200, allowedUnits: ["Type D1"] },
      { name: "Bedroom 3", price: 800, allowedUnits: ["Type D1"] },
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

  // ===== RENDER ADD-ONS =====
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

  // ===== FILTER ADD-ONS =====
  function applyFilters() {
    const selectedUnit = document.querySelector(".unit-type:checked")?.dataset.name;
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

// ===== INITIALIZE =====
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

// ===== CREATE PDF LAYOUT =====
const pdfContainer = document.createElement("div");
pdfContainer.style.padding = "25px";
pdfContainer.style.background = "#fff";
pdfContainer.style.fontFamily = "Poppins, Arial, sans-serif";
pdfContainer.style.fontSize = "12px";
pdfContainer.style.color = "#333";

pdfContainer.innerHTML = `
  <div style="display:flex; align-items:center; margin-bottom:20px;">
    <img src="../image/SS logo.png" style="width:90px; margin-right:15px;">
    <div>
      <h2 style="margin:0; font-size:18px;">Square Space Solution</h2>
      <p style="margin:2px 0; font-size:11px;">B-21-06, Residensi Aradia, 102, Jalan Sibu, Taman Wahyu</p>
    </div>
  </div>
  <hr style="margin-bottom:15px;">
  <h1 style="text-align:center; font-size:18px; margin-bottom:10px;">Basic Package Add-On Summary</h1>
  <h3 style="text-align:center; font-weight:normal; margin-bottom:20px;">Theme: ${theme}</h3>

  <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
    <tr><td><strong>Name:</strong></td><td>${name}</td><td><strong>Phone:</strong></td><td>${phone}</td></tr>
    <tr><td><strong>Email:</strong></td><td>${email}</td><td><strong>Unit:</strong></td><td>${unit}</td></tr>
    <tr><td><strong>Unit Type:</strong></td><td>${selectedUnitType}</td><td><strong>Room Type:</strong></td><td>${selectedRoomName} (RM${roomPrice.toFixed(2)})</td></tr>
  </table>
`;

// ===== INCLUDED ITEMS =====
pdfContainer.innerHTML += `
  <h2 style="font-size:14px; margin-bottom:5px;">Included in Package</h2>
  ${includedItems.length
    ? `<table style="width:100%; border:1px solid #ccc; border-collapse:collapse; margin-bottom:20px;">
        <thead>
          <tr style="background:#f8f8f8;">
            <th style="text-align:left; padding:5px;">Item</th>
            <th style="text-align:left; padding:5px;">Area</th>
            <th style="text-align:center; padding:5px;">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${includedItems.map(i => `
            <tr>
              <td style="padding:5px; border-top:1px solid #ccc;">${i.item}</td>
              <td style="padding:5px; border-top:1px solid #ccc;">${i.area}</td>
              <td style="text-align:center; padding:5px; border-top:1px solid #ccc;">${i.quantity}</td>
            </tr>`).join("")}
        </tbody>
      </table>` : "<p>No base inclusions</p>"
  }
`;

// ===== SELECTED ADD-ONS =====
if (selectedAddons.length > 0) {
  const grouped = {};
  selectedAddons.forEach(a => {
    if (!grouped[a.group]) grouped[a.group] = [];
    grouped[a.group].push(a);
  });

  let addonRows = "";
  Object.keys(grouped).forEach(group => {
    addonRows += `
      <tr style="background:#e9e9e9; font-weight:700; border-top:2px solid #999;">
        <td colspan="4" style="padding:8px 6px; text-transform:uppercase;">${group}</td>
      </tr>
    `;
    grouped[group].forEach(a => {
      addonRows += `
        <tr>
          <td style="padding:6px; border-top:1px solid #ccc;">${a.name}</td>
          <td style="text-align:center; border-top:1px solid #ccc;">${a.qty}</td>
          <td style="text-align:right; border-top:1px solid #ccc;">${a.price.toFixed(2)}</td>
          <td style="text-align:right; border-top:1px solid #ccc;">${a.subtotal.toFixed(2)}</td>
        </tr>
      `;
    });
  });

  pdfContainer.innerHTML += `
    <h2 style="font-size:15px; margin-bottom:8px;">Selected Add-Ons</h2>
    <table style="width:100%; border:1px solid #ccc; border-collapse:collapse; margin-bottom:20px;">
      <thead>
        <tr style="background:#f0f0f0; font-weight:600;">
          <th style="text-align:left; padding:6px;">Item</th>
          <th style="text-align:center; padding:6px;">Qty</th>
          <th style="text-align:right; padding:6px;">Price (RM)</th>
          <th style="text-align:right; padding:6px;">Subtotal (RM)</th>
        </tr>
      </thead>
      <tbody>${addonRows}</tbody>
    </table>
  `;
} else {
  pdfContainer.innerHTML += `<p>No add-ons selected.</p>`;
}

// ===== TOTAL =====
pdfContainer.innerHTML += `<h2 style="text-align:right; font-size:15px;">Total: RM${total.toFixed(2)}</h2>`;

// ===== SIGNATURE =====
pdfContainer.innerHTML += `
  <div style="margin-top:40px; display:flex; justify-content:space-between;">
    <div style="width:45%; text-align:left;">
      <div>_________________________</div>
      <div style="font-size:12px;">Client Signature</div>
      <div>Name: ___________________</div>
      <div>Date: ___________________</div>
    </div>
    <div style="width:45%; text-align:right;">
      <div>_________________________</div>
      <div style="font-size:12px;">Company Representative</div>
      <div>Name: ___________________</div>
      <div>Date: ___________________</div>
    </div>
  </div>
`;

// ===== EXPORT PDF =====
document.body.appendChild(pdfContainer);
html2pdf()
  .set({ margin: 10, filename: "Premium_AddOn_Summary.pdf", html2canvas: { scale: 2 }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } })
  .from(pdfContainer)
  .save()
  .then(() => pdfContainer.remove());
});
});