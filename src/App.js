import './App.css';
import React from 'react';
import { Octokit } from "@octokit/core";

//const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: "757d06a58049e0c3602a1d512b5a1763772da940",
  baseUrl: 'https://api.github.com',
})
//const octokit = new Octokit({ auth: `757d06a58049e0c3602a1d512b5a1763772da940` });
//const git_url = 'https://api.github.com/'

//const queryString = 'q=' + encodeURIComponent('GitHub Octocat in:readme user:defunkt');

//const response = await octokit.request("GET https://api.github.com/search/code", {
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
    //let url = `${git_url}search/code/?${queryString}`;
    let error = '';
    let repos = null;

    
    try {
      let response = await octokit.request("GET /search/code", {
        q: 'python'
      });
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
