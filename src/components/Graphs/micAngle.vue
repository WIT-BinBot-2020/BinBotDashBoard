<div>
    <Radar v-if="loaded" :chartdata="this.chartdata" :options="this.options"/>
</div>

<script>
    import {Radar} from 'vue-chartjs'
    import binbotproxy from "@/services/binbotproxy";

    export default {
        name: "micAngle",
        compnents: {Radar},
        extends: Radar,
        data() {
            return {
                loaded: false,
                chartdata: {},
                options: {},
                sortedAngleData: {
                    "0": [],
                    "10": [],
                    "20": [],
                    "40": [],
                    "60": [],
                    "70": [],
                    "80": [],
                    "90": [],
                    "100": [],
                    "110": [],
                    "120": [],
                    "130": [],
                    "140": [],
                    "150": [],
                    "160": [],
                    "170": [],
                    "180": [],
                    "190": [],
                    "200": [],
                    "210": [],
                    "220": [],
                    "230": [],
                    "240": [],
                    "250": [],
                    "260": [],
                    "270": [],
                    "280": [],
                    "290": [],
                    "300": [],
                    "310": [],
                    "320": [],
                    "330": [],
                    "340": [],
                    "350": [],
                    "360": []
                },
                rangeLengths: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                binbotproxy.micAngle(30).then(
                    response => {
                        this.filterAngles(response.data.angles)
                        this.getRanges()
                        this.loaded = true
                    }).catch(
                    error => {
                        console.log(error)
                    })
            },
            filterAngles(angles) {
                for(let i in angles){
                    const angle = angles[i].mic_direction_of_arrival
                    let keyIndex = 0
                    for(let j in this.sortedAngleData){
                        const range = Object.keys(this.sortedAngleData)[keyIndex]
                        if(angle < parseInt(range)+10){
                            this.sortedAngleData[j].push(angle)
                            break
                        }
                        keyIndex +=1
                    }
                }
            },
            getRanges() {
                this.rangeLengths = []
                let total = 0
                for(let i in this.sortedAngleData){
                    total += (this.sortedAngleData[i].length)
                }
                for(let i in this.sortedAngleData){
                    this.rangeLengths.push(((this.sortedAngleData[i].length/ total) * 100).toFixed(0))
                }
                console.log(Object.keys(this.sortedAngleData))
                this.setOptions()
                this.renderChart(this.chartdata, this.options)
            },
            setOptions() {
                this.chartdata = {
                    labels: Object.keys(this.sortedAngleData),
                    datasets: [{
                        label: 'Mic Angle Detection% in Time Range',
                        borderColor: 'blue',
                        data: this.rangeLengths,
                    }]}
                this.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 100,
                            stepSize: 10
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
