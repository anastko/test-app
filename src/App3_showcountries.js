import React, { Component } from 'react';
import './App.css';
import App4_citydata from "./App4_citydata";


class App3_showcountries extends React.Component {

	state = {
    city_data: [],
	city_link: '',
    pending: false,
	error: false
  };

  async componentDidMount() {
    this.setState({ pending: true });
    try {
      const response = await fetch("https://api.teleport.org/api/cities/?search=" + this.props.capital);
      const city_data = await response.json();
      this.setState({ pending: false, city_data, city_link: city_data._embedded["city:search-results"][0]._links["city:item"].href });
    } catch (e) {
		this.setState({ error: true });
      // TODO: handle the error!
    }
  }

 render(){
	  
	  if (this.state.error) {
				return <div>Unfortunately, there is no data for this country</div>;
			}
			
	  if (this.state.pending) {
			return <div>Loading...</div>;
		}
		
		return (
		
		<div className="ContainerApp">		
		<div className="BlockApp"> <h1 className="App-title">Capital - {this.props.capital}</h1></div>
		<div className="BlockApp"><h1 className="App-title">Currency - {this.props.currency}</h1></div>
		<App4_citydata city_link={this.state.city_link} oslo_cost={this.props.oslo_cost} oslo_safe={this.props.oslo_safe} oslo_tol={this.props.oslo_tol} />
		</div>
		
		);
  }
  
}

export default App3_showcountries;