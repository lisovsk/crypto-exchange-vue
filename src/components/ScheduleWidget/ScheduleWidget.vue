<template>

<div class="schedule">
  <div v-if="pointsFromAPI &&  pointsFromAPI.length">
      <div class="wr-curr-price">
        <div class="currency">{{currency}} - USD</div>
        <div class="wr-price">
          <span class="price">${{lastPrice}}</span>
          <span class="percent" :class="{'plus-percent' : percent > 0, 'minus-percent' : percent < 0}">
            (<span v-show="percent > 0">+</span>{{percent}})
          </span>
        </div>
      </div>
      <visual-graph :points="lastPoints"></visual-graph>
    </div>
  <rotate-square2 class="spinner" v-else></rotate-square2>
</div>

</template>

<script>
import { RotateSquare2 } from 'vue-loading-spinner';
/* eslint-disable */
import VisualGraph from './VisualGraph.vue';
/* eslint-enable */
import API from './API_WS';

export default {
  data() {
    return {};
  },
  computed: {
    lastPrice() {
      const lastItem = this.pointsFromAPI[this.pointsFromAPI.length - 1];
      if (!lastItem) return null;
      return this.pointsFromAPI[this.pointsFromAPI.length - 1].y.toFixed(4);
    },
    percent() {
      if (!this.lastPrice) return null;
      return (this.lastPrice * 100 / this.pointsFromAPI[0].y - 100).toFixed(4);
    },
    lastPoints() {
      if (this.amount >= this.pointsFromAPI.length) {
        return this.pointsFromAPI;
      }
      return this.pointsFromAPI.slice(
        Math.max(this.pointsFromAPI.length - this.amount, 1),
      );
    },
  },
  props: {
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: '',
    },
  },
  components: {
    VisualGraph,
    RotateSquare2,
  },
  mixins: [API],
};
</script>

<style scoped>
.schedule {
  font-family: Arial, Helvetica, sans-serif;
  height: 250px;
  position: relative;
}
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -20px;
  margin-top: -20px;
}
.minus-percent {
  color: #a34738;
}

.plus-percent {
  color: green;
}

.percent {
  font-size: 18px;
}

.currency {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 17px;
}

.wr-curr-price {
  padding-left: 20px;
}

.price {
  color: #79bf82;
  font-size: 20px;
}

.wr-price {
  padding-bottom: 27px;
}
</style>