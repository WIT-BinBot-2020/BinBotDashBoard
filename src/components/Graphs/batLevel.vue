<div>
    <Bar v-if="loaded" :chartdata="this.chartdata" :options="this.options"/>
</div>

<script>
    import {Bar} from 'vue-chartjs'
    import binbotproxy from "@/services/binbotproxy";
    // import binbotproxy from "@/services/binbotproxy";

    export default {
        name: "batLevel",
        compnents: {Bar},
        extends: Bar,
        data() {
            return {
                loaded: false,
                batLevel: 0,
                time: null,
                chartdata: {},
                options: {},
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                binbotproxy.batLevel().then(
                    response => {
                        this.batLevel = response.data.level
                        this.time = response.data.time
                        this.setOptions()
                        this.renderChart(this.chartdata, this.options)
                        this.loaded = true
                    }
                ).catch(
                    error => {
                        console.log(error)
                    }
                )
            },
            setOptions() {
                console.log(this.time)
                console.log(this.batLevel)
                let color = this.getColor(this.batLevel)
                this.chartdata = {
                    labels: [1],
                    datasets: [{
                        label: 'Battery Level as of ' + this.time,
                        backgroundColor: color,
                        data: [this.batLevel],
                    },
                    ]}
                this.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 12
                            }
                        }]
                    }
                }
            },
            getColor(level) {
                if(level > 10){
                    return "#00FF00"
                }else if(level > 6){
                    return "#FFFF00"
                }else {
                    return "#FF0000"
                }
            }
        }
    }
</script>

<style scoped>

</style>
