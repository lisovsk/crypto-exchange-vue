<template>
<div>
    <div class="schedule-box" ref="graph" v-if="!points.length">
        No data
    </div>
    <svg v-else-if="points.length === 1 && height && width" ref="graph" class="schedule-box">
        <polyline  :points="`0,0 0,${height} ${width},${height}`" fill="#fff" stroke-width="2" stroke="#ad5c50"/>
        <circle :cx="`${width/2}`" :cy="`${height/2}`" r="3" fill="#d2a69f" stroke="#ad5c50"/>
    </svg>
    <svg v-else ref="graph" class="schedule-box">
        <polyline  :points="pointsString" fill="#d2a69f" stroke-width="2" stroke="#ad5c50"/>
    </svg>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  mounted() {
    this.chengedSize();
    window.addEventListener('resize', this.chengedSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chengedSize);
  },
  data() {
    return {
      width: null,
      height: null,
    };
  },
  computed: {
    pointsNormalize() {
      if (
        _.isEmpty(this.points) ||
        !this.extremeValues ||
        !this.height ||
        !this.width
      )
        return null;
      return this.points.map(item => {
        const itemNormalize = {};
        itemNormalize.x =
          (item.x - this.extremeValues.minX) /
          (this.extremeValues.maxX - this.extremeValues.minX || 1) *
          this.width;
        itemNormalize.y =
          (1 -
            (item.y - this.extremeValues.minY) /
              (this.extremeValues.maxY - this.extremeValues.minY || 1)) *
          this.height;
        return itemNormalize;
      });
    },
    extremeValues() {
      if (_.isEmpty(this.points)) {
        return null;
      }
      return {
        maxY: _.maxBy(this.points, item => item.y).y,
        minY: _.minBy(this.points, item => item.y).y,
        maxX: _.maxBy(this.points, item => item.x).x,
        minX: _.minBy(this.points, item => item.x).x,
      };
    },
    extremeValuesNormalize() {
      if (!this.height || !this.width || !this.extremeValues) return null;
      const extremeValuesLocal = {};
      extremeValuesLocal.maxY = this.height;
      extremeValuesLocal.minY =
        this.extremeValues.minY * this.height / this.extremeValues.maxY;
      extremeValuesLocal.maxX = this.width;
      extremeValuesLocal.minX =
        this.extremeValues.minX * this.width / this.extremeValues.maxX;
      return extremeValuesLocal;
    },
    pointsString() {
      if (
        _.isEmpty(this.points) ||
        !this.pointsNormalize ||
        !this.extremeValuesNormalize
      )
        return '';

      const points = this.pointsNormalize.reduce(
        (prev, curr) => `${prev}${curr.x},${curr.y} `,
        '',
      );
      return `0,${this.extremeValuesNormalize.maxY} ${points}${
        this.extremeValuesNormalize.maxX
      },${this.extremeValuesNormalize.maxY} ${
        this.extremeValuesNormalize.minX
      },${this.extremeValuesNormalize.maxY} `;
    },
  },
  methods: {
    chengedSize() {
      _.debounce(() => {
        const computedStyleGraph = getComputedStyle(this.$refs.graph);
        this.width = parseFloat(computedStyleGraph.width);
        this.height = parseFloat(computedStyleGraph.height);
      }, 100)();
    },
  },
  props: {
    points: {
      type: Array,
      default: null,
    },
  },
  components: {},
};
</script>

<style scoped>
.schedule-box {
  width: 100%;
  min-height: 150px;
  height: 100%;
}
</style>
