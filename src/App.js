import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './App.css';
import App2_datarequest from "./App2_datarequest";



class App extends Component {
  
  	state = {
	oslo_info: [],
	oslo_cost: 0,
	oslo_safe: 0,
	oslo_tol: 0,
    pending: false
  };
  
   async componentDidMount() {
    this.setState({ pending: true });
    try {
      const response = await fetch("https://api.teleport.org/api/urban_areas/slug:oslo/scores/");
      const oslo_info = await response.json();
      this.setState({ pending: false, oslo_info, oslo_cost: oslo_info.categories[1].score_out_of_10, oslo_safe: oslo_info.categories[7].score_out_of_10, oslo_tol: oslo_info.categories[15].score_out_of_10  });
    } catch (e) {
      // TODO: handle the error!
    }
  }
  
  
  
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
   
  }

  handleSubmit(event) {
				
		ReactDOM.render(			
		<App2_datarequest country={this.state.value} oslo_cost={this.state.oslo_cost} oslo_safe={this.state.oslo_safe} oslo_tol={this.state.oslo_tol} />
		, document.getElementById('answer'));	
		event.preventDefault();

  }
  

  
  render() {

    return (
      <div className="BlockApp">
        <header className="App-header">          
          <h1 className="App-title">Are you planning to travel abroad?</h1>
		  <h1 className="App-title">Discover this country!</h1>
        </header>
       <form onSubmit={this.handleSubmit}>
       <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Country name.." />
	   <input type="submit" value="Submit" />		
	    </form>
   
      </div>
    );
  }
}

export default App;
