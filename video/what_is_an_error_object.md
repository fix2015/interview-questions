## [What is an error object](#what-is-an-error-object)

### What is an error object?

The `Error` object in JavaScript is used to represent runtime errors. It provides information about the error, such as its name, message, and stack trace.

Example:

```javascript
try {
  throw new Error('Something went wrong');
} catch (e) {
  console.log(e.name); // 'Error'
  console.log(e.message); // 'Something went wrong'
}
```

**Tags**: [basic](./level/basic), [JavaScript](./theme/javascript), [errors](./theme/errors)

**URL**: [https://www.tiktok.com/@jsmentoring/photo/7460422441794391329](https://www.tiktok.com/@jsmentoring/photo/7460422441794391329)
