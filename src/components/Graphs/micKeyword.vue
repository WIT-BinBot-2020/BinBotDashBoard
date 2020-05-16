<div>
    <Doughnut v-if="loaded" :chartdata="this.chartdata" :options="this.options"/>
</div>


<script>
    import {Doughnut} from 'vue-chartjs'
    import binbotproxy from "@/services/binbotproxy";

    export default {
        name: "commandFrequency",
        compnents: {Doughnut},
        extends: Doughnut,
        data() {
            return {
                loaded: false,
                chartdata: {},
                options: {},
                counts: [],
                countLabels: [],
                countColors: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                binbotproxy.keywordFrequency().then(
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
                    data[i].KeyWord = data[i].KeyWord.split(" ")[0]
                }
                for(let i in data) {
                    this.countLabels.push(data[i].KeyWord)
                    this.counts.push(data[i].Count)
                }
                this.setOptions()
                this.renderChart(this.chartdata, this.options)
            },
            setOptions() {
                console.log(this.countLabels)
                console.log(this.counts)
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
