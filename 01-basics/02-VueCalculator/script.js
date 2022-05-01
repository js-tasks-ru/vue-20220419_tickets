import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const RootComponent = defineComponent({
  name: 'RootComponent',

  data() {
    return {
      operandOne: 0,
      operandTwo: 0,
      operator: 'multiply',
    };
  },
  computed: {
    calculation() {
      let result;
      switch (this.operator) {
        case 'sum':
          result = this.operandOne + this.operandTwo;
          break;
        case 'subtract':
          result = this.operandOne - this.operandTwo;
          break;
        case 'multiply':
          result = this.operandOne * this.operandTwo;
          break;
        case 'divide':
          result = this.operandOne / this.operandTwo;
          break;
      }

      return result;
    },
  },
});

const app = createApp(RootComponent);
const vm = app.mount('#app');
