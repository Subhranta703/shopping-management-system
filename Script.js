


// Function to generate a unique customer ID
function generateCustomerId() {
    return 'customer_' + Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
}

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: parseFloat(itemPrice) }; // Parse itemPrice as a float

    // Check if a customer ID is stored in local storage
    let customerId = localStorage.getItem('customerId');
    if (!customerId) {
        customerId = generateCustomerId();
        localStorage.setItem('customerId', customerId);
    }

    // Check if cartItems for this customer is stored in local storage
    let cartItems = JSON.parse(localStorage.getItem(`cartItems_${customerId}`)) || [];

    // Add the new item to the cart
    cartItems.push(item);

    // Store the updated cartItems back to local storage
    localStorage.setItem(`cartItems_${customerId}`, JSON.stringify(cartItems));

    // Show a pop-up message
    showPopup('Item added to cart');

    // Trigger the updateCart function
    updateCart();
}

// Function to display a pop-up message
function showPopup(message) {
    alert(message);
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-section');
    cartItemsContainer.innerHTML = ''; // Clear the container

    // Retrieve customerId from local storage
    let customerId = localStorage.getItem('customerId');
    if (!customerId) {
        customerId = generateCustomerId();
        localStorage.setItem('customerId', customerId);
    }

    // Retrieve cartItems for this customer from local storage
    const storedCartItems = JSON.parse(localStorage.getItem(`cartItems_${customerId}`)) || [];

    let total = 0; // Variable to store the total price

    storedCartItems.forEach(item => {
        total += item.price; // Add the price of each item to the total

        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <p>${item.name} - ${item.price}₹</p>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Display the total price
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<p>Total Price: ${total.toFixed(2)}₹</p>`; // Use toFixed to limit decimals to two places
    cartItemsContainer.appendChild(totalElement);

    // Add "Thank you for visiting" button
    const thankYouButton = document.createElement('button');
    thankYouButton.textContent = 'Thank you for visiting';
    thankYouButton.addEventListener('click', function() {
        // Clear data from local storage
        localStorage.removeItem(`cartItems_${customerId}`);
        localStorage.removeItem('customerId');
        // Reset cart display
        updateCart();
    });
    cartItemsContainer.appendChild(thankYouButton);
}

// Event delegation to handle clicks on "Add to Cart" buttons
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productContainer = event.target.closest('.vegetable-item');
        const itemName = productContainer.querySelector('.product-name').innerText;
        const itemPrice = productContainer.querySelector('.price').innerText.replace('Price: ', '').replace('₹ / KG', ''); // Extract item price
        addToCart(itemName, itemPrice);
    }
});

// Initial update when the page loads
updateCart();
