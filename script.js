
const playlist = [
    {
        title: "Trepada em Cuiabá",
        artist: "Leno Brega",
        file: "audios/lenobrega-cuiaba.mp3",
        cover: "icons/lenobrega.png"
    },
   
    {
        title: "Esquece Essa Bichona",
        artist: "Leno Brega",
        file: "audios/lenobregaM1.mp3",
        cover: "icons/lenobrega.png",
    },

    {
        title: "Estupradora",
        artist: "Leno Brega",
        file: "audios/lenobregaM2.mp3",
        cover: "icons/lenobrega.png"
    }
];

let currentSongIndex = 0;  

const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const playIcon = playButton.querySelector('i');
const songTitleEl = document.querySelector('.song-info h3');
const artistNameEl = document.querySelector('.song-info p');
const albumCoverEl = document.querySelector('.album-cover img');

let isPlaying = false;


function loadSong(index) {
    const song = playlist[index];
    audio.src = song.file;
    songTitleEl.textContent = song.title;
    artistNameEl.textContent = song.artist;
    albumCoverEl.src = song.cover;
    
   
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    
    if (isPlaying) {
        audio.play();
    }
}


function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
}


function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
}


nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}


playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        isPlaying = false;
    } else {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        isPlaying = true;
    }
});


audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
});


audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});


progress.addEventListener('click', (e) => {
    const progressWidth = progress.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / progressWidth) * duration;
});


audio.addEventListener('ended', () => {
    nextSong();
});


loadSong(currentSongIndex); 