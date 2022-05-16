<template>
  <div v-if="toasts" class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" :type="toast.type">
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
      // intervalId: null,
      delay: 5000, // in milliseconds
      toastStartId: 0,
    };
  },

  methods: {
    success(data, delay = this.delay) {
      this.showToast(data, 'success', delay);
    },

    error(data, delay = this.delay) {
      this.showToast(data, 'error', delay);
    },

    showToast(data, type, delay) {
      let toastId = this.toastStartId++;
      this.toasts.push({
        type: type,
        text: data,
        id: toastId,
        timer: setTimeout(
          () => {
            this.deleteToast(toastId);
          },
          delay,
          toastId,
        ),
      });
    },

    deleteToast(id) {
      this.toasts.splice(
        this.toasts.findIndex((e) => e.id === id),
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
