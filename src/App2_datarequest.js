import React, { Component } from 'react';
import './App.css';
import App3_showcountries from "./App3_showcountries";


class App2_datarequest extends React.Component {

	state = {
	country: this.props.country,
    country_data: [],
	capital_data: '',
	currency: '',
    pending: false,
	error: false
  };
  

	
		async componentDidMount() {
		this.setState({ pending: true });
		try {
		  const response = await fetch("https://restcountries.eu/rest/v2/name/" + this.state.country + "?fields=name;capital;currencies");
		  const country_data = await response.json();
		  this.setState({ pending: false, country_data, capital_data: country_data[0].capital, currency: country_data[0].currencies[0].code });
		} catch (e) {
			this.setState({ error: true });
		  // TODO: handle the error!
		}
	  }
	  
	  
	  render(){
			if (this.state.error) {
				return <div>Error appear. Please, write the correct name of a country.</div>;
			}
			
			if (this.state.pending) {
				return <div>Loading...</div>;
			}
								  
			return (
			<App3_showcountries capital={this.state.capital_data} currency={this.state.currency} oslo_cost={this.props.oslo_cost} oslo_safe={this.props.oslo_safe} oslo_tol={this.props.oslo_tol}/>
			
			);
		  }


  
}


export default App2_datarequest;