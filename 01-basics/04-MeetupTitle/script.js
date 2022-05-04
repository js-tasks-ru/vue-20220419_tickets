import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const RootComponent = defineComponent({
  name: 'RootComponent',

  data() {
    return {
      meetupId: null,
      meetup: null,
    };
  },
  watch: {
    meetupId(newValue, oldValue) {
      if (!this.meetupId) {
        return null;
      }

      fetchMeetupById(this.meetupId).then((meetup) => {
        this.meetup = meetup;
      });
    },
  },
});

const app = createApp(RootComponent);
const vm = app.mount('#app');
