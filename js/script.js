   // Initialize Swiper
   var swiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
});

// Add background color to header on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hamburger menu toggle with proper animation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

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

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});
// Weather Plugin and Food Recommendations
const weatherWidget = document.getElementById('weatherWidget');
const weatherIcon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherDescription = document.getElementById('weatherDescription');
const weatherLocation = document.getElementById('weatherLocation');
const weatherRecommendation = document.getElementById('weatherRecommendation');
const refreshWeather = document.getElementById('refreshWeather');

// Food recommendations based on weather
const weatherRecommendations = {
    'hot': {
        icon: 'fa-sun',
        items: ['Iced Coffee', 'Cold Brew', 'Fruit Smoothies', 'Iced Tea', 'Affogato']
    },
    'warm': {
        icon: 'fa-cloud-sun',
        items: ['Latte', 'Cappuccino', 'Iced Coffee', 'Lemonade', 'Frappé']
    },
    'mild': {
        icon: 'fa-cloud',
        items: ['Flat White', 'Mocha', 'Hot Chocolate', 'Chai Latte', 'Matcha Latte']
    },
    'cool': {
        icon: 'fa-cloud-rain',
        items: ['Hot Coffee', 'Tea', 'Hot Chocolate', 'Spiced Chai', 'Apple Cider']
    },
    'cold': {
        icon: 'fa-snowflake',
        items: ['Espresso', 'Hot Chocolate', 'Spiced Latte', 'Mulled Wine', 'Steamer']
    },
    'default': {
        icon: 'fa-question',
        items: ['Our Signature Blend', 'Specialty Coffee', 'Fresh Pastries', 'Homemade Cake']
    }
};

// Get weather data
function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            error => {
                console.error("Geolocation error:", error);
                useDefaultWeather();
            }
        );
    } else {
        useDefaultWeather();
    }
}

function fetchWeather(lat, lon) {
    // Using OpenWeatherMap API - you'll need to sign up for a free API key
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherUI(data);
            updateRecommendation(data.main.temp);
        })
        .catch(error => {
            console.error("Weather API error:", error);
            useDefaultWeather();
        });
}

function updateWeatherUI(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const city = data.name;
    const weatherId = data.weather[0].id;

    weatherTemp.textContent = `${temp}°C`;
    weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    weatherLocation.textContent = city;

    // Set weather icon based on weather condition
    if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        weatherIcon.innerHTML = '<i class="fas fa-bolt"></i>';
    } else if (weatherId >= 300 && weatherId < 500) {
        // Drizzle
        weatherIcon.innerHTML = '<i class="fas fa-cloud-rain"></i>';
    } else if (weatherId >= 500 && weatherId < 600) {
        // Rain
        weatherIcon.innerHTML = '<i class="fas fa-umbrella"></i>';
    } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        weatherIcon.innerHTML = '<i class="far fa-snowflake"></i>';
    } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere (fog, mist, etc.)
        weatherIcon.innerHTML = '<i class="fas fa-smog"></i>';
    } else if (weatherId === 800) {
        // Clear
        weatherIcon.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (weatherId > 800) {
        // Clouds
        weatherIcon.innerHTML = '<i class="fas fa-cloud"></i>';
    }
}

function updateRecommendation(temp) {
    let recommendationKey = 'default';
    
    if (temp > 30) {
        recommendationKey = 'hot';
    } else if (temp > 20) {
        recommendationKey = 'warm';
    } else if (temp > 10) {
        recommendationKey = 'mild';
    } else if (temp > 0) {
        recommendationKey = 'cool';
    } else {
        recommendationKey = 'cold';
    }

    const recommendation = weatherRecommendations[recommendationKey];
    const randomItem = recommendation.items[Math.floor(Math.random() * recommendation.items.length)];
    
    weatherRecommendation.textContent = `Try our ${randomItem}! Perfect for this weather.`;
}

function useDefaultWeather() {
    weatherTemp.textContent = '--°C';
    weatherDescription.textContent = 'Weather data unavailable';
    weatherLocation.textContent = 'Enable location services';
    weatherRecommendation.textContent = weatherRecommendations['default'].items[Math.floor(Math.random() * weatherRecommendations['default'].items.length)];
}

// Refresh weather
refreshWeather.addEventListener('click', getWeather);

// Initialize weather on page load
document.addEventListener('DOMContentLoaded', getWeather);