import React from 'react';
import './App.css';
import { Header } from './common'
import { BreweryIndex } from './components/brewery/BreweryIndex'
import { Auth } from './components/auth/Auth'
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import { MemberView } from './components/profile/MemberView'
import { PostView } from './components/post/PostView'
import { Sitebar } from './common/Navbar'


type AppState = {
  token: string
  userRole: string
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props)
    this.state = {
      token: "",
      userRole: ""
    }
  }

  // ifAuth = (comp: JSX.Element) => {
  //   return this.state.token ? comp: <Redirect to="/login" /> 
  // }

  componentDidMount(): void {
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token')
      })
    }
  }

  updateToken = (t: string): void => {
    localStorage.setItem('token', t);
    this.setState({ token: t })
    console.info(this.state.token);
  }

  clearToken = (): void => {
    localStorage.clear();
    this.setState({ token: "" })
  }

  // protectedViews = () => {
  //   return this.state.token === localStorage.getItem('token') ? (<MemberView token={this.state.token} />) : (<Auth updateToken={this.updateToken} />)
  // }

  render() {
    return (
      <div className="App">
        {/* {this.state.token && ( */}
        <Sitebar
          logout={this.clearToken}
          token={this.state.token}
          //userRole={this.state.userRole}
        />
        <Switch>
          <Route exact path="/">
            <Header />
            {/* //  <Auth updateToken={this.updateToken}/>  */}
          </Route>
          <Route exact path="/login">
            <Auth updateToken={this.updateToken} />
          </Route>
          <Route exact path="/member">
            <MemberView token={this.state.token} />
            <PostView token={this.state.token} />
          </Route>
          <Route path="/brewery">
            <BreweryIndex token={this.state.token} />
          </Route>
        </Switch>
        {/* {this.state.token === localStorage.getItem('token') ? <MemberView token={this.state.token} /> : <Auth updateToken={this.updateToken} />
        } */}
      </div>
    );
  }
}

export default App;
