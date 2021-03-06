import React, { Component } from 'react';
import GithubHelpers from '../utils';

export default class GithubUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repos: null
    };
  }

  componentWillMount() {
    const username = this.props.match.params.username;
    GithubHelpers.getUserInfo(username).then( (info) => {
      this.setState({user: info.data});
    });

    GithubHelpers.getUserRepos(username).then( (info) => {
      this.setState({repos: info.data})
    })
  }

  render() {
    return (
      <div>
        <h1>User Info</h1>
        <Profile user={this.state.user}/>
        <Repositories repos={this.state.repos}/>
      </div>
    );
  }
}


class Profile extends Component {
  render() {
    if (this.props.user === null) {
      return(<div>Loading...</div>);
    }

    const {followers, following, repos, gists} = this.props.user;

    return (
      <div>
        <h2>Stats</h2>

        <p>Followers: {followers}</p>
        <p>Following: {following}</p>
        <p>Repos: {repos}</p>
        <p>Gists: {gists}</p>
      </div>

    );
  }
}


class Repositories extends Component {
  render() {
    if (this.props.repos === null) {
      return(<div>Loading...</div>);
    }

    let userRepos = this.props.repos.map( (r) => {
      return (
        <li>
          <a href={r.html_url} target="_blank">
            {r.name}
          </a>
        </li>
      )
    })

    return (
      <div>
        <h2>User repositories</h2>
        <ul>
          {userRepos}
        </ul>
      </div>
    );
  }
}
