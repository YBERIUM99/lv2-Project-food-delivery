const sec2 = document.getElementById('sec2');

// Set up the container ONCE
sec2.innerHTML = `<div class="products-container" id="productsContainer"></div>`;
const productsContainer = document.getElementById("productsContainer");

const products = [
    { id: 1, productName: "Bread & Potato", price: "3.99", Image: "./PICTURES/BREAT & POTATO.jpg" },
    { id: 2, productName: "Burger & Chips", price: "59.99", Image: "./PICTURES/BURGER $ CHIPS.jpg" },
    { id: 3, productName: "Beef Burger", price: "29.99", Image: "./PICTURES/BURGER ONLY.jpg" },
    { id: 4, productName: "Chicken & Cheese", price: "19.99", Image: "./PICTURES/CHICKEN & CHEESE.jpg" },
    { id: 5, productName: "Vegie mix 1", price: "39.99", Image: "./PICTURES/LETTUCE & MEAT.jpg" },
    { id: 6, productName: "Perpperoni Pizza", price: "49.99", Image: "./PICTURES/PIZZA.jpg" },
    { id: 7, productName: "Potato Soup", price: "89.99", Image: "./PICTURES/POTATO SUP.jpg" },
    { id: 8, productName: "Spagetti & Egg", price: "9.99", Image: "./PICTURES/SPAGETTI & EGG.jpg" },
    { id: 9, productName: "Spagetti & Meatballs", price: "1.99", Image: "./PICTURES/SPAGG & MEATBALLS.jpg" },
    { id: 10, productName: "Spagetti & Shrimp", price: "59.99", Image: "./PICTURES/SPAGG & SHRIMP.jpg" },
    { id: 11, productName: "Vegie mix 2", price: "1.99", Image: "./PICTURES/VEG NO MEAT.jpg" },
    { id: 12, productName: "Vegie mix 3", price: "2.99", Image: "./PICTURES/VEGIE MIX W MEAT.jpg" },
    { id: 13, productName: "Vegie Pie", price: "59.99", Image: "./PICTURES/VEGIE PIE.jpg" }
];


let eachId;
// Render product cards inside the container
products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    eachId = product.id;
    card.innerHTML = `
        <img src="${product.Image}" alt="${product.productName}">
        <h3>${product.productName}</h3>
        <p class="price">₦${product.price}</p>
        <div class="card-buttons">
            <button class="order-btn" >Order Now</button>
            <button class="cart-btn" id="${product.id}">Add to Cart</button>
        </div>
    `;
    productsContainer.appendChild(card);
});

const orders = document.querySelectorAll('.cart-btn');
orders.forEach((btn) => {
    btn.addEventListener('click', () => {
        alert("Order placed successfully!");
        const id = btn.getAttribute('id');
        alert(`Product ID: ${id}`);
    });
}
)
// After rendering product cards
document.querySelectorAll('.cart-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => addtocart(products[idx].id));
});

// function addcart(id) {
//     alert(id)
    
// }

const cartIcon = document.getElementById('cartIcon')
const cartsidebar = document.getElementById('cartsidebar')


cartIcon.addEventListener('click', () =>
{ cartsidebar.classList.toggle('active')

});

const closecart= document.getElementById('closecart')
closecart.addEventListener('click', () => 
{ cartsidebar.classList.remove('active');

});
document.getElementById('closecart').onclick = function() {
    document.getElementById('cartsidebar').style.display = 'none';
};

const cartitems1 = document.getElementById('cartitems1')
const cartnum = document.getElementById('cartnum')

let num = 0

let cart = [];

function addtocart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if already in cart
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cartItem = { ...product, quantity: 1 };
        cart.push(cartItem);
    }
    renderCart();
}

function renderCart() {
    cartitems1.innerHTML = "";
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add('cartitems1');
        cartDiv.innerHTML = `
            <div class="cartitem-content">
                <img src="${item.Image}" alt="" width="80" height="80"/>
                <div class="cartitem-details">
                    <p class="cartitem-name">${item.productName}</p>
                    <p class="cartitem-price">₦${item.price}</p>
                    <button class="removebtn">Remove</button>
                    <div style="display:flex; gap:.2cm;">
                        <button class="incbtn">+</button> 
                        <p class="quantitynum">${item.quantity}</p>
                        <button class="decbtn">-</button>
                    </div>
                </div>
            </div>
        `;
        // Remove button
        cartDiv.querySelector('.removebtn').addEventListener('click', () => {
            cart = cart.filter(ci => ci.id !== item.id);
            renderCart();
        });
        // Increase quantity
        cartDiv.querySelector('.incbtn').addEventListener('click', () => {
            item.quantity += 1;
            renderCart();
        });
        // Decrease quantity
        cartDiv.querySelector('.decbtn').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(ci => ci.id !== item.id);
            }
            renderCart();
        });
        cartitems1.appendChild(cartDiv);
    });
    // Update cart number and total
    cartnum.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateTotalPrice();
}

function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    document.getElementById('totalprice').textContent = `Total: ₦${total.toFixed(2)}`;
}

// Attach addtocart to each button
document.querySelectorAll('.cart-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => addtocart(products[idx].id));
});

document.getElementById('cartIcon').onclick = function() {
    document.getElementById('cartsidebar').style.display = 'flex';
};

// Show modal on place order
document.getElementById('placeorder').onclick = function() {
    document.getElementById('orderModal').style.display = 'flex';
};

// Close modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
    document.getElementById('orderSuccess').style.display = 'none';
};

// Optional: Close modal when clicking outside the modal content
document.getElementById('orderModal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
};

// Handle form submit
document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();

    // Collect order info
    const orderInfo = {
        fullname: document.getElementById('fullname').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        payment: document.getElementById('payment').value,
        cart: cart, // assuming 'cart' is your cart array
        time: Date.now()
    };

    // Save to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(orderInfo));

    // Show success message
    document.getElementById('orderSuccess').style.display = 'block';

    setTimeout(() => {
        document.getElementById('orderModal').style.display = 'none';
        document.getElementById('orderForm').reset();
        document.getElementById('orderSuccess').style.display = 'none';
        // Redirect to ordershead.html
        window.location.href = './ordershead.html';
    }, 1200);
};


