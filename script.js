async function loadMusic() {
    const response = await fetch('music/metadata.json');
    const songs = await response.json();
    const player = document.getElementById("player");

    songs.forEach(song => {
        let songElement = document.createElement("div");
        songElement.classList.add("song");
        songElement.innerHTML = `
            <img src="music/${song.cover}" alt="${song.title}">
            <div>
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>
            <button onclick="playSong('${song.file}')">Play</button>
        `;
        player.appendChild(songElement);
    });
}

function playSong(file) {
    const audio = document.getElementById("audio");
    audio.src = `music/${file}`;
    audio.play();
}

loadMusic();
