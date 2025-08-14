// DOM Elements
const propertyGrid = document.getElementById('property-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const typeFilter = document.getElementById('type-filter');
const bedroomsFilter = document.getElementById('bedrooms-filter');
const priceFilter = document.getElementById('price-filter');
const sortBy = document.getElementById('sort-by');
const resetFiltersBtn = document.getElementById('reset-filters');
const clearAllFiltersBtn = document.getElementById('clear-all-filters');
const loadingIndicator = document.getElementById('loading-indicator');
const noResults = document.getElementById('no-results');
const modal = document.getElementById('property-modal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.getElementById('modal-content');

// Store scroll position when opening modal
let scrollPosition = 0;

// Sample property data (15 listings)
const properties = [
    // Property 1-3 (previously shown)
    {
        id: 1,
        title: 'Luxury Apartment in Downtown',
        price: 2500000,
        type: 'apartment',
        location: 'Downtown Dubai',
        bedrooms: 3,
        bathrooms: 3,
        size: 2200,
        image: '../images/Listings/pexels-abhishek-rana-368444-28720826.jpg',
        featured: true
    },
    {
        id: 2,
        title: 'Modern Villa on Palm Jumeirah',
        price: 8900000,
        type: 'villa',
        location: 'Palm Jumeirah',
        bedrooms: 5,
        bathrooms: 6,
        size: 5800,
        image: '../images/Listings/pexels-aboodi-13360247.jpg',
        featured: true
    },
    {
        id: 3,
        title: 'Penthouse with Burj Khalifa View',
        price: 12500000,
        type: 'penthouse',
        location: 'Business Bay',
        bedrooms: 4,
        bathrooms: 5,
        size: 4500,
        image: '../images/Listings/pexels-aboodi-14985628.jpg',
        featured: true
    },
    // Additional properties 4-15
    {
        id: 4,
        title: 'Luxury Townhouse in Arabian Ranches',
        price: 3200000,
        type: 'townhouse',
        location: 'Arabian Ranches',
        bedrooms: 4,
        bathrooms: 4,
        size: 2800,
        image: '../images/Listings/pexels-aboodi-16563219.jpg'
    },
    {
        id: 5,
        title: 'Waterfront Apartment in Dubai Marina',
        price: 2800000,
        type: 'apartment',
        location: 'Dubai Marina',
        bedrooms: 2,
        bathrooms: 2,
        size: 1800,
        image: '../images/Listings/pexels-aboodi-16563228.jpg'
    },
    {
        id: 6,
        title: 'Luxury Villa in Emirates Hills',
        price: 15000000,
        type: 'villa',
        location: 'Emirates Hills',
        bedrooms: 6,
        bathrooms: 7,
        size: 8500,
        image: '../images/Listings/pexels-aboodi-31215767.jpg',
        featured: true
    },
    {
        id: 7,
        title: 'Modern Apartment in JBR',
        price: 2100000,
        type: 'apartment',
        location: 'JBR',
        bedrooms: 2,
        bathrooms: 2,
        size: 1600,
        image: '../images/Listings/pexels-aj-ahamad-767001191-29080569.jpg'
    },
    {
        id: 8,
        title: 'Penthouse with Sea View',
        price: 9500000,
        type: 'penthouse',
        location: 'Palm Jumeirah',
        bedrooms: 3,
        bathrooms: 4,
        size: 3800,
        image: '../images/Listings/pexels-aj-ahamad-767001191-29149071.jpg',
        featured: true
    },
    {
        id: 9,
        title: 'Luxury Villa in Al Barari',
        price: 18000000,
        type: 'villa',
        location: 'Al Barari',
        bedrooms: 7,
        bathrooms: 8,
        size: 12000,
        image: '../images/Listings/pexels-aj-ahamad-767001191-29149090.jpg'
    },
    {
        id: 10,
        title: 'Modern Apartment in City Walk',
        price: 3200000,
        type: 'apartment',
        location: 'City Walk',
        bedrooms: 3,
        bathrooms: 3,
        size: 2400,
        image: '../images/Listings/pexels-beingsanshots-8342444.jpg'
    },
    {
        id: 11,
        title: 'Townhouse in The Springs',
        price: 2800000,
        type: 'townhouse',
        location: 'The Springs',
        bedrooms: 3,
        bathrooms: 3,
        size: 2600,
        image: '../images/Listings/pexels-christian-konopatzki-1923628-10902477.jpg'
    },
    {
        id: 12,
        title: 'Luxury Apartment in DIFC',
        price: 4800000,
        type: 'apartment',
        location: 'DIFC',
        bedrooms: 3,
        bathrooms: 3,
        size: 3200,
        image: '../images/Listings/pexels-heyho-6580230.jpg',
        featured: true
    },
    {
        id: 13,
        title: 'Villa in Jumeirah Golf Estates',
        price: 12500000,
        type: 'villa',
        location: 'Jumeirah Golf Estates',
        bedrooms: 5,
        bathrooms: 6,
        size: 7500,
        image: '../images/Listings/pexels-heyho-6758528.jpg'
    },
    {
        id: 14,
        title: 'Luxury Apartment in Bluewaters',
        price: 3800000,
        type: 'apartment',
        location: 'Bluewaters',
        bedrooms: 2,
        bathrooms: 2,
        size: 1900,
        image: '../images/Listings/pexels-heyho-6758776.jpg'
    },
    {
        id: 15,
        title: 'Penthouse in Downtown',
        price: 15000000,
        type: 'penthouse',
        location: 'Downtown Dubai',
        bedrooms: 4,
        bathrooms: 5,
        size: 5200,
        image: '../images/Listings/pexels-heyho-7750138.jpg',
        featured: true
    }
];

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(price);
}

// Format size
function formatSize(sqft) {
    return new Intl.NumberFormat('en-US').format(sqft) + ' sq.ft';
}

// Create property card HTML
function createPropertyCard(property) {
    return `
        <div class="property-card" data-type="${property.type}" data-bedrooms="${property.bedrooms}" data-price="${property.price}" data-size="${property.size}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                ${property.featured ? '<span class="featured-tag">Featured</span>' : ''}
                <div class="property-type">${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</div>
            </div>
            <div class="property-details">
                <h3>${property.title}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-vector-square"></i> ${formatSize(property.size)}</span>
                </div>
                <div class="property-footer">
                    <div class="price">${formatPrice(property.price)}</div>
                    <button class="view-details" data-id="${property.id}">View Details</button>
                </div>
            </div>
        </div>
    `;
}

// Create modal content HTML
function createModalContent(property) {
    return `
        <div class="modal-gallery">
            <div class="main-image">
                <img src="${property.image}" alt="${property.title}">
            </div>
        </div>
        <div class="modal-details">
            <h2>${property.title}</h2>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
            <div class="price">${formatPrice(property.price)}</div>
            
            <div class="property-highlights">
                <div class="highlight">
                    <i class="fas fa-bed"></i>
                    <span>${property.bedrooms} Bedrooms</span>
                </div>
                <div class="highlight">
                    <i class="fas fa-bath"></i>
                    <span>${property.bathrooms} Bathrooms</span>
                </div>
                <div class="highlight">
                    <i class="fas fa-vector-square"></i>
                    <span>${formatSize(property.size)}</span>
                </div>
                <div class="highlight">
                    <i class="fas fa-home"></i>
                    <span>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                </div>
            </div>
            
            <div class="property-description">
                <h3>Description</h3>
                <p>${property.description || 'No description available.'}</p>
            </div>
            
            <div class="property-amenities">
                <h3>Amenities</h3>
                <div class="amenities-grid">
                    <div class="amenity"><i class="fas fa-wifi"></i> High-Speed Internet</div>
                    <div class="amenity"><i class="fas fa-snowflake"></i> Air Conditioning</div>
                    <div class="amenity"><i class="fas fa-tv"></i> Smart TV</div>
                    <div class="amenity"><i class="fas fa-utensils"></i> Fully Equipped Kitchen</div>
                    ${property.type === 'villa' || property.type === 'penthouse' ? 
                        '<div class="amenity"><i class="fas fa-swimming-pool"></i> Private Pool</div>' : 
                        '<div class="amenity"><i class="fas fa-swimming-pool"></i> Community Pool</div>'}
                    <div class="amenity"><i class="fas fa-dumbbell"></i> Gym Access</div>
                    <div class="amenity"><i class="fas fa-parking"></i> Parking</div>
                    <div class="amenity"><i class="fas fa-shield-alt"></i> 24/7 Security</div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="cta-button schedule-tour">
                    <i class="fas fa-calendar-alt"></i> Schedule a Tour
                </button>
                <button class="cta-button secondary contact-agent">
                    <i class="fas fa-envelope"></i> Contact Agent
                </button>
            </div>
        </div>
    `;
}

// Render properties to the grid
function renderProperties(propertiesToRender) {
    if (propertiesToRender.length === 0) {
        propertyGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    propertyGrid.innerHTML = propertiesToRender.map(property => createPropertyCard(property)).join('');
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const propertyId = parseInt(e.target.getAttribute('data-id'));
            const property = properties.find(p => p.id === propertyId);
            if (property) {
                openModal(property);
            }
        });
    });
}

// Apply filters
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedBedrooms = bedroomsFilter.value;
    const selectedPriceRange = priceFilter.value;
    
    let filtered = [...properties];
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(property => 
            property.title.toLowerCase().includes(searchTerm) || 
            property.location.toLowerCase().includes(searchTerm) ||
            property.type.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply type filter
    if (selectedType) {
        filtered = filtered.filter(property => property.type === selectedType);
    }
    
    // Apply bedrooms filter
    if (selectedBedrooms) {
        filtered = filtered.filter(property => property.bedrooms >= parseInt(selectedBedrooms));
    }
    
    // Apply price range filter
    if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split('-').map(Number);
        filtered = filtered.filter(property => property.price >= min && property.price <= max);
    }
    
    // Apply sorting
    const sortValue = sortBy.value;
    filtered.sort((a, b) => {
        switch(sortValue) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'bedrooms-asc': return a.bedrooms - b.bedrooms;
            case 'bedrooms-desc': return b.bedrooms - a.bedrooms;
            case 'size-asc': return a.size - b.size;
            case 'size-desc': return b.size - a.size;
            default: return 0;
        }
    });
    
    // Simulate loading
    loadingIndicator.style.display = 'block';
    propertyGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        renderProperties(filtered);
        loadingIndicator.style.display = 'none';
        propertyGrid.style.opacity = '1';
    }, 500);
}

// Open modal
function openModal(property) {
    // Store current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update image paths to use the correct folder
    const propertyWithCorrectedImages = {
        ...property,
        image: `../images/Listings/property${property.id}.jpg`
    };
    
    modalContent.innerHTML = createModalContent(propertyWithCorrectedImages);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    
    // Add event listeners to modal buttons
    const closeButtons = document.querySelectorAll('.close-modal, .modal-overlay');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModalHandler);
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', escapeKeyHandler);
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
    document.removeEventListener('keydown', escapeKeyHandler);
}

function escapeKeyHandler(e) {
    if (e.key === 'Escape') {
        closeModalHandler();
    }
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    typeFilter.value = '';
    bedroomsFilter.value = '';
    priceFilter.value = '';
    sortBy.value = 'price-asc';
    applyFilters();
}

// Initialize the page
function init() {
    // Initial render
    renderProperties(properties);
    
    // Add event listeners
    searchBtn.addEventListener('click', applyFilters);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
    
    typeFilter.addEventListener('change', applyFilters);
    bedroomsFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    sortBy.addEventListener('change', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    clearAllFiltersBtn.addEventListener('click', resetFilters);
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', closeModalHandler);
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', init);
