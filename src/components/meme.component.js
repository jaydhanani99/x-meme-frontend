import React, { Component } from "react";
import MemeDataService from "../services/meme.service";

export default class Meme extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.getMeme = this.getMeme.bind(this);
        this.updateMeme = this.updateMeme.bind(this);

        this.state = {
        currentMeme: {
            id: null,
            name: "",
            caption: "",
            url: "",
        },
        message: ""
        };
    }

    componentDidMount() {
        this.getMeme(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
        return {
            currentMeme: {
            ...prevState.currentMeme,
            name: name
            }
        };
        });
    }

    onChangeCaption(e) {
        const caption = e.target.value;

        this.setState(function(prevState) {
        return {
            currentMeme: {
            ...prevState.currentMeme,
            caption: caption
            }
        };
        });
    }

    onChangeUrl(e) {
        const url = e.target.value;

        this.setState(function(prevState) {
        return {
            currentMeme: {
            ...prevState.currentMeme,
            url: url
            }
        };
        });
    }

    getMeme(id) {
        MemeDataService.get(id)
        .then(response => {
            this.setState({
            currentMeme: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateMeme() {
        MemeDataService.update(
        this.state.currentMeme.id,
        this.state.currentMeme
        )
        .then(response => {
            console.log(response.data);
            this.setState({
            message: "The meme was updated successfully!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { currentMeme } = this.state;
    
        return (
          <div>
            {currentMeme ? (
              <div className="edit-form">
                <h4>Meme</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={currentMeme.name}
                        onChange={this.onChangeName}
                        disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="caption">Caption</label>
                        <input
                        type="text"
                        className="form-control"
                        id="caption"
                        value={currentMeme.caption}
                        onChange={this.onChangeCaption}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Url</label>
                        <input
                        type="text"
                        className="form-control"
                        id="url"
                        value={currentMeme.url}
                        onChange={this.onChangeUrl}
                        />
                    </div>
                </form>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateMeme}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                {/* <p>Please click on a Meme...</p> */}
              </div>
            )}
          </div>
        );
    }
}