import Model from './Model';

export default class UsuarioModel extends Model {
  resource() {
    return 'usuario';
  }

  async create(data) {    
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'post',
      url: `${this.resource()}/register`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
      data
    });
  }

  async login(data) {
    return await this.request({
      method: 'post',
      url: `${this.resource()}/login`,
      data
    });
  }
  
  async authenticate(data) {
    return await this.request({
      method: 'post',
      url: `${this.resource()}/authenticate`,
      data
    });
  }

  async getById(id) {
    const token = localStorage.getItem('jwt');
    return await this.request({
      method: 'get',
      url: `${this.resource()}/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}