<template>
    <div>
    <div>
      <br>
      <label>Time Range - Days</label>
      <div class="ui icon input">
        <input v-model="sysTimeRange" type="text" placeholder="Time Range">
        <i class="inverted circular search link icon" v-on:click="updatePiStats"></i>
      </div>
    </div>
    <div class="ui two column stackable middle aligned grid raised segment">
      <div class="column">
        <div class="ui raised container segment">
          <div class="ui centered header">PI System Usage</div>
          <PiStats v-bind:timeRange="sysTimeRange" :key="sysKey"></PiStats>
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
          <micAngle v-bind:timeRange="sysTimeRange" :key="sysKey"></micAngle>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import PiStats from "@/components/Graphs/PiStats";
  import batLevel from "@/components/Graphs/batLevel";
  import micAngle from "./Graphs/micAngle";
  import binbotproxy from "../services/binbotproxy";

export default {
  name: 'HelloWorld',
  components: {
    PiStats, batLevel, micAngle
  },
  props: {
    msg: String
  },
  created() {
    this.getMessages()
  },
  data(){
    return {
      sysTimeRange: 1,
      sysKey: 0,
      recentMessages: []
    }
  },
  methods: {
    updatePiStats(){
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
