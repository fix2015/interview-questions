## [What is the impact of long tasks on performance?](#what-is-the-impact-of-long-tasks)

### What is the impact of long tasks on performance?

Long tasks (>50ms) block the main thread, causing UI lag. Split tasks into smaller chunks with `setTimeout()` or `requestIdleCallback()`.

**Tags**: [intermediate](./level/intermediate), [JavaScript](./theme/javascript), [Performance](./theme/performance), [Optimization](./theme/optimization)


