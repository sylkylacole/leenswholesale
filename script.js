
// Back to top button
let mybutton = document.querySelector(".back-to-top");

window.onscroll = function () {
  if (!mybutton) return;
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Mobile nav
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }
});

// CART LOGIC
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleQty(product) {
  const box = product.querySelector(".qty-box");
  box.classList.toggle("hidden");
}

function addToCart(event, name, price) {
  event.stopPropagation();

  const qtyInput = event.target.parentElement.querySelector(".qty-input");
  const qty = parseInt(qtyInput.value);

  if (isNaN(qty) || qty <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

    const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ name, qty, price });
  } 
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(qty + " x " + name + " added to cart");
  qtyInput.value = 1;
}

document.addEventListener("DOMContentLoaded", () => {
  const productTextarea = document.getElementById("product");
  if (!productTextarea) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let text = "";
  let total = 0;


  cart.forEach(item => {
    const lineTotal = item.qty * item.price;
    total += lineTotal;
    text += `${item.qty} x ${item.name} ($${item.price}) = $${lineTotal.toFixed(2)}\n`;
  });
  text += `\nTOTAL: $${total.toFixed(2)}`;

  productTextarea.value = text || "No products selected.";
});

function filterBrand(brand) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    if (brand === "all" || product.dataset.brand === brand) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function filterType(brand, type) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const matchesBrand = product.dataset.brand === brand;
    const matchesType = product.dataset.type === type;

    if (matchesBrand && matchesType) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function filterFlavor(brand, flavor) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const matchesBrand = product.dataset.brand === brand;
    const matchesFlavor = product.dataset.flavor === flavor;

    if (matchesBrand && matchesFlavor) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}



