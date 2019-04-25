import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as clipActionFns from './services/clips/actions';
import './App.css';
import { bindActionCreators } from 'redux';
import User from './components/user';

class App extends Component {
  static propTypes = {
    clipAction: PropTypes.shape({
      fetchUsers: PropTypes.func.isRequired,
      fetchClips: PropTypes.func.isRequired,
      transcribeClip: PropTypes.func.isRequired,
    }),
  }

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    this.props.clipActions.fetchUsers();
  }

  render() {
    const { clips } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          twitch2text: Transcribe Twitch Clips
        </header>
        <div className="container">
          <div className='row'>
            <div className="col-4">Name</div>
            <div className="col-2">Description</div>
            <div className="col-2"></div>
            <div className="col-2"></div>
            <div className="col-2"></div>
          </div>
          {this.props.users.map(user => (<User key={user.login.url} {...user} />))}

        </div>
      </div>
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  clipActions: bindActionCreators(clipActionFns, dispatch),
});

const mapStateToProps = (state) => {
  return {
    users: state.clips.users || [],
    clips: state.clips.clips // TODO this is really a subset of each user but our API returns all the clips
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
