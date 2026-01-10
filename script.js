/* =====================
   DOM ELEMENTS
===================== */

const itemsContainer = document.getElementById("items");

const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");
const colorFilter = document.getElementById("colorFilter");
const yearFilter = document.getElementById("yearFilter");
const priceSort = document.getElementById("priceSort");

/* MODAL */
const modal = document.getElementById("itemModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalYear = document.getElementById("modalYear");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");

/* =====================
   CATEGORY → TYPE MAP
===================== */

const typeOptionsByCategory = {
  shoes: ["sneaker", "boot", "heel", "slide"],
  tops: ["tshirt", "longsleeve", "bodysuit", "tubetop", "tanktop"],
  bottoms: ["short", "leggings", "pants", "sweatpant"],
  outerwear: ["jacket", "hoodie", "windbreaker", "parka", "bomber", "raincoat", "coat"],
  accessories: ["hat", "sunglass", "backpack", "belt", "gloves", "bag", "grills"],
  undergarments: ["sock", "underwear", "bra"],
  music: ["vinyl", "cd", "cassette", "digital"],
  bundles: ["box"]
};

/* =====================
   RENDER ITEMS
===================== */

function renderItems(items) {
  itemsContainer.innerHTML = "";

  if (items.length === 0) {
    itemsContainer.innerHTML = "<p>No items match your filters.</p>";
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${item.image}">
      <h4>
  <a href="${item.link}" target="_blank" class="item-link">
    ${item.name}
  </a>
</h4>

      <p>$${item.price}</p>
      <p>Year ${item.year}</p>
    `;

   div.addEventListener("click", e => {
  if (e.target.tagName === "A") return;
  openModal(item);
});

    itemsContainer.appendChild(div);
  });
}

/* =====================
   UPDATE TYPE DROPDOWN
===================== */

function updateTypeDropdown() {
  const category = categoryFilter.value;

  typeFilter.innerHTML = "";
  typeFilter.style.display = "none";

  if (!category) return;

  typeFilter.style.display = "block";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "All Types";
  typeFilter.appendChild(defaultOption);

  typeOptionsByCategory[category].forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeFilter.appendChild(option);
  });
}

/* =====================
   APPLY FILTERS
===================== */

function applyFilters() {
  let filtered = [...clothes];

  if (categoryFilter.value) {
    filtered = filtered.filter(
      item => item.category === categoryFilter.value
    );
  }

  if (typeFilter.value) {
    filtered = filtered.filter(
      item => item.type === typeFilter.value
    );
  }

  if (colorFilter.value) {
    filtered = filtered.filter(
      item => item.color === colorFilter.value
    );
  }

  if (yearFilter.value) {
    filtered = filtered.filter(
      item => item.year == yearFilter.value
    );
  }

  if (priceSort.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (priceSort.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderItems(filtered);
}

/* =====================
   MODAL LOGIC
===================== */

function openModal(item) {
  modalImage.src = item.image;
  modalName.textContent = item.name;
  modalPrice.textContent = `$${item.price}`;
  modalYear.textContent = `Year ${item.year}`;
  modalDescription.textContent =
    item.description || "No description available.";

  modal.style.display = "flex";
}

function closeItemModal() {
  modal.style.display = "none";
}

closeModal.addEventListener("click", closeItemModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeItemModal();
});

/* =====================
   EVENT LISTENERS
===================== */

categoryFilter.addEventListener("change", () => {
  typeFilter.value = "";
  updateTypeDropdown();
  applyFilters();
});

typeFilter.addEventListener("change", applyFilters);

[colorFilter, yearFilter, priceSort].forEach(filter =>
  filter.addEventListener("change", applyFilters)
);

/* =====================
   INITIAL LOAD
===================== */

renderItems(clothes);















