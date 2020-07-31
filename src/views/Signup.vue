<template>
    <div>
        <div class="flex-container fill-available">
            <div class="left-container">
              <b-icon icon="person-lines-fill" class="icon" animation="fade"></b-icon>
            </div>
            <div class="right-container">
              <div class="container">
                <div>
                  <p class="form-heading">Registration</p>
                </div>
                <div class="form-container">
                  <b-form @submit="onSubmit" class="signup-form">
                    <b-form-group
                      id="input-group-1"
                      label="Name:"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="name"
                        required
                        placeholder="Enter Name"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      id="input-group-2"
                      label="Email address:"
                      label-for="input-2"
                      description="We'll never share your email with anyone else."
                    >
                      <b-form-input
                        id="input-2"
                        v-model="email"
                        type="email"
                        required
                        placeholder="Enter email"
                        @change="handleChange"
                      ></b-form-input>
                      <b-form-invalid-feedback :state="state">
                        {{ errEmail }}
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                      <b-form-input
                        id="input-3"
                        type="password"
                        v-model="password"
                        required
                        placeholder="Enter Password"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="Confirm Password:" label-for="input-4">
                      <b-form-input
                        id="input-4"
                        type="password"
                        v-model="cpassword"
                        required
                        placeholder="Re-enter Password"
                        @change="handleChange"
                      ></b-form-input>
                    <b-form-invalid-feedback :state="state">
                        {{ errPassword }}
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-button type="submit" variant="primary" class="btn-blue">Register</b-button>
                  </b-form>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      userName: '',
      password: '',
      cpassword: '',
      errEmail: '',
      errPassword: '',
      state: false
    }
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault()
      if (this.password !== this.cpassword) {
        this.errPassword = 'Password does not match'
        return
      }
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      const response = await this.$store.dispatch('userSignup', payload)
      const res = response.data
      if (res.errorEmail) {
        this.errEmail = res.errorEmail
        return
      } else if (res.status === 'Error' || res.status === 'Failed') {
        this.makeToast('danger', res.status, res.message)
      } else {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('currentUser', JSON.stringify(res.data))
        this.$store.dispatch('saveUser', res.data)
        this.$router.push('/courses')
      }
    },
    handleChange () {
      this.errEmail = this.errPassword = ''
    },
    makeToast (variant, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  },
  computed: {
  },
  created () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      this.$router.push('/courses')
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .left-container {
        display: none;
    }
    .right-container {
        width: 100%;
    }
}
@media not screen and (max-width: 768px) {
    .left-container {
        width: 50%;
    }
    .right-container {
        width: 50%;
    }
}

.left-container {
    background-color: rgb(0, 162, 255);
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.right-container {
    background: #fff;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 2;
}
.flex-container {
    display: flex;
}
.fill-available {
    height: 100vh;
}
.container {
  width: 100%;
  text-align: center;
}
.signup-form {
  text-align: left;
}
.form-heading {
  color: rgb(0, 162, 255);
  font-size: 50px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  font-family: 'Gilroy';
}
.form-container {
  margin: 0px auto;
  width: 80%;
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
.btn {
  padding: 0;
  width: 100%;
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
.invalid-feedback {
  color: red;
}
.logo-image {
  height: 480px;
  position: absolute;
  top: 150px;
  left: 70px;
}
.icon {
  font-size: 250px;
}
</style>
