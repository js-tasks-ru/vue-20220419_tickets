import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update'],

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    update() {
      this.$emit('update', this.count + 1);
    },
  },

  // Шаблон потребуется отредактировать
  template: `<button @click="update()" type="button">{{count}}</button>`,
});
