async function loadMusic() {
    const repoUrl = "https://api.github.com/repos/your-username/your-repo/contents/";
    const response = await fetch(repoUrl);
    const files = await response.json();

    const player = document.getElementById("player");

    for (const file of files) {
        if (file.name.endsWith(".mp3")) {
            const songUrl = file.download_url;

            jsmediatags.read(songUrl, {
                onSuccess: tag => {
                    let imageData = tag.tags.picture;
                    let base64String = "";
                    let songTitle = tag.tags.title || file.name.replace(".mp3", "");
                    let songArtist = tag.tags.artist || "Unknown Artist";

                    if (imageData) {
                        let data = imageData.data;
                        let format = imageData.format;
                        base64String = `data:${format};base64,${btoa(String.fromCharCode(...data))}`;
                    } else {
                        base64String = "default-album.jpg"; // Fallback image
                    }

                    let songElement = document.createElement("div");
                    songElement.classList.add("song");
                    songElement.innerHTML = `
                        <img src="${base64String}" alt="${songTitle}">
                        <div>
                            <h3>${songTitle}</h3>
                            <p>${songArtist}</p>
                        </div>
                        <button onclick="playSong('${songUrl}')">Play</button>
                    `;
                    player.appendChild(songElement);
                },
                onError: error => {
                    console.log("Error reading metadata:", error);
                }
            });
        }
    }
}

function playSong(file) {
    const audio = document.getElementById("audio");
    audio.src = file;
    audio.play();
}

loadMusic();
