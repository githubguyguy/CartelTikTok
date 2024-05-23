const videos = ["videos/video1.mp4", "videos/video2.mp4", "videos/video3.mp4"];
let currentVideoIndex = 0;

const GITHUB_USERNAME = 'githubguyguy';
const REPO_NAME = 'CartelTikTok';
const TOKEN = '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'; // Store this securely

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

async function uploadVideo() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file && file.type === "video/mp4") {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const content = e.target.result.split(',')[1]; // Get the base64 content

            const filePathInRepo = `videos/${file.name}`;
            const message = `Add ${file.name}`;

            const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${filePathInRepo}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    content: content
                })
            });

            if (response.ok) {
                alert('Video uploaded successfully');
                const videoURL = filePathInRepo;
                videos.push(videoURL);
                currentVideoIndex = videos.length - 1;
                updateVideoSource();
            } else {
                const errorData = await response.json();
                alert('Upload failed: ' + (errorData.message || response.statusText));
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid MP4 file.");
    }
}
