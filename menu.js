// document.getElementById('searchBar').addEventListener('input', function () {
//         const searchQuery = this.value.toLowerCase();
//         const items = document.querySelectorAll('.menu-item');

//         items.forEach(item => {
//             const itemName = item.dataset.name.toLowerCase();
//             if (itemName.includes(searchQuery)) {
//                 item.style.display = '';
//             } else {
//                 item.style.display = 'none';
//             }
//         });
//     });
// const cartList = document.getElementById("cart-items");
// const cartTotal = document.getElementById("cart-total");

// const searchBar = document.getElementById('searchBar');
//     const restaurantFilter = document.getElementById('restaurantFilter');
//     const menuItems = document.querySelectorAll('.menu-item');

//     function filterMenu() {
//         const searchQuery = searchBar.value.toLowerCase();
//         const selectedRestaurant = restaurantFilter.value;

//         menuItems.forEach(item => {
//             const itemName = item.dataset.name.toLowerCase();
//             const itemRestaurant = item.dataset.restaurant;

//             const matchesSearch = itemName.includes(searchQuery);
//             const matchesRestaurant = selectedRestaurant === 'all' || itemRestaurant === selectedRestaurant;

//             item.style.display = matchesSearch && matchesRestaurant ? '' : 'none';
//         });
//     }

//     searchBar.addEventListener('input', filterMenu);
//     restaurantFilter.addEventListener('change', filterMenu);


// let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
// updateCart();


// document.querySelectorAll(".add-to-cart").forEach(button => {
//   button.addEventListener("click", () => {
//     const item = button.closest(".menu-item");
//     const name = item.dataset.name;
//     const price = parseFloat(item.dataset.price);

//     cartItems.push({ name, price });
//     updateCart();
//   });
// });

// function updateCart() {
//   cartList.innerHTML = "";
//   let total = 0;

//   cartItems.forEach(({ name, price }, index) => {
//     const li = document.createElement("li");
//     li.textContent = `${name} - $${price.toFixed(2)} `;


//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "Remove";
//     removeBtn.style.marginLeft = "10px";
//     removeBtn.addEventListener("click", () => {
//       cartItems.splice(index, 1);
//       updateCart();
//     });

//     li.appendChild(removeBtn);
//     cartList.appendChild(li);
//     total += price;
//   });

//   cartTotal.textContent = total.toFixed(2);

//   document.getElementById('submit-order').addEventListener('click', function () {
//     const cartItems = document.querySelectorAll('#cart-items li');
//     if (cartItems.length === 0) {
//         alert("Your cart is empty.");
//         return;
//     }

    
//     const items = [];
//     cartItems.forEach(item => items.push(item.textContent));

//     console.log("Order Submitted:", items);

    
//     document.getElementById('order-confirmation').style.display = 'block';

      
//     document.getElementById('cart-items').innerHTML = '';
//     document.getElementById('cart-total').textContent = '0.00';
// });


//   localStorage.setItem("cart", JSON.stringify(cartItems));
// }

const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const searchBar = document.getElementById('searchBar');
const restaurantFilter = document.getElementById('restaurantFilter');
const menuItems = document.querySelectorAll('.menu-item');
const submitOrderBtn = document.getElementById('submit-order');

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

// Filtering menu
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

// Add to cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".menu-item");
        const name = item.dataset.name;
        const price = parseFloat(item.dataset.price);

        cartItems.push({ name, price });
        updateCart();
    });
});

// Submit order handler (moved outside updateCart)
submitOrderBtn.addEventListener('click', function () {
    if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const items = cartItems.map(item => `${item.name} - $${item.price.toFixed(2)}`);
    console.log("Order Submitted:", items);

    document.getElementById('order-confirmation').style.display = 'block';
    
    cartItems = []; // clear memory
    updateCart();   // update UI and localStorage
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
