import React from 'react'
import ReactDom from 'react-dom'
import './index.less'
import Project from '../image/project1.png'

class HelloWebpack extends React.Component{
    render() {
        return (
            <div className='content'>
                <p>search page</p>
                <img src={Project} />
            </div>
        )
    }
}

ReactDom.render(<HelloWebpack/>,document.getElementById('root'))