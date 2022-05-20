<template>
  <ui-input v-model="customModel" :type="type" />
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: [Number, null],
    },
  },

  emits: ['update:modelValue'],

  computed: {
    customModel: {
      get() {
        const date = new Date(this.modelValue);
        if (this.type === 'date') {
          return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
        }
        if (this.type === 'time') {
          return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
        }
        if (this.type === 'datetime-local') {
          // return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
          return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;
          // return '2017-06-01T08:30';
        }
        return null;
      },
      set(value) {
        this.$emit('update:modelValue', parseFloat(value));
      },
    },
  },
};
</script>
