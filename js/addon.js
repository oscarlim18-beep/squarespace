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

  // ===== GROUPED ADD-ONS WITH IMAGES =====
  const groupedAddons = {
    "Furniture": {
      "Sofa": [
        { name: "Impala 3 Seater Sofa", price: 1512, img: "../image/natural-sofa.png", description: "Malaysia OAK with Buckram Fabric" },
        { name: "Slavia 3 SEATER Sofa", price: 1470, img: "../image/cocoa-sofa.png", description: "Malaysia OAK with Meadow Fabric"},
        { name: "Modern Rustic L Shape Sofa with Cushion", price: 6420, img: "../image/rustic-sofa.png", description: "Solid Wood Structure, High Density Foam, Fabric" },
        { name: "Timeless Elegant L Shape Sofa with Cushion", price: 6420, img: "../image/timeless-sofa.png", description: "Solid Wood Structure, High Density Foam, Fabric" },
        { name: "Scandinavian Snug L Shape Sofa with Cushion", price: 6420, img: "../image/scandinavian-sofa.png", description: "Solid Wood Structure, High Density Foam, Fabric" },
      ],

      "Coffee Table": [
        { name: "Hiace Coffee Table", price: 278, img: "../image/natural-coffee.png", description: "TABLE LEG: MALAYSIAN OAK<br>TABLE TOP: MDF+MALAYSIAN OAK VENEER" },
        { name: "Hiace Coffee Table", price: 278, img: "../image/cocoa-coffee.png", description: "TABLE LEG: MALAYSIAN OAK<br>TABLE TOP: MDF+VENEER"},
        { name: "Modern Rustic Coffee Table", price: 1200, img: "../image/timeless-coffee.png", description: "Metal Base, Sintered Stone Table Top" },
        { name: "Scandinavian Snug Coffee Table", price: 950, img: "../image/scandinavian-coffee.png", description: "Solid Wood Structure" },
      ],

      "TV Console": [
        { name: "DALLAS 1.8M TV CABINET", price: 462, img: "../image/natural-tvcabinet.png", description: "CABINET LEG: METAL<br>CABINET BODY: LAMINATED BOARD" },
        { name: "DALLAS 1.8M TV CABINET", price: 462, img: "../image/cocoa-tvcabinet.png", description: "CABINET LEG: METAL<br>CABINET BODY: LAMINATED BOARD"},
        { name: "Modern Rustic TV Console", price: 1350, img: "../image/rustic-tvconsole.png", description: "E1Standard MDF board, laminate finish.<br> Metal Leg with Microcrystalline stone" },
        { name: "Timeless Elegant TV Console", price: 1350, img: "../image/timeless-tvconsole.png", description: "E1Standard MDF board, laminate finish. " },
        { name: "Scandinavian Snug TV Console", price: 1350, img: "../image/scandinavian-tvconsole.png", description: "Solid Wood Structure" },
      ],

      "Dining Sets": [
        { name: "4 pax WALD DINING SET", price: 857, img: "../image/natural-diningset.png", description: "TABLE LEG: MALAYSIAN OAK<br>TABLE TOP: MDF+VENEER<br>CHAIR FRAME: MALAYSIAN OAK<br>CHAIR SEAT: MDF+VINYL" },
        { name: "4 pax WALD DINING SET", price: 857, img: "../image/cocoa-diningset.png", description: "TABLE LEG: MALAYSIAN OAK<br>TABLE TOP: MDF+VENEER<br>CHAIR FRAME: MALAYSIAN OAK<br>CHAIR SEAT: MDF+VINYL"},
        { name: "Modern Rustic 4 Pax Dining Table & Chairs", price: 2500, img: "../image/rustic-diningset.png", description: "Dining Table：Sintered Stone Table top with metal leg<br>Chairs：PU Leather, Metal Leg" },
        { name: "Timeless Elegant 4 Pax Dining Table & Chairs", price: 2650, img: "../image/timeless-diningset.png", description: "Dining Table：Sintered Stone Table top with metal leg<br>Chairs：PU Leather, Metal Leg" },
        { name: "Scandinavian Snug 4 Pax Dining Table & Chairs", price: 2500, img: "../image/scandinavian-diningset.png", description: "Dining Table：Solid wood<br>Chairs：Solid wood, sponge, fabric" },
        { name: "6 pax WALD DINING SET", price: 1350, img: "../image/natural-diningset.png", description: "TABLE LEG: MALAYSIAN OAK<br>TABLE TOP: MDF+VENEER<br>CHAIR FRAME: MALAYSIAN OAK<br>CHAIR SEAT: MDF+VINYL" },
        { name: "6 pax WALD DINING SET", price: 1350, img: "../image/cocoa-diningset.png", description: "TABLE LEG: MALAYSIAN OAK<br>TABLE TOP: MDF+VENEER<br>CHAIR FRAME: MALAYSIAN OAK<br>CHAIR SEAT: MDF+VINYL"},
        { name: "Modern Rustic 6 Pax Dining Table & Chairs", price: 3080, img: "../image/rustic-diningset.png", description: "Dining Table：Sintered Stone Table top with metal leg<br>Chairs：PU Leather, Metal Leg" },
        { name: "Timeless Elegant 6 Pax Dining Table & Chairs", price: 3230, img: "../image/timeless-diningset.png", description: "Dining Table：Sintered Stone Table top with metal leg<br>Chairs：PU Leather, Metal Leg" },
        { name: "Scandinavian Snug 6 Pax Dining Table & Chairs", price: 3080, img: "../image/scandinavian-diningset.png", description: "Dining Table：Solid wood<br>Chairs：Solid wood, sponge, fabric" },      
      ],

      "Beds": [
        { name: "SANCILLO QUEEN BED WITH 1900MM SIDE RAIL", price: 2566, img: "../image/natural-queenbed.png", description: "BED LEG: METAL<br>BED FRAME: CAMBRIC FABRIC" },
        { name: "HIRADO SINGLE BED WITH STORAGE WITH 1900MM SIDE RAIL", price: 1908, img: "../image/natural-ssinglebed.png", description: "Laminated Board" },
        { name: "FLUFFY QUEEN BED WITH 1900MM SIDE RAIL", price: 2482, img: "../image/cocoa-queenbed.png", description: "BED LEG: METAL<br>BED FRAME: VELOUTINE FABRIC"},
        { name: "Modern Rustic Queen Size Bed Frame & Mattress", price: 2680, img: "../image/rustic-queenbed.png", description: "Solid Wood Structure, PU Leather, Metal Leg" },
        { name: "Modern Rustic Queen Size Bed Frame & Mattress", price: 2680, img: "../image/rustic-queenbed1.png", description: "First layer cowhide, solid wood multi-layer board, sponge, bed board" },
        { name: "Timeless Elegant Queen Size Bed Frame & Mattress", price: 2680, img: "../image/timeless-queenbed.png", description: "Solid Wood Structure, PU Leather, Metal Leg" },
        { name: "Scandinavian Snug Queen Size Bed Frame & Mattress", price: 2680, img: "../image/scandinavian-queenbed.png", description: "Multilayer board, sponge, fabric" },
      ],

      "Dressing Table": [
        { name: "Timeless Elegant Dressing Table wuth Mirror and Chair", price: 1650, img: "../image/timeless-dressing.png", description: "Lacquered board, Sintered Stone Table top, Metal Leg" },
        { name: "Scandinavian Snug Dressing Table wuth Mirror and Chair", price: 1650, img: "../image/scandinavian-dressing.png", description: "Dressing table: solid wood <br>Stool: Bent board, wooden frame, sponge, fabric" },
      ],

      "Side Table": [
        { name: "Mando Side Table", price: 294, img: "../image/natural-sidetable.png", description: "TABLE LEG: LAMINATED BOARD<br>TABLE TOP: LAMINATED BOARD" },
        { name: "Mando Side Table", price: 294, img: "../image/cocoa-sidetable.png", description: "TABLE LEG: LAMINATED BOARD<br>TABLE TOP: LAMINATED BOARD"},
        { name: "Modern Rustic Side Table", price: 520, img: "../image/rustic-sidetable.png", description: "Lacquered board, Metal Leg" },
        { name: "Timeless Elegant Side Table", price: 520, img: "../image/timeless-sidetable1.png", description: "Layer Board Structure, Pu Leather finish, Metal Leg" },
        { name: "Scandinavian Snug Side Table", price: 520, img: "../image/scandinavian-sidetable2.png", description: "Solid wood Structure" },
        { name: "Scandinavian Snug Side Table", price: 520, img: "../image/scandinavian-sidetable3.png", description: "Solid wood Structure" },      
      ],

      "Wardrobe": [
        { name: "Mando 2-Door Wardrobe", price: 504, img: "../image/natural-wardrobe.png", description: "LAMINATED BOARD<br>(WHITE MB PAPER)" },
        { name: "Mando 2-Door Wardrobe", price: 479, img: "../image/cocoa-wardrobe.png", description: "LAMINATED BOARD"},
        { name: "Mando 3-Door Wardrobe", price: 773, img: "../image/natural-3wardrobe.png", description: "LAMINATED BOARD<br>(WHITE MB PAPER)" },
        { name: "Mando 3-Door Wardrobe", price: 740, img: "../image/cocoa-3wardrobe.png", description: "LAMINATED BOARD"},  
      ],

      "Shoe Rack": [
        { name: "Timeless Elegant Shoe Rack", price: 950, img: "../image/shoerack.png", description: "Eco-friendly Solid Wood Board" },
      ],

      "Window Bay Cushion & 2 Pillows": [
        { name: "Modern Rustic Window Bay Cushion & 2 Pillows", price: 650, img: "../image/rustic-windowbay.png", description: "Cushion with selected Fabric" },
        { name: "Timeless Elegant Window Bay Cushion & 2 Pillows", price: 650, img: "../image/windowbay.png", description: "Cushion with selected Fabric" },
        { name: "Scandinavian Snug Window Bay Cushion & 2 Pillows", price: 650, img: "../image/scandinavian-windowbay.png", description: "Cushion with selected Fabric" },
      ],

      "Featured Wall": [
        { name: "Modern Rustic Featured Wall", price: 1200, img: "../image/rustic-wall.png", description: "Standard" },
        { name: "Timeless Elegant Featured Wall", price: 1200, img: "../image/timeless-wall.png", description: "Standard" },
        { name: "Scandinavian Snug Featured Wall", price: 1200, img: "../image/scandinavian-wall.png", description: "Standard" },
      ],
      
      "Pendant Light": [
        { name: "Modern Rustic Pendant Light", price: 1200, img: "../image/rustic-pendantlight.png", description: "Acrylic/Aluminum material" },
        { name: "Timeless Elegant Pendant Light", price: 1200, img: "../image/timeless-pendantlight.png", description: "Acrylic+Rubber wood+Ceramics" },
        { name: "Scandinavian Snug Pendant Light", price: 1200, img: "../image/scandinavian-pendantlight.png", description: "Alloy + Glass Material" },
      ],

      
    },

    "Electrical Components": [
      { name: "TV 55 inch", price: 2000, img: "../image/tv.png" },
      { name: "Aircon 1HP Non-Inverter (Midea)", price: 1800, img: "../image/aircon.png" },
      { name: "Aircon 2HP Non-Inverter (Midea)", price: 3360, img: "../image/aircon.png" },
      { name: "Aircon 1HP Inverter (Midea)", price: 2080, img: "../image/aircon.png" },
      { name: "Aircon 2HP Inverter (Midea)", price: 3590, img: "../image/aircon.png" },
      { name: "Instant Water Heater", price: 400, img: "../image/water_heater.jpg" },
      { name: "Black Fan (Deka) 56/48 inch", price: 285, img: "../image/rustic-fan.png" },
      { name: "White Fan (Deka) 56/48 inch", price: 285, img: "../image/timeless-fan.png" },
      { name: "Lighting 12 Watt, 4000K", price: 25, img: "../image/led.png" },
      { name: "Lighting 18 Watt, 4000K", price: 30, img: "../image/led.png" },
      { name: "Lighting 24 Watt, 4000K", price: 35, img: "../image/led.png" },
      { name: "13 Amp Single Socket", price: 190, img: "../image/socket13.jpg" },
      { name: "Smart Door Lock", price: 1250, img: "../image/smart_lock.jpg" },
      { name: "Washing machine 7.5KG Frontload", price: 1450, img: "../image/washing.png" },
      { name: "8.5KG/6KG Combo Washer and Dryer", price: 2000, img: "../image/washer.png" },
      { name: "Fridge 240L Two Door", price: 80, img: "../image/fridge.png" },
      { name: "Door Bell", price: 1450, img: "../image/doorbell.png" },
      { name: "NESH Indoor Water Filter I-Hot Water Dispenser", price: 2930, img: "../image/neshihot.png", description: "Power saver, dispense-on-demand or else it sleeps. Slender yet stylish with hassle free 5 temperature settings to accommodate your hot and room temperature water needs throughout the day." },
      { name: "NESH Indoor Water Filter Ocean & Smart Tap", price: 4190, img: "../image/neshsmart.png", description: "–Filtration System Designed for the Malaysian Water<br> –⁠Built-in Anti-Bacterial UV Steriliser<br>–Instant Heating Technology<br>" },
      { name: "NESH Outdoor Water Filter Mini Queen", price: 2850, img: "../image/neshmini.png", description: "A compact space-saving pre-filter with minimalist design tailored for compact spaces, like kitchen pantries. Level up your living experience with the convenience and efficiency of Mini Queen." }
    ],
    "Accessories": [
      { name: "Kitchen Cabinet include Thick Quartz Stone", price: 6900},
      { name: "Kitchen Yard Cabinet(Including Quartz Stone, Aluminium Gas Cylinder Roller Slide & Gas Hob)", price: 4600},
      { name: "Customize Wardrobe (Melamine Finish) per ft", price: 890},
      { name: "Kitchen Sliding Door per sq ft", price: 70},  
      { name: "Curtain", price: 3300, img: "../image/curtain.png", allowedUnits: ["Type A"] },
      { name: "Curtain", price: 3500, img: "../image/curtain.png",allowedUnits: ["Type B"] },
      { name: "Curtain", price: 3700, img: "../image/curtain.png",allowedUnits: ["Type C"] },
      { name: "Curtain", price: 4890, img: "../image/curtain.png",allowedUnits: ["Type D1"] },
      { name: "Curtain", price: 3600, img: "../image/curtain.png",allowedUnits: ["Type D2"] },
      { name: "Curtain", price: 4300, img: "../image/curtain.png",allowedUnits: ["Type E"] },
      { name: "Curtain", price: 5800, img: "../image/curtain.png",allowedUnits: ["Type F"] },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 600, img: "../image/ravo.jpg",allowedUnits: ["Type A"], description: "Practical classic — balanced protection, clear vision, and everyday value." },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 800, img: "../image/ravo.jpg",allowedUnits: ["Type B"], description: "Practical classic — balanced protection, clear vision, and everyday value." },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 700, img: "../image/ravo.jpg",allowedUnits: ["Type C"], description: "Practical classic — balanced protection, clear vision, and everyday value." },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 1200, img: "../image/ravo.jpg",allowedUnits: ["Type D1"], description: "Practical classic — balanced protection, clear vision, and everyday value." },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 800, img: "../image/ravo.jpg",allowedUnits: ["Type D2"], description: "Practical classic — balanced protection, clear vision, and everyday value." },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 900, img: "../image/ravo.jpg",allowedUnits: ["Type E"], description: "Practical classic — balanced protection, clear vision, and everyday value." },
      { name: "RAVO Window Tinted Advanced Series Whole House", price: 2099, img: "../image/ravo.jpg",allowedUnits: ["Type F"], description: "Practical classic — balanced protection, clear vision, and everyday value." },
      { name: "RAVO Window Tinted IonMax Series Whole House", price: 1099, img: "../image/ravo.jpg",allowedUnits: ["Type A"], description: "Flagship with negative ion technology — maximum heat rejection, UV defense, shatter safety, plus wellness benefits." },
      { name: "RAVO Window Tinted IonMax Series Whole House", price: 1399, img: "../image/ravo.jpg",allowedUnits: ["Type B"], description: "Flagship with negative ion technology — maximum heat rejection, UV defense, shatter safety, plus wellness benefits." },
      { name: "RAVO Window Tinted IonMax Series Whole House", price: 1199, img: "../image/ravo.jpg",allowedUnits: ["Type C"], description: "Flagship with negative ion technology — maximum heat rejection, UV defense, shatter safety, plus wellness benefits." },
      { name: "RAVO Window Tinted IonMax Series Whole House", price: 2099, img: "../image/ravo.jpg",allowedUnits: ["Type D1"], description: "Flagship with negative ion technology — maximum heat rejection, UV defense, shatter safety, plus wellness benefits." },
      { name: "RAVO Window Tinted IonMax Series Whole House", price: 1499, img: "../image/ravo.jpg",allowedUnits: ["Type D2"], description: "Flagship with negative ion technology — maximum heat rejection, UV defense, shatter safety, plus wellness benefits." },
      { name: "RAVO Window Tinted IonMax Series Whole House", price: 1499, img: "../image/ravo.jpg",allowedUnits: ["Type E"], description: "Flagship with negative ion technology — maximum heat rejection, UV defense, shatter safety, plus wellness benefits." },
      { name: "RAVO Window Tinted IonMax Series Whole House", price: 4399, img: "../image/ravo.jpg",allowedUnits: ["Type F"], description: "Flagship with negative ion technology — maximum heat rejection, UV defense, shatter safety, plus wellness benefits." },
      { name: "Timeless Elegant Carpet", price: 890, img: "../image/timeless-carpet.png", description: "Polyester" },
      { name: "Modern Rustic Carpet", price: 890, img: "../image/rustic-carpet.png", description: "Polyester" },
      { name: "Scandinavian Snug Carpet", price: 890, img: "../image/scandinavian-carpet.png", description: "Polyester" },  
      { name: "Door Grill", price: 2100 },
      { name: "Shower Screen", price: 800 },
      { name: "Decorative Mirror fo Toilets", price: 120, img: "../image/mirror.png" },
      { name: "Pillow, Pilow Case, Comforter, Bedsheet & Blanket", price: 850, img: "../image/beddingset.png" },
      { name: "Overall Decorations: Include Wall artwork, Artificial Plant, cuhions & others ", price: 850, img: "../image/accessories.png" },
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
    const addonTotal = Array.from(document.querySelectorAll(".addon-item"))
      .filter(cb => cb.checked)
      .reduce((sum, cb) => {
        const qtyInput = cb.closest(".addon-card").querySelector(".qty-value");
        const qty = parseInt(qtyInput?.value) || 1;
        return sum + parseFloat(cb.dataset.price) * qty;
      }, 0);

    if (totalDisplay) totalDisplay.textContent = addonTotal.toFixed(2);
  }

  // ===== FILTER BY UNIT TYPE =====
function applyFilters() {
  const selectedUnit = document.querySelector(".unit-type:checked")?.dataset.name;
  if (!selectedUnit) return;

  document.querySelectorAll(".addon-card").forEach(card => {
    const allowed = card.getAttribute("data-allowed");
    // FIX THIS CONDITION:
    if (allowed === "all" || !allowed || allowed.includes(selectedUnit)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
      const checkbox = card.querySelector(".addon-item");
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
    if (e.target.classList.contains("addon-item")) {
      calculateTotal();
    }
  });

  // ===== INITIAL RUN =====
  applyFilters();
  calculateTotal();
}); // end DOMContentLoaded

// ================================
// PDF generation (single, robust handler)
// - Room type removed
// - Reads "Selected Theme" from likely inputs (tries multiple selectors)
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

      // Read Selected Theme input — try several selectors (id/name/class) — will work if you've added the input
      let selectedTheme = "-";
      const themeSelectors = [
        '#selectedTheme',
        'input[name="theme"]',
        'input[name="selectedTheme"]',
        'input[id="theme"]',
        'input[name="themeName"]',
        '.selected-theme input',
        'input.theme'
      ];
      for (const s of themeSelectors) {
        const el = document.querySelector(s);
        if (el && el.value && el.value.trim()) {
          selectedTheme = el.value.trim();
          break;
        }
      }

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

      const total = selectedAddons.reduce((acc, item) => acc + item.subtotal, 0);

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
        page-break-inside: avoid;
        break-inside: avoid;
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
    <h2>Quotation</h2>
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
      <td><strong>Selected Theme (if any):</strong></td>
      <td>${escapeHtml(selectedTheme)}</td>
      <td><strong>Unit Type:</strong></td>
      <td>${escapeHtml(selectedUnitType)}</td>
    </tr>
  </table>

  <h3 class="section-title">Selected Furniture Items</h3>
  ${selectedAddons.length > 0 ? createTableHtml(selectedAddons) : '<p style="text-align:center;color:#666;margin:20px 0;">No items selected</p>'}

  <!-- TOTAL SECTION - SIMPLIFIED: No wrapper, just the section -->
  <div class="total-section">
    <div class="total-amount-text">Total Amount</div>
    <div class="total-amount-value">RM ${total.toFixed(2)}</div>
    <div class="total-note">Inclusive of all selected items</div>
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

// Table creation function
function createTableHtml(selectedAddons) {
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
          filename: `Custom_Furniture_${new Date().toISOString().split('T')[0]}.pdf`,
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
            avoid: '.total-section'
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

// build grouped rows HTML (group by data.group)
function groupRowsHtml(items) {
  const grouped = {};
  items.forEach(i => {
    const g = i.group || "Add-ons";
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(i);
  });
  let rows = "";
  Object.keys(grouped).forEach(group => {
    rows += `<tr class="group-header"><td colspan="4">${escapeHtml(group)}</td></tr>`;
    grouped[group].forEach(a => {
      rows += `
        <tr>
          <td>${escapeHtml(a.name)}</td>
          <td style="text-align:center;">${a.qty}</td>
          <td style="text-align:right;">${a.price.toFixed(2)}</td>
          <td style="text-align:right;">${a.subtotal.toFixed(2)}</td>
        </tr>
      `;
    });
  });
  return rows;
}