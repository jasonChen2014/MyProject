// import React from 'react'
// import ReactDom from 'react-dom'
// import './index.less'
// import Project from '../image/project1.png'

const React = require('react')
const logo = require('../image/project2.png')
require('./index.less')

class HelloWebpack extends React.Component{
    render() {
        return (
            <div className='content'>
                <p>search page a a a a a</p>
                <img src={logo} />
            </div>
        )
    }
}

module.exports = <HelloWebpack />