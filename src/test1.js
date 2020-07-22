import './test1.css'
import React from 'react'
import ReactDOM from 'react-dom'
import sayHi from './common/common'
import largeNumber from 'my-large-number'

class Test extends React.Component {
    constructor(){
        super(...arguments)
        this.state = {
            Text: ''
        }
    }
    handleClick(){
        import('./common/test.js').then(res => {
            this.setState({
                Text: res.default
            })
        })
    }
    render() {
        const {Text} = this.state
        const addRes = largeNumber('1','99999')
        return (
            <div className="container" onClick = {this.handleClick.bind(this)}>
                <p>hello test</p>
                {Text ? <Text/> : ''}
                <p>{addRes}</p>
            </div>
        )
    }
}

ReactDOM.render(<Test/>,document.getElementById('root'))