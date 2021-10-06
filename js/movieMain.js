const API_KEY = 'api_key=5b541ef827d0ecc1d400febb79004786'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie;
        const movieElements = document.createElement('div');
        movieElements.classList.add('movie');
        movieElements.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getVoteColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="sinopsis">
            <h3>Sinopsis</h3>
            ${overview}            
            </div>
        `

        main.appendChild(movieElements);
    })
}

function getVoteColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}