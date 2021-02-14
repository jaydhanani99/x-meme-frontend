import React, { Component } from "react";
import MemeDataService from "../services/meme.service";

export default class AddMeme extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeUrl = this.onChangeUrl.bind(this);

        this.saveMeme = this.saveMeme.bind(this);
        this.newMeme = this.newMeme.bind(this);

        this.state = {
        id: null,
        name: "",
        caption: "", 
        url: "",

        submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
        name: e.target.value
        });
    }

    onChangeCaption(e) {
        this.setState({
        caption: e.target.value
        });
    }

    onChangeUrl(e) {
        this.setState({
        url: e.target.value
        });
    }

    saveMeme() {
        var data = {
            name: this.state.name,
            caption: this.state.caption,
            url: this.state.url,
        };

        MemeDataService.create(data)
        .then(response => {
            this.setState({
            id: response.data.id,
            name: response.data.name,
            caption: response.data.caption,
            url: response.data.url,

            submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    newMeme() {
        this.setState({
        id: null,
        name: "",
        caption: "",
        url: "",

        submitted: false
        });
    }

    render() {
        return (
        <div className="submit-form">
            {this.state.submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newMeme}>
                Add
                </button>
            </div>
            ) : (
            <div>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                />
                </div>

                <div className="form-group">
                <label htmlFor="caption">Caption</label>
                <input
                    type="text"
                    className="form-control"
                    id="caption"
                    required
                    value={this.state.caption}
                    onChange={this.onChangeCaption}
                    name="caption"
                />
                </div>

                <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                    type="text"
                    className="form-control"
                    id="url"
                    required
                    value={this.state.url}
                    onChange={this.onChangeUrl}
                    name="url"
                />
                </div>

                <button onClick={this.saveMeme} className="btn btn-success">
                Submit
                </button>
            </div>
            )}
        </div>
        );
    }
}