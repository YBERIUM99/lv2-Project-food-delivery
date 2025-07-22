import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, getDoc, doc  } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
console.log(auth);
// async function loadUserInfo(userId) {
//     const userRef = doc(db , "users", userId);
//     const userSnap = await getDoc(userRef);
    
// }




onAuthStateChanged(auth, (user) => {
    if (user) {
        
        greeting.innerHTML = `User: ${user.email}`;
    } else {
        
        window.location.href = "./signIN.html";
    }
});


const greeting = document.getElementById("greeting");
const logoutBtn = document.getElementById("logout");    
const sec2 = document.getElementById('sec2');


sec2.innerHTML = `<div class="products-container" id="productsContainer"></div>`;
const productsContainer = document.getElementById("productsContainer");

const products = [
    { id: 1, productName: "Bread & Potato", price: "3.99", Image: "./PICTURES/BREAT & POTATO.jpg" ,
        Time : "10min",
        Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
    },
    { id: 2, productName: "Burger & Chips", price: "59.99", Image: "./PICTURES/BURGER $ CHIPS.jpg", Time : "20min", 
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
    },
    { id: 3, productName: "Beef Burger", price: "29.99", Image: "./PICTURES/BURGER ONLY.jpg" ,Time : "10min",
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
     },
    { id: 4, productName: "Chicken & Cheese", price: "19.99", Image: "./PICTURES/CHICKEN & CHEESE.jpg", Time : "7min",
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
     },
    { id: 5, productName: "Vegie mix 1", price: "39.99", Image: "./PICTURES/LETTUCE & MEAT.jpg" , Time : "5min",
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
     },
    { id: 6, productName: "Perpperoni Pizza", price: "49.99", Image: "./PICTURES/PIZZA.jpg" , Time : "20min", 
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
    },
    { id: 7, productName: "Potato Soup", price: "89.99", Image: "./PICTURES/POTATO SUP.jpg" , Time : "40min",
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
     },
    { id: 8, productName: "Spagetti & Egg", price: "9.99", Image: "./PICTURES/SPAGETTI & EGG.jpg"  , Time : "15min", 
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
    },
    { id: 9, productName: "Spagetti & Meatballs", price: "1.99", Image: "./PICTURES/SPAGG & MEATBALLS.jpg" , Time : "17min",   Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "},
    { id: 10, productName: "Spagetti & Shrimp", price: "59.99", Image: "./PICTURES/SPAGG & SHRIMP.jpg" , Time : "14min",  Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> " },

    { id: 11, productName: "Vegie mix 2", price: "1.99", Image: "./PICTURES/VEG NO MEAT.jpg" , Time : "5min",
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
     },
    { id: 12, productName: "Vegie mix 3", price: "2.99", Image: "./PICTURES/VEGIE MIX W MEAT.jpg" , Time : "10min", 
          Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> "
    },
    { id: 13, productName: "Vegie Pie", price: "59.99", Image: "./PICTURES/VEGIE PIE.jpg" , Time : "35min",  Description : "<ul><li>1/4 bread</li>  <li>1/2 potatoes</li> <li>Green pepper</li><li> Veggies</li></ul> " }
];


let eachId;

const searchinput = document.getElementById('searchproduct')

searchinput.addEventListener('input', () => {
    const searchTerm = searchinput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchTerm));
    
    renderProducts(filteredProducts);
});

window.onload = function() {
  renderProducts(products);
};

function renderProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    eachId = product.id;
    card.innerHTML = `
      <img src="${product.Image}" alt="${product.productName}">

      <h5><i class="fa-solid fa-clock" style="color: #121212;padding-right: 5px;"></i>${product.Time}</h5>
      <h3>${product.productName}</h3>
        <p>${product.Description}</p>
      <p class="price">₦${product.price}</p>
      <div class="card-buttons">
        
        <button class="cart-btn" id="${product.id}">Add to Cart</button>
      </div>
    `;
    productsContainer.appendChild(card);

     document.getElementById(product.id).addEventListener('click', () => {
      addtocart(product.id);
    });
  });
}

const orders = document.querySelectorAll('.cart-btn');
orders.forEach((btn) => {
    btn.addEventListener('click', () => {
       
        const id = btn.getAttribute('id');
        
    });
}
)

document.querySelectorAll('.cart-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => addtocart(products[idx].id));
});



const cartIcon = document.getElementById('cartIcon')
const cartsidebar = document.getElementById('cartsidebar')
cartsidebar.style.display = 'none';


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
        
        cartDiv.querySelector('.removebtn').addEventListener('click', () => {
            cart = cart.filter(ci => ci.id !== item.id);
            renderCart();
        });
      
        cartDiv.querySelector('.incbtn').addEventListener('click', () => {
            item.quantity += 1;
            renderCart();
        });
        
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
  
    cartnum.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateTotalPrice();
}

function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    document.getElementById('totalprice').textContent = `Total: ₦${total.toFixed(2)}`;
}


document.querySelectorAll('.cart-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => addtocart(products[idx].id));
});

document.getElementById('cartIcon').onclick = function() {
    document.getElementById('cartsidebar').style.display = 'flex';
};


document.getElementById('placeorder').onclick = function() {
    document.getElementById('orderModal').style.display = 'flex';
};


document.getElementById('closeModal').onclick = function() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
    document.getElementById('orderSuccess').style.display = 'none';
};


document.getElementById('orderModal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
};


document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();

    
    const orderInfo = {
        fullname: document.getElementById('fullname').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        payment: document.getElementById('payment').value,
        cart: cart, 
        time: Date.now()
    };

    
    localStorage.setItem('lastOrder', JSON.stringify(orderInfo));

    
    document.getElementById('orderSuccess').style.display = 'block';

    setTimeout(() => {
        document.getElementById('orderModal').style.display = 'none';
        document.getElementById('orderForm').reset();
        document.getElementById('orderSuccess').style.display = 'none';
        
        window.location.href = './ordershead.html';
    }, 1200);
};

const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
        window.location.href = "./signIN.html";
    } catch (error) {
        console.error(error);
    }
}

logoutBtn.addEventListener('click', handleLogout);


const infobtn = document.getElementById("infobtn");
const infocontent = document.getElementById("infocontent");
const infoclosebtn = document.getElementById("infoclosebtn");


infocontent.classList.remove('open');


infobtn.addEventListener('click', () => {
    infocontent.classList.add('open');
});


infoclosebtn.addEventListener('click', () => {
    infocontent.classList.remove('open');
});




