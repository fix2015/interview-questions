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

// Convert the array of objects to Markdown format
const markdownContent = data.map(obj => {
    const titleWithLink = obj.link ? `[${obj.title}](${obj.link})` : obj.title;
    const tags = obj.level && obj.theme ? `**Tags**: ${obj.level}, ${obj.theme}` : '';
    const url = obj.url ? `**URL**: [${obj.url}](${obj.url})` : '';
    return `## ${titleWithLink}\n\n${obj.text}\n\n${tags}\n\n${url}\n`;
}).join('\n---\n\n');

// Save the Markdown content to a .md file
const outputFilePath = path.resolve(__dirname, 'output.md');
try {
    fs.writeFileSync(outputFilePath, markdownContent, 'utf8');
    console.log(`Markdown file has been saved to ${outputFilePath}`);
} catch (err) {
    console.error(`Failed to write to file at ${outputFilePath}:`, err.message);
    process.exit(1);
}
