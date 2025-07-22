
const order = JSON.parse(localStorage.getItem('lastOrder'));
const orderDetailsDiv = document.getElementById('orderDetails');

if (order) {
    let html = `<h2>Order Summary</h2>
        <p><strong>Name:</strong> ${order.fullname}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Payment:</strong> ${order.payment}</p>
        <h3>Items:</h3>
        <ul>`;
    order.cart.forEach(item => {
        html += `<li>${item.productName} x${item.quantity} - $${(parseFloat(item.price) * item.quantity).toFixed(2)}</li>`;
    });
    html += `</ul>`;
    orderDetailsDiv.innerHTML = html;
}


const timerDiv = document.getElementById('orderTimer');
let duration = 10;
function updateTimer() {
    const min = Math.floor(duration / 60);
    const sec = duration % 60;
    timerDiv.textContent = `Order will be ready in: ${min}:${sec.toString().padStart(2, '0')}`;
    if (duration > 0) {
        duration--;
        setTimeout(updateTimer, 1000);
    } else {
        timerDiv.textContent = "Order is ready!";
    }
}
updateTimer();


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
