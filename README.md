# Interview Questions CLI

Welcome to the **Interview Questions CLI**, a powerful tool designed for users learning JavaScript and practicing coding every day. This repository provides a collection of interview questions categorized by difficulty level, allowing you to learn and improve your skills anytime, directly from your terminal.

## Features

- **Daily Practice**: Access a curated set of JavaScript interview questions to sharpen your coding skills.
- **Difficulty Levels**: Choose questions by difficulty—`junior`, `middle`, or `senior`—to match your skill level.
- **Flexible Output**: Get questions in multiple formats: 
  - `text` for direct display in the terminal.
  - `array` or `json` for use in your projects or further study.
- **Randomized Selection**: Practice with random questions to simulate real-world scenarios.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/fix2015/interview-questions.git
   ```
2. Navigate to the project directory:
   ```bash
   cd interview-questions-cli
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Make the CLI globally accessible (optional):
   ```bash
   npm link
   ```

## Usage

Run the CLI using the following command:

```bash
node cli.js [options]
```

### Options

| Option          | Description                                                   | Example                                |
|-----------------|---------------------------------------------------------------|----------------------------------------|
| `--filter`      | Filter questions by type (`all`, `top`). Default is `all`.     | `--filter top`                         |
| `--amount`      | Number of questions to retrieve (for `top` filter).           | `--amount 5`                           |
| `--level`       | Filter by difficulty level (`junior`, `middle`, `senior`).    | `--level junior`                       |
| `--format`      | Output format (`text`, `array`, `json`). Default is `text`.   | `--format json`                        |
| `--verbose`     | Enable verbose logging for debugging.                         | `--verbose`                            |

### Examples

- Retrieve all questions:
  ```bash
  node cli.js --filter all
  ```

- Get the top 5 junior-level questions in JSON format:
  ```bash
  node cli.js --filter top --amount 5 --level junior --format json
  ```

- Use verbose mode to debug:
  ```bash
  node cli.js --verbose
  ```

## Who is this for?

This repository is perfect for:

- **JavaScript learners**: Enhance your knowledge with targeted practice.
- **Job seekers**: Prepare for interviews by tackling real-world coding problems.
- **Developers**: Quickly access a JSON or array of questions for use in projects or mock tests.

## Connect with Me:
- [LinkedIn - Vitalii Semianchuk](https://www.linkedin.com/in/vitalii-semianchuk-9812a786/)
- [Telegram - @jsmentorfree](https://t.me/jsmentorfree) - We do a lot of free teaching on this channel! Join us to learn and grow in web development.
- [Tiktok - @jsmentoring](https://www.tiktok.com/@jsmentoring) Everyday new videos

## License

MIT License  
Copyright (c) 2024 Vitalii Semianchuk  

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.