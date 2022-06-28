const uploadBtn = document.getElementById("upload-btn");

uploadBtn.addEventListener("change", () => {
    song_path = uploadBtn.files[0];
    song_url = URL.createObjectURL(song_path);
    song = new Audio(song_url);
    song.addEventListener("loadeddata", () => {
        let duration = song.duration;
        // The duration variable now holds the duration (in seconds) of the audio clip
    });
    document.getElementById("load").classList.toggle("hide");
    document.getElementById("play").classList.toggle("hide");
});
