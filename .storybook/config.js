import { configure } from '@storybook/vue';

import Vue from 'vue';

function loadStories() {
  // You can require as many stories as you need.
  require('../src/components/Autocomplete/Autocomplete.stories.js');
  require('../src/components/ScheduleWidget/ScheduleWidget.stories.js');
}

configure(loadStories, module);
