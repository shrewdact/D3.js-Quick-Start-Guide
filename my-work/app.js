var WIDTH = 360;
var HEIGHT = 360;
var radius = Math.min(WIDTH, HEIGHT) / 2;

var dataset = [
  { id: 1, label: 'Bob', count: 10 },
  { id: 2, label: 'Sally', count: 20 },
  { id: 3, label: 'Matt', count: 30 },
  { id: 4, label: 'Jane', count: 40 }
];

var mapper = d3.scaleOrdinal();
var colorScale = d3.scaleOrdinal();
colorScale.range(d3.schemeCategory10);
colorScale.domain(
  dataset.map(function(element) {
    return element.label;
  })
);

d3.select('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT);
var container = d3
  .select('g') //add this line and the next:
  .attr('transform', 'translate(' + WIDTH / 2 + ',' + HEIGHT / 2 + ')'); //add this line

var arc = d3
  .arc()
  .innerRadius(100) //to make this a donut graph, adjust this value
  .outerRadius(radius);

var pie = d3
  .pie()
  .value(function(d) {
    return d.count;
  })
  .sort(null);

var path = d3
  .select('g')
  .selectAll('path')
  .data(pie(dataset), function(datum) {
    return datum.data.id;
  })
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d) {
    return colorScale(d.data.label);
  })
  .each(function(d) {
    this._current = d;
  });

path.on('click', function(clickedDatum, clickedIndex) {
  dataset = dataset.filter(function(currentDatum, currentIndex) {
    return clickedDatum.data.id !== currentDatum.id;
  });

  path
    .data(pie(dataset), function(datum) {
      return datum.data.id;
    })
    .exit()
    .remove();

  path
    .transition() // create the transition
    .duration(750) // add ho long the transition takes
    .attrTween('d', function(d) {
      // tween the d attribute

      // interpolate from what the d attribute was and what it is now
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0); // save new value of data
      return function(t) {
        return arc(interpolate(t));
      };
    });
});
