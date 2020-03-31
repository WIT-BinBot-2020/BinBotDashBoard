<template>
  <div>
  <div class="ui raised container segment">
    <PiStats></PiStats>
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
