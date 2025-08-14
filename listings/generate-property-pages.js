const fs = require('fs');
const path = require('path');

// Property data
const properties = [
    {
        id: 1,
        title: 'Luxury Apartment in Downtown',
        price: 'AED 4,200,000',
        type: 'Apartment',
        location: 'Downtown Dubai',
        bedrooms: 3,
        bathrooms: 3,
        size: '2,200 sq.ft',
        image: '../images/Listings/pexels-abhishek-rana-368444-28720826.jpg'
    },
    {
        id: 2,
        title: 'Beachfront Villa in Palm Jumeirah',
        price: 'AED 12,500,000',
        type: 'Villa',
        location: 'Palm Jumeirah',
        bedrooms: 5,
        bathrooms: 6,
        size: '5,800 sq.ft',
        image: '../images/Listings/pexels-aboodi-13360247.jpg'
    },
    {
        id: 3,
        title: 'Penthouse with Burj Khalifa View',
        price: 'AED 8,750,000',
        type: 'Penthouse',
        location: 'Business Bay',
        bedrooms: 4,
        bathrooms: 5,
        size: '4,500 sq.ft',
        image: '../images/Listings/pexels-aboodi-14985628.jpg'
    },
    // Add more properties as needed
];

// Read the template file
const templatePath = path.join(__dirname, 'property-template.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'property-pages');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Generate property pages
properties.forEach(property => {
    let pageContent = template;
    
    // Replace placeholders with property data
    for (const [key, value] of Object.entries(property)) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        pageContent = pageContent.replace(placeholder, value);
    }
    
    // Write the generated page to a file
    const outputPath = path.join(outputDir, `property-${property.id}.html`);
    fs.writeFileSync(outputPath, pageContent);
    console.log(`Generated property-${property.id}.html`);
});

console.log('All property pages have been generated!');
