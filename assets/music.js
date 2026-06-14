// Music Module for Login Page
class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.audio.src = 'assets/music.mp3'; 
        this.audio.loop = true;
        this.audio.autoplay = true;
        this.audio.muted = false;
        this.initElements();
        this.attachEventListeners();
        this.startMusic();
    }

    initElements() {
        this.volumeSlider = document.getElementById('volumeSlider');
    }

    attachEventListeners() {
        // Volume control
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
        
        // Ensure music plays on first user interaction
        document.addEventListener('click', () => {
            this.ensurePlayback();
        }, { once: true });
    }

    startMusic() {
        this.audio.volume = 0.7; // Volume par défaut à 70%
        this.audio.play().catch(() => {
            // Si l'autoplay est bloqué, on essaie au premier clic
            console.log('Autoplay bloqué, attente d\'une interaction utilisateur');
        });
    }
    
    ensurePlayback() {
        if (this.audio.paused) {
            this.audio.play();
        }
    }
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});
