  // Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

// Load cart from localStorage
function loadCart() {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartDisplay(cart);
    } catch (error) {
        showError("Error loading your cart. Please try again.");
        console.error("Error loading cart:", error);
    }
}

// Update cart display
function updateCartDisplay(cart) {
    try {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        const cartCount = document.getElementById('cart-count');
        const cartCountBadge = document.getElementById('cart-count-badge');
        const floatingCartCount = document.getElementById('floating-cart-count');

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="continue-shopping" onclick="window.location.href='Coffee.html'">Continue Shopping</button>
                </div>
            `;
            cartSummary.style.display = 'none';
            cartCount.textContent = '0 items';
            if (cartCountBadge) cartCountBadge.textContent = '0';
            if (floatingCartCount) floatingCartCount.textContent = '0';
            return;
        }

        // Update cart count
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
        if (cartCountBadge) cartCountBadge.textContent = itemCount;
        if (floatingCartCount) floatingCartCount.textContent = itemCount;

        // Generate cart items HTML
        let itemsHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            itemsHTML += `
                <div class="cart-item" data-id="${item.name}">
                    <div class="item-info">
                        <img src="./website photo/item.jpg" alt="${item.name}" class="item-image">
                        <div>
                            <h3 class="item-name">${item.name}</h3>
                            <p class="item-price">$${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                    <div class="item-total">$${itemTotal.toFixed(2)}</div>
                    <div class="remove-item" onclick="removeItem('${item.name}')">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = itemsHTML;
        cartSummary.style.display = 'block';

        // Calculate totals
        const shipping = 5.00;
        const total = subtotal + shipping;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    } catch (error) {
        showError("Error updating cart display. Please refresh the page.");
        console.error("Error updating cart display:", error);
    }
}

// Update item quantity
function updateQuantity(itemName, change) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.name === itemName);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;

            // Remove item if quantity is 0 or less
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay(cart);
        }
    } catch (error) {
        showError("Error updating quantity. Please try again.");
        console.error("Error updating quantity:", error);
    }
}

// Remove item from cart
function removeItem(itemName) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== itemName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(cart);
        showSuccess("Item removed from cart.");
    } catch (error) {
        showError("Error removing item. Please try again.");
        console.error("Error removing item:", error);
    }
}

// Checkout function - clears cart
function checkout() {
    try {
        // In a real application, you would process payment here
        // For now, we'll just clear the cart and show a success message
        localStorage.removeItem('cart');
        updateCartDisplay([]);
        showSuccess("Order placed successfully! Your cart has been cleared.");
        
        // Redirect to a thank you page after 2 seconds
        setTimeout(() => {
            window.location.href = 'thank-you.html'; // Make sure this page exists
        }, 2000);
    } catch (error) {
        showError("Error during checkout. Please try again.");
        console.error("Checkout error:", error);
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.cart-container').prepend(errorDiv);
    errorDiv.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
        setTimeout(() => errorDiv.remove(), 500);
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.cart-container').prepend(successDiv);
    successDiv.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
}