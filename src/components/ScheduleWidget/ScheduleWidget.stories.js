// import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
// import { action } from '@storybook/addon-actions';
// import _ from 'lodash';

/* eslint-disable */
import ScheduleWidget from './ScheduleWidget.vue';
import visualGraph from './VisualGraph.vue';
/* eslint-enable */

storiesOf('ScheduleWidget', module)
  .add('Schedule', () => ({
    data() {
      return {
        value: '',
        pointsForSchedule: [
          { x: 1, y: 3 },
          { x: 2, y: 5 },
          { x: 3, y: 1 },
          { x: 4, y: 23 },
          { x: 5, y: 2 },
          { x: 6, y: 3 },
          { x: 7, y: 10 },
        ],
      };
    },
    methods: {},
    components: { visualGraph },
    template: `
        <visual-graph :points="pointsForSchedule"></visual-graph>
    `,
  }))
  .add('Amount of points 10', () => ({
    data() {
      return {
        value: '',
      };
    },
    methods: {},
    components: {
      ScheduleWidget,
    },
    template: `
    <div>
        <schedule-widget
          :amount="10"
          currency="BTC"
        >
        </schedule-widget>
    </div>
  `,
  }))
  .add('Base ScheduleWidget', () => ({
    data() {
      return {
        value: '',
      };
    },
    methods: {},
    components: {
      ScheduleWidget,
    },
    template: `
    <div>
        <schedule-widget
          :amount="50"
          currency="BTC"
        >
        </schedule-widget>
    </div>
  `,
  }))
  .add('2 ScheduleWidgets', () => ({
    data() {
      return {
        value: '',
      };
    },
    methods: {},
    components: {
      ScheduleWidget,
    },
    template: `
    <div>
        <schedule-widget
          :amount="50"
          currency="BTC"
        >
        </schedule-widget>
        <schedule-widget
          :amount="50"
          currency="ETH"
        >
        </schedule-widget>
    </div>
  `,
  }));
