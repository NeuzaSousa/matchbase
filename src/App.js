import './App.css';
import React from 'react';
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: `757d06a58049e0c3602a1d512b5a1763772da940` });
const git_url = 'https://api.github.com/'

//const queryString = 'q=' + encodeURIComponent('GitHub Octocat in:readme user:defunkt');

//const response = await octokit.request("GET /search/code", {
  //q: 'q'
//});

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      repos: null
    }
  }

  async componentDidMount() {
    let url = `${git_url}?q={'python'}`;
    //let weather = null;
    let error = '';
    //let today = new Date();
    let repos = null;

    
    try {
      let response = await fetch(url);
      //let response = await octokit.request("GET /search/code", {
        //q: 'GitHub Octocat in:readme user:defunkt'
      //});
      if(response.ok) {
        // server acknowledged request: no data received yet
        repos = await response.json(); // wait for your data to arrive
      } else {
        // server contacted; error occured
        error = `ERROR: ${response.status} ${response.statusText}`;
      }
    } catch (err) {
      // server not contacted
      error = `EXCEPTION: ${err.message}`;
    }
    
    this.setState({
      repos: repos,
    })
    console.log(this.state.repos);
  }

  render(){
    return(
    <div className="App">
      <h1>Hello World!</h1>
      <button></button>
    </div>
    )
  }
  

}

export default App;
