## [How do you perform form validation using JavaScript](#how-do-you-perform-form-validation-using-javascript)

### How do you perform form validation using JavaScript?

Form validation in JavaScript can be performed by adding event listeners to the form elements and checking their values before submitting the form. You can use the `onsubmit` event or validate individual fields using the `oninput` or `onchange` events.

Example:

```javascript
const form = document.getElementById('myForm');
form.onsubmit = function(event) {
  const email = document.getElementById('email').value;
  if (!email.includes('@')) {
    alert('Please enter a valid email address');
    event.preventDefault();
  }
};
```

**Tags**: [intermediate](./level/intermediate), [JavaScript](./theme/javascript), [forms](./theme/forms)

**URL**: [https://www.tiktok.com/@jsmentoring/photo/7464738741056294177](https://www.tiktok.com/@jsmentoring/photo/7464738741056294177)
