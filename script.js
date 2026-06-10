document.getElementById("orderForm").addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const service = document.querySelector('select').value || "Не выбрана";
    const comment = document.querySelector('textarea').value;

    const message =
`Здравствуйте!

Имя: ${name}
Телефон: ${phone}
Услуга: ${service}

Комментарий:
${comment}`;

    const whatsappUrl =
`https://wa.me/77788811124?text=${encodeURIComponent(message)}`;

    alert("Спасибо! Сейчас откроется WhatsApp для отправки заявки.");

    window.open(whatsappUrl, "_blank");

});

const reviews = document.querySelectorAll(".review-card");

let reviewIndex = 0;

setInterval(() => {

    reviews[reviewIndex].classList.remove("active");

    reviewIndex++;

    if(reviewIndex >= reviews.length){
        reviewIndex = 0;
    }

    reviews[reviewIndex].classList.add("active");

}, 5000);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCart();

function addToCart(name, price){

    const existingItem =
        cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push({
            name:name,
            price:price,
            quantity:1
        });

    }

    saveCart();

    showToast(name + " добавлен в корзину!");
}

function removeFromCart(index){

    cart.splice(index, 1);

    saveCart();
}

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();
}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);
    }

    saveCart();
}

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();
}

function updateCart(){

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if(!cartCount || !cartItems || !cartTotal){
        return;
    }

    let totalCount = 0;

    cart.forEach(item => {

        totalCount += item.quantity;

    });

    cartCount.textContent = totalCount;

    if(cart.length === 0){

        cartItems.innerHTML =
            "пока что, тут ничего нету";

        cartTotal.innerHTML =
            "Итого: 0 ₸";

        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
<div class="cart-item">

    <div class="cart-item-info">

        <div class="cart-item-name">
            ${item.name}
        </div>

        <div class="cart-item-price">
            ${item.price.toLocaleString()} ₸
        </div>

    </div>

    <div class="cart-controls">

        <button onclick="decreaseQuantity(${index})">
            -
        </button>

        <strong>
            ${item.quantity}
        </strong>

        <button onclick="increaseQuantity(${index})">
            +
        </button>

        <button
            class="cart-remove"
            onclick="removeFromCart(${index})">
            ✕
        </button>

    </div>

</div>
`;
    });

    cartTotal.innerHTML =
        `Итого: ${total.toLocaleString()} ₸`;
}

const checkoutBtn =
    document.getElementById("checkoutBtn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", () => {

        if(cart.length === 0){

            alert("Корзина пуста!");

            return;
        }

    const customerName =
        document.getElementById("checkoutName").value;

    const customerPhone =
        document.getElementById("checkoutPhone").value;

    const customerComment =
        document.getElementById("checkoutComment").value;

        if(!customerName || !customerPhone){

            alert("Введите имя и номер телефона");

            return;
    }

        let orderText =
        `Здравствуйте!

        Новый заказ

        Имя: ${customerName}

        Телефон: ${customerPhone}

        `;
        

        let total = 0;

        cart.forEach((item) => {

            orderText +=
                `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} ₸
        `;

            total += item.price * item.quantity;
        });

        orderText +=
            `%0AИтого: ${total.toLocaleString()} ₸`;

            orderText += `

            Комментарий:
            ${customerComment}`;

        window.open(
            `https://wa.me/77788811124?text=${encodeURIComponent(orderText)}`,
            "_blank"
        );

        cart = [];

        saveCart();
    });

}

const clearCartBtn =
    document.getElementById("clearCartBtn");

if(clearCartBtn){

    clearCartBtn.addEventListener("click", () => {

        if(confirm("Очистить корзину?")){

            cart = [];

            saveCart();
        }

    });

}

function showToast(text){

    const toast =
        document.getElementById("toast");

    toast.textContent = "✓ " + text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);
}

const searchInput =
    document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("input", () => {

        const value =
            searchInput.value.toLowerCase();

        const products =
            document.querySelectorAll(".product-card");

        products.forEach(product => {

            const text =
                product.innerText.toLowerCase();

            if(text.includes(value)){

                product.style.display = "block";

            }else{

                product.style.display = "none";

            }

        });

    });

}

const sortSelect =
    document.getElementById("sortSelect");

if(sortSelect){

    sortSelect.addEventListener("change", () => {

        const container =
            document.querySelector("#catalog .cards");

        const products =
            Array.from(
                document.querySelectorAll(".product-card")
            );

        if(sortSelect.value === "cheap"){

            products.sort((a,b)=>
                a.dataset.price - b.dataset.price
            );

        }

        if(sortSelect.value === "expensive"){

            products.sort((a,b)=>
                b.dataset.price - a.dataset.price
            );

        }

        products.forEach(product => {

            container.appendChild(product);

        });

    });

}

const openCart =
    document.getElementById("openCart");

const closeCart =
    document.getElementById("closeCart");

const cartModal =
    document.getElementById("cartModal");

if(openCart){

    openCart.addEventListener("click", (e)=>{

        e.preventDefault();

        cartModal.classList.add("active");
    });

}

if(closeCart){

    closeCart.addEventListener("click", ()=>{

        cartModal.classList.remove("active");
    });

}
