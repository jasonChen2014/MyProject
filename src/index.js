import React from 'react'
import ReactDom from 'react-dom'
import './index.less'

class HelloWebpack extends React.Component{
	render() {
		return (
			<div className='content'>
				<div className='div1'>
					<div className='box'>
						<div className='box-top'>top</div>
						<div className='box-bottom'>
							<div className='box-bottom-inner'>bottom</div>
						</div>
					</div>
				</div>
				<div className='div2'>888888888888888888888</div>
			</div>
		)
	}
}

ReactDom.render(<HelloWebpack/>,document.getElementById('root'))