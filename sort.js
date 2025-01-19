const path = require('path');

const data = require(path.resolve(__dirname, 'question.json'));

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

console.log(JSON.stringify(work));
