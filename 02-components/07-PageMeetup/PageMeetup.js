import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      error: false,
    };
  },

  watch: {
    meetupId() {
      this.error = false;
      this.getMeetup(this.meetupId);
    },
  },

  mounted() {
    this.getMeetup(this.meetupId);
  },

  methods: {
    getMeetup(meetupId) {
      fetchMeetupById(meetupId)
        .then((meetup) => {
          this.meetup = meetup;
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <template v-if="!error">
        <!-- meetup view -->
        <meetup-view v-if="meetup" :meetup = "meetup"></meetup-view>

        <ui-container v-else>
          <ui-alert>Загрузка...</ui-alert>
        </ui-container>
      </template>
      <ui-container v-else>
        <ui-alert>{{error}}</ui-alert>
      </ui-container>
    </div>`,
});
