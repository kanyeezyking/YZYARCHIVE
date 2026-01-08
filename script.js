const itemsContainer = document.getElementById("items");

const colorFilter = document.getElementById("colorFilter");
const typeFilter = document.getElementById("typeFilter");
const yearFilter = document.getElementById("yearFilter");
const priceSort = document.getElementById("priceSort");
const modal = document.getElementById("itemModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalYear = document.getElementById("modalYear");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");


items.forEach(item => {
  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <img src="${item.image}">
    <h4>${item.name}</h4>
    <p>$${item.price}</p>
    <p>Year ${item.year}</p>
  `;

  itemsContainer.appendChild(div);
});

function applyFilters() {
  let filtered = [...clothes];

  if (colorFilter.value) {
    filtered = filtered.filter(item => item.color === colorFilter.value);
  }

  if (typeFilter.value) {
    filtered = filtered.filter(item => item.type === typeFilter.value);
  }

  if (yearFilter.value) {
    filtered = filtered.filter(item => item.year == yearFilter.value);
  }

  if (priceSort.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (priceSort.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderItems(filtered);
}

function openModal(item) {
  modalImage.src = item.image;
  modalName.textContent = item.name;
  modalPrice.textContent = `$${item.price}`;
  modalYear.textContent = `Year ${item.year}`;
  modalDescription.textContent = item.description;

  modal.style.display = "flex";
}

function closeItemModal() {
  modal.style.display = "none";
}

closeModal.addEventListener("click", closeItemModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeItemModal();
});

renderItems(clothes);

[colorFilter, typeFilter, yearFilter, priceSort].forEach(filter =>
  filter.addEventListener("change", applyFilters)
);


