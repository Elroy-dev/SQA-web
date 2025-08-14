const fs = require('fs');
const path = require('path');

// Define the correct case for image directories
const CORRECT_CASE = {
    'about': 'About',
    'listings': 'Listings',
    'logos': 'Logos',
    'scroller': 'Scroller',
    'team': 'Team'
};

// Function to fix image paths in a file
function fixImagePathsInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        // Find all image paths in the file
        const imagePathRegex = /src=["'](.*?\.(?:jpg|jpeg|png|gif|webp|svg))["']/gi;
        
        // Replace incorrect paths with correct case
        const updatedContent = content.replace(imagePathRegex, (match, imagePath) => {
            // Only process relative image paths
            if (!imagePath.startsWith('images/') && !imagePath.startsWith('./images/') && !imagePath.startsWith('../images/')) {
                return match;
            }
            
            // Split the path into parts
            const parts = imagePath.split('/');
            const imagesIndex = parts.indexOf('images');
            
            if (imagesIndex === -1 || imagesIndex === parts.length - 1) {
                return match;
            }
            
            // Get the folder name after 'images/'
            const folderName = parts[imagesIndex + 1].toLowerCase();
            
            // Check if the folder name needs to be corrected
            if (CORRECT_CASE[folderName] && parts[imagesIndex + 1] !== CORRECT_CASE[folderName]) {
                // Update the folder name to the correct case
                parts[imagesIndex + 1] = CORRECT_CASE[folderName];
                const newPath = parts.join('/');
                updated = true;
                console.log(`Updating path in ${filePath}:`);
                console.log(`  Old: ${imagePath}`);
                console.log(`  New: ${newPath}`);
                return `src="${newPath}"`;
            }
            
            return match;
        });
        
        // Write the updated content back to the file if changes were made
        if (updated) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Updated ${filePath}`);
        } else {
            console.log(`ℹ️  No changes needed for ${filePath}`);
        }
        
        return updated;
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error);
        return false;
    }
}

// Function to process all HTML files in a directory
function processDirectory(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    let updatedFiles = 0;
    
    for (const file of files) {
        const fullPath = path.join(directory, file.name);
        
        if (file.isDirectory()) {
            // Skip node_modules and other non-HTML directories
            if (file.name === 'node_modules' || file.name.startsWith('.')) {
                continue;
            }
            updatedFiles += processDirectory(fullPath);
        } else if (file.name.endsWith('.html')) {
            if (fixImagePathsInFile(fullPath)) {
                updatedFiles++;
            }
        }
    }
    
    return updatedFiles;
}

// Start processing from the project root
const rootDir = path.join(__dirname);
console.log(`🔍 Scanning for HTML files in ${rootDir}...`);
const updatedCount = processDirectory(rootDir);

console.log(`\n✨ Done! Updated ${updatedCount} files.`);
