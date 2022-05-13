<template>
  <div v-if="toasts" class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.type + toast.text" :toastClass="toast.type">
      {{ toast.text }}
    </ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
      intervalId: null,
      delay: 5000, // in milliseconds
    };
  },

  methods: {
    success(data, delay = this.delay) {
      let currentTime = new Date().getTime();
      this.toasts.push({
        type: 'toast_success',
        text: data,
        time: currentTime,
        timer: setTimeout(
          () => {
            this.deleteToast(currentTime);
          },
          delay,
          currentTime,
        ),
      });
    },

    error(data, delay = this.delay) {
      let currentTime = new Date().getTime();
      this.toasts.push({
        type: 'toast_error',
        text: data,
        time: currentTime,
        timer: setTimeout(
          () => {
            this.deleteToast(currentTime);
          },
          delay,
          currentTime,
        ),
      });
    },

    deleteToast(time) {
      this.toasts.splice(
        this.toasts.findIndex((e) => e.time === time),
        1,
      );
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
