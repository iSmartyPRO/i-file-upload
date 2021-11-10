<template>
  <section class="uk-section uk-section-default">
    <div class="uk-container">
      <div class="header">
        <h1>File</h1>
      </div>
      <hr />
      <input
        ref="input"
        type="file"
        name="image"
        accept="image/"
        @change="setImage"
      />
      <div class="uk-child-width-1-2 uk-grid-match" uk-grid>
        <div>
          <div
            class="
              uk-card uk-card-default uk-card-hover uk-card-body uk-text-center
            "
          >
            <h3>Исходный файл</h3>
            <vue-cropper
              ref="cropper"
              :aspect-ratio="1 / 1"
              :src="imgSrc"
              preview=".preview"
            />
            <div class="actions">
              <button
                class="uk-button uk-button-primary uk-width-1-2"
                @click="showFileChooser"
              >
                Выбрать фото
              </button>
              <button
                class="uk-button uk-button-danger uk-width-1-2"
                @click="cropImage"
              >
                Обрезать фото
              </button>
              <button
                class="uk-button uk-button-secondary uk-width-1-1"
                @click="sendImage"
              >
                Отравить
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            class="
              uk-card uk-card-default uk-card-hover uk-card-body uk-text-center
            "
          >
            <h3>Предпросмотр</h3>
            <div class="preview"></div>
          </div>
        </div>

        <div>
          <div
            class="
              uk-card uk-card-default uk-card-hover uk-card-body uk-text-center
            "
          >
            <h3>Обрезка</h3>
            <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
          </div>
        </div>
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
  name: "File Upload",
  components: { VueCropper },
  setup() {
    const toast = useToast()
    return {toast}
  },

  data() {
    return {
      imgSrc: "/photo.jpg",
      cropImg: "",
      data: null,
    };
  },

  methods: {
    showFileChooser() {
      this.$refs.input.click();
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    sendImage() {
      const image = this.$refs.cropper.getCroppedCanvas().toDataURL()
      axios.post(`${process.env.VUE_APP_BACKEND}/api/file`, {image})
        .then(response => {
          this.toast.success(response.data.message)
        })
        .catch(err => this.toast.error(err.message))

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
input {
  display: none;
}
img {
  height: 400px;
}
.preview {
  text-align: center;
  width: 100%;
  height: calc(400px * (9 / 9));
  overflow: hidden;
}
</style>