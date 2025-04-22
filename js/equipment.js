 // Initialize cart if it doesn't exist
 if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart'));

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
        
        // Show/hide cart count based on items
        if (count > 0) {
            cartCountElement.style.display = 'flex';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}

// Initialize cart count
updateCartCount();

// Show notification function
function showNotification() {
    const notification = document.getElementById('cartNotification');
    if (notification) {
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }
}

// Add to Cart Functionality
function addToCart(itemName, itemPrice, itemImage) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    
    if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Item doesn't exist, add new item
        cart.push({
            name: itemName,
            price: itemPrice,
            image: itemImage,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification();
}

// View Cart Functionality
function viewCart() {
    window.location.href = 'cart.html';
}

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const dropdownParents = document.querySelectorAll('.dropdown-parent');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle body overflow to prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Mobile dropdown functionality
if (window.innerWidth <= 768) {
    dropdownParents.forEach(parent => {
        const link = parent.querySelector('a');
        const dropdown = parent.querySelector('.dropdown');
        
        if (link && dropdown) {
            link.addEventListener('click', function(e) {
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                    dropdown.classList.remove('active');
                } else {
                    // Close any other open dropdowns
                    document.querySelectorAll('.dropdown').forEach(dd => {
                        if (dd) {
                            dd.style.display = 'none';
                            dd.classList.remove('active');
                        }
                    });
                    
                    dropdown.style.display = 'block';
                    dropdown.classList.add('active');
                }
                e.preventDefault();
                e.stopPropagation();
            });
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Search Functionality
function searchEquipment() {
    const input = document.getElementById('searchInput');
    const equipmentItems = document.querySelectorAll('.equipment-item');

    if (input) {
        const searchTerm = input.value.toLowerCase();
        equipmentItems.forEach(item => {
            const equipmentName = item.querySelector('h3').textContent.toLowerCase();
            if (equipmentName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Add event listeners to all Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            const itemImage = this.getAttribute('data-image');
            
            addToCart(itemName, itemPrice, itemImage);
        });
    });
});