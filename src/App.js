import './App.css';
import React from 'react';
import { Octokit } from "@octokit/core";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const token = process.env.token;

const octokit = new Octokit({
  auth: token,
  baseUrl: 'https://api.github.com',
})

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language: "",
      repos: null,
    }
  }

  async componentDidMount() {
    let error = '';
    let repos = null;
    try {
      const { data:root } = await octokit.request("GET /search/repositories", {
        q: `stars:>=1000 created:>2021-02-07`
      });

      if({data:root}.data["items"]) {
        // server acknowledged request: no data received yet
        repos = await {data:root}.data["items"]; // wait for your data to arrive
      }
    } catch (err) {
    // server not contacted
    error = `EXCEPTION: ${err.message}`
    }
    
    this.setState({
      repos: repos,
    })
  }

  async getResults() {
    let error = '';
    let repos = null;
    try {
      const { data:root } = await octokit.request("GET /search/repositories", {
        q: `stars:>=100 created:>2021-02-07 language:${this.state.language}`
      });

      if({data:root}.data["items"]) {
        // server acknowledged request: no data received yet
        repos = await {data:root}.data["items"]; // wait for your data to arrive
      } else {
        // server contacted; error occured
        error = `ERROR: ${{data:root}.status} ${{data:root}.statusText}`;
      }
    } catch (err) {
    // server not contacted
    error = `EXCEPTION: ${err.message}`
    }
    
    this.setState({
      repos: repos
    })
  }

  handleChange(event) {
    this.setState({ language: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({language: ''})
    this.getResults(); 
  }

  render(){
    return(
      <Container fluid className="App">
        <h1>Top Repos of the Week!</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            name='language'
            placeholder="Insert language"
            value={this.state.language}
            onChange={(e) => this.handleChange(e)}
          />
          <Button variant="info"
            type="submit"
          >Search
          </Button>
        </form>
        {(this.state.repos)
          ? <ul>
            {this.state.repos.map(repo => {
              return <li key={repo.id}>&#128309;<span id="underline">{repo.full_name}</span>&nbsp;&#128311;{repo.language}<br />
               {repo.description}</li>
            })}
          </ul>
        : <h3>Something went wrong. Try again</h3>
        }
      </Container>
    )
  }
  

}

export default App;
