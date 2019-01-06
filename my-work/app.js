var WIDTH = 300;
var HEIGHT = 200;

d3.select('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT);

var nodesData = [
  { name: 'Charlie' },
  { name: 'Mac' },
  { name: 'Dennis' },
  { name: 'Dee' },
  { name: 'Frank' },
  { name: 'Cricket' }
];

var linksData = [
  { source: 'Charlie', target: 'Mac' },
  { source: 'Dennis', target: 'Mac' },
  { source: 'Dennis', target: 'Dee' },
  { source: 'Dee', target: 'Mac' },
  { source: 'Dee', target: 'Frank' },
  { source: 'Cricket', target: 'Dee' }
];

var nodes = d3
  .select('#nodes')
  .selectAll('circle')
  .data(nodesData)
  .enter()
  .append('circle');

var links = d3
  .select('#links')
  .selectAll('line')
  .data(linksData)
  .enter()
  .append('line');

d3.forceSimulation()
  .nodes(nodesData)
  .on('tick', function() {
    nodes
      .attr('cx', function(datum) {
        return datum.x;
      })
      .attr('cy', function(datum) {
        return datum.y;
      });

    links
      .attr('x1', function(datum) {
        return datum.source.x;
      })
      .attr('y1', function(datum) {
        return datum.source.y;
      })
      .attr('x2', function(datum) {
        return datum.target.x;
      })
      .attr('y2', function(datum) {
        return datum.target.y;
      });
  });
