import React from 'react'
import ReactDOM from 'react-dom'
import sayHi from './common/common'

class Test2 extends React.Component {
    render() {
        return (
            <div className="container">hello test2</div>
        )
    }
}

ReactDOM.render(<Test2/>,document.getElementById('root'))