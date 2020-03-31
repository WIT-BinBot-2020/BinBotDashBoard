import Api from './api'

export default {
    piStats () {
        return Api().get("piStats")
    },
    batLevel () {
        return Api().get('batLevel')
    }
}
