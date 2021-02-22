import './App.css';
import React from 'react';
import { Octokit } from "@octokit/core";

//const { Octokit } = require("@octokit/rest");

const token = process.env.token;

let repos;

const octokit = new Octokit({
  auth: token,
  baseUrl: 'https://api.github.com',
})
//const octokit = new Octokit({ auth: `757d06a58049e0c3602a1d512b5a1763772da940` });
//const git_url = 'https://api.github.com/'

//const queryString = 'q:' + encodeURIComponent('python');

//const response = await octokit.request("GET https://api.github.com/search/code", {
  //q: 'q'
//});

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: [],
      repos: null,
      name1: null,
      name2: null,
      name3: null,
    }
  }

  

  async componentDidMount() {
    let error = '';

    try {
      const { data:root } = await octokit.request("GET /search/repositories", {
        q: 'Github language: python'
      });
      if({data:root}.data["items"]) {
        // server acknowledged request: no data received yet
        repos = await {data:root}.data["items"]; // wait for your data to arrive
      } else {
        // server contacted; error occured
        //error = `ERROR: ${response.status} ${response.statusText}`;
      }
    } catch (err) {
    // server not contacted
    error = `EXCEPTION: ${err.message}`
    }

    for(let repo of repos){
      let full_name = [];
      full_name.push([repo["full_name"]]);
      console.log(full_name);
      console.log(repo["full_name"]);
      //r.push(repos["fullname"]);
      //console.log(repo)
      //console.log(repo[r])
    }
    
    this.setState({
      repos: repos,
      name1: repos[0]["full_name"],
      name2: repos[1]["full_name"],
      name3: repos[2]["full_name"],
    })
    //console.log(this.state.repos);
    //console.log(this.state.name1);
  }

  render(){
    //let repo;
    //for(repo of repos){
        //<li>repo["full_name"]</li>
    //}
    
    /*let reposJsx = this.state.repos.map(r => (
      <li key={r.full_na>
        {r.full_name}
      </li>
    ));*/

    return(
    <div className="App">
      <h1>Hello World!</h1>
      <h3>{this.state.name1}</h3>
      <h3>{this.state.name2}</h3>
      <h3>{this.state.name3}</h3>
      {/*<ul>{repo}</ul>*/}
    </div>
    )
  }
  

}

export default App;
