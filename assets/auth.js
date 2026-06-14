
const VALID_CREDENTIALS = {
    username: "admin",
    password: "password123"
};

const VALID_CREDENTIALS = {
    username: "mathyas",
    password: "goat"
};

const VALID_CREDENTIALS = {
    username: "user",
    password: "family"
};

const SESSION_TIMEOUT = 30;


document.addEventListener('DOMContentLoaded', function() {

    if (isUserLoggedIn()) {
        redirectToDashboard();
    }


    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Fonction de login
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
       
        const sessionData = {
            username: username,
            loginTime: new Date().getTime(),
            token: generateToken()
        };

        
        localStorage.setItem('userSession', JSON.stringify(sessionData));

        
        errorMessage.innerHTML = '';
        redirectToDashboard();
    } else {
        
        errorMessage.innerHTML = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
}

// Vérifier si l'utilisateur est connecté
function isUserLoggedIn() {
    const sessionData = localStorage.getItem('userSession');

    if (!sessionData) {
        return false;
    }

    try {
        const session = JSON.parse(sessionData);
        const currentTime = new Date().getTime();
        const loginTime = session.loginTime;
        const timeElapsed = (currentTime - loginTime) / (1000 * 60); // en minutes

        // Vérifier si la session a expiré
        if (timeElapsed > SESSION_TIMEOUT) {
            logout();
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error parsing session data:', error);
        return false;
    }
}


function redirectToDashboard() {
    window.location.href = 'entry.html';
}


function logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'index.html';
}


function generateToken() {
    return 'token_' + Math.random().toString(36).substr(2, 9);
}


function getSessionData() {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
        try {
            return JSON.parse(sessionData);
        } catch (error) {
            console.error('Error parsing session data:', error);
            return null;
        }
    }
    return null;
}
