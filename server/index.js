if(typeof window === 'undefined') {
    global.window = {}
}

const express = require('express')
const fs = require('fs')
const path = require('path')
const { renderToString } = require('react-dom/server')
const ssr = require('../dist/search-server')
const template = fs.readFileSync(path.join(__dirname,'../dist/search.html'),'utf-8')

const server = (port) => {
    const app = express()
    app.use(express.static('../dist'))
    app.get('/search',function(req,res){
        const html = renderMarkup(renderToString(ssr))
        //console.log(html)
        res.status(200).send(html)
    })
    app.listen(port,function(){
        console.log('server listen on port:' + port)
    })
}

const port = process.env.PORT || 3000
server(port)

const renderMarkup = (str) => {
    return template.replace('<!--HTML_PLACEHOLDER-->',str)
}