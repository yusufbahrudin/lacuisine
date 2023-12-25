<script>
import axios from 'axios'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import HomeComponent from './components/HomeComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue'
import ProductComponent from './components/ProductComponent.vue'
import CategoryComponent from './components/CategoryComponent.vue'
import LogComponent from './components/LogComponent.vue'
import FormComponent from './components/FormComponent.vue'

export default {
  components: {
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ProductComponent,
    CategoryComponent,
    LogComponent,
    FormComponent
  },
  data() {
    return {
      currentPage: '',
      products: [],
      dataInput: {},
      categories: [],
      histories: []
    }
  },
  created() {
    if (localStorage.access_token) {
      this.currentPage = 'home'
      this.fetchProduct()
      this.fetchCategory()
      this.fetchHisory()
    } else {
      this.currentPage = 'login'
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
      if (page === 'home') {
        this.fetchProduct()
        this.fetchCategory()
        this.fetchHisory()
      } else if (page === 'form') {
        this.dataInput = {
          name: '',
          categoryId: '',
          description: '',
          stock: '',
          price: '',
          status: '',
          imgUrl: ''
        }
      }
    },
    async googleLogin(googleToken) {
      try {
        const response = await axios({
          url: 'http://localhost:3000/login/google',
          method: 'POST',
          headers: {
            google_token: googleToken
          }
        })
        const data = response.data

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)

        this.username = localStorage.username
        this.currentPage = 'home'

        Toastify({
          text: `Welcome ${localStorage.username}`,
          duration: 2000
        }).showToast()
      } catch (error) {
        console.log(error)
      }
    },

    async loginHandler(login) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'http://localhost:3000/login',
          data: login
        })
        localStorage.setItem('username', data.username)
        localStorage.setItem('role', data.role)

        // Tampilkan pesan selamat datang
        Toastify({
          text: `Welcome ${localStorage.username} (${localStorage.role})`,
          duration: 2000
        }).showToast()

        localStorage.access_token = data.access_token
        localStorage.username = data.username
        localStorage.email = data.email
        localStorage.userid = data.id

        this.currentPage = 'home'
        this.products()
      } catch (error) {
        console.log(error)
      }
    },

    async RegisterHandler(register) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: 'http://localhost:3000/register',
          data: register
        })
        Toastify({
          text: 'Registration successful.',
          duration: 2000
        }).showToast()
        console.log(data)
        this.currentPage = 'login'
      } catch (error) {
        console.log(error)
      }
    },
    async fetchProduct() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:3000/cuisines',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.products = data
        this.currentPage = 'product'
      } catch (error) {
        console.log(error)
      }
    },
    async fetchCategory() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:3000/categories',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.categories = data
        this.currentPage = 'home'
      } catch (error) {
        console.log(error)
      }
    },
    async fetchHisory() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:3000/history',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.histories = data
        this.currentPage = 'home'
      } catch (error) {
        console.log(error)
      }
    },
    async handleFormData(form, status) {
      console.log(form.status, 'testtttttttttt')

      try {
        if (status === 'edit') {
          const data = await axios({
            url: `http://localhost:3000/cuisines/${form.id}`,
            method: 'PUT',
            headers: {
              access_token: localStorage.access_token
            },
            data: form
          })
          Toastify({ text: `Menus ${form.name} updated`, duration: 3000 }).showToast()
          console.log(data)
        } else {
          const data = await axios({
            method: 'POST',
            url: 'http://localhost:3000/cuisines',
            data: form,
            headers: {
              access_token: localStorage.access_token
            }
          })
          Toastify({ text: `Menus ${form.name} added`, duration: 3000 }).showToast()
          console.log(data)
        }
        this.currentPage = 'product'
        this.fetchProduct()
      } catch (error) {
        console.log(error)
      }
    },
    async logoutHandler() {
      const username = localStorage.username

      localStorage.clear()

      Toastify({
        text: `Terima kasih telah berkunjung, ${username}!`,
        duration: 2000
      }).showToast()

      this.currentPage = 'login'
    },

    async getProductById(data) {
      const { id } = data
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:3000/cuisines/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.dataInput = data
        this.currentPage = 'form'
      } catch (error) {
        console.log(error)
      }
    },
    async setStatus(data) {
      const { id, status } = data
      try {
        const response = await axios({
          url: `http://localhost:3000/cuisines/${id}/${status}`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        const responseData = response.data

        // Menampilkan pemberitahuan dengan Toastify
        Toastify({
          text: `Status updated to ${status}`,
          duration: 2000,
          style: {
            font: {
              size: '25px'
            }
          }
        }).showToast()

        console.log(responseData, 'ini status yg di ganti')
        this.fetchProduct()
      } catch (err) {
        console.log(err.response.data)
        this.fetchProduct()
      }
    }
  }
}
</script>

<template>
  <NavbarComponent
    v-if="currentPage !== 'login' && currentPage !== 'register'"
    :currentPage="currentPage"
    @dologout="logoutHandler"
  />

  <SidebarComponent
    v-if="currentPage !== 'login' && currentPage !== 'register'"
    :currentPage="currentPage"
    @changePage="changePage"
  />

  <LoginComponent
    v-if="currentPage === 'login'"
    @doLogin="loginHandler"
    @changePage="changePage"
    @googleLogin="googleLogin"
  />

  <RegisterComponent
    v-if="currentPage === 'register'"
    @doRegister="RegisterHandler"
    @changePage="changePage"
  />

  <HomeComponent
    v-if="currentPage === 'home'"
    @changePage="changePage"
    :products="products"
    :categories="categories"
  />

  <ProductComponent
    v-if="currentPage === 'product'"
    @changePage="changePage"
    :products="products"
    @setStatus="setStatus"
    @getProductById="getProductById"
  />

  <CategoryComponent
    v-if="currentPage === 'category'"
    @changePage="changePage"
    :categories="categories"
  />

  <LogComponent v-if="currentPage === 'history'" @changePage="changePage" :histories="histories" />

  <FormComponent
    v-if="currentPage === 'form'"
    :dataInput="dataInput"
    :categories="categories"
    @handleFormData="handleFormData"
  />
</template>
