var WIDTH = 360;
var HEIGHT = 360;
var radius = Math.min(WIDTH, HEIGHT) / 2;

var dataset = [
  { label: 'Bob', count: 10 },
  { label: 'Sally', count: 20 },
  { label: 'Matt', count: 30 },
  { label: 'Jane', count: 40 }
];

var mapper = d3.scaleOrdinal();
var colorScale = d3.scaleOrdinal();
colorScale.range(d3.schemeCategory10);
colorScale.domain(
  dataset.map(function(element) {
    return element.label;
  })
);

var arc = d3
  .arc()
  .innerRadius(0) //to make this a donut graph, adjust this value
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
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d) {
    return colorScale(d.data.label);
  });
