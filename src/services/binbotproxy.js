import Api from './api'

export default {
    piStats (timeRange) {
        if(timeRange === ""){
            timeRange = 30
        }
        console.log(typeof timeRange)
        return Api().get("piStats?range="+timeRange)
    },
    batLevel () {
        return Api().get('batLevel')
    },
    recentMessages() {
        return Api().get('recentMessages')
    }
}
