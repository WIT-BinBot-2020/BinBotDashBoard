import Api from './api'

export default {
    piStats (timeRange) {
        if(timeRange === ""){
            timeRange = 1
        }
        console.log(typeof timeRange)
        return Api().get("piStats?range="+timeRange)
    },
    batLevel () {
        return Api().get('batLevel')
    },
    recentMessages() {
        return Api().get('recentMessages')
    },
    micAngle(timeRange) {
        if(timeRange === ""){
            timeRange = 1
        }
        return Api().get('micAngleArrival?range='+timeRange)
    }
}
