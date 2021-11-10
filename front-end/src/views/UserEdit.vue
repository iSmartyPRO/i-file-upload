<template>
  <section class="uk-section uk-section-default">
    <input
      ref="avatarImage"
      type="file"
      name="image"
      accept="image/"
      @change="setImage"
    />
    <div class="uk-container">
      <h1>Редактирование</h1>
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-grid">
            <div class="uk-width-1-4 uk-position-relative">
              <img
                :src="user.avatar"
                class="uk-image cursor-pointer avatarImage"
                uk-toggle="target: #avatarModalBox"
                alt=""
                uk-tooltip="Нажмите чтобы установить новый аватар"
              />
              <a v-if="user.avatar !== '/no-avatar.png'" class="uk-position-left-top uk-text-danger" @click="removeAvatar"><span uk-icon="icon: trash" uk-tooltip="Удалить аватар"></span></a>
            </div>
            <div class="uk-width-expand">
              <form @submit.prevent>
                <fieldset class="uk-fieldset">
                  <legend class="uk-legend">Данные пользователя</legend>
                  <div class="uk-margin">
                    <input
                      id="lName"
                      class="uk-input"
                      type="text"
                      placeholder="Фамилия"
                      v-model="user.lName"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="fName"
                      class="uk-input"
                      type="text"
                      placeholder="Имя"
                      v-model="user.fName"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="position"
                      class="uk-input"
                      type="text"
                      placeholder="Должность"
                      v-model="user.position"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="email"
                      class="uk-input"
                      type="text"
                      placeholder="E-mail"
                      v-model="user.email"
                    />
                  </div>

                  <div v-if="showPassword">
                    <div class="uk-margin">
                      <input
                        id="password"
                        class="uk-input"
                        type="password"
                        placeholder="Пароль"
                        autocomplete="on"
                      />
                    </div>

                  </div>
                  <div v-else class="uk-margin">
                    <a class="uk-button uk-button-secondary uk-width-1-1" @click="showPassword = true">Изменить пароль</a>
                  </div>
                  <button
                    @click="handleUpdate"
                    class="uk-button uk-button-primary uk-width-1-1"
                  >
                    Обновить
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="avatarModalBox" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Аватар пользователя</h2>
        <p>Выберите аватар пользователя</p>
        <div>
          <div
            class="
              uk-card uk-card-default uk-card-hover uk-text-center
            "
          >
            <vue-cropper
              ref="cropper"
              :img-style="{width: '450px', height: '450px'}"
              :guides="true"
              :background="false"
              :min-container-width=540
			        :min-container-height=450
              :aspect-ratio="1/1"
              :src="user.avatar"
              :view-mode="2"
              :modal="true"
            />
            <div class="actions">
              <button
                class="uk-button uk-button-secondary uk-width-1-1"
                @click="showFileChooser"
              >
                Выбрать фото
              </button>
            </div>
          </div>
        </div>


        <p class="uk-text-right">
            <button class="uk-button uk-button-primary uk-width-1-2" type="button" @click="setAvatar">Ок</button>
            <button class="uk-button uk-button-danger uk-modal-close uk-width-1-2" type="button">Отмена</button>
        </p>
    </div>
</div>
  </section>



</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import axios from 'axios'
import {useToast} from "vue-toastification"

export default {
  name: "Users",
  components: {VueCropper},
  setup() {
    const toast = useToast()
    return {toast}
  },
  data() {
    return {
      isPasswordSame: false,
      errors: [],
      user: {},
      avatarImage: "/no-avatar.png",
      showPassword: false,
      updateAvatar: false,
      password: null
    };
  },
  methods: {
    showFileChooser() {
      this.$refs.avatarImage.click();
    },
    setAvatar(){
      UIkit.modal("#avatarModalBox").hide()
      this.user.avatar = this.$refs.cropper.getCroppedCanvas({width: 500, height: 500}).toDataURL();
      this.updateAvatar = true
    },
    handleUpdate() {
      let updateUser = {
        lName: this.user.lName,
        fName: this.user.fName,
        position: this.user.position,
        email: this.user.email
      }
      if(this.updateAvatar){
        Object.assign(updateUser, {avatar: this.user.avatar})
      }
      if(this.password) {
        Object.assign(updateUser, {password: this.password})
      }
      axios.patch(`http://localhost:3000/api/users/${this.user.id}`, updateUser)
        .then(response => {
          this.toast.success(response.data.message)
          this.$router.push('/users')
          })
        .catch(err => this.toast.error(err.message))
    },
    removeAvatar() {
      UIkit.modal.confirm(`Удалить аватар для пользователя ${this.user.lName} ${this.user.fName}?`)
        .then(
          () => {
            console.log(this.user)
            axios.patch(`http://localhost:3000/api/users/${this.user.id}`, {deleteAvatar: true})
              .then((response) => {
                this.toast.success(response.data.message)
                this.user.avatar = '/no-avatar.png'
              })
              .catch(err => this.toast.error(err.message))
          },
          () => this.toast.success(`Вы отменили удаление аватара`)
        )
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.toast.error("Пожалуйста выберите изображение!");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.toast.error("К сожалению, FileReader API не поддерживается!");
      }
    },
  },
  mounted() {
    axios.get(`http://localhost:3000/api/users/${this.$route.params.id}`)
      .then(response => {
        this.user = {
          id: response.data._id ? response.data._id : '',
          fName: response.data.fName ? response.data.fName : '',
          lName: response.data.lName ? response.data.lName : '',
          position: response.data.position ? response.data.position : '',
          email: response.data.email ? response.data.email : '',
          avatar: response.data.avatar ? `http://localhost:3000/uploads/${response.data.avatar}` : '/no-avatar.png'
        }
      })
  }
};
</script>

<style>
input[type="file"] {
  display: none;
}
.cursor-pointer {
  cursor: pointer;
}
.avatarImage {
  width: 225px;
  height: 225px;
  border-radius: 50%;
}
</style>