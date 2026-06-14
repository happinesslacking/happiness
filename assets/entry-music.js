// Music Module for Entry Page - Auto-play only
class EntryMusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.audio.src = 'assets/entry-music.mp3'; 
        this.audio.loop = true;
        this.audio.volume = 0.5;
        this.forceAutoplay();
    }

    forceAutoplay() {
        // Try to play immediately
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked by browser, will play on user interaction
                document.addEventListener('click', () => this.play(), { once: true });
                document.addEventListener('touchstart', () => this.play(), { once: true });
                document.addEventListener('keydown', () => this.play(), { once: true });
            });
        }
    }

    play() {
        this.audio.play();
    }
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EntryMusicPlayer();
});
