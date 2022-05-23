<template>
  <button @click="handleClick">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  data() {
    return {
      localCount: undefined,
    };
  },
  watch: {
    count: {
      immediate: true,
      handler() {
        if (this.count !== this.localCount) {
          this.localCount = this.count;
        }
      },
    },
  },
  methods: {
    handleClick() {
      this.localCount++;
      this.$emit('update:count', this.localCount);
    },
  },
};
</script>
