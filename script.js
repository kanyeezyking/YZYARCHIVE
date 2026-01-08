const itemsContainer = document.getElementById("items");

const colorFilter = document.getElementById("colorFilter");
const typeFilter = document.getElementById("typeFilter");
const yearFilter = document.getElementById("yearFilter");
const priceSort = document.getElementById("priceSort");

// Render items
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
      <p>Year ${item.year}</p>
    `;

    itemsContainer.appendChild(div);
  });
}

// Apply all filters
function applyFilters() {
  let filtered = [...clothes];

  // Color filter
  if (colorFilter.value) {
    filtered = filtered.filter(
      item => item.color.toLowerCase().trim() === colorFilter.value.toLowerCase().trim()
    );
  }

  // Type filter
  if (typeFilter.value) {
    filtered = filtered.filter(
      item => item.type.toLowerCase().trim() === typeFilter.value.toLowerCase().trim()
    );
  }

  // Season filter
  if (yearFilter.value) {
    filtered = filtered.filter(item => item.year == yearFilter.value);
  }

  // Price sort
  if (priceSort.value === "low") filtered.sort((a,b) => a.price - b.price);
  if (priceSort.value === "high") filtered.sort((a,b) => b.price - a.price);

  renderItems(filtered);
}

// Initial render
renderItems(clothes);

// Event listeners
[colorFilter, typeFilter, yearFilter, priceSort].forEach(filter =>
  filter.addEventListener("change", applyFilters)
);



