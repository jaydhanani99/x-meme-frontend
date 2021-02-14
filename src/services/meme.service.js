import http from "../http-common";

class MemeDataService {
  getAll() {
    return http.get("/memes");
  }

  get(id) {
    return http.get(`/memes/${id}`);
  }

  create(data) {
    return http.post("/memes", data);
  }

  update(id, data) {
    return http.put(`/memes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/memes/${id}`);
  }

  deleteAll() {
    return http.delete(`/memes`);
  }

  findByCaption(caption) {
    return http.get(`/memes?caption=${caption}`);
  }
}

export default new MemeDataService();