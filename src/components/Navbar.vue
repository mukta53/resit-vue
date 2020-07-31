<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Resit</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item v-if="user.role === 'Admin'"><router-link to="/users">Users</router-link></b-nav-item>
                    <b-nav-item> <router-link to="/courses">Courses</router-link></b-nav-item>
                </b-navbar-nav>

            <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>{{user.name}}</em>
                    </template>
                    <b-dropdown-item>{{ user.email }}</b-dropdown-item>
                    <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$store.dispatch('saveUser', {})
      this.$router.push('/')
    }
  },
  created () {
    if (!this.user.email) {
    this.logout()
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>
