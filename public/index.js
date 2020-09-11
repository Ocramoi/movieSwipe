const reqUrl = "https://api.themoviedb.org/3/movie/popular?api_key=513df0bded1a89e014e12c618875c242&language=en-US&page=",
      posterUrl = "https://image.tmdb.org/t/p/w780"

const posterImg = document.getElementById("moviePoster"),
      yasBut = document.getElementById("yas"),
      nopBut = document.getElementById("nop");

let currentPage = 0,
    currentMovies;

let usrNm = prompt("Username: ");
let usrReq = new XMLHttpRequest();
usrReq.onload = (e) => {
    if (usrReq.response != "200") { 
        usrNm = prompt("Please try a different username: ");
        usrReq.open("GET", `/setUser/${usrNm}`);
        usrReq.send();
    }
    else
        startSwipe();
};
usrReq.open("GET", `/setUser/${usrNm}`);
usrReq.responseType = 'text';
usrReq.send();

yasBut.addEventListener("click", () => {
    posterImg.className = "swipe-right";
    addMovie(posterImg.alt);
    setTimeout(newMovie, 1000);
    if (currentMovies.length < 4) loadMovies();
});

nopBut.addEventListener("click", () => {
    posterImg.className = "swipe-left";
    setTimeout(newMovie, 1000);
    if (currentMovies.length < 4) loadMovies();
});

function startSwipe() {
    loadMovies();
}

function loadMovies() {
    currentPage++;
    let req = new XMLHttpRequest();
    req.onload = (e) => {
        console.log(req.response);
        if (Array.isArray(currentMovies))
            currentMovies.concat(req.response.results);
        else
            currentMovies = req.response.results;
        currentMovies = shuffle(currentMovies);
        if (currentPage == 1) newMovie();
    };
    req.open("GET", reqUrl + currentPage);
    req.responseType = 'json';
    req.send();
}

function newMovie() {
    posterImg.className = "";
    let posterPath = currentMovies[0].poster_path,
        movieTitle = currentMovies[0].title;

    posterImg.src = posterUrl + posterPath;
    posterImg.alt = movieTitle;

    currentMovies.shift();
}

function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function addMovie(title, poster) {
    let addReq = new XMLHttpRequest();
    addReq.onload = (e) => {
        if (addReq.response != "NULL") { 
            document.getElementById("match").style = "display: grid";
            document.getElementById("matchTitle").innerHTML = addReq.response;
        }
    };
    addReq.open("GET", `/add/${usrNm}/"${title}"`);
    addReq.responseType = 'text';
    addReq.send();
}