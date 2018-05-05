class OLS {

  constructor(points) {
    this.m = points.length;
    this.sumYX = 0;
    this.sumY = 0;
    this.sumX = 0;
    this.sumXsqr = 0;

    this.process();
  }

  process() {
    for(let i = 0; i < points.length; ++i) {
      let set = points[i];
      let x = set[0];
      let y = set[1];

      this.sumX += x;
      this.sumY += y;
      this.sumYX += (y * x);
      this.sumXsqr += (x * x);
    }

    this.a = this.A();
    this.b = this.B();

    console.log('sumX', this.sumX);
    console.log('sumY', this.sumY);
    console.log('sumYX', this.sumYX);
    console.log('sumXsqr', this.sumXsqr);
    console.log('a', this.a);
    console.log('b', this.b);
  }

  A() {
    return ( this.sumYX - (( this.sumY * this.sumX ) / this.m )) / ( this.sumXsqr - (( this.sumX * this.sumX ) / this.m ));
  }

  B() {
    return ( 1 / this.m ) * this.sumY - ( this.A() / this.m ) * this.sumX;
  }

  factory() {
    return (x) => {
      return (this.a * x) + this.b;
    }
  }
}

const points = [
  [3.04, 0.91],
  [3.64, 1.01],
  [4.61, 1.09],
  [5.57, 1.11],
  [6.74, 1.20],
  [7.77, 1.30]
];

// Test Run
let sample = new OLS(points);
const func = sample.factory();

console.log('A', sample.A());
console.log('B', sample.B());

console.log('Result: ', func(5));

module.exports = {
  OLS
};