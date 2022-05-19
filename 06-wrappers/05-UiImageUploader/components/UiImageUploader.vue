<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': status === 'pending' }"
      :style="{ '--bg-url': `url(${preview})` }"
    >
      <span class="image-uploader__text">{{ title }}</span>
      <input
        v-bind="$attrs"
        ref="myFile"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="handleChange($event)"
        @click="handleClick($event)"
      />
    </label>
  </div>
</template>

<script>
const states = {
  empty: {
    title: 'Загрузить изображение',
  },
  filled: {
    title: 'Удалить изображение',
  },
  pending: {
    title: 'Загрузка...',
  },
};

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function,
  },
  emits: ['remove', 'upload'],
  computed: {
    status() {
      if (this.preview) {
        return 'filled';
      }
      return 'empty';
    },
    bgImage() {
      return this.preview || undefined;
    },
    title() {
      return states[this.status].title;
    },

    // clickHandler() {
    //   if (this.status === 'filled') {
    //     return this.$attrs.onRemove();
    //   }
    //   return undefined;
    // },
  },
  methods: {
    handleClick(event) {
      if (this.status === 'filled') {
        event.preventDefault();
        this.$refs.myFile.value = null;
        this.$emit('remove');
      }
      // console.log(event);
    },

    handleChange(event) {
      const file = this.$refs.myFile.files[0];
      this.$emit('upload', { image: URL.createObjectURL(file) });
      // if (this.status === 'filled') {
      //   event.preventDefault();
      // }
      // console.log(event, this.$refs.myFile.files[0], URL.createObjectURL(file));
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
