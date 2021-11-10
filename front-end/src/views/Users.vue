<template>

  <section class="uk-section uk-section-default">
    <div class="uk-container">
      <div class="uk-position-relative">
        <h1>Пользователи</h1>
        <router-link :to="{name: 'UserNew'}" class="uk-button uk-button-primary uk-position-top-right uk-margin-small">+</router-link>
      </div>
      <div v-show="users" class="uk-child-width-1-2@m uk-grid" uk-grid>
        <div v-for="user in users" :key="user._id">
          <div class="uk-card uk-card-default uk-card-body uk-card-hover">
            <div class="uk-position-relative" uk-grid>
              <div class="uk-width-1-3">
                <img v-if="user.avatar" :src="'http://localhost:3000/uploads/'+user.avatar" alt="" class="uk-border-circle">
                <img v-else src="/no-avatar.png" alt="">
              </div>
              <div class="uk-width-expand">
                <p><span class="uk-text-bold">Фамилия:</span><br>{{user.lName}}</p>
                <p><span class="uk-text-bold">Имя:</span><br>{{user.fName}}</p>
                <p><span class="uk-text-bold">Должность:</span><br>{{user.position}}</p>
                <p><span class="uk-text-bold">E-mail:</span><br>{{user.email}}</p>
              </div>
              <div class="uk-position-top-right">
                <router-link :to="{name: 'UserEdit', params: {id: user._id}}" class="uk-text-primary"><span uk-icon="icon: pencil"></span></router-link>
                <a class="uk-text-danger uk-margin-left" @click="deleteUser(user._id)"><span uk-icon="icon: trash"></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!users">
        <div class="uk-card uk-card-default uk-card-body">
          <h3 class="uk-text-center">Нет пользователей</h3>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from 'axios'
import {useToast} from "vue-toastification"

export default {
  name: "Users",
  setup() {
    const toast = useToast()
    return {toast}
  },
  data() {
    return {
      users: null
    }
  },
  methods: {
    deleteUser(id) {
      axios.delete(`http://localhost:3000/api/users/${id}`, {data: {_id: id}})
        .then(response => {
          this.users = this.users.filter(item => item._id != response.data.id)
          this.toast.error(response.data.message)
        })
        .catch(err => this.toast.error(err.message))
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/users')
    .then(response => {
      this.users = response.data
    })

  }

}
</script>

<style>

</style>