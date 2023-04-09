class Api {
    #baseUrl;
    #headers;

    constructor({baseUrl, headers}) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
    }

    getAllInfo() {
        return Promise.all([this.getProductList(), this.getUserInfo()]);
    }

    getProductList() {
        return fetch(`${this.#baseUrl}products`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo() {
        return fetch(`${this.#baseUrl}users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    search(searchQuery) {
        return fetch(`${this.#baseUrl}products/search?query=${searchQuery}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }
    
    setUserInfo({name, about}) {
        return fetch(`${this.#baseUrl}users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({ name, about })
        })
            .then(this.#onResponse)
    }

    changeLikeProductStatus(productId, like) {
        return fetch(`${this.#baseUrl}products/likes/${productId}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }

    getProductById(idProduct) {
        return fetch(`${this.#baseUrl}products/${idProduct}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getInfoProduct(idProduct) {
        return Promise.all([this.getProductById(idProduct), this.getAllInfo()]);
    }

}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru/',
    headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MjYiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.sqIQ6FkLmkSRJbAtbV963NCko8tf-ZtgBkydVfv05S0',
        'content-type': 'application/json'
    }
})

export default api;