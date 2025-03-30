# Animizu Player
# Author: Ceyhun SAZDIR
# Version: 0.5

Animizu için HTML, JS, CSS ile geliştirilmiş video oynatıcı.

## Özellikler
- Oynatma/Duraklatma
- Ses kontrolü
- İlerleme çubuğu
- Tam ekran modu
- Video önizleme

## Kullanım
Aşağıdaki video oynatıcı, projenin bir örneğidir:

```html
<div class="player-container">
    <div class="video-wrapper">
        <video id="video" src="uploads/sample.mp4" allowfullscreen></video>
        <div class="overlay"></div>
        <div class="pause-indicator" id="pauseIndicator">
            <i class="fas fa-play"></i>
        </div>
    </div>
    <div class="controls">
        <button id="playPause" class="button">
            <i id="playPauseIcon" class="fas fa-play"></i>
        </button>
        <div class="volume">
            <button id="volumeIcon" class="button">
                <i class="fas fa-volume-up"></i>
            </button>
            <input type="range" id="volume" class="volume-slider" min="0" max="1" step="0.1">
        </div>
        <div class="progress-bar" id="progressBar">
            <div class="progress" id="progress"></div>
            <div class="thumb"></div>
        </div>
        <div class="time-display">
            <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
        </div>
        <button id="fullscreenButton" class="button">
            <i class="fas fa-expand"></i>
        </button>
    </div>
</div>
