<template>
    <div>
    <div class="ui raised container segment">
      <div class="ui header">Time Range</div>
      <div class="ui right labeled input">
        <input v-model="timeRange.sysTimeRangeDays" type="text" placeholder="Time Range Days">
        <div class="ui basic label">
          Days
        </div>
      </div>
      <div class="ui right labeled input">
        <input v-model="timeRange.sysTimeRangeHours" type="text" placeholder="Time Range Hours">
        <div class="ui basic label">
          Hours
        </div>
      </div>
      <div class="ui right labeled input">
        <input v-model="timeRange.sysTimeRangeMins" type="text" placeholder="Time Range Minutes">
        <div class="ui basic label">
          Minutes
        </div>
      </div>
      <br><br>
      <button class="ui green button" v-on:click="updateTimeRange">Filter</button>
    </div>
    <div class="ui two column stackable middle aligned grid raised segment">
      <div class="column">
        <div class="ui raised container segment">
          <div class="ui centered header">PI System Usage</div>
          <PiStats v-bind:timeRange="timeRange" :key="sysKey"></PiStats>
        </div>
      </div>
      <div class="column">
        <div class="ui raised centered container segment">
          <div class="ui raised centered card">
            <div class="content">
              <div class="ui centered header">Recent Messages</div>
            </div>
              <div class="content">
                <div class="ui middle aligned divided list">
                <div class="item" v-for="(item, index) in recentMessages" :key="index">
                  <div class="content">
                    <label class="header">{{index + 1}} : {{ item.message }}</label>
                  </div>
                </div>
              </div>
              <button class="ui green button" v-on:click="getMessages">Refresh</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="ui raised container segment">
          <div class="ui centered header">Battery Level</div>
          <batLevel></batLevel>
        </div>
      </div>
      <div class="column">
        <div class="ui raised centered container segment">
          <div class="ui centered header">Mic Angle Detection</div>
          <micAngle v-bind:timeRange="timeRange" :key="sysKey"></micAngle>
        </div>
      </div>
      <div class="column">
        <div class="ui raised centered container segment">
          <div class="ui centered header">Block Frequency</div>
          <commandFrequency v-bind:timeRange="timeRange" :key="sysKey"></commandFrequency>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import PiStats from "@/components/Graphs/PiStats";
  import batLevel from "@/components/Graphs/batLevel";
  import commandFrequency from "./Graphs/commandFrequency";
  import micAngle from "./Graphs/micAngle";
  import binbotproxy from "../services/binbotproxy";

export default {
  name: 'HelloWorld',
  components: {
    PiStats, batLevel, micAngle, commandFrequency
  },
  props: {
    msg: String
  },
  created() {
    this.getMessages()
  },
  data(){
    return {
      timeRange: {
        sysTimeRangeDays: 1,
        sysTimeRangeMins: 0,
        sysTimeRangeHours: 0,
      },
      sysKey: 0,
      recentMessages: []
    }
  },
  methods: {
    updateTimeRange(){
      this.sysKey += 1;
    },
    getMessages() {
      binbotproxy.recentMessages().then(
              response => {
               console.log(response)
                this.recentMessages = response.data
              }).catch(
              error => {
                console.log(error)
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
