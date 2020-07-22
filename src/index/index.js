import React from 'react'
import ReactDom from 'react-dom'
import './index.less'
import Project from '../image/project2.png'

class HelloWebpack extends React.Component{
    render() {
        const { test } = this.state
        return (
            <div className='content'>
                <p>index page</p>
                <img src={Project}/>
            </div>
        )
    }
}

ReactDom.render(<HelloWebpack/>,document.getElementById('root'))