import Model from "./Model"

export default class AutorModel extends Model {
  resource() {
    return "autor"
  }

  async all() {
    return await this.request({
      method: "get",
      url: this.resource(),
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
  }

  async search(query = "") {
    if (query === "") {
      return await this.all()
    }

    return await this.request({
      method: "get",
      url: `${this.resource()}/search`,
      params: { query },
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
  }

  async find(id) {
    return await this.request({
      method: "get",
      url: `${this.resource()}/${id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
  }
  async create(data) {
    return await this.request({
      method: "post",
      url: `${this.resource()}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data,
    })
  }
  async update(id,data) {
    return await this.request({
      method: "put",
      url: `${this.resource()}/${id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      data,
    })
  }
  async delete(id) {
    return await this.request({
      method: "delete",
      url: `${this.resource()}/${id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
  }
}
