import React, { Component } from "react";
import MemeDataService from "../services/meme.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { Card, CardColumns } from 'react-bootstrap';
import Moment from 'react-moment';

export default class MemesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchCaption = this.onChangeSearchCaption.bind(this);
        this.retrieveMemes = this.retrieveMemes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMeme = this.setActiveMeme.bind(this);
        this.removeAllMemes = this.removeAllMemes.bind(this);
        this.searchCaption = this.searchCaption.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.state = {
        memes: [],
        currentMeme: null,
        currentIndex: -1,
        searchCaption: "",

        page: 1,
        count: 0,
        pageSize: 5,
        };
      this.pageSizes = [5, 10, 15];
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
        const { searchCaption, page, pageSize } = this.state;
        const params = this.getRequestParams(searchCaption, page, pageSize);
        MemeDataService.getAll(params)
        .then(response => {
            const { data, total_pages } = response.data;
            this.setState({
            memes: data,
            count: total_pages,
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    handlePageChange(event, value) {
      this.setState(
        {
          page: value,
        },
        () => {
          this.retrieveMemes();
        }
      );
    }

    handlePageSizeChange(event) {
      this.setState(
        {
          pageSize: event.target.value,
          page: 1
        },
        () => {
          this.retrieveMemes();
        }
      );
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
            memes: response.data.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    getRequestParams(searchCaption, page, pageSize) {
      let params = {};
  
      if (searchCaption) {
        params["caption"] = searchCaption;
      }
  
      if (page) {
        params["page"] = page;
      }
  
      if (pageSize) {
        params["page_size"] = pageSize;
      }
  
      return params;
    }

    render() {
        const { searchCaption, memes, currentMeme, currentIndex, page, count, pageSize } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
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
            <div className="row">
              <h4>Memes List</h4>
              <div>
              <CardColumns>
              {memes &&
                  memes.map((meme, index) => (
                      <Card>
                        <Card.Img style={{maxWidth: "250px", maxHeight: "250px"}} variant="top" src={meme.url} />
                        <Card.Body>
                          <Card.Title>{meme.name}</Card.Title>
                          <Card.Text>{meme.caption}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <div style={{ display: "flex" }}>
                            <small className="text-muted"><Moment format="h:mm A">{meme.created_at}</Moment></small>
                            <Link
                              to={"/memes/" + meme.id}
                              className="badge badge-warning"
                              style={{ marginLeft: "auto"}}
                            >
                              Edit
                            </Link>
                          </div>
                        </Card.Footer>
                      </Card>
                    
                  ))}
              </CardColumns>
              </div>
              {/* <ul className="list-group">
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
                      <div style={{ display: "flex" }}>
                        <div style={{fontWeight: "bold"}}>{meme.name}</div>
                        <Link
                          to={"/memes/" + meme.id}
                          className="badge badge-warning"
                          style={{ marginLeft: "auto", height: "fit-content" }}
                        >
                          Edit
                        </Link>
                      </div>
                      <div style={{paddingLeft: "5px"}}>{meme.caption}</div>
                      <div>
                      <img style={{marginTop: "7px", maxWidth: "250px", maxHeight: "250px"}}
                        src={`${meme.url}?auto=compress&cs=tinysrgb&h=150`}
                        alt={meme.caption}
                        /></div>
                    </li>
                  ))}
              </ul> */}
              <div className="mt-3">
                {"Items per Page: "}
                <select onChange={this.handlePageSizeChange} value={pageSize}>
                  {this.pageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <Pagination
                  className="my-3"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={this.handlePageChange}
                />
              </div>

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
    
                  {/* <Link
                    to={"/memes/" + currentMeme.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link> */}
                </div>
              ) : (
                <div>
                  <br />
                  {/* <p>Please click on a Meme...</p> */}
                </div>
              )}
            </div>
          </div>
        );
    }
}