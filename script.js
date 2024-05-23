const videos = ["videos/video1.mp4", "videos/video2.mp4", "videos/video3.mp4"]; // List your initial videos here
let currentVideoIndex = 0;

function updateVideoSource() {
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");
    videoSource.src = videos[currentVideoIndex];
    videoPlayer.load();
}

function previousVideo() {
    if (currentVideoIndex > 0) {
        currentVideoIndex--;
        updateVideoSource();
    } else {
        alert("This is the first video.");
    }
}

function nextVideo() {
    if (currentVideoIndex < videos.length - 1) {
        currentVideoIndex++;
        updateVideoSource();
    } else {
        alert("This is the last video.");
    }
}

function uploadVideo() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file && file.type === "video/mp4") {
        const videoURL = URL.createObjectURL(file);
        videos.push(videoURL);
        currentVideoIndex = videos.length - 1;
        updateVideoSource();
    } else {
        alert("Please select a valid MP4 file.");
    }
}
