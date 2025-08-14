const fs = require('fs');
const path = require('path');

// Read the updated property-1.html
const templatePath = path.join(__dirname, 'property-1.html');
let templateContent = fs.readFileSync(templatePath, 'utf8');

// Extract the contact agent section
const contactAgentRegex = /<div class="contact-agent"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/;
const updatedContactAgent = templateContent.match(contactAgentRegex)[0];

// Extract the footer section
const footerRegex = /<!-- Footer -->[\s\S]*<\/footer>/;
const updatedFooter = templateContent.match(footerRegex)[0];

// Update all property files (2-15)
for (let i = 2; i <= 15; i++) {
    const filePath = path.join(__dirname, `property-${i}.html`);
    
    // Read the current file
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Replace the contact agent section
    fileContent = fileContent.replace(/<div class="contact-agent"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/, updatedContactAgent);
    
    // Replace the footer section
    fileContent = fileContent.replace(/<!-- Footer -->[\s\S]*<\/footer>/, updatedFooter);
    
    // Save the updated file
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Updated property-${i}.html`);
}

console.log('All property pages have been updated with the fixed agent and footer styling.');
