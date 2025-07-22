
    const cartItems = [];
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    document.querySelectorAll(".add-to-cart").forEach(button =>{
      button.addEventListener("click", () => {
        const item = button.closest(".menu-item");
        const name = item.dataset.name;
        const price = parseFloat(item.dataset.price);

        cartItems.push({ name, price });
        updateCart();
      });
    });

    function updateCart() {
      cartList.innerHTML = "";
      let total = 0;

      cartItems.forEach(({ name, price }) => {
        const li = document.createElement("li");
        li.textContent = `${name} - $${price.toFixed(2)}`;
        cartList.appendChild(li);
        total += price;
      });

      cartTotal.textContent = total.toFixed(2);
    }
