
<div>
     <Line v-if="loaded" :chartdata="this.chartdata" :options="this.options"/>
</div>

<script>
    import { Line } from 'vue-chartjs'
    import binbotproxy from "@/services/binbotproxy";

    export default {
        name: "PiStats",
        extends: Line,
        components: {Line},
        props: ["timeRange"],
        data() {
            return {
                loaded: false,
                cpu : [],
                ram : [],
                disk: [],
                time: [],
                chartdata: {},
                options: {},
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                binbotproxy.piStats(this.timeRange).then(
                    response => {
                        for(let item in response.data) {
                            const data = response.data[item]
                            this.time.push(data.time)
                            this.cpu.push(data.cpu)
                            this.ram.push(data.ram)
                            this.disk.push(data.disk)
                        }
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
                this.chartdata = {
                    labels: this.time,
                    datasets: [{
                            label: 'CPU%',
                            borderColor: '#f87979',
                            data: this.cpu,
                            fill: false
                        },
                        {
                            label: 'RAM%',
                            borderColor: '#79f879',
                            data: this.ram,
                            fill: false
                        },
                        {
                            label: 'Disk%',
                            borderColor: '#7979f8',
                            data: this.disk,
                            fill: false
                        }
                    ]}
                this.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                       yAxes: [{
                         ticks: {
                                 beginAtZero:true}
                       }]
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
