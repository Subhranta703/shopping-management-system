
function generateCustomerId() {
    return 'customer_' + Math.random().toString(36).substr(2, 9);
}


function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: parseFloat(itemPrice) };


    let customerId = localStorage.getItem('customerId');
    if (!customerId) {
        customerId = generateCustomerId();
        localStorage.setItem('customerId', customerId);
    }


    let cartItems = JSON.parse(localStorage.getItem(`cartItems_${customerId}`)) || [];


    cartItems.push(item);


    localStorage.setItem(`cartItems_${customerId}`, JSON.stringify(cartItems));


    showPopup('Item added to cart');


    updateCart();
}


function showPopup(message) {
    alert(message);
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-section');
    cartItemsContainer.innerHTML = '';


    let customerId = localStorage.getItem('customerId');
    if (!customerId) {
        customerId = generateCustomerId();
        localStorage.setItem('customerId', customerId);
    }


    const storedCartItems = JSON.parse(localStorage.getItem(`cartItems_${customerId}`)) || [];

    let total = 0;

    storedCartItems.forEach(item => {
        total += item.price;

        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <p>${item.name} - ${item.price}₹</p>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });


    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<p>Total Price: ${total.toFixed(2)}₹</p>`;
    cartItemsContainer.appendChild(totalElement);


    const thankYouButton = document.createElement('button');
    thankYouButton.textContent = 'Thank you for visiting';
    thankYouButton.addEventListener('click', function () {

        localStorage.removeItem(`cartItems_${customerId}`);
        localStorage.removeItem('customerId');

        updateCart();
    });
    cartItemsContainer.appendChild(thankYouButton);
}


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productContainer = event.target.closest('.vegetable-item');
        const itemName = productContainer.querySelector('.product-name').innerText;
        const itemPrice = productContainer.querySelector('.price').innerText.replace('Price: ', '').replace('₹ / KG', ''); // Extract item price
        addToCart(itemName, itemPrice);
    }
});


updateCart();
