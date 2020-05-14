<template>
  <div>
  <div class="ui raised container segment">
    <PiStats v-bind:timeRange="piSysTimeRange" :key="piSysKey"></PiStats>
    <br>
    <label>Time Range - Days</label>
    <div class="ui icon input">
      <input v-model="piSysTimeRange" type="text" placeholder="Time Range">
      <i class="inverted circular search link icon" v-on:click="updatePiStats"></i>
    </div>
  </div>
  <div class="ui raised container segment">
    <batLevel></batLevel>
  </div>
  </div>
</template>

<script>
  import PiStats from "@/components/Graphs/PiStats";
  import batLevel from "@/components/Graphs/batLevel";

export default {
  name: 'HelloWorld',
  components: {
    PiStats, batLevel
  },
  props: {
    msg: String
  },
  data(){
    return {
      piSysTimeRange: 30,
      piSysKey: 0,
    }
  },
  methods: {
    updatePiStats(){
      this.piSysKey += 1;
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
