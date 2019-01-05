var WIDTH = 800;
var HEIGHT = 600;

var runs = [
  {
    id: 1,
    data: 'October 1, 2017 at 4:00PM',
    distance: 5.2
  },
  {
    id: 2,
    data: 'October 2, 2017 at 5:00PM',
    distance: 7.0725
  },
  {
    id: 3,
    data: 'October 3, 2017 at 6:00PM',
    distance: 8.7
  }
];

d3.select('svg')
  .style('width', WIDTH)
  .style('height', HEIGHT);

var yScale = d3.scaleLinear(); // create the scale
// HEIGHT corresponds to min data value
yScale.range([HEIGHT, 0]);
yScale.domain([0, 10]);

// console.log(yScale(5));
console.log(yScale.invert(450))
