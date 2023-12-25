<script>
export default {
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    callback(response) {
      // console.log(response);
      this.$emit('googleLogin', response.credential)
      //   this.log = response
    }
  }
}
</script>

<template>
  <div class="login-form-bg h-100 mt-5">
    <div class="container h-100">
      <div class="row justify-content-center h-100">
        <div class="col-xl-6">
          <div class="form-input-content">
            <div class="card login-form mb-5">
              <div class="card-body pt-5">
                <h4 style="font-size: 50px; text-align: center">WELCOME TO XSTORE</h4>
                <br />
                <br />
                <h4 style="font-size: 15px; text-align: center">LOGIN NOW</h4>

                <form class="mt-5 mb-5 login-input" v-on:submit.prevent="$emit('doLogin', login)">
                  <div class="form-group">
                    <input
                      type="email"
                      v-model="login.email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="login.password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <button class="btn login-form__btn submit w-100">Login</button>
                </form>
                <div style="display: flex; justify-content: center">
                  <GoogleLogin :callback="callback" />
                </div>

                <p class="mt-5 login-form__footer">
                  Dont have account?
                  <a href="" @click.prevent="$emit('changePage', 'register')" class="text"
                    >Sign Up</a
                  >
                  now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
