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
      <h1>Новый пользователь</h1>
      <div>
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-grid">
            <div class="uk-width-1-4">
              <img
                :src="avatarImage"
                class="uk-image cursor-pointer avatarImage"
                uk-toggle="target: #avatarModalBox"
                alt=""
              />
            </div>
            <div class="uk-width-expand">
              <form @submit.prevent>
                <fieldset class="uk-fieldset">
                  <legend class="uk-legend">Данные пользователя</legend>
                  <div class="uk-margin">
                    <input
                      id="lName"
                      ref="lName"
                      class="uk-input"
                      type="text"
                      placeholder="Фамилия"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="fName"
                      ref="fName"
                      class="uk-input"
                      type="text"
                      placeholder="Имя"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="position"
                      ref="position"
                      class="uk-input"
                      type="text"
                      placeholder="Должность"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="email"
                      ref="email"
                      class="uk-input"
                      type="text"
                      placeholder="E-mail"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="password"
                      ref="password"
                      class="uk-input"
                      type="password"
                      placeholder="Пароль"
                      autocomplete="on"
                    />
                  </div>
                  <div class="uk-margin">
                    <input
                      id="passwordCheck"
                      ref="passwordCheck"
                      class="uk-input"
                      type="password"
                      placeholder="Повторить пароль"
                      autocomplete="on"
                    />
                  </div>
                  <button
                    @click="handleSubmit"
                    class="uk-button uk-button-primary uk-width-1-1"
                  >
                    Создать
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
              :src="avatarImage"
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
      avatarImage: "/no-avatar.png",
      errors: []
    };
  },
  methods: {
    showFileChooser() {
      this.$refs.avatarImage.click();
    },
    handleSubmit(e) {
      if(this.$refs.password.value !== this.$refs.passwordCheck.value) {
        this.errors.push("Пароли не сопадают!")
      }
      if(!this.$refs.lName.value || !this.$refs.fName.value || !this.$refs.position.value || !this.$refs.email.value) {
        this.errors.push(`В обязательных полях отсутствуют данные!`)
      }
      if(this.errors.length){
        this.toast.error(`Ошибка, нельзя создать пользтеля:\n${this.errors.join('\n')}`)
      } else {
        let newUserObj = {
          fName: this.$refs.fName.value,
          lName: this.$refs.lName.value,
          position: this.$refs.position.value,
          password: this.$refs.password.value,
          email: this.$refs.email.value
        }
        if(this.avatarImage !== '/no-avatar.png') {
          Object.assign(newUserObj, {avatar: this.avatarImage})
        }
        axios.post('http://localhost:3000/api/users', newUserObj, {headers: {'Content-Type': 'application/json'}})
          .then(response => {
            this.toast.success(response.data.message)
            this.$router.push('/users')
          })
          .catch(err => this.toast.error(err.message))
      }
    },
    setAvatar(){
      UIkit.modal("#avatarModalBox").hide()
      this.avatarImage = this.$refs.cropper.getCroppedCanvas({width: 500, height: 500}).toDataURL();
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