import Model from "./Model"

export default class EditoraModel extends Model {
    resource() {
        return "editora"
    }

    async all() {
        const token = localStorage.getItem('jwt');
        return await this.request({
            method: "get",
            url: this.resource(),
            headers: { Authorization: `Bearer ${token}` },
        })
    }

    async search(query = "") {
        if (query === "") {
            return await this.all()
        }

        const token = localStorage.getItem('jwt');
        return await this.request({
            method: "get",
            url: `${this.resource()}/search`,
            params: { query },
            headers: { Authorization: `Bearer ${token}` },
        })
    }

    async find(id) {
        const token = localStorage.getItem('jwt');
        return await this.request({
            method: "get",
            url: `${this.resource()}/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
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
            url: `${this.resource()}`,
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
}  
