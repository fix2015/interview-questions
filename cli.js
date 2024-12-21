#!/usr/bin/env node
'use strict';

const interviewQuestion = require('./index.js');
const getThemArgs = require('get-them-args');

const args = getThemArgs(process.argv.slice(2));
const verbose = args.verbose || false;
const filter = args.top ? 'top' : args.filter || 'all';
const amount = args.top || '';
const level = args.level || '';
const format = args.format || 'text';
const theme = args.theme || '';

const logHeader = (header) => console.log('\x1b[32m%s\x1b[0m', header);
const logDivider = () => console.log('_________________________');
const logExampleParams = () => {
  console.log("\x1b[32m%s\x1b[0m", "Params example:");
  console.log("--top ${amount}");
  console.log("--level ( basic | intermediate | advanced )");
  console.log("--theme  ( closures | storage | es6 | classes | database ... and other 203 themes)");
  console.log("--format ( text | array | json )");
};

const displayQuestions = (result, format) => {
  switch (format) {
    case 'json':
      console.log(JSON.stringify(result));
      break;
    case 'array':
      console.log(result);
      break;
    default:
      result.forEach(({ title, url, text, theme }) => {
        console.log('');
        logHeader(`Question: ${title}`);
        if (url) {
          console.info(`Answer: \x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\`);
        } else {
          console.info(`Answer: ${text}`);
        }
        console.info(`Hash: ${theme.split(',').map((data) => ` #${data.trim().toLowerCase()}`)}`);
        logDivider();
      });
  }
};

const main = async () => {
  try {
    logHeader('Question:');
    if (amount) console.log('Top -', amount);
    if (level) console.log('Level -', level);
    if (filter) console.log('Filter -', filter);
    console.log('');

    const result = await interviewQuestion({ filter, amount, level, format, theme });
    displayQuestions(result, format);

    console.log('');
    console.log(`Found ${result.length} questions`);
    logExampleParams();

    if (verbose) console.log('Send questions');
  } catch (error) {
    if (verbose) console.error(`Could not send questions: ${error.message}`);
  }
};

main();
