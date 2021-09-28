const searchSong = () =>{
    const searchText = document.getElementById("search-input").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();
    // load data
    fetch(url)
    .then(response => response.json())
    .then(data => displaySong(data))
    .catch(error => displayError(error))
};

// const searchSong = async() =>{
//     const searchText = document.getElementById("search-input").value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     // load data
//     const response = await fetch(url);
//     const data = await response.json();
//     displaySong(data)
// };

const displaySong = songs => {
    const songNamesList = document.getElementById("songs-container");
    songNamesList.innerHTML = "";
    songs.data.forEach(song => {
        // console.log(song);
        const Div = document.createElement("div");
        Div.className = "single-result row align-items-center my-3 p-3";
        const singleSong = `
        <div class="col-md-9">
             <h3 class="lyrics-name">${song.album.title}</h3>
             <p class="author lead">Album by <span>${song.artist.name}</span></p>
             <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
             </audio> 
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick = "lyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        Div.innerHTML = singleSong;
        songNamesList.appendChild(Div);
        toggleSpinner();
    });
}

// const lyric = (artist,title) =>{
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     // load data
//     fetch(url)
//     .then(response => response.json())
//     .then(data => displayLyric(data))
// };
const lyric = async(artist,title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    toggleSpinner();
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLyric(data);
    } catch (error) {
        displayError('Sorry!Something went wrong.')
    }


 }
//  search btn
document.getElementById('search-input').addEventListener('keypress',function(event){
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});

 const displayLyric = data =>{
     document.getElementById("search-input").style.display = "none";
     document.getElementById("search-button").style.display = "none";
     document.getElementById("songs-container").style.display = "none";
     
     if (data.lyrics === null) {
         const showLyrics = document.getElementById("show-lyrics");
         const errorHandle = `
            <h3>Oppps! There is no lyrics here</h3>
         `
         showLyrics.innerHTML = errorHandle;

         const button = document.createElement("button");
         button.className = "btn";
         button.innerText = "Back";
         showLyrics.appendChild(button);
         button.addEventListener("click",() =>{
            document.getElementById("search-input").style.display = "block";
            document.getElementById("search-button").style.display = "block";
            document.getElementById("songs-container").style.display = "block";
            document.getElementById("show-lyrics").style.display = "none";
         })
     }
     else{
        const showLyrics = document.getElementById("show-lyrics");
        showLyrics.innerText = data.lyrics;

        const button = document.createElement("button");
        button.className = "btn";
        button.innerText = "Back";
        showLyrics.appendChild(button);
        button.addEventListener("click",() =>{
           document.getElementById("search-input").style.display = "block";
           document.getElementById("search-button").style.display = "block";
           document.getElementById("songs-container").style.display = "block";
           document.getElementById("show-lyrics").style.display = "none";
        })
     }
     toggleSpinner();
 }

 const displayError = error => {
    document.getElementById("search-input").style.display = "none";
    document.getElementById("search-button").style.display = "none";
     const errorDiv = document.getElementById("error-message");
     const errorMessage = `
        <h3>${error}</h3>
     `
     errorDiv.innerHTML = errorMessage;

     const button = document.createElement("button");
         button.className = "btn";
         button.innerText = "Back";
         errorDiv.appendChild(button);
         button.addEventListener("click",() =>{
            document.getElementById("search-input").style.display = "block";
            document.getElementById("search-button").style.display = "block";
            errorDiv.style.display = "none";
         })
         toggleSpinner();
 }

//  spinners

const toggleSpinner = () => {
            const spinner = document.getElementById('spinner-control');
            const songs = document.getElementById('songs-container');
            spinner.classList.toggle('d-none');
            songs.classList.toggle('d-none');
}