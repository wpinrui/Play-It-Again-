const uploadBtn = document.getElementById("upload-btn");

uploadBtn.addEventListener("change", () => {
    song_path = uploadBtn.files[0];
    song_url = URL.createObjectURL(song_path);
    console.log(song_path);
    console.log(song_url);
    song = new Audio(song_url);
});
