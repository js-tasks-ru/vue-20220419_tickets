<template>
  <div class="toast" :class="toastClass">
    <ui-icon class="toast__icon" :icon="iconSrc" />
    <span><slot /></span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

const icons = {
  success: 'check-circle',
  error: 'alert-circle',
};

const classes = {
  success: 'toast_success',
  error: 'toast_error',
};

export default {
  name: 'UiToast',
  components: {
    UiIcon,
  },
  props: {
    type: {
      type: String,
      default: 'toast_success',
    },
  },

  computed: {
    iconSrc() {
      return icons[this.type];
    },
    toastClass() {
      return classes[this.type];
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
