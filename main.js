$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

$(function () {
    $('[data-toggle="popover"]').popover()
})

$("[data-toggle=popover]")
.popover({html:true})

var artists = ["eminem", "metallica", "behemoth"]

function loadMusic(artist){
    for(var i = 0; i < artist.length; i++){
        fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist[i], {
            headers: {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "27579eb660msh15a2248514f7b35p1ae83djsnf94b95f7dc4d"
            },
            method: "GET"
        })
        .then(res => res.json())
        .then(songsRes => {
            console.log(songsRes)
            let songs = songsRes.data
            var spinner = document.querySelector(".spinner-border.text-warning")
            spinner.style.display ="none"

            var albumsDiv = document.querySelector("#div-with-music")

            songs.forEach(song => {
                albumsDiv.innerHTML += `
                    <div class="col-sm-3">
                        <img src="${song.album.cover_medium}" />
                        <div>
                            <span>${song.title}</span>
                        </div>
                    </div>
                `
                console.log(song.album.cover)
            });
        })
    }
}


window.onload = function(){
    loadMusic(artists)
    setTimeout(loadMusic, 2000) 
}
