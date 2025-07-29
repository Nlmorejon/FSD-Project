
const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const searchBar = document.getElementById('searchBar');
const restaurantFilter = document.getElementById('restaurantFilter');
const menuItems = document.querySelectorAll('.menu-item');
const submitOrderBtn = document.getElementById('submit-order');

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();


function filterMenu() {
    const searchQuery = searchBar.value.toLowerCase();
    const selectedRestaurant = restaurantFilter.value;

    menuItems.forEach(item => {
        const itemName = item.dataset.name.toLowerCase();
        const itemRestaurant = item.dataset.restaurant;
        const matchesSearch = itemName.includes(searchQuery);
        const matchesRestaurant = selectedRestaurant === 'all' || itemRestaurant === selectedRestaurant;
        item.style.display = matchesSearch && matchesRestaurant ? '' : 'none';
    });
}

searchBar.addEventListener('input', filterMenu);
restaurantFilter.addEventListener('change', filterMenu);


document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".menu-item");
        const name = item.dataset.name;
        const price = parseFloat(item.dataset.price);

        cartItems.push({ name, price });
        updateCart();
    });
});


submitOrderBtn.addEventListener('click', function () {
    if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const items = cartItems.map(item => `${item.name} - $${item.price.toFixed(2)}`);
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const newOrder = {
        items: cartItems.map(item => item.name),
        total: total,
        date: new Date().toLocaleString()
    };

    
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push(newOrder);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    document.getElementById('order-confirmation').style.display = 'block';

    cartItems = [];
    updateCart();
});

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cartItems.forEach(({ name, price }, index) => {
        const li = document.createElement("li");
        li.textContent = `${name} - $${price.toFixed(2)}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.style.marginLeft = "10px";
        removeBtn.addEventListener("click", () => {
            cartItems.splice(index, 1);
            updateCart();
        });

        li.appendChild(removeBtn);
        cartList.appendChild(li);
        total += price;
    });

    cartTotal.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cartItems));
}
