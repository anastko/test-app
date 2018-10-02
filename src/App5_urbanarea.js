import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


class App5_urbanarea extends React.Component {

	state = {
    urban_info: [],
	urban_photo: '',
    pending: false
  };

  async componentDidMount() {
    this.setState({ pending: true });
    try {
      const response = await fetch(this.props.urban_link + "images/?image");
      const urban_info = await response.json();
      this.setState({ pending: false, urban_info, urban_photo: urban_info.photos[0].image.web });
    } catch (e) {
      // TODO: handle the error!
    }
  }

	
	 render(){
	  	if (this.state.pending) {
			return <div>Loading...</div>;
		}
		return (
		<div className="BlockApp">
		<img src={this.state.urban_photo} className="Head-pic" alt="City"></img>		
		</div>
		);
  }
}
export default App5_urbanarea;