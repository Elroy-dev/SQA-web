// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const propertyGrid = document.querySelector('.property-grid');

// Carousel Elements
const carouselItems = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let currentSlide = 0;
let slideInterval;
const slideDuration = 2500; // 2.5 seconds

// Sample property data (in a real app, this would come from an API)
const properties = [
    {
        id: 1,
        title: 'Luxury Apartment in Downtown',
        price: 'AED 2,500,000',
        image: 'images/Listings/pexels-abhishek-rana-368444-28720826.jpg',
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        location: 'Downtown Dubai',
        type: 'Apartment'
    },
    {
        id: 2,
        title: 'Modern Villa on Palm Jumeirah',
        price: 'AED 8,900,000',
        image: 'images/Listings/pexels-aboodi-13360247.jpg',
        bedrooms: 5,
        bathrooms: 6,
        sqft: 5800,
        location: 'Palm Jumeirah',
        type: 'Villa'
    },
    {
        id: 3,
        title: 'Penthouse with Burj Khalifa View',
        price: 'AED 12,500,000',
        image: 'images/Listings/pexels-aboodi-14985628.jpg',
        bedrooms: 4,
        bathrooms: 5,
        sqft: 4500,
        location: 'Business Bay',
        type: 'Penthouse'
    },
    {
        id: 4,
        title: 'Waterfront Apartment in Dubai Marina',
        price: 'AED 3,200,000',
        image: 'images/Listings/pexels-aboodi-16563219.jpg',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1800,
        location: 'Dubai Marina',
        type: 'Apartment'
    },
    {
        id: 5,
        title: 'Luxury Villa in Emirates Hills',
        price: 'AED 15,000,000',
        image: 'images/Listings/pexels-aboodi-16563228.jpg',
        bedrooms: 6,
        bathrooms: 7,
        sqft: 8500,
        location: 'Emirates Hills',
        type: 'Villa'
    },
    {
        id: 6,
        title: 'Modern Apartment in JBR',
        price: 'AED 2,800,000',
        image: 'images/Listings/pexels-aboodi-31215767.jpg',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1650,
        location: 'Jumeirah Beach Residence',
        type: 'Apartment'
    }
];

// Initialize Carousel
function initCarousel() {
    if (carouselItems.length === 0) return;
    
    // Show first slide
    carouselItems[0].classList.add('active');
    dots[0].classList.add('active');
    
    // Start auto slide
    startSlideShow();
    
    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', pauseSlideShow);
        carousel.addEventListener('mouseleave', startSlideShow);
    }
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        pauseSlideShow();
    }, { passive: true });
    
    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlideShow();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = Math.abs(touchEndX - touchStartX);
    
    if (swipeLength < swipeThreshold) return;
    
    if (touchEndX < touchStartX) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function showSlide(index) {
    // Hide all slides
    carouselItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    currentSlide = (index + carouselItems.length) % carouselItems.length;
    carouselItems[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlideShow() {
    pauseSlideShow();
    slideInterval = setInterval(nextSlide, slideDuration);
}

function pauseSlideShow() {
    clearInterval(slideInterval);
}

// Event Listeners for carousel controls
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideShow();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideShow();
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        startSlideShow();
    });
});

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    
    // Pause carousel when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseSlideShow();
        } else {
            startSlideShow();
        }
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Load featured properties
function loadProperties() {
    if (!propertyGrid) return;
    
    propertyGrid.innerHTML = properties.map(property => `
        <div class="property-card animate__animated animate__fadeInUp">
            <img src="${property.image}" alt="${property.title}" class="property-image">
            <div class="property-info">
                <h3>${property.title}</h3>
                <div class="property-price">${property.price}</div>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.location}
                </div>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.sqft} sq.ft</span>
                </div>
                <a href="listings/property-${property.id}.html" class="cta-button" style="display: block; text-align: center; margin-top: 15px;">View Details</a>
            </div>
        </div>
    `).join('');
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Load properties
    loadProperties();
    
    // Add animation to elements with data-aos attribute
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add animation to feature cards with delay
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Preload images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Initialize Google Maps (you'll need to add your API key)
function initMap() {
    // This function will be called by the Google Maps API
    // You'll need to add the Google Maps script to your HTML with your API key
    // Example:
    /*
    const dubai = { lat: 25.2048, lng: 55.2708 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: dubai,
        styles: [
            // Add your custom map styles here
        ]
    });
    
    new google.maps.Marker({
        position: dubai,
        map: map,
        title: 'SIAS Real Estate',
        icon: 'images/marker.png'
    });
    */
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
};

// Initialize animations when the page loads
window.addEventListener('load', () => {
    // Add loaded class to body to enable transitions
    document.body.classList.add('loaded');
    
    // Initialize any other animations or plugins
    animateOnScroll();
});
