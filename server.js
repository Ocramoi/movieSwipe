const express = require('express'),
      path = require("path"),
      app = express(),
      port = 5500;

let usrMvs = {};

app.use(express.static('public'));

function checkMovies() {
    for (movie in usrMvs[Object.keys(usrMvs)[0]]) {
        let found = 0;
        for (i = 1; i < Object.keys(usrMvs).length; i++) {
            console.log(`Searching for ${usrMvs[Object.keys(usrMvs)[0]][movie]} in ${usrMvs[Object.keys(usrMvs)[i]]}`);
            if (usrMvs[Object.keys(usrMvs)[i]].includes(usrMvs[Object.keys(usrMvs)[0]][movie]))
                found++;
        }
        if (found == Object.keys(usrMvs).length - 1) return usrMvs[Object.keys(usrMvs)[0]][movie];
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

    if(!usrMvs[req.params["usr"]]) {
        usrMvs[req.params["usr"]] = [];
        res.send("200");
    }
    else
        res.send("500");
    
    console.log("Users: ", Object.keys(usrMvs));
});

app.listen(port, () => {
    app.use(express.static(path.join(__dirname, 'public')));
    console.log(`Server at localhost:${port}`);
});