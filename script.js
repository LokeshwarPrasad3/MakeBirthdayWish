class CandleInteraction {
    constructor() {
        this.candle = document.querySelector('.candle');
        this.isBlown = false;
        this.blowThreshold = 0.1;
        this.sensitivitySlider = document.getElementById('sensitivity');
        this.audioContext = null;
        this.analyzer = null;
        this.dataArray = null;
        this.source = null;
        this.stream = null;
        
        // Initialize event listeners
        this.initEventListeners();
        this.initAudio();
        
        // Add ambient flame movement
        this.ambientMovement();
    }

    initEventListeners() {
        // Update sensitivity when slider changes
        this.sensitivitySlider.addEventListener('input', (e) => {
            this.blowThreshold = parseFloat(e.target.value);
        });
    }

    async initAudio() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                } 
            });
            
            this.audioContext = new AudioContext();
            this.source = this.audioContext.createMediaStreamSource(this.stream);
            this.analyzer = this.audioContext.createAnalyser();
            
            this.source.connect(this.analyzer);
            this.analyzer.fftSize = 2048;
            this.analyzer.smoothingTimeConstant = 0.8;
            
            const bufferLength = this.analyzer.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
            
            this.checkAudioLevel();
        } catch (err) {
            console.error('Microphone access denied:', err);
            document.querySelector('.instruction').textContent = '❌ Microphone access denied. Please allow access and reload.';
            document.querySelector('.instruction').style.color = '#ff5555';
        }
    }

    checkAudioLevel = () => {
        if (!this.analyzer || !this.dataArray) return;
        
        this.analyzer.getByteFrequencyData(this.dataArray);
        
        const average = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
        const normalizedValue = average / 256;

        // Lower the threshold to make it more sensitive
        const effectiveThreshold = this.blowThreshold * 0.8;

        // Debug info - uncomment to see microphone levels
        console.log('Mic level:', normalizedValue.toFixed(3), 'Threshold:', effectiveThreshold);

        if (normalizedValue > effectiveThreshold && !this.isBlown) {
            // Add wind effect before extinguishing
            this.candle.classList.add('wind-effect');
            
            // Extinguish after a short delay
            setTimeout(() => {
                this.extinguishCandle();
                this.candle.classList.remove('wind-effect');
            }, 300); // Reduced delay for faster response
        }

        requestAnimationFrame(this.checkAudioLevel);
    }

    extinguishCandle() {
        this.isBlown = true;
        this.candle.classList.add('extinguished');
        
        // Create dynamic smoke elements for better effect
        this.createSmokeEffect();
        
        // Play extinguish sound
        this.playExtinguishSound();
        
        // After 3 seconds, redirect to birthday page
        setTimeout(() => {
            window.location.href = 'birthday.html';
        }, 3000);
    }

    createSmokeEffect() {
        const smokeContainer = document.querySelector('.smoke-container');
        smokeContainer.innerHTML = ''; // Clear existing smoke
        
        // Create multiple smoke particles
        for (let i = 0; i < 8; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'dynamic-smoke';
            
            // Randomize position and animation
            const leftPos = 30 + (Math.random() * 40);
            const delay = Math.random() * 0.5;
            const duration = 2 + Math.random() * 2;
            
            smoke.style.left = `${leftPos}%`;
            smoke.style.animationDelay = `${delay}s`;
            smoke.style.animationDuration = `${duration}s`;
            
            smokeContainer.appendChild(smoke);
        }
    }

    playExtinguishSound() {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.4);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);
    }

    ambientMovement() {
        // Add subtle random movement to the candle flame
        setInterval(() => {
            if (!this.isBlown) {
                const flame = document.querySelector('.flame');
                const innerFlame = document.querySelector('.inner-flame');
                
                const randomX = (Math.random() - 0.5) * 2;
                const randomScale = 0.95 + Math.random() * 0.1;
                
                flame.style.transform = `rotate(${randomX}deg) scaleY(${randomScale})`;
                innerFlame.style.transform = `translateX(-50%) rotate(${-randomX}deg) scaleY(${randomScale + 0.05})`;
            }
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CandleInteraction();
});

function getRandomName() {
    const names = [
        "Alex", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie",
        "Drew", "Quinn", "Blake", "Avery", "Skyler", "Parker", "Reese", "Finley"
    ];
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomImage() {
    const imageUrls = [
        "https://source.unsplash.com/400x400/?portrait,smile",
        "https://source.unsplash.com/400x400/?person,happy",
        "https://source.unsplash.com/400x400/?face,joy",
        "https://source.unsplash.com/400x400/?portrait,celebration"
    ];
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
}