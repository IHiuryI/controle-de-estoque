let products = JSON.parse(localStorage.getItem('products')) || [];

const addProductForm = document.getElementById('add-product-form');
const productTableBody = document.getElementById('product-table-body');
const searchBar = document.getElementById('search-bar');

function renderProducts(filter = '') {
  productTableBody.innerHTML = '';
  products
    .filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((product, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.quantity}</td>
        <td>R$ ${product.price.toFixed(2)}</td>
        <td>${product.expiry || '-'}</td>
        <td>${product.description || '-'}</td>
        <td class="actions">
          <button onclick="editProduct(${index})">Editar</button>
          <button onclick="deleteProduct(${index})">Excluir</button>
        </td>
      `;

      productTableBody.appendChild(row);
    });
}

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById('product-name').value.trim(),
    category: document.getElementById('product-category').value.trim(),
    quantity: parseInt(document.getElementById('product-quantity').value),
    price: parseFloat(document.getElementById('product-price').value),
    expiry: document.getElementById('product-expiry').value,
    description: document.getElementById('product-description').value.trim()
  };

  products.push(newProduct);
  saveProducts();
  renderProducts();
  addProductForm.reset();
});

function editProduct(index) {
  const product = products[index];
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-quantity').value = product.quantity;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-expiry').value = product.expiry;
  document.getElementById('product-description').value = product.description;

  products.splice(index, 1);
  saveProducts();
  renderProducts();
}

function deleteProduct(index) {
  if (confirm('Deseja realmente excluir este produto?')) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
  }
}

searchBar.addEventListener('input', () => {
  renderProducts(searchBar.value);
});

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});