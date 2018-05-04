
class ID3 {

  constuctor(data, config) {
    this.data = data;
    this.config = config;

  }

  process() {
    // Process each field that is not the classification field and determine the Highet gain.

  }

  pass() {

  }



  /*
   * Information Gain
   * I(p,n) = -(p/p+n)Log_2(p/p+n)-(n/p+n)Log_2(n/p+n)
   *
   */

  log2(n) {
    if (!n || n === 0) {
      return 0;
    }

    return Math.log2(n);
  }

  I(p, n) {
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
  E(subsets, p, n) {
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
  G(subsets, p, n) {
    return I(p, n) - E(subsets, p, n);
  }

  // Generate row maps with {fieldName: field} value.
  MapRows(headers, data, config = {}) {

    let rows = data.map((o) => {

      let map = {};

      for(let i = 0; i < o.length; ++i) {
        map[headers[i]] = o[i];
      }
      return map;
    });
    return rows;
  }
}

const headers = [
  'Income',
  'Marital_Status',
  'Living_Area',
  'Car_Type',
  'Subscribe'
]
const data = [
 ['Medium', 'Single', 'NJ', 'Sports', 'Yes'],
 ['High', 'Married', 'NJ', 'Sedan', 'No'],
 ['Low', 'Single', 'NY', 'Sedan', 'No'],
 ['Medium', 'Single', 'CT', 'Sedan', 'Yes'],
 ['Medium', 'Married', 'NJ', 'Van', 'No'],
 ['Low', 'Married', 'NJ', 'Van', 'Yes'],
 ['Medium', 'Single', 'NY', 'Sports', 'Yes'],
 ['High', 'Married', 'CT', 'Van', 'No'],
 ['Medium', 'Married', 'CT', 'Van', 'No'],
 ['Low', 'Single', 'NJ', 'Sedan', 'Yes'],
 ['Medium', 'Married', 'NJ', 'Sedan', 'No'],
 ['High', 'Single', 'NY', 'Sedan', 'No'],
 ['High', 'Single', 'NY', 'Sports', 'Yes'],
 ['Medium', 'Single', 'NJ', 'Sedan', 'No'],
 ['Low', 'Single', 'NY', 'Sports', 'Yes']
];

const config = {
  // Classifier configuration
  classifier: {

    // field name
    field: 'Subscribe',
    // Positive class.
    p: 'Yes',
    // Negative class.
    n: 'No'
  }
}

const alg = new ID3(data, config);

console.log(alg.MapRows(headers, data));

module.export = {
  ID3
}
