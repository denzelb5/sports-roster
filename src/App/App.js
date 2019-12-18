import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import Navbar from '../components/Navbar/Navbar';
import TeamBoard from '../components/TeamBoard/TeamBoard';


import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }


  renderView = () => {
    const { authed } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    return (<TeamBoard />);
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Navbar authed={authed} />
        { this.renderView() }
      </div>
    );
  }
}

export default App;
