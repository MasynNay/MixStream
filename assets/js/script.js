const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5bbcec0fa9mshc8a0723caf4ce16p15234ejsn8849c7d1039c',
        'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
    }
};
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
var textInput = document.querySelector('#textInput')
var searchBtn = document.querySelector('#search-button')
var search
var imdbCode

function getUtelly() {
    var utellyURL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${search}&country=us`
    return utellyURL
}
function getTitle() {
    var imdbUrl = `https://imdb-api.com/en/API/Title/k_gxh3r11l/${imdbCode}/FullCast,Posters,Ratings`
    return imdbUrl;
}

function searchOption(event) {
    event.preventDefault()
    search = textInput.value
    // console.log(search);

    async function utellyInfo() {
        const response = await fetch(getUtelly(), options)
        const data = await response.json()
        // console.log(data);
        imdbCode = data.results[0].external_ids.imdb.id
        // console.log(imdbCode);

        var results = data.results[0]
        var favoriteEl = document.querySelector('.favorites')
        favoriteEl.innerHTML = `<h3>Search Results For: ${results.name}</h3> <button class="button button-like">
        <span>Favorite</span>
        <i class="fa fa-star"></i>
        </button>`

        var streamingResultsEl = document.querySelector('.streaming-results')
        streamingResultsEl.innerHTML = data.results[0].locations.map((movie) => {
            return `<a href="${movie.url}">
            <img class="marketing-site-content-section" src="${movie.icon}" alt="${movie.display_name} icon">
            </a>`
        }).join(' ');

        const imdbResults = await fetch(getTitle(), requestOptions)
        const imdbData = await imdbResults.json()
        console.log(imdbData);
        var posterEl = document.querySelector('#imdb-poster')
         posterEl.innerHTML = `<img id="movie-poster" alt="media poster" src="${imdbData.image}">`
        var ratingsEl = document.querySelector('#imdb-ratings')
         ratingsEl.innerHTML = `<p>IMDB Rating: ${imdbData.imDbRating}</p>`
        var castEl = document.querySelector('#imdb-cast')
         castEl.innerHTML = imdbData.fullCast.actors.map((actor, idx) => {
            if (idx <= 2) {
                return `<li>${actor.name} as ${actor.asCharacter}</li>`
            }
         }).join('')
         
    }

   

    return utellyInfo()
}

//TODO: create display of list for the icons to appear. This may require 
// a loop. 


searchBtn.addEventListener("click", searchOption)


   
var searchBtn = document.querySelector('#search-btn')
var search = document.textInput;


  function getImdb () {
    var imdbUrl = `https://imdb-api.com/en/Search/k_gxh3r11l`
    return imdbUrl;
};


function imdbResponse () {

}


//searchBtn.addEventListener('click', getImdb());

  
// TODO: set movies into local storage in search-history ul
// TODO: call local storage to display to grid
// TODO: add event listener for favorite button
// TODO: add event listener for favorite results