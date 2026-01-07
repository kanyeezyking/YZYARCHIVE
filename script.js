const itemsContainer = document.getElementById("items");

const colorFilter = document.getElementById("colorFilter");
const typeFilter = document.getElementById("typeFilter");
const seasonFilter = document.getElementById("seasonFilter");
const priceSort = document.getElementById("priceSort");

// Render items to the grid
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
      <img src="${item.image}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>$${item.price}</p>
      <p>Season ${item.season}</p>
    `;

    itemsContainer.appendChild(div);
  });
}

// Apply all filters at once
function applyFilters() {
  let filtered = [...clothes];

  // Color filter (case-insensitive)
  if (colorFilter.value) {
    filtered = filtered.filter(
      item => item.color.toLowerCase().trim() === colorFilter.value.toLowerCase().trim()
    );
  }

  // Type filter (case-insensitive)
  if (typeFilter.value) {
    filtered = filtered.filter(
      item => item.type.toLowerCase().trim() === typeFilter.value.toLowerCase().trim()
    );
  }

  // Season filter (numbers)
  if (seasonFilter.value) {
    filtered = filtered.filter(item => item.season == seasonFilter.value);
  }

  // Price sorting
  if (priceSort.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }
  if (priceSort.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderItems(filtered);
}

// Initial load
renderItems(clothes);

// Event listeners for all filters
[colorFilter, typeFilter, seasonFilter, priceSort].forEach(filter =>
  filter.addEventListener("change", applyFilters)
);
