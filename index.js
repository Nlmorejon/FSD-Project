$(document).ready(function () {
  $('#loginform').on('submit', function (e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();
    const responseEl = $('#responseMessage');

    
    responseEl.removeClass('error success').html('');

    
    if (!email.includes('@')) {
      responseEl
        .html('❌ Invalid email: must contain "@" symbol.')
        .addClass('error');
      return;
    }

    
    if (password.length < 9) {
      responseEl
        .html('❌ Password must be at least 9 characters long.')
        .addClass('error');
      return;
    }

  
      responseEl
        .html('✅ Login successful! Redirecting...')
        .addClass('success');

      setTimeout(() => {
        window.location.href = '/menu.html'; 
      }, 1000);
  
  });
});
