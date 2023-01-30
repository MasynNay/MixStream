// creating variable that holds api key and api host, using headers 
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
//setting global variables textInput and searchInput variable are grabbing id from html and leaving last two variables undefined to define later on
var textInput = document.querySelector('#textInput')
var searchBtn = document.querySelector('#search-button')
var search
var imdbCode
//creating and stopping functions to link apis
function getUtelly() {
    var utellyURL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${search}&country=us`
    return utellyURL
}
function getTitle() {
    var imdbUrl = `https://imdb-api.com/en/API/Title/k_gxh3r11l/${imdbCode}/FullCast,Posters,Ratings`
    return imdbUrl;
}
//creating function to prevent default and allows adding text input into search variable
function searchOption(event) {
    event.preventDefault()
    search = textInput.value
    // console.log(search);
    
    //creating async function to have task be eventually completed with request and promise
    async function utellyInfo() {
        // response var is given await operator before fetch method is called 
        // await operator it waits until promise is completed before movingonto next line fo code

        //we are calling the fetch method using two arguments the getUtelly function and options.
        // fetch function is starting a request from api
        const response = await fetch(getUtelly(), options)
        // if request is completed than we use response.json to convert data into .json
        const data = await response.json()
        // console.log(data);
        //giving imdbCode variable value of data results from imdb api
        imdbCode = data.results[0].external_ids.imdb.id
        // console.log(imdbCode);
        
        // declaring restults var and giving it the value of first ine results of the data
        var results = data.results[0]
        // declaaring favoriteE1 variable to grab all favorites class in html
        var favoriteEl = document.querySelector('.favorites')
        //adding html element that include button where the favorites class is
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
         posterEl.innerHTML = `<img alt="media poster" src="${imdbData.image}">`
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

  
// TODO: set movies into local storage
// TODO: call local storage to display to grid
// TODO: add event listener for favorite button
// TODO: add event listener for favorite results