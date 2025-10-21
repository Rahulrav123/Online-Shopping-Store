const products = [
  { id: 1, name: "T-Shirt", price: 499, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Shoes", price: 1299, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Watch", price: 999, img: "https://via.placeholder.com/200" },
  { id: 4, name: "Headphones", price: 799, img: "https://via.placeholder.com/200" }
];

// Show products on products.html
const productList = document.getElementById("product-list");
if (productList) {
  products.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>₹${prod.price}</p>
      <button onclick="addToCart(${prod.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Cart logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

const cartItemsDiv = document.getElementById("cart-items");
if (cartItemsDiv) {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `<h3>${item.name}</h3><p>₹${item.price}</p>`;
      cartItemsDiv.appendChild(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("total").innerText = `Total: ₹${total}`;
  }
}

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
}
