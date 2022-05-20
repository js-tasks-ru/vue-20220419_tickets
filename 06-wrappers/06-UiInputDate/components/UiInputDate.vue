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
        return this.modelValue.toString();
      },
      set(value) {
        this.$emit('update:modelValue', parseFloat(value));
      },
    },
  },
};
</script>
