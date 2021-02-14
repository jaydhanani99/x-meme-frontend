import React, { Component } from "react";
import MemeDataService from "../services/meme.service";
import { Link } from "react-router-dom";

export default class MemesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchCaption = this.onChangeSearchCaption.bind(this);
        this.retrieveMemes = this.retrieveMemes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMeme = this.setActiveMeme.bind(this);
        this.removeAllMemes = this.removeAllMemes.bind(this);
        this.searchCaption = this.searchCaption.bind(this);

        this.state = {
        memes: [],
        currentMeme: null,
        currentIndex: -1,
        searchCaption: ""
        };
    }

    componentDidMount() {
        this.retrieveMemes();
    }

    onChangeSearchCaption(e) {
        const searchCaption = e.target.value;

        this.setState({
        searchCaption: searchCaption
        });
    }

    retrieveMemes() {
        MemeDataService.getAll()
        .then(response => {
            this.setState({
            memes: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveMemes();
        this.setState({
        currentMeme: null,
        currentIndex: -1
        });
    }

    setActiveMeme(meme, index) {
        this.setState({
        currentMeme: meme,
        currentIndex: index
        });
    }

    removeAllMemes() {
        MemeDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }

    searchCaption() {
        MemeDataService.findByCaption(this.state.searchCaption)
        .then(response => {
            this.setState({
            memes: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { searchCaption, memes, currentMeme, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by caption"
                  value={searchCaption}
                  onChange={this.onChangeSearchCaption}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchCaption}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Memes List</h4>
    
              <ul className="list-group">
                {memes &&
                  memes.map((meme, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveMeme(meme, index)}
                      key={index}
                    >
                      {meme.caption}
                    </li>
                  ))}
              </ul>
    
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllMemes}
              >
                Remove All
              </button>
            </div>
            <div className="col-md-6">
              {currentMeme ? (
                <div>
                  <h4>Meme</h4>
                  <div>
                    <label>
                      <strong>Caption:</strong>
                    </label>{" "}
                    {currentMeme.caption}
                  </div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentMeme.name}
                  </div>
                  <div>
                    <label>
                      <strong>URL:</strong>
                    </label>{" "}
                    {currentMeme.url}
                  </div>
    
                  <Link
                    to={"/memes/" + currentMeme.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Meme...</p>
                </div>
              )}
            </div>
          </div>
        );
    }
}