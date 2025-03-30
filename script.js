// Author: Ceyhun SAZDIR

// HTML öğelerine referanslar
const video = document.getElementById('video'); // Video öğesi
const playPause = document.getElementById('playPause'); // Play/Pause butonu
const playPauseIcon = document.getElementById('playPauseIcon'); // Play/Pause simgesi
const progressBar = document.getElementById('progressBar'); // İlerleme çubuğu
const progress = document.getElementById('progress'); // İlerleme göstergesi
const fullscreenButton = document.getElementById('fullscreenButton'); // Tam ekran butonu
const volume = document.getElementById('volume'); // Ses seviyesi ayarı
const volumeIcon = document.getElementById('volumeIcon'); // Ses simgesi
const currentTimeDisplay = document.getElementById('currentTime'); // Şu anki zaman
const durationDisplay = document.getElementById('duration'); // Toplam süre
const thumb = document.querySelector('.thumb'); // İlerleme çubuğundaki thumb
const pauseIndicator = document.getElementById('pauseIndicator'); // Pause göstergesi

// Zaman formatını "dakika:saniye" formatında göstermek için fonksiyon
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

// Video metadata yüklendiğinde toplam süreyi göster
video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
});

// Video oynatıldıkça ilerleme çubuğunu güncelle
video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + '%';
    thumb.style.left = percent + '%'; // Thumb'un pozisyonunu güncelle
    currentTimeDisplay.textContent = formatTime(video.currentTime); // Şu anki zamanı göster
});

// Play/Pause butonuna tıklama işlemi
playPause.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseIcon.classList.replace('fa-play', 'fa-pause'); // Play'den Pause'a geçiş
    } else {
        video.pause();
        playPauseIcon.classList.replace('fa-pause', 'fa-play'); // Pause'dan Play'e geçiş
    }
});

// Play/Pause butonunun üzerine gelindiğinde açıklama yazısı
playPause.addEventListener('mouseenter', () => {
    if (video.paused) {
        playPause.setAttribute('title', 'Başlat (Space)'); // Play durumunda açıklama
    } else {
        playPause.setAttribute('title', 'Durdur (Space)'); // Pause durumunda açıklama
    }
});

// Video üzerine tıklandığında Play/Pause işlevi
video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        video.pause();
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
    }
});

// Video çift tıklama ile tam ekran moduna geçiş
video.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        document.querySelector('.player-container').requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen().catch(err => {
            console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
        });
    }
});

// İlerleme çubuğuna tıklama ile videoyu yeni bir zaman dilimine taşıma
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / progressBar.offsetWidth;
    video.currentTime = percent * video.duration;
});

// İlerleme çubuğunda sürükleme işlemi
let isDragging = false;

progressBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / progressBar.offsetWidth;
    video.currentTime = percent * video.duration;
});

// Fare hareketine göre ilerleme çubuğunun güncellenmesi
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, offsetX / progressBar.offsetWidth));
        video.currentTime = percent * video.duration;
    }
});

// Sürükleme işlemi sonlandığında
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Tam ekran butonuna tıklama ile tam ekran açma/kapatma
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.querySelector('.player-container').requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
        fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>'; // Küçültme simgesi
    } else {
        document.exitFullscreen().catch(err => {
            console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
        });
        fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>'; // Tam ekran simgesi
    }
});

// Tam ekran modunda simgeyi güncelleme
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>'; // Küçültme simgesi
    } else {
        fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>'; // Tam ekran simgesi
    }
});

// Ses butonunun üzerine gelindiğinde açıklama yazısı
fullscreenButton.addEventListener('mouseenter', () => {
    if (!document.fullscreenElement) {
        fullscreenButton.setAttribute('title', 'Tam Ekran (F)');
    } else {
        fullscreenButton.setAttribute('title', 'Tam Ekrandan Çık (F)');
    }
});

// Ses seviyesini güncelleme fonksiyonu
const updateVolumeIcon = (volumeLevel) => {
    if (volumeLevel === 0) {
        volumeIcon.querySelector('i').className = 'fas fa-volume-mute'; // Sessiz
    } else if (volumeLevel <= 0.5) {
        volumeIcon.querySelector('i').className = 'fas fa-volume-down'; // Düşük ses
    } else {
        volumeIcon.querySelector('i').className = 'fas fa-volume-up'; // Yüksek ses
    }
};

// Ses açma/kapatma işlevi
const toggleMute = () => {
    if (video.volume > 0) {
        previousVolume = video.volume; // Mevcut sesi kaydet
        video.volume = 0; // Sesi tamamen kapat
        volume.value = 0; // Ses çubuğunu güncelle
    } else {
        video.volume = previousVolume; // Önceki sesi geri yükle
        volume.value = previousVolume; // Ses çubuğunu güncelle
    }
    updateVolumeIcon(video.volume); // Ses simgesini güncelle
};

// Ses butonuna tıklama
volumeIcon.addEventListener('click', toggleMute);

// Ses düzeyini ayarlama (slider)
volume.addEventListener('input', () => {
    video.volume = volume.value;
    updateVolumeIcon(video.volume);
    localStorage.setItem('volume', volume.value); // Ses düzeyini kaydet
});

// Mouse hareketlerine göre kontrolleri göster/gizle
let controlsTimeout;
const controls = document.querySelector('.controls');
const playerContainer = document.querySelector('.player-container');

const hideMouse = () => {
    playerContainer.style.cursor = 'none'; // Mouse imlecini gizle
};

const showMouse = () => {
    playerContainer.style.cursor = 'default'; // Mouse imlecini göster
};

const showControls = () => {
    controls.style.opacity = '1';
    controls.style.pointerEvents = 'auto';
    showMouse(); // Mouse imlecini göster
    clearTimeout(controlsTimeout);
};

playerContainer.addEventListener('mousemove', showControls);

// Sayfa yüklendiğinde ses düzeyini geri yükle
window.addEventListener('DOMContentLoaded', () => {
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume !== null) {
        video.volume = savedVolume;
        volume.value = savedVolume; // Kaydedilen değeri çubuğa uygula
        updateVolumeIcon(video.volume); // Simgeyi güncelle
    }
});

// Varsayılan olarak en yüksek ses seviyesi
video.volume = 1;
volume.value = 1;