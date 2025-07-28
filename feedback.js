document.querySelector('.feedback-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting normally
    alert('Thank you for your feedback!');
    this.reset(); // Optional: clears the form fields
  });