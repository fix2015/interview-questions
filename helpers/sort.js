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

function sortAndFilterUniqueLinks(arr) {
    const seenLinks = new Set();
    
    // Filter objects with unique links
    const filteredArr = arr.filter(obj => {
        if (obj.link && !seenLinks.has(obj.link)) {
            seenLinks.add(obj.link);
            return true;
        }
        return false;
    });

    // Sort the filtered array by link alphabetically
    return filteredArr.sort((a, b) => {
        if (a.link < b.link) return -1;
        if (a.link > b.link) return 1;
        return 0;
    });
}

const old = data.filter(({link}) => !link);
const newData = sortAndFilterUniqueLinks(data.filter(({link}) => link));
const work = [...old, ...newData];
console.log(work.length)
return 
// Save the work variable to the same file
try {
    fs.writeFileSync(dataPath, JSON.stringify(work, null, 2), 'utf8');
    console.log(`Data has been saved to ${dataPath}`);
} catch (err) {
    console.error(`Failed to write to file at ${dataPath}:`, err.message);
    process.exit(1);
}
