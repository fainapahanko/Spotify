$(window).scroll(function () {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

$(function () {
    $('[data-toggle="popover"]').popover()
})

$("[data-toggle=popover]")
    .popover({ html: true })

const checkID = () => {
    const params = new URLSearchParams(location.search);
    if (params.has("albumID")) {
        
        const albumID = params.get("albumID");
        fetchAlbum(albumID);
    }
    else console.log("No ID found.")
};

const fetchAlbum = albumID => {
    fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + albumID, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            'x-rapidapi-key': '986f49e8damsh99c9341f49f5e58p13eb47jsn7fef840e6245'
        }
    })
        .then(album => album.json())
        .then(album => {
            populateAlbum(album);
            // let songList = album.tracks.data.map(track => track.title)
            
            let songList = album.tracks.data.map(data => {
                let songTitle = data.title;
                let songPreviewLink = data.preview;
                return {songTitle,songPreviewLink}
            })
            populateSongList(songList);
        })
};

const populateAlbum = album => {
    // console.log("album: ", album);
    // console.log("tracks title: ", album.tracks.data);
    // console.log("title: ", album.title)
    // console.log("album image: ", album.cover_big)
    // console.log("genre's name: ", album.genres.data[0].name)
    document.querySelector(".album-detail img").src = album.cover_big
    document.querySelector(".album-detail .card-title").innerText = album.title
    document.querySelector(".album-detail .list-group").innerHTML = `
        <li class="list-group-item bg-dark">Genre: ${album.genres.data[0].name}</li>
        <li class="list-group-item bg-dark">Duration: 4637</li>
        <li class="list-group-item bg-dark">Fans: 387475</li>
        <li class="list-group-item bg-dark">Release Date: 2007-09-13</li>
        `
}

const populateSongList = songList => {
    
    for (const song of songList) {
        document.querySelector(".song-list .list-group").innerHTML += `
        <li class="list-group-item bg-dark" data-link="${song.songPreviewLink}" onclick="playSong()">${song.songTitle}</li>
        `

    }
}

const playSong = () => {
    document.querySelector("#player").src=event.target.dataset.link;
    document.querySelector("#player").play();
}

window.onload = checkID();
