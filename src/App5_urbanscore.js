import React, { Component } from 'react';
import './App.css';


class App5_urbanscore extends React.Component {

	state = {
    urban_info: [],
	urban_cost: 0,
	urban_safe: 0,
	urban_tol: 0,
	cost_pr: 0,
	safe_pr: 0,
	tol_pr: 0,
    pending: false
  };

  async componentDidMount() {
    this.setState({ pending: true });
    try {
      const response = await fetch(this.props.urban_link + "scores/");
      const urban_info = await response.json();
      this.setState({ pending: false, urban_info, 
						urban_cost: urban_info.categories[1].score_out_of_10, 
						urban_safe: urban_info.categories[7].score_out_of_10, 
						urban_tol: urban_info.categories[15].score_out_of_10 });
	  this.setState({ cost_pr: (this.state.urban_cost / this.props.oslo_cost).toFixed(1),
					  safe_pr: (this.state.urban_safe / this.props.oslo_safe).toFixed(1),
					  tol_pr: (this.state.urban_tol / this.props.oslo_tol).toFixed(1),
						});
    } catch (e) {
      // TODO: handle the error!
    }
  }
  


	
	 render(){
	  	if (this.state.pending) {
			return <div>Loading...</div>;
		}
		else{
		return (
		<div className="BlockApp">	
		<h2> Cost of living there in {this.state.cost_pr} times cheaper </h2>
		<h2> There is in {this.state.safe_pr} times more safe then in Norway </h2>
		<h2> There is in {this.state.tol_pr} times more tolerant then Norway </h2>
		</div>
		)
		};
  }
}
export default App5_urbanscore;