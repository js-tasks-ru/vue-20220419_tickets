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
      delay: 5, // in seconds
    };
  },

  created() {
    this.intervalId = setInterval(() => {
      if (this.toasts.length) {
        this.clearToasts();
      }
    }, 1000);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },

  methods: {
    success(data, delay = this.delay) {
      this.toasts.unshift({
        type: 'toast_success',
        text: data,
        expire: this.getExpiredDate(delay),
      });
    },

    error(data, delay = this.delay) {
      this.toasts.unshift({ type: 'toast_error', text: data, expire: this.getExpiredDate(delay) });
    },

    getExpiredDate(delay) {
      let currentDate = new Date();
      currentDate.setSeconds(currentDate.getSeconds() + delay);

      return currentDate;
    },

    clearToasts() {
      let forRemove = this.toasts.filter((e) => e.expire <= new Date());
      forRemove.forEach((f) =>
        this.toasts.splice(
          this.toasts.findIndex((e) => e.expire === f.expire),
          1,
        ),
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
