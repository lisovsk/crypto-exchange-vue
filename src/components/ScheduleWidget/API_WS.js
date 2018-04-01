const SOCET_URL = 'ws://coins-stream.demo.javascript.ninja';
let socket;
const points = {};

const promiseData = new Promise(resolve => {
  socket = new WebSocket(SOCET_URL);
  socket.onopen = () => {
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (!points[data.currency]) {
        points[data.currency] = [];
      }
      points[data.currency].push({
        // x: (count += 1),
        x: Date.now(),
        y: parseFloat(data.price),
      });
    };
    resolve(socket);
  };
});

export default {
  data() {
    return {
      pointsFromAPI: null,
    };
  },
  created() {
    promiseData.then(soc => {
      soc.send(
        JSON.stringify({
          type: 'subscribe',
          currency: this.currency,
        }),
      );
    });
    if (!points[this.currency]) {
      points[this.currency] = [];
    }
    this.pointsFromAPI = points[this.currency];
  },
  beforeDestroy() {
    socket.send(
      JSON.stringify({
        type: 'upsubscribe',
        currency: this.currency,
      }),
    );
  },
};
