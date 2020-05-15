<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="/">
          <img src="./assets/logo.png" height=60 width=60 alt="Img">
          Bin Bot Dashboard
        </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <Main msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>

</style>
