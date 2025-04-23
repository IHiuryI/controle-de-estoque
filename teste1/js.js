const form = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const productQty = document.getElementById('product-qty');
const inventoryBody = document.getElementById('inventory-body');

let inventory = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = productName.value.trim();
  const qty = parseInt(productQty.value);

  if (name && qty > 0) {
    inventory.push({ name, qty });
    renderInventory();
    form.reset();
  }
});

function renderInventory() {
  inventoryBody.innerHTML = '';
  inventory.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td><button class="remove-btn" onclick="removeItem(${index})">Remover</button></td>
    `;

    inventoryBody.appendChild(row);
  });
}

function removeItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}