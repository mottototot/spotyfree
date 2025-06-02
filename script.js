const musicData = [
    {
        "title": "Song One",
        "artist": "Artist One",
        "file": "https://raw.githubusercontent.com/your-username/your-repo/main/song1.mp3"
    },
    {
        "title": "Song Two",
        "artist": "Artist Two",
        "file": "https://raw.githubusercontent.com/your-username/your-repo/main/song2.mp3"
    }
];

function loadMusic() {
    const player = document.getElementById("player");

    musicData.forEach(song => {
        let songElement = document.createElement("div");
        songElement.classList.add("song");

        // Read embedded album cover from MP3 metadata
        jsmediatags.read(song.file, {
            onSuccess: tag => {
                let imageData = tag.tags.picture;
                let base64String = "";

                if (imageData) {
                    let data = imageData.data;
                    let format = imageData.format;
                    base64String = `data:${format};base64,${btoa(String.fromCharCode(...data))}`;
                } else {
                    base64String = "default-album.jpg"; // Fallback image
                }

                songElement.innerHTML = `
                    <img src="${base64String}" alt="${song.title}">
                    <div>
                        <h3>${song.title}</h3>
                        <p>${song.artist}</p>
                    </div>
                    <button onclick="playSong('${song.file}')">Play</button>
                `;

                player.appendChild(songElement);
            },
            onError: error => {
                console.log("Error reading metadata:", error);
            }
        });
    });
}

function playSong(file) {
    const audio = document.getElementById("audio");
    audio.src = file;
    audio.play();
}

loadMusic();
