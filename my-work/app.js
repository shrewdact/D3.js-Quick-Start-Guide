var WIDTH = 800;
var HEIGHT = 600;

d3.select('svg')
  .style('width', WIDTH)
  .style('height', HEIGHT);

// AJAX callback
d3.json('data.json').then(function(data) {
  d3.select('svg')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect');

  var yMin = d3.min(data, function(datum, index) {
    return datum.count;
  });

  var yMax = d3.max(data, function(datum, index) {
    return datum.count;
  });

  var yScale = d3.scaleLinear();
  yScale.range([HEIGHT, 0]);
  var yMin = d3.min(data, function(datum, index) {
    return datum.count;
  });

  var yMax = d3.max(data, function(datum, index) {
    return datum.count;
  });
  yScale.domain([yMin - 1, yMax]);

  d3.selectAll('rect').attr('height', function(datum, index) {
    return HEIGHT - yScale(datum.count);
  });

  var xScale = d3.scaleLinear();
  xScale.range([0, WIDTH]);
  xScale.domain([0, data.length]);
  d3.selectAll('rect').attr('x', function(datum, index) {
    return xScale(index);
  });

  d3.selectAll('rect').attr('y', function(datum, index) {
    return yScale(datum.count);
  });
});
