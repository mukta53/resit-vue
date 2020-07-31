<template>
  <div>
      <div class="table mt-4" v-if="table.length > 0">
        <b-table
          id="users"
          striped
          hover
          :items="table"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          ></b-table>
          <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="users"
        ></b-pagination>
      </div>
      <div v-else class="mt-4">
        <p>No Users</p>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      table: [],
      perPage: 15,
      currentPage: 1,
      fields: [
        {
          key: 'name',
          label: 'Name',
          variant: 'info'
        },
        {
          key: 'email',
          label: 'Email'
        }
      ]
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$store.dispatch('saveUser', {})
      this.$router.push('/')
    },
    async getUsers () {
      const users = await this.$store.dispatch('getUsers')
      const res = users.data
      if (res.status === "Error") {
        this.makeToast('danger', res.status, res.message)
        return
      }
      this.table = res.data
    },
    makeToast (variant, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  },
  created () {
    if (this.user) {
      if (!this.user.email) {
        this.logout()
      }
      this.getUsers()
    } else {
      this.logout()
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    rows () {
      return this.table.length
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
.width-30 {
  width: 50% !important;
}
.width-10 {
    width: 30%;
}
.width-20 {
    width: 30%;
}
}
@media not screen and (max-width: 768px) {
.width-30 {
  width: 30% !important;
}
.width-10 {
    width: 10%;
}
.width-20 {
    width: 20%;
}
}
.actions {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  margin: 10px 0;
}
input {
    background-color: #f3faff;
    border: solid 1px #d7dce3;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    -webkit-box-shadow: inset 7px 7px 8px 0px rgba(0, 0, 0, 0.07);
    -moz-box-shadow: inset 7px 7px 8px 0px rgba(0, 0, 0, 0.07);
    box-shadow: inset 7px 7px 8px 0px rgba(0, 0, 0, 0.07);
    padding: 0 15px;
    margin: 9px auto;
    font-size: 18px;
}
select {
    background-color: #f3faff;
    border: solid 1px #d7dce3;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    -webkit-box-shadow: inset 7px 7px 8px 0px rgba(0, 0, 0, 0.07);
    -moz-box-shadow: inset 7px 7px 8px 0px rgba(0, 0, 0, 0.07);
    box-shadow: inset 7px 7px 8px 0px rgba(0, 0, 0, 0.07);
    padding: 0 15px;
    margin: 9px auto;
    font-size: 18px;
}
.btn-s {
  padding: 0;
  width: 100% !important;
  height: 50px;
  font-size: 18px;
  font-weight: 900;
  border-radius: 5px;
}
.btn-blue{
  color: #fff;
  background: rgb(0, 162, 255);
  background: -moz-linear-gradient(left, rgb(0, 162, 255) 0%, rgb(0, 162, 255) 100%);
  background: -webkit-gradient(left top, right top, color-stop(0%, rgb(0, 162, 255)), color-stop(100%, rgb(0, 162, 255)));
  background: -webkit-linear-gradient(left, rgb(0, 162, 255) 0%, rgb(0, 162, 255) 100%);
  background: -o-linear-gradient(left, rgb(0, 162, 255) 0%, rgb(0, 162, 255) 100%);
  background: -ms-linear-gradient(left, rgb(0, 162, 255) 0%, rgb(0, 162, 255) 100%);
  background: linear-gradient(to right, rgb(0, 162, 255) 0%, rgb(0, 162, 255) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7bb0f6', endColorstr='#5685e3', GradientType=1);
  -webkit-box-shadow: 33px 33px 33px 0px rgba(189, 205, 242, 0.77);
  -moz-box-shadow: 33px 33px 33px 0px rgba(189, 205, 242, 0.77);
  box-shadow: 33px 33px 33px 0px rgba(189, 205, 242, 0.77);
  border-color: rgb(0, 162, 255);
}
label {
  color: black;
}
</style>