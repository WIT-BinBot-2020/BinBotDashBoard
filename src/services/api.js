import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: 'http://52.19.82.33:5000'
    })
}
