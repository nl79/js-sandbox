/*
 * Information Gain
 * I(p,n) = -(p/p+n)Log_2(p/p+n)-(n/p+n)Log_2(n/p+n)
 *
 */

function log2(n) {
  if (!n || n === 0) {
    return 0;
  }

  return Math.log2(n);
}

function I(p, n) {
  const ppn = ( p / ( p + n ) );
  const npn = ( n / ( p + n ) );
  return -ppn * log2(ppn) - npn * log2( npn );
}

/*
 * Entropy
 * E(A) = SUM(i=1 to v){(p_i + n_i)/(p+n)}I(p, n)
 *
 */

/*
 * @subsets = Attribute 'A' subsets: [{p: 4, n: 9}, {p: 2, n: 4}..]
 * @total = total p + n for entire input set.
 */
function E(subsets, p, n) {
  let result = 0;

  for( let i = 0; i < subsets.length; ++i) {
    let attr = subsets[i];

    result += ( (attr.p + attr.n)/(p + n) ) * I(attr.p, attr.n);
  }

  return result;
}



/*
 * Gain(A) = I(p, n) - E(A)
 * @A - Attribute subsets
 * @p - total positive tags
 * @n - total negative tags
 */
function G(subsets, p, n) {
  return I(p, n) - E(subsets, p, n);
}

const subsets = [
  {p: 1, n: 5},
  {p: 5, n: 1},
  {p: 3, n: 0}
];

console.log('G(subsets, 9, 6)', G(subsets, 9, 6));

module.exports = {
  G,
  I,
  E
};