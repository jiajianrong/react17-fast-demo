import React, { Component } from 'react';

class Sub extends Component {
	componentDidMount(){
    // 将子组件指向父组件的变量
		this.props.onRef && this.props.onRef(this);
	}
	callback(){
		console.log("执行sub(child)")
	}
	render(){
		return (<div>子组件</div>);
	}
}

export default class Super extends Component {
	handleOnClick(){
    console.log(this);
       // 可以调用子组件方法
		this.Sub.callback();
	}
	render(){
		return (
      <div>
        <div onClick={this.handleOnClick.bind(this)}>click</div>
        <Sub onRef={ node => this.Sub = node }></Sub>	
      </div>
    )
	}
}



