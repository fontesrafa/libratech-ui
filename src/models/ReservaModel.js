import Model from "./Model";

export default class ReservaModel extends Model {
  resource() {
    return "reserva";
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

  async create(data) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'post',
      url: `${this.resource()}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    });
  }

  async update(data) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'put',
      url: `${this.resource()}/${data.id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    });
  }

  async delete(id) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'delete',
      url: `${this.resource()}/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async search(query = "", pageNumber = 1, pageSize = 2) {
    const params = {
      pageNumber,
      pageSize
    };
    if (query) {
      params.query = query;
    }

    return await this.request({
      method: "get",
      url: `${this.resource()}/search`,
      params,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async getByUsuarioId(usuarioId) {
    return await this.request({
      method: "get",
      url: `${this.resource()}/usuario/${usuarioId}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async cancelar(id) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'put',
      url: `${this.resource()}/${id}/cancelar`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async concluir(id) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'put',
      url: `${this.resource()}/${id}/concluir`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}