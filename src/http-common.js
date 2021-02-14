import axios from "axios";

export default axios.create({
  baseURL: "https://x-meme.tk/api",
  headers: {
    "Content-type": "application/json"
  }
});