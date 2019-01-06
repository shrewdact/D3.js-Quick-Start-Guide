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

var linksData =[
  {source: "Charlie", target: "Mac"},
  {source: "Dennis", target: "Mac"},
  {source: "Dennis", target: "Dee"},
  {source: "Dee", target: "Mac"},
  {source: "Dee", target: "Frank"},
  {source: "Cricket", target: "Dee"},
]