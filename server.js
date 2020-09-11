const express = require('express');
const path = require("path");
const app = express();
const port = 5500;

let usrMvs = {};

app.use(express.static('public'));

function checkMovies() {
    if (Object.keys(usrMvs).length != 2 || usrMvs[Object.keys(usrMvs)[0]].length < 1 || usrMvs[Object.keys(usrMvs)[1]].length < 1)
        return false;
    
    for (movie in usrMvs[Object.keys(usrMvs)[0]]) {
        for (movie2 in usrMvs[Object.keys(usrMvs)[1]]) {
            if (usrMvs[Object.keys(usrMvs)[0]][movie] == usrMvs[Object.keys(usrMvs)[1]][movie2])
                return usrMvs[Object.keys(usrMvs)[0]][movie];
        }
    }

    return false;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.htm"));
});

app.get('/add/:usr/:movie', (req, res) => {
    usrMvs[req.params["usr"]].push(req.params["movie"]);

    console.log(`Current list: `, usrMvs);

    let check = checkMovies();
    if (check) {
        usrMvs = {};
        res.send(check)
    }
    else {
        res.send("NULL")
    }
});

app.get('/setUser/:usr', (req, res) => {

    if(!usrMvs[req.params["usr"]] && Object.keys(usrMvs).length < 2) {
        usrMvs[req.params["usr"]] = [];
        res.send("200");
    }
    else
        res.send("500");
    
    console.log("Users: ", Object.keys(usrMvs));
});

app.listen(port, () => {
    app.use(express.static(path.join(__dirname, 'public')));
    console.log(`Server at http://localhost:${port}`);
});