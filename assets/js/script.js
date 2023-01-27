const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5bbcec0fa9mshc8a0723caf4ce16p15234ejsn8849c7d1039c',
        'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
    }
};
var textInput = document.querySelector('#textInput')
var searchBtn = document.querySelector('#search-button')
var search
var imdbCode

function getUtelly() {
    var utellyURL = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${search}&country=us`
    return utellyURL
}

function searchOption(event) {
    event.preventDefault()
    search = textInput.value
    console.log(search);

    async function utellyInfo() {
        const response = await fetch(getUtelly(), options)
        const data = await response.json()
        console.log(data);
        imdbCode = data.results[0].external_ids.imdb.id
        console.log(imdbCode);

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
    }

    return utellyInfo()
}

//TODO: create display of list for the icons to appear. This may require 
// a loop. 


searchBtn.addEventListener("click", searchOption)
