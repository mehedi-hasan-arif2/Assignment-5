/* Handle Login Process */
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    /* check */
    if (usernameInput === 'admin' && passwordInput === 'admin123') {
        // Saving status 
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'main.html';
    } else {
        alert('Invalid credentials! Please use admin / admin123');
    }
});