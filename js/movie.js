//TMBD API

const API_KEY = 'api_key=5b541ef827d0ecc1d400febb79004786'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const search_url = BASE_URL + '/search/movie?' + API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
]

const main = document.getElementById('main');
const movieForm = document.getElementById('formBuscador');
const search = document.getElementById('search');
const tagsElements = document.getElementById('tags');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

let generoSeleccionado = []
setGenre()
function setGenre() {
    tagsElements.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(generoSeleccionado.lenght == 0){
                generoSeleccionado.push(genre.id);
            }else{
                if(generoSeleccionado.includes(genre.id)){
                    generoSeleccionado.forEach((id, idx) => {
                        if(id == genre.id){
                            generoSeleccionado.splice(idx, 1);
                        }
                    })
                }else{
                    generoSeleccionado.push(genre.id);
                }
            }
            getMovies(API_URL + '&with_genres=' + encodeURI(generoSeleccionado.join(',')));
            seleccionHighlight()
        })
        tagsElements.append(t);
    })
}

function seleccionHighlight() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(generoSeleccionado.length !=0){   
        generoSeleccionado.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }
}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            generoSeleccionado = [];
            setGenre();
            getMovies(API_URL);
        })
        tagsElements.append(clear);

    }

    
}

//------------------------------------------------------------------//

getMovies(API_URL);

function getMovies(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
                prev.classList.add('disabled');
                next.classList.remove('disabled')
              }else if(currentPage>= totalPages){
                prev.classList.remove('disabled');
                next.classList.add('disabled')
              }else{
                prev.classList.remove('disabled');
                next.classList.remove('disabled')
            }

            tagsElements.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">No se encontraron resultados :( </h1>`
        }        
    })
}

//------------------------------------------------------------------//

function showMovies(data) {
    main.innerHTML = '';


    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieElements = document.createElement('div');
        movieElements.classList.add('movie');
        movieElements.innerHTML = `
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getVoteColor(vote_average)}">${vote_average}</span>
         </div>

        <div class="sinopsis">

            <h3>Sinopsis</h3>
            ${overview} 
            <br/>
            <button class="know-more" id="${id}" > Trailers </button>        
        </div>
        `

        main.appendChild(movieElements);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id);
            openNav(movie);
        })
    })
}

const overlayContent = document.getElementById('overlay-content');

//------------------------------------------------------------------//


function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
      console.log(videoData);
      if(videoData){
        document.getElementById("myNav").style.width = "100%";
        if(videoData.results.length > 0){
          var embed = [];
          var dots = [];
          videoData.results.forEach((video, idx) => {
            let {name, key, site} = video
  
            if(site == 'YouTube'){
                
              embed.push(`
                <iframe width="760" height="515" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
            `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
            }
          })

          var content = `
            <h1 class="no-results">${movie.original_title}</h1>
            <br/>
        
            ${embed.join('')}
            <br/>

            <div class="dots">${dots.join('')}</div>
            `
          
          overlayContent.innerHTML = content;
          activeSlide= 0;
          showVideos()
        }else{
          overlayContent.innerHTML = `<h1 class="no-results">No se encontraron resultados :( </h1>`
        }
      }
    })
  }

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

//------------------------------------------------------------------//

var activeSlide = 0;
var totalVideos = 0;

function showVideos(){
    let embedClasses = document.querySelectorAll('.embed');
    totalVideos = embedClasses.lenght;
    let dots = document.querySelectorAll('.dot');
  
    totalVideos = embedClasses.length; 
    embedClasses.forEach((embedTag, idx) => {
      if(activeSlide == idx){
        embedTag.classList.add('show')
        embedTag.classList.remove('hide')
  
      }else{
        embedTag.classList.add('hide');
        embedTag.classList.remove('show')
      }
    })

    dots.forEach((dot, indx) => {
        if(activeSlide == indx){
            dot.classList.add('active');
        }else{
            dot.classList.remove('active');
        }
    })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  }else{
    activeSlide = totalVideos -1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  }else{
    activeSlide = 0;
  }
  showVideos()
})

function getVoteColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

//------------------------------------------------------------------//

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    generoSeleccionado = [];
    seleccionHighlight()
    setGenre();
    if(searchTerm) {
        getMovies(search_url+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }
})

prev.addEventListener('click', () => {
    if(prevPage > 0){
      pageCall(prevPage);
    }
})

next.addEventListener('click', () => {
    if(nextPage <= totalPages){
      pageCall(nextPage);
    }
})
  
  function pageCall(page){
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page'){
      let url = lastUrl + '&page='+page
      getMovies(url);
    }else{
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length -1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] +'?'+ b
        getMovies(url);
    }
}