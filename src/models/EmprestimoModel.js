import Model from "./Model";

export default class EmprestimoModel extends Model {
  resource() {
    return "emprestimo";
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

  async update(id, data) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'put',
      url: `${this.resource()}/${id}`,
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

  async getByUsuarioId(usuarioId) {
    return await this.request({
      method: "get",
      url: `${this.resource()}/usuario/${usuarioId}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async getByExemplarId(exemplarId) {
    return await this.request({
      method: "get",
      url: `${this.resource()}/exemplar/${exemplarId}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async renovar(id) {
    return await this.request({
      method: "post",
      url: `${this.resource()}/${id}/renovar`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
  }

  async finalizar(id) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'put',
      url: `${this.resource()}/${id}/finalizar`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}