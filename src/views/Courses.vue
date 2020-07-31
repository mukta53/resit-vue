<template>
  <div>
    <div align="left">
      <b-button v-if="user.role === 'Admin'" @click="showModal" class="btn-blue mt-2 ml-2">New Course</b-button>
    </div>
    <div class="actions">
        <b-form-input
            size="md"
            class="mt-4 width-30"
            placeholder="Search for Course"
            v-model="query.search"
            @keyup.enter="getCourses"
            ></b-form-input>
        <b-form-input
            size="md"
            class="mt-4 width-30"
            placeholder="Filter through price"
            v-model="query.pfilter"
            @keyup="getCourses"

            ></b-form-input>
        <b-form-select
            v-model="query.tfilter"
            :options="courseList"
            size="md"
            class="mt-4 width-10"
            placeholder="Filter by topics"
            ></b-form-select>
        <b-form-select
            v-model="query.sort"
            :options="sortBy"
            size="md"
            class="mt-4 width-10"
            ></b-form-select>
        <b-form-select
            v-model="query.sorttype"
            :options="sortType"
            size="md"
            class="mt-4 width-10"
            ></b-form-select>
        <b-button size="md" class="mt-4 ml-2 btn-blue btn-s" @click="getCourses">Search</b-button>
    </div>

    <div>
      <div class="table" v-if="table.length > 0">
        <b-table
          id="courses"
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
          aria-controls="courses"
        ></b-pagination>
      </div>
      <div v-else>
        <p>No Courses.</p>
      </div>
    </div>
    <b-modal ref="modal" hide-footer title="Add a course">
      <div class="d-block">
        <b-form @submit="addCourse" class="course-form">
          <b-form-group
            id="input-group-1"
            label="Topic:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="topic"
              required
              placeholder="Enter Topic"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Price"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="price"
              type="text"
              required
              placeholder="Price"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Location" label-for="input-3">
            <b-form-input
              id="input-3"
              type="text"
              v-model="location"
              required
              placeholder="Location"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" class="btn-blue btn-s">Add</b-button>
        </b-form>
      </div>  
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      topic: '',
      price: '',
      location: '',
      table: [],
      perPage: 15,
      currentPage: 1,
      courseList: [],
      courses: [],
      query: {
        search: '',
        tfilter: 'All',
        pfilter: '',
        sort: 'Any',
        sorttype: 'Any'
      },
      sortBy: ['Any', 'Topic','Price'],
      sortType: ['Any', 'Ascending', 'Descending'],
      fields: [
        {
          key: 'topic',
          label: 'Topic',
          variant: 'info'
        },
        {
          key: 'price',
          label: 'Price'
        },
        {
          key: 'location',
          label: 'Location'
        }
      ],
      show: false
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
    async addCourse (e) {
      e.preventDefault()
      const payload = {
        topic: this.topic,
        price: parseFloat(this.price),
        location: this.location
      }
      const courseResponse = await this.$store.dispatch('addCourse', payload)
      const res = courseResponse.data
      if (res.status === "Error") {
        this.makeToast('danger', res.status, res.message)
        return
      }
      this.makeToast('success', 'Successful', 'Successfully Added a course')
      this.table = res.data
      this.hideModal()
    },
    async CourseList () {
      const list = ['All']
      const courseListResponse = await this.$store.dispatch('courseList')
      const res = courseListResponse.data
      if (res.status === "Error") {
        this.makeToast('danger', res.status, res.message)
        return
      }
      res.data.map(topic => list.push(topic))
      this.courseList = list
    },
    async getCourses () {
      const courses = await this.$store.dispatch('search', this.query)
      const res = courses.data
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
    },
    TableData (data) {
      const table = []
      for (const course of data) {
        const obj = {
          topic: course.topic,
          price: course.price,
          location: course.location
        }
        table.push(obj)
      }
      this.table = table
    },
    showModal () {
      this.$refs.modal.show()
    },
    hideModal () {
      this.$refs.modal.hide()
    }
  },
  created () {
    if (this.user) {
      console.log(this.user)
      if (!this.user.email) {
        this.logout()
      }
      this.CourseList()
      this.getCourses()
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