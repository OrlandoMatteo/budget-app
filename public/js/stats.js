var labelsArray = [];
var dataArray = [];
var dataTable = [];


var myChart = Highcharts.chart("container", {
  chart: {
    type: "line",
  },
  title: {
    text: "Last Month",
  },
  xAxis: {
    tickInterval: 30 * 24 * 3600 * 1000, // one week
    tickWidth: 0,
    gridLineWidth: 1,
    labels: {
      align: "left",
      x: 3,
      y: -3,
    },
    type: "datetime",
  },
  yAxis: {
    title: {
      text: "Savings €",
    },
  },
  series: [
    {
      name: "Balance",
      data: [],
    },
  ],
  tooltip: {
    // headerFormat: "{point.y} € @ {point.s} ",
    // pointFormat: "{point.value} @ {point.title}",
    formatter: function () {
      return this.points.reduce(function (s, point) {
        return s+'<br> '+ point.point.title + ": " + point.point.value + "€";
      }, "<b>" +
        Highcharts.dateFormat("%A %d %b %H:%M", this.x) +
        "</b>: " +
        this.y);
    },
    shared: true,
  },
});

var d = new Date();
d.setDate(1);
db.collection("movements")
  .where("timestamp", ">", firebase.firestore.Timestamp.fromDate(d))
  .get()
  .then((snapshot) => {
    var lastValue = 0;
    snapshot.docs.forEach((doc) => {
      var item = doc.data();

      var timestamp = new Date(item.timestamp.toDate());
      var s = timestamp.toDateString();

      if (item.income) {
        value = lastValue + parseFloat(item.value);
      } else {
        value = lastValue - parseFloat(item.value);
      }
      lastValue = value;

      dataTable.push(
        Array(timestamp, value, s + ": " + value + "€\n" + item.title)
      );

      myChart.series[0].addPoint({
        x: timestamp,
        y: value,
        value: item.value,
        title: item.title,
        s: s,
      });
    });
  });