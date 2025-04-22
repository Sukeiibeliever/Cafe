// Add background color to header on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Map locations data
const shopLocations = {
    empire: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.98784492416408!3d40.74844097138989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
    central: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.215573291234!2d-73.97184492416408!3d40.76844097138989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f0b3f3f3f3%3A0xd134e199a405a163!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
    brooklyn: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.215573291234!2d-73.98784492416408!3d40.67844097138989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0b3f3f3f3f%3A0xd134e199a405a163!2sBrooklyn%20Bridge!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus",
    queens: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.215573291234!2d-73.82784492416408!3d40.74844097138989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25f0b3f3f3f3f%3A0xd134e199a405a163!2sQueens%20Museum!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
};

// Function to change map based on selection
function changeMap() {
    const select = document.getElementById('shop-select');
    const map = document.getElementById('shop-map');
    map.src = shopLocations[select.value];
}
function openApplicationForm(jobTitle) {
    // You can replace this with a modal form or link to an application page
    alert(`Thank you for your interest in the ${jobTitle} position! Please email your resume to careers@cafedelight.com`);
}
 // Hamburger menu toggle
 const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});