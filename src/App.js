import './App.css';
import React from 'react';
import { Octokit } from "@octokit/core";

const token = process.env.token;

let repos;

const octokit = new Octokit({
  auth: token,
  baseUrl: 'https://api.github.com',
})

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      names: null,
      language: "",
      repos: null,
      organizedRepos: {names: []}
    }
  }

  

  async componentDidMount() {
    let error = '';
    try {
      const { data:root } = await octokit.request("GET /search/repositories", {
        q: `stars:>=10 created:>2021-02-07 language:python`
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
    //this.getNames();
    console.log(repos);
    console.log(this.state.repos)
    //console.log(this.state.names);
  }

  async getResults() {
    let error = '';
    try {
      const { data:root } = await octokit.request("GET /search/repositories", {
        q: `stars:>=10 created:>2021-02-07 language:${this.state.language}`
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
    //this.getNames();
    console.log(repos);
    console.log(this.state.repos)
    console.log(this.state.repos[0].full_name);
    console.log(this.state.repos[0].id);
  }


  /*getNames() {
    let full_name = [];
    for(let repo of this.state.repos){
        full_name.push(repo.full_name);

    this.setState({
      names: full_name,
      //organizedRepos: {names: this.state.names}
    })
    console.log(this.state.names);
    //console.log(this.state.organizedRepos);
    }
  }*/

  handleChange (event) {
    this.setState({ language: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({language: ''})
    this.getResults();
    //console.log(this.state.language)
    
    
    
  }

  render(){
    let itemsJsx = this.state.repos.map(repo => {
      return <li key={repo.id}>{repo.full_name}</li>
    })
    //let namesJsx = "hi" //this.state.names.map(name => (
      //<li>
        //{name}
      //</li>
    //));

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
      {this.state.repos}
      ? <ul>{itemsJsx}</ul>
    : <p>Hello</p>
    </div>
    )
  }
  

}

export default App;
