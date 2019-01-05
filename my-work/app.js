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

// set dimensions of outer SVG
d3.select('svg')
  .style('width', WIDTH)
  .style('height', HEIGHT);

// https://github.com/d3/d3-time-format#locale_format
var parseTime = d3.timeParse('%B%e, %Y at %-I:%M%p'); //use this to convert strings to dates
var formatTime = d3.timeFormat('%B%e, %Y at %-I:%M%p');
var xScale = d3.scaleTime(); //create the scale used to convert dates to x position values
xScale.range([0, WIDTH]); //set visual range of xScale to be 0 -> 800
var xDomain = d3.extent(runs, function(datum, index) {
  //create array containing min/max date values for run data
  return parseTime(datum.date); //use parseTime to convert string data value to data object
});
xScale.domain(xDomain); //set domain of xScale to min/max values created by d3.extent in last step

var yScale = d3.scaleLinear(); // create the scale used to convert distances run to y position values

// set the visual range to 600 -> 0
// remember 600 will map to a low run distance value and 0 will map to high run distance value
// we do this because y starts at 0 at the top of the SVG and increases in values as we move down the SVG
yScale.range([HEIGHT, 0]);

// create array containing min/max distance values for run data
var yDomain = d3.extent(runs, function(datum, index) {
  return datum.distance; // set domain of yScale to min/max values created by d3.extent in the last step
});

yScale.domain(yDomain); // set domain of yScale to min/max values created by d3.extent in the last step

/** svg click handler */
d3.select('svg').on('click', function() {
  // gets the x position of the mouse relative to the svg element
  var x = d3.event.offsetX;
  // gets the y position of the mouse relative to the svg element
  var y = d3.event.offsetY;
  if (lastTransform !== null) {
    x = lastTransform.invertX(d3.event.offsetX);
    y = lastTransform.invertY(d3.event.offsetY);
  }

  // get a date value from the visual point that we clicked on
  var date = xScale.invert(x);

  // get a numeric distance value from
  // the visual point that we clicked on
  var distance = yScale.invert(y);

  // create a new "run" object
  var newRun = {
    // generate a new id by adding 1 to the last run's id
    id: runs.length > 0 ? runs[runs.length - 1].id + 1 : 1,
    date: formatTime(date),
    distance: distance // add the distance
  };

  runs.push(newRun); // push the new run onto the runs array

  createTable(); // render the table
  render();
});

var render = function() {
  d3.select('#points').html('');
  // since no circles exist,
  // we need to select('svg') so that
  // d3 knows where to append the new circles
  d3.select('#points')
    .selectAll('circle')
    // attach the data as before
    .data(runs)
    // find the data objects that have not yet
    // been attached to visual elements
    .enter()
    // for each data object that hasn't been attached;
    .append('circle');

  d3.selectAll('circle').attr('cy', function(datum, index) {
    return yScale(datum.distance);
  });

  d3.selectAll('circle').attr('cx', function(datum, index) {
    return xScale(parseTime(datum.date));
  });

  /** delete click handler  */
  d3.selectAll('circle').on('click', function(datum, index) {
    // console.log(datum)
    //stop click event from propagating to
    //the SVG element and creating a run
    d3.event.stopPropagation();
    //create a new array that has removed the run
    //with the correct id. Set it to the runs var
    runs = runs.filter(function(run, index) {
      return run.id != datum.id;
    });
    console.log(runs);
    render(); //re-render dots
    createTable(); //re-render table
  });

  /** drag click handler  */

  var dragEnd = function(datum) {
    var x = d3.event.x;
    var y = d3.event.y;
    var date = xScale.invert(x);
    var distance = yScale.invert(y);

    datum.date = formatTime(date);
    datum.distance = distance;
    createTable();
  };

  var drag = function(datum) {
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this).attr('cx', x);
    d3.select(this).attr('cy', y);
  };

  var dragBehavior = d3
    .drag()
    .on('drag', drag)
    .on('end', dragEnd);
  d3.selectAll('circle').call(dragBehavior);
};

render();

var bottomAxis = d3.axisBottom(xScale);
d3.select('svg')
  .append('g')
  .attr('id', 'x-axis')
  .call(bottomAxis)
  .attr('transform', 'translate(0,' + HEIGHT + ')');
var leftAxis = d3.axisLeft(yScale);
d3.select('svg')
  .append('g')
  .attr('id', 'y-axis')
  // no need to transform, since it's placed correctly initially
  .call(leftAxis);

var createTable = function() {
  // clear out all rows from the table
  d3.select('tbody').html('');
  for (var i = 0; i < runs.length; i++) {
    var row = d3.select('tbody').append('tr');
    row.append('td').html(runs[i].id);
    row.append('td').html(runs[i].date);
    row.append('td').html(runs[i].distance);
  }
};

createTable();

var lastTransform = null;
var zoomCallback = function() {
  lastTransform = d3.event.transform;
  d3.select('#points').attr('transform', d3.event.transform);
  d3.select('#x-axis').call(
    bottomAxis.scale(d3.event.transform.rescaleX(xScale))
  );
  d3.select('#y-axis').call(
    leftAxis.scale(d3.event.transform.rescaleY(yScale))
  );
};

var zoom = d3.zoom().on('zoom', zoomCallback);
d3.select('svg').call(zoom);
