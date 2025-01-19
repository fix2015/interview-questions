const fs = require('fs');
const path = require('path');
const repo = '/Users/vitaliisemianchuk/Projects/javascript-questions-pro';

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

// Function to delete a folder and its contents
function clearFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
    }
    fs.mkdirSync(folderPath, { recursive: true });
}

// Function to create folders and write files
function writeToFile(folderPath, fileName, content) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
}

// Generate Markdown content for a question
function generateMarkdown(obj) {
    const titleWithLink = obj.link ? `[${obj.title}](${obj.link})` : obj.title;
    const tags = obj.level && obj.theme ? `**Tags**: ${obj.level}, ${obj.theme}` : '';
    const url = obj.url ? `**URL**: [${obj.url}](${obj.url})` : '';
    return `## ${titleWithLink}\n\n${obj.text}\n\n${tags}\n\n${url}\n`;
}

// Clear and recreate the level folder
const levelsFolder = path.resolve(__dirname, `${repo}/level`);
clearFolder(levelsFolder);

const uniqueLevels = new Set();
data.forEach(obj => {
    if (obj.level) {
        uniqueLevels.add(obj.level);
        const levelFolderPath = path.join(levelsFolder, obj.level);
        const content = generateMarkdown(obj);
        writeToFile(levelFolderPath, `${obj.title.replace(/[^a-z0-9]+/gi, '_')}.md`, content);
    }
});

// Clear and recreate the theme folder
const themesFolder = path.resolve(__dirname, `${repo}/theme`);
clearFolder(themesFolder);

const uniqueThemes = new Set();
data.forEach(obj => {
    if (obj.theme) {
        const themes = obj.theme.split(',').map(theme => theme.trim());
        themes.forEach(theme => {
            uniqueThemes.add(theme);
            const themeFolderPath = path.join(themesFolder, theme);
            const content = generateMarkdown(obj);
            writeToFile(themeFolderPath, `${obj.title.replace(/[^a-z0-9]+/gi, '_')}.md`, content);
        });
    }
});

// Clear and recreate the video folder
const videoFolder = path.resolve(__dirname, `${repo}/video`);
clearFolder(videoFolder);

const videoQuestions = [];
data.forEach(obj => {
    if (obj.url && obj.url.includes('tiktok')) {
        videoQuestions.push(obj);
        const content = generateMarkdown(obj);
        writeToFile(videoFolder, `${obj.title.replace(/[^a-z0-9]+/gi, '_')}.md`, content);
    }
});

// Generate the README header
const totalQuestions = data.length;
const levelsLinks = Array.from(uniqueLevels)
    .map(level => `- [${level}](./level/${level})`)
    .join('\n');
const themesLinks = Array.from(uniqueThemes)
    .map(theme => `- [${theme}](./theme/${theme})`)
    .join('\n');
const videosLinks = videoQuestions
    .map(q => `- [${q.title}](${q.url})`)
    .join('\n');

// Convert the array of objects to Markdown format
const markdownContent = data.map(obj => {
    const titleWithLink = obj.link ? `[${obj.title}](${obj.link})` : obj.title;
    const tags = obj.level && obj.theme ? `**Tags**: ${obj.level}, ${obj.theme}` : '';
    const url = obj.url ? `**URL**: [${obj.url}](${obj.url})` : '';
    return `## ${titleWithLink}\n\n${obj.text}\n\n${tags}\n\n${url}\n`;
}).join('\n---\n\n');

const readmeContent = `
# javascript-questions-pro (${totalQuestions} questions)

## [Levels](./level/) 
${levelsLinks}

## [Themes](./theme/)  
${themesLinks}

## [Tutorials with Videos](./video/)
${videosLinks}

## All questions
${markdownContent}
---
`;

// Write the README header and questions
const outputFilePath = path.resolve(__dirname, `${repo}/README.md`);
try {
    fs.writeFileSync(outputFilePath, readmeContent, 'utf8');
    console.log(`README file has been saved to ${outputFilePath}`);
} catch (err) {
    console.error(`Failed to write to file at ${outputFilePath}:`, err.message);
    process.exit(1);
}

console.log('Folders and files have been generated successfully.');
