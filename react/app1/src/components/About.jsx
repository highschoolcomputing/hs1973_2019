import React from 'react';

class About extends React.Component {

  constructor(props) {
  	super(props);
  	this.state = {
  	  count: 0,
  	  name: '',
  	};

	this.increaseNumber = this.increaseNumber.bind(this);
  }

  increaseNumber() {
  	this.setState({
  	  count: this.state.count + 1,
  	});
  }

  render() {
  	console.log('Render!');
    return (
    	<div>
	    	<h1>This is the about page</h1>
	    	<button onClick={this.increaseNumber}>Click me!</button>
	    	<div>The count is {this.state.count}</div>
	    	{
	    		(this.state.count > 0) && (
	    		    <div>Let's go!</div>
	    		)
	    	}
	    </div>
    );
  }
}

export default About;