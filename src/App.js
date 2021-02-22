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

let full_name = [];

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      names: null,
      language: "",
      repos: null
    }
  }

  

  async getResults() {
    //console.log(language)
    let error = '';
    try {
      const { data:root } = await octokit.request("GET /search/repositories", {
        q: `stars:>=10 created:>2021-02-07 language:${this.state.location}`
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
    
    this.setState({
      repos: repos,
      name1: repos[0]["full_name"],
      name2: repos[1]["full_name"],
      name3: repos[2]["full_name"],
    })
    this.getNames();
  }

  getNames() {
    for(let repo of this.state.repos){
        full_name.push(repo.full_name);
      //console.log(repo["full_name"]);
      //r.push(repos["fullname"]);
      //console.log(repo)
      //console.log(repo[r])
      //console.log(full_name);
    }
    //console.log(this.state.location);
    //console.log(full_name);
    //console.log(this.state.repos);
    //console.log(this.state.name1);

    this.setState({
      names: full_name,
    })
    console.log(this.state.names);
  }

  handleChange (event) {
    this.setState({ language: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({language: this.state.language})
    this.getResults();
    
    
    
  }

  render(){
    let namesJsx = this.state.names.map(name => (
      <li>
        {name}
      </li>
    ));

    return(
    <div className="App">
      <h1>Hello World!</h1>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          name='language'
          placeholder="Search for a specific language"
          value={this.state.language}
          onChange={(e) => this.handleChange(e)}
        />
        <button
          type="submit"
        >Search
        </button>
      </form>
      <h3>{this.state.name1}</h3>
      <h3>{this.state.name2}</h3>
      <h3>{this.state.name3}</h3>
      <ul>{namesJsx}</ul>
    </div>
    )
  }
  

}

export default App;
