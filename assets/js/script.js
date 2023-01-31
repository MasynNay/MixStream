//Required variable for Utelly fetch
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5bbcec0fa9mshc8a0723caf4ce16p15234ejsn8849c7d1039c',
        'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
    }
};

// Required variable for IMDB fetch
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

//Search engine variables
var textInput = document.querySelector('#textInput')
var searchBtn = document.querySelector('#search-button')
var search

//code pulled from Utelly API request
var imdbCode

//Variables for favorite feature
var favoriteBtn = document.querySelector('#favorite-button')
var favorites = []
var searchTxt = ''

//Utelly API URL function
function getUtelly() {
    var utellyURL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${search}&country=us`
    return utellyURL
}

//IMDB API URL function
function getTitle() {
    var imdbUrl = `https://imdb-api.com/en/API/Title/k_2lt7mvky/${imdbCode}/FullCast,Posters,Ratings`
    return imdbUrl;
}

var favoriteEl = document.querySelector('.favorites')

var title;

function searchOption(event) {
   if (event) {
    event.preventDefault();
   }
    
    // console.log(search);

    async function utellyInfo() {
        const response = await fetch(getUtelly(), options)
        const data = await response.json()
        console.log(data);
        imdbCode = data.results[0].external_ids.imdb.id
        // console.log(imdbCode);

        var results = data.results[0]
        title = results.name
        favoriteEl.innerHTML = `<h3>Search Results For: ${results.name}</h3> <button id="favorite-button" class="button button-like">
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
         posterEl.innerHTML = `<img id="imdb-poster" alt="media poster" src="${imdbData.image}">`
        var ratingsEl = document.querySelector('#imdb-ratings')
         ratingsEl.innerHTML = `<p>IMDB Rating: ${imdbData.imDbRating}</p> <h5> Actors: </h5>`
        var castEl = document.querySelector('#imdb-cast')
         castEl.innerHTML = imdbData.fullCast.actors.map((actor, idx) => {
            if (idx <= 2) {
                return `<li>${actor.name} as ${actor.asCharacter}</li>`
            }
         }).join('')
         
         
         renderFavorites()
        }
        
        
        
        return utellyInfo()
    }
    
    
searchBtn.addEventListener("click", searchOption)


function saveToLocalStorage(name) {
    textInput.value = ''
    if (favorites.includes(name)){
        return
    }
    favorites.push(name)
    localStorage.setItem('Show', JSON.stringify(favorites))
}

var favoritesList = document.querySelector('.search-history')

function renderFavorites () {
    favoritesList.innerHTML = ''
    for (var i = 0; i < favorites.length; i++) {
        var favorite = favorites[i]
        
        var btn = document.createElement("button")
        btn.textContent = favorite
        btn.setAttribute("data-value", favorites[0])
        
        btn.classList.add("listButtons")
        btn.classList.add("button-like")
        favoritesList.appendChild(btn)
    }
}

function init() {
    var storedFavorites = JSON.parse(localStorage.getItem('Show'))
    
    if (storedFavorites !== null) {
        favorites = storedFavorites
    }
    renderFavorites()
    
}

favoritesList.addEventListener('click', function(event) {
    var btn = event.target
    console.log(btn.innerText);
    search = btn.innerText
    searchOption()
})  

textInput.addEventListener("change", function() {
    search = textInput.value
})

favoriteEl.addEventListener('click', function (event) {
    var btn = event.target
    console.log(btn);
    saveToLocalStorage(title)
    renderFavorites()
})

init()


  
// TODO: set movies into local storage in search-history ul
// TODO: call local storage to display to grid
// TODO: add event listener for favorite button
// TODO: add event listener for favorite results