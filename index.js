const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const express = require('express')
const app = express()

const es6Renderer = require('express-es6-template-engine')
app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

const server = http.createServer(app)

const db = require('./db')

app.get('/', (req, res) => {
    console.log(req.url);
    res.render("home", {
        partials: {
            head: "/partials/head",
        }
    })
})

app.get('/dogs', (req, res) => {
    console.log('request path is:'+ req.path);
    console.log(db);
    res.render('dogs-list', {
        locals: {
            dogs: db,
            path: req.path
        },
        partials: {
            head: '/partials/head'
        }
    })
})

app.get('/dogs/:name', (req, res) => {
    console.log(req.params.name);
    var {name} = req.params

    var dog = db.find(thisDog => thisDog.name === name)
    if (dog) {
        console.log(dog);
        
        res.render("dog", {
          locals: {
            dog,
          },
          partials: {
            head: "/partials/head",
            image: "/partials/img"
          },
        });
    } else {
        res.status(404)
            .send('NO DOGGOS HERE')
    }
})

server.listen(port, hostname, () => {
    console.log(`server is running http://${hostname}:${port}`);
})