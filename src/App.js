import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMeme from "./components/add-meme.component";
import Meme from "./components/meme.component";
import MemesList from "./components/meme-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/memes" className="navbar-brand">
            Memes App
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/memes"} className="nav-link">
                Memes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/memes"]} component={MemesList} />
            <Route exact path="/add" component={AddMeme} />
            <Route path="/memes/:id" component={Meme} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
