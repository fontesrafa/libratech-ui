import Model from "./Model";

export default class ExemplarModel extends Model {
  resource() {
    return "exemplar";
  }

  async all() {
    return await this.request({
      method: "get",
      url: this.resource(),
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async find(id) {
    return await this.request({
      method: "get",
      url: `${this.resource()}/${id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async searchByLivroId(livroId) {
    return await this.request({
      method: "get",
      url: `${this.resource()}/livro/${livroId}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async create(data) {
    const token = localStorage.getItem("jwt");
    return await this.request({
      method: "post",
      url: this.resource(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
  }

  async update(id, data) {
    const token = localStorage.getItem("jwt");
    return await this.request({
      method: "put",
      url: `${this.resource()}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
  }

  async delete(id) {
    const token = localStorage.getItem("jwt");
    return await this.request({
      method: "delete",
      url: `${this.resource()}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}