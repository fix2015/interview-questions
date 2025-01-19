const fs = require('fs');
const path = require('path');

// Get the input file path from command-line arguments
const inputFilePath = process.argv[2];
if (!inputFilePath) {
    console.error('Please provide the path to the input JSON file as an argument.');
    process.exit(1);
}

// Resolve the input file path
const dataPath = path.resolve(__dirname, inputFilePath);

// Read and parse the JSON file
let data;
try {
    data = require(dataPath);
} catch (err) {
    console.error(`Failed to read or parse the file at ${dataPath}:`, err.message);
    process.exit(1);
}

// Function to generate a unique link based on the title
function generateLink(title) {
    return `#${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
}

// Ensure all objects have a `link` property
data = data.map(obj => {
    if (!obj.link) {
        obj.link = generateLink(obj.title || 'untitled');
    }
    return obj;
});

try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Data has been saved to ${dataPath}`);
} catch (err) {
    console.error(`Failed to write to file at ${dataPath}:`, err.message);
    process.exit(1);
}