<template>
  <div id="app">
    <navbar v-if="page === 'Courses' || page === 'Users'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      page: ''
    }
  },
  created () {
    this.page = this.$route.name
  },
  beforeUpdate () {
    this.page = this.$route.name
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
