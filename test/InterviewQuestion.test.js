'use strict';

const path = require('path');
const interviewQuestionHandler = require('../index.js'); // Import the function exported by InterviewQuestion

// Mock the data file directly (without using path.resolve)
jest.mock('../question.json', () => [
  { id: 1, level: 'junior', question: 'What is JavaScript?' },
  { id: 2, level: 'middle', question: 'What is closure in JavaScript?' },
  { id: 3, level: 'senior', question: 'Explain event delegation in JavaScript.' },
]);

// Mock console.log
console.log = jest.fn();

describe('InterviewQuestion Handler', () => {
  test('should return all questions for "all" filter', async () => {
    const result = await interviewQuestionHandler({ filter: 'all' });
    expect(result).toEqual([
      { id: 1, level: 'junior', question: 'What is JavaScript?' },
      { id: 2, level: 'middle', question: 'What is closure in JavaScript?' },
      { id: 3, level: 'senior', question: 'Explain event delegation in JavaScript.' },
    ]);
  });

  test('should return filtered questions by level', async () => {
    const result = await interviewQuestionHandler({ filter: 'all', level: 'middle' });
    expect(result).toEqual([
      { id: 2, level: 'middle', question: 'What is closure in JavaScript?' },
    ]);
  });

  test('should throw error for invalid level', async () => {
    await expect(interviewQuestionHandler({ filter: 'all', level: 'invalid' })).rejects.toThrow(
      'Invalid level: invalid. Valid levels are: junior, middle, senior'
    );
  });

  test('should throw error for invalid filter type', async () => {
    await expect(interviewQuestionHandler({ filter: 'invalid' })).rejects.toThrow(
      'Invalid filter type: invalid'
    );
  });

  test('should throw error for invalid amount in "top" filter', async () => {
    await expect(interviewQuestionHandler({ filter: 'top', amount: -1 })).rejects.toThrow(
      'Amount must be a positive integer.'
    );
  });

  test('should throw error for non-integer amount in "top" filter', async () => {
    await expect(interviewQuestionHandler({ filter: 'top', amount: 'invalid' })).rejects.toThrow(
      'Amount must be a positive integer.'
    );
  });
});
