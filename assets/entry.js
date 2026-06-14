// Vérifier l'authentification au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Rediriger vers login si pas connecté
    if (!isUserLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    // Afficher les informations de session
    displaySessionInfo();

    // Mettre à jour l'affichage toutes les 10 secondes
    setInterval(checkSessionExpiry, 10000);
});

// Afficher les informations de session
function displaySessionInfo() {
    const sessionData = getSessionData();

    if (sessionData) {
        document.getElementById('username-display').textContent = sessionData.username;
        document.getElementById('session-username').textContent = sessionData.username;

        const loginDate = new Date(sessionData.loginTime);
        document.getElementById('session-time').textContent = loginDate.toLocaleString();
    }
}

// Vérifier l'expiration de la session
function checkSessionExpiry() {
    if (!isUserLoggedIn()) {
        alert('Your session has expired. Please login again.');
        logout();
    }
}
