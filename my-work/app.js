var WIDTH = 800;
var HEIGHT = 600;

var runs = [
  {
    id: 1,
    date: 'October 1, 2017 at 4:00PM',
    distance: 5.2
  },
  {
    id: 2,
    date: 'October 2, 2017 at 5:00PM',
    distance: 7.0725
  },
  {
    id: 3,
    date: 'October 3, 2017 at 6:00PM',
    distance: 8.7
  }
];

d3.select('svg')
  .style('width', WIDTH)
  .style('height', HEIGHT);

var yScale = d3.scaleLinear(); // create the scale

// scaleTime maps date values with numeric visual points.
// HEIGHT corresponds to min data value
yScale.range([HEIGHT, 0]);
var yMin = d3.min(runs, function(datum, index) {
  // compare distance properties of each item in the data array
  return datum.distance;
});

var yMax = d3.max(runs, function(datum, index) {
  // compare distance properties of each item in the data array
  return datum.distance;
});

// now that we have the min/max of the data set for distance,
// we can use those values for the yScale domain
yScale.domain([yMin, yMax]);

var xScale = d3.scaleTime();
xScale.range([0, WIDTH]);
xScale.domain([new Date('2017-10-1'), new Date('2017-10-31')]);
// console.log(xScale(new Date('2017-10-28')));
// console.log(xScale.invert(400));

//this format matches our data in the runs array
// https://github.com/d3/d3-time-format#locale_format
var parseTime = d3.timeParse('%B%e, %Y at %-I:%M%p');
console.log(parseTime('October 3, 2017 at 6:00PM'));

var formatTime = d3.timeFormat('%B%e, %Y at %-I:%M%p');
//this format matches our data in the runs array
console.log(formatTime(new Date()));

d3.selectAll('circle')
  .data(runs)
  .attr('cy', function(datum, index) {
    return yScale(datum.distance);
  });
  
d3.selectAll('circle')
  .attr('cx', function(datum, index) {
    return xScale(parseTime(datum.date));
  });
