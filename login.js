/* Handle Login Process */
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    /* Hardcoded credentials check as per PH instruction */
    if (usernameInput === 'admin' && passwordInput === 'admin123') {
        // Saving status to simulate login session
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'main.html';
    } else {
        alert('Invalid credentials! Please use admin / admin123');
    }
});