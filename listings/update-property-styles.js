const fs = require('fs');
const path = require('path');

// Read the updated property-1.html
const templatePath = path.join(__dirname, 'property-1.html');
let templateContent = fs.readFileSync(templatePath, 'utf8');

// Extract just the style section we want to keep
const styleRegex = /<style>[\s\S]*<\/style>/;
const updatedStyles = templateContent.match(styleRegex)[0];

// Update all property files (2-15)
for (let i = 2; i <= 15; i++) {
    const filePath = path.join(__dirname, `property-${i}.html`);
    
    // Read the current file
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Replace the style section
    fileContent = fileContent.replace(styleRegex, updatedStyles);
    
    // Save the updated file
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Updated styles for property-${i}.html`);
}

console.log('All property pages have been updated with the new styles.');
