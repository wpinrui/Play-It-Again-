const uploadBtn = document.getElementById("upload-btn");
const title_elem = document.getElementById("title");
const load_section = document.getElementById("load");
const play_section = document.getElementById("play");
const currTime = document.getElementById("current-time");
const totalDuration = document.getElementById("total-duration");
const pauseBtn = document.getElementById("pause");
const seek_slider = document.getElementById("slider");
const albumPicker = document.getElementById("album-art-picker");
const albumArt = document.getElementById("album-art");

let song;
let isPlaying = false;
let updateTimer;

uploadBtn.addEventListener("change", () => {
    song = makeSong();
    song.loop = true;
    changeSection();
    updateTimer = setInterval(seekUpdate, 500);
    song.addEventListener("ended", () => {
        currTime.textContent = "00:00";
        seek_slider.value = 0;
    });
});

albumPicker.addEventListener("change", () => {
    albumArt.style.background = `url(${makeImageUrl()})`;
    albumArt.style.backgroundSize = "cover";
    albumArt.style.backgroundPosition = "center";
});

function makeImageUrl() {
    const image_path = albumPicker.files[0];
    const image_url = URL.createObjectURL(image_path);
    return image_url;
}

function makeSong() {
    const song_path = uploadBtn.files[0];
    const title = uploadBtn.files[0].name.replace(/\.[^/.]+$/, "");
    title_elem.textContent = title;
    const song_url = URL.createObjectURL(song_path);
    const song = new Audio(song_url);
    return song;
}

function changeSection() {
    load_section.classList.toggle("hide");
    play_section.classList.toggle("hide");
}

function resetTimes() {
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seek_slider.value = 0;
}

function playPauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    song.play();
    isPlaying = true;
    pauseBtn.innerHTML =
        '<i class="fa fa-pause-circle fa-3x"  onclick="playPauseTrack()"></i>';
}

function pauseTrack() {
    song.pause();
    isPlaying = false;
    pauseBtn.innerHTML =
        '<i class="fa fa-play-circle fa-3x"  onclick="playPauseTrack()"></i>';
}

function seekTo() {
    const seekto = song.duration * (seek_slider.value / 100);
    song.currentTime = seekto;
}

function seekBack() {
    song.currentTime -= 5;
    seekUpdate();
}

function seekForward() {
    song.currentTime += 5;
    seekUpdate();
}

function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(song.duration)) {
        seekPosition = song.currentTime * (100 / song.duration);
        seek_slider.value = seekPosition;
        let currentMinutes = Math.floor(song.currentTime / 60);
        let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(song.duration / 60);
        let durationSeconds = Math.floor(song.duration - durationMinutes * 60);
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }
        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function goBack() {
    if (isPlaying) {
        playPauseTrack();
    }
    changeSection();
    uploadBtn.value = "";
}
