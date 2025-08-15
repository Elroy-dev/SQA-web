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

// Normalize content by correcting the folder casing that immediately follows `images/`
function normalizeImageFolderCase(content, filePath) {
    let updated = false;
    // Match any relative prefix (../ or ./ repeated), then images/, then the immediate folder, preserving trailing slash
    const folderRegex = /((?:\.{1,2}\/)*images\/)([A-Za-z]+)(\/)/g;
    const replaced = content.replace(folderRegex, (full, prefix, folder, slash) => {
        const lower = folder.toLowerCase();
        if (CORRECT_CASE[lower] && folder !== CORRECT_CASE[lower]) {
            const newSeg = CORRECT_CASE[lower];
            const before = `${prefix}${folder}${slash}`;
            const after = `${prefix}${newSeg}${slash}`;
            console.log(`Updating folder case in ${filePath}:`);
            console.log(`  Old: ${before}`);
            console.log(`  New: ${after}`);
            updated = true;
            return `${prefix}${newSeg}${slash}`;
        }
        return full;
    });
    return { content: replaced, updated };
}

// Function to fix image paths in a single file (any text file)
function fixImagePathsInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const { content: updatedContent, updated } = normalizeImageFolderCase(content, filePath);
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

// Function to process all text files in a directory
function processDirectory(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    let updatedFiles = 0;
    
    for (const file of files) {
        const fullPath = path.join(directory, file.name);
        
        if (file.isDirectory()) {
            // Skip node_modules and other non-HTML directories
            if (file.name === 'node_modules' || file.name === '.git' || file.name.startsWith('.')) {
                continue;
            }
            updatedFiles += processDirectory(fullPath);
        } else if (file.name.endsWith('.html') || file.name.endsWith('.css') || file.name.endsWith('.js')) {
            if (fixImagePathsInFile(fullPath)) {
                updatedFiles++;
            }
        }
    }
    
    return updatedFiles;
}

// Start processing from the project root
const rootDir = path.join(__dirname);
console.log(`🔍 Scanning for HTML/CSS/JS files in ${rootDir}...`);
const updatedCount = processDirectory(rootDir);

console.log(`\n✨ Done! Updated ${updatedCount} files.`);
// Explicitly exit to avoid any environment keeping the process open
process.exit(0);
