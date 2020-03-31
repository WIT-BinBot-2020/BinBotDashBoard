import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: 'http://34.246.184.109:5000'
    })
}
