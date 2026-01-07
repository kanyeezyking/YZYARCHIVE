const itemsContainer = document.getElementById("items");

function renderItems(items) {
  itemsContainer.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${item.image}">
      <h4>${item.name}</h4>
      <p>$${item.price}</p>
      <p>Season ${item.season}</p>
    `;

    itemsContainer.appendChild(div);
  });
}

// initial load
renderItems(clothes);
const colorFilter = document.getElementById("colorFilter");
const typeFilter = document.getElementById("typeFilter");
const seasonFilter = document.getElementById("seasonFilter");
const priceSort = document.getElementById("priceSort");

function applyFilters() {
  let filtered = [...clothes];

  if (colorFilter.value) {
    filtered = filtered.filter(item => item.color === colorFilter.value);
  }

  if (typeFilter.value) {
    filtered = filtered.filter(item => item.type === typeFilter.value);
  }

  if (seasonFilter.value) {
    filtered = filtered.filter(item => item.season == seasonFilter.value);
  }

  if (priceSort.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (priceSort.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderItems(filtered);
}

[colorFilter, typeFilter, seasonFilter, priceSort]
  .forEach(filter => filter.addEventListener("change", applyFilters));
