<div>
    <Doughnut v-if="loaded" :chartdata="this.chartdata" :options="this.options"/>
</div>

<script>
    import {Doughnut} from 'vue-chartjs'
    import binbotproxy from "@/services/binbotproxy";

    export default {
        name: "soundFrequency",
        compnents: {Doughnut},
        extends: Doughnut,
        data() {
            return {
                loaded: false,
                chartdata: {},
                options: {},
                counts: [],
                countLabels: [],
                countColors: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                soundMap: {
                    0: "Burp",
                    1: "Eat",
                    2: "Mad",
                    3: "Happy",
                    4: "Mouth Open",
                    5: "Mouth Closed",
                    6: "Robot Stop",
                    7: "Shutdown",
                    8: "Startup"
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                binbotproxy.soundFrequency().then(
                    response => {
                        this.extractData(response.data)
                    }
                ).catch(
                    error => {
                        console.log(error)
                    }
                )
            },
            extractData(data){
                this.counts = [];
                this.countLabels = [];
                for(let i in data){
                    this.counts.push(data[i].Count)
                    this.countLabels.push(this.soundMap[data[i].Sound])
                }
                this.setOptions()
                this.renderChart(this.chartdata, this.options)
            },
            setOptions() {
                this.chartdata = {
                    labels: this.countLabels,
                    datasets: [{
                        data: this.counts,
                        backgroundColor: this.countColors
                    }]
                };
                this.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    title:{
                        display: true,
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>

