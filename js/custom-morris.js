var $emiDonutData = [
  { label: "Principal", value: 500000 },
  { label: "Interest", value: 101140 },
];

const emiDonutData =  Morris.Donut({
  element: 'emiDonutMorris',
  data: $emiDonutData,
  barSize: 0.1,
  labelColor: '#3e5569',
  resize: true, //defaulted to true
  colors: ['#84BD5A', '#322153']
});


var $annuityDonutData = [
  { label: "Invested", value: 125000 },
  { label: "Interest", value: 22398 },
];


const annuityDonutData =  Morris.Donut({
  element: 'annuityDonutMorris',
  data: $annuityDonutData,
  barSize: 0.1,
  labelColor: '#3e5569',
  resize: true, //defaulted to true
  colors: ['#84BD5A', '#322153']
});


var $sipDonutData = [
  { label: "Invested", value: 300000 },
  { label: "Interest", value: 112432 },
];

const sipDonutData =  Morris.Donut({
  element: 'sipDonutMorris',
  data: $sipDonutData,
  barSize: 0.1,
  labelColor: '#3e5569',
  resize: true, //defaulted to true
  colors: ['#84BD5A', '#322153']
});

var $futureDonutData = [
  { label: "Invested", value: 259010 },
  { label: "Interest", value: 240990 },
];


const futureDonutData =  Morris.Donut({
  element: 'futureDonutMorris',
  data: $futureDonutData,
  barSize: 0.1,
  labelColor: '#3e5569',
  resize: true, //defaulted to true
  colors: ['#84BD5A', '#322153']
});

var $fdDonutData = [
  { label: "Invested", value: 100000 },
  { label: "Interest", value: 41478 },
];


const fdDonutData =  Morris.Donut({
  element: 'fdDonutMorris',
  data: $fdDonutData,
  barSize: 0.1,
  labelColor: '#3e5569',
  resize: true, //defaulted to true
  colors: ['#84BD5A', '#322153']
});

var $rdDonutData = [
  { label: "Invested", value: 900000 },
  { label: "Interest", value: 95608 },
];


const rdDonutData =  Morris.Donut({
  element: 'rdDonutMorris',
  data: $rdDonutData,
  barSize: 0.1,
  labelColor: '#3e5569',
  resize: true, //defaulted to true
  colors: ['#84BD5A', '#322153']
});

var $swpDonutData = [
  { label: "Invested", value: 120000 },
  { label: "Withdrawal", value: 120000 },
  { label: "Balance", value: 0},
  { label: "Interest", value: 3578 },
];


const swpDonutData =  Morris.Donut({
  element: 'swpDonutMorris',
  data: $swpDonutData,
  barSize: 0.1,
  labelColor: '#3e5569',
  resize: true, //defaulted to true
  colors: ['#84BD5A', '#28a745', '#009688','#322153']
});



