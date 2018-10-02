import React, { Component } from 'react';
import './App.css';
import App5_urbanarea from "./App5_urbanarea";
import App5_urbanscore from "./App5_urbanscore";

class App4_citydata extends React.Component {


	state = {
    city_info: [],
	urban_link: '',
    pending: false,
	error: false
  };

  async componentDidMount() {
    this.setState({ pending: true });
    try {
      const response = await fetch(this.props.city_link);
      const city_info = await response.json();
      this.setState({ pending: false, city_info, urban_link: city_info._links["city:urban_area"].href });
    } catch (e) {
		this.setState({ error: true });
      // TODO: handle the error!
    }
  }

 render(){
	 
	 	  if (this.state.error) {
				return <div className="BlockApp">Unfortunately, there is no detailed data for this country</div>;
			}
	  if (this.state.pending) {
			return <div>Loading...</div>;
		}
		
		return (
		
		<div>
		<App5_urbanscore urban_link={this.state.urban_link} oslo_cost={this.props.oslo_cost} oslo_safe={this.props.oslo_safe} oslo_tol={this.props.oslo_tol} />
		<App5_urbanarea urban_link={this.state.urban_link} />
		</div>

		);
  }
  
}
export default App4_citydata;