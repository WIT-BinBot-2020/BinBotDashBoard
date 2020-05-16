import Api from './api'

export default {
    piStats (timeRange) {
        if(timeRange.sysTimeRangeDays === ""){
            timeRange.sysTimeRangeDays = 1
        }
        if(timeRange.sysTimeRangeHours === ""){
            timeRange.sysTimeRangeHours = 1
        }
        if(timeRange.sysTimeRangeMins === ""){
            timeRange.sysTimeRangeMins = 1
        }
        return Api().get("piStats?rangeDays="+timeRange.sysTimeRangeDays+"&rangeHours="+timeRange.sysTimeRangeHours+"&rangeMinutes="+timeRange.sysTimeRangeMins)
    },
    batLevel () {
        return Api().get('batLevel')
    },
    recentMessages() {
        return Api().get('recentMessages')
    },
    micAngle(timeRange) {
        if(timeRange.sysTimeRangeDays === ""){
            timeRange.sysTimeRangeDays = 1
        }
        if(timeRange.sysTimeRangeHours === ""){
            timeRange.sysTimeRangeHours = 1
        }
        if(timeRange.sysTimeRangeMins === ""){
            timeRange.sysTimeRangeMins = 1
        }
        return Api().get("micAngleArrival?rangeDays="+timeRange.sysTimeRangeDays+"&rangeHours="+timeRange.sysTimeRangeHours+"&rangeMinutes="+timeRange.sysTimeRangeMins)
    },
    commandFrequency(){
        return Api().get("commandFrequency")
    },
    keywordFrequency(){
        return Api().get("micKeyword")
    }
}
