'use strict';

const path = require('path');

/**
 * Class representing an InterviewQuestion handler.
 */
class InterviewQuestion {
  /**
   * Creates an instance of InterviewQuestion.
   * @param {Object} ports - Dependencies or external resources required.
   * @param {Object} [options={}] - Configuration options.
   * @param {boolean} [options.verbose=false] - Enable verbose logging.
   */
  constructor(ports, options = {}) {
    this.ports = ports;
    this.options = options;
    this.verbose = options.verbose || false;
    this.data = require(path.resolve(__dirname, 'question.json'));
  }

  /**
   * Logs a message if verbose mode is enabled.
   * @param {string} message - The message to log.
   */
  log(message) {
    if (this.verbose) {
      console.log(message);
    }
  }

  /**
   * Executes the main functionality of filtering and retrieving questions.
   * @param {string} [filter='all'] - The filter type (e.g., 'all', 'top').
   * @param {number} [amount=0] - The number of questions to retrieve if filter is 'top'.
   * @param {string|null} [level=null] - The difficulty level of questions ('junior', 'middle', 'senior').
   * @returns {Promise<Array>} The filtered list of questions.
   * @throws {Error} If an invalid level or filter type is provided.
   */
  async execute(filter = 'all', amount = 0, level = null, theme = null) {
    let filteredData = this.data;

    // Filter by level if provided
    if (level) {
      const validLevels = ['junior', 'middle', 'senior'];
      if (!validLevels.includes(level)) {
        throw new Error(`Invalid level: ${level}. Valid levels are: ${validLevels.join(', ')}`);
      }
      filteredData = filteredData.filter(item => item.level === level);
    }

    // Filter by level if provided
    if (theme) {
      filteredData = filteredData.filter(item => item.theme.split(',').map((data) => data.trim().toLowerCase()).includes(theme));
    }

    switch (filter) {
      case 'all':
        return filteredData;
      case 'top':
        return this.getTopQuestions(amount, filteredData);
      default:
        throw new Error(`Invalid filter type: ${filter}`);
    }
  }

  /**
   * Retrieves the top N questions from the dataset.
   * @param {number} amount - The number of questions to retrieve.
   * @param {Array} data - The dataset to retrieve questions from.
   * @returns {Array} The top N questions.
   * @throws {Error} If the amount is not a positive integer.
   */
  getTopQuestions(amount, data) {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error('Amount must be a positive integer.');
    }

    // Shuffle the data array
    const shuffledData = data.sort(() => 0.5 - Math.random());

    // Return the top N questions from the shuffled array
    return shuffledData.slice(0, amount);
  }
}

/**
 * Factory function to create and execute an InterviewQuestion instance.
 * @param {Object} [options={}] - Configuration options.
 * @param {string} [options.filter='all'] - The filter type (e.g., 'all', 'top').
 * @param {number} [options.amount=0] - The number of questions to retrieve if filter is 'top'.
 * @param {string|null} [options.level=null] - The difficulty level of questions ('junior', 'middle', 'senior').
 * @returns {Promise<Array>} The filtered list of questions.
 */
module.exports = async function (options = {}) {
  const interviewQuestion = new InterviewQuestion(options);
  const { filter = 'all', amount = 0, level = null, theme = null } = options;
  return interviewQuestion.execute(filter, amount, level, theme);
};