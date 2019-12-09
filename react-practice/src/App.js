import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/Login/Login';
import Upload from './components/upload/Upload';
import {fire, storage} from './configFire/Fire';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Uploaded from './components/uploaded/uploaded';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}, 
      redirect: false
    }
  }

  componentDidMount(){
    this.authListener();
  }

  /**
   * 
   */
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null});
        localStorage.removeItem('user');
      }
    });
  }

  handleRedirect(){
    this.setState({redirect: true})
  }

  render(){
    return (
      <Router>
        <Switch>
          <React.Fragment>
            <Header />
            <Route exact path="/" render={() =>(
              this.state.user ? ( <Route component={() => <Upload changeRedirect={this.handleRedirect.bind(this)} />} />)
              : (<Route component={Login} />)
            )} />
            
            <Route path="/uploaded" render={() => (
              this.state.redirect && <Route component={Uploaded}/>
            )}/>
            <Footer />
          </React.Fragment>
        </Switch>
      </Router>
    );
  }
}

export default App;
