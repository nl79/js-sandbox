
class ID3 {

  constructor(data, config) {
    this.data = data;
    this.config = config;

    this.p = 0;
    this.n = 0;

    this.analyze();
   
    this.process();
  }

  // Calculate the global P, N values for the collection.
  analyze() {
    let row, field = this.classifier();

    for(let i = 0; i < this.data.length; ++i) {
      row = this.data[i];

      // Validate the classifier field exists.
      if(row[field]) {
       
        // Check if the classifier value is a positive of negative class.
        //Positive classification
        if(this.positive(row[field])) {
          this.p += 1;

          // Negative classification
        } else if(this.negative(row[field])) {
          this.n += 1;
        }
      }
    }
  }

  process() {
    let attributes = Object.keys(this.data[0]);
    let max = 0;
    let attribute = '';
  
    // Process each field that is not the classification field and determine the Highet gain.
    for(let i = 0; i < attributes.length; i++) {
      let a = attributes[i];

      //skip the classification field.
      if(this.isClassifier(a)) { continue; }

      let result = this.induce(a);

      console.log('result', result);
      let keys = Object.keys(result);
      let values = Object.values(result)

      let gain = this.G(result);

      if(gain > max) {
        max = gain;
        attribute = a;
      }
      console.log(`${a}: ${gain}`);
    }

    console.log('max', max);
    console.log('attribute', attribute);

    // Aggregate a sub-collection for each field. 

  }

  iterate() {

  }

  aggregate(field, value) {

  }

  /*
   * Generates a new collection of tuples for every unique value of 'field', and calculates 
   * the P and N class numbers for each.
   */ 
  induce(field) {

    let row, temp, map = {};
  
    for(let i = 0; i < this.data.length; ++i) {
      row = this.data[i];

      if(row[field]) {

        // Check if the map contains the particular value.
        temp = map[row[field]] || { p: 0, n: 0 };
        
        // Validate the classifier field exists.
        if(row[this.classifier()]) {

          // Check if the classifier value is a positive of negative class.

          //Positive classification
          if(this.positive(row[this.classifier()])) {
            temp.p += 1;

            // Negative classification
          } else if(this.negative(row[this.classifier()])) {
            temp.n += 1;
          }
        }

        // Set the update field back into the map object.
        map[row[field]] = temp;
      }
    }

    return map;
  }

  isClassifier(field) {
    return field === this.classifier();
  }

  // Returns the field name that is used for classification.
  classifier() {
    return this.config.classifier.field;
  }

  // Checks if the supplied value matches the positive class value.
  positive(val) {
    return val === this.config.classifier.p

  }

  // Checks if the supplied value matches the negative class value.
  negative(val) {
    return val === this.config.classifier.n
  }

  /*
   * Information Gain
   * I(p,n) = -(p/p+n)Log_2(p/p+n)-(n/p+n)Log_2(n/p+n)
   *
   */

  static log2(n) {
    if (!n || n === 0) {
      return 0;
    }

    return Math.log2(n);
  }

  I(p, n) {
    const ppn = ( p / ( p + n ) );
    const npn = ( n / ( p + n ) );

    const res = -ppn * ID3.log2(ppn) - npn * ID3.log2( npn );
    
    return res;
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
  E(subsets) {
    let result = 0;

    for( let i = 0; i < subsets.length; ++i) {
      let attr = subsets[i];

      result += ( (attr.p + attr.n)/(this.p + this.n) ) * this.I(attr.p, attr.n);
    }

    return result;
  }



  /*
   * Gain(A) = I(p, n) - E(A)
   * @A - Attribute subsets
   * @p - total positive tags
   * @n - total negative tags
   */
  G(subsets) {
    return this.I(this.p, this.n) - this.E(subsets);
  }

  // Generate row maps with {fieldName: field} value.
  static MapRows(headers, data, config = {}) {

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

const alg = new ID3(ID3.MapRows(headers, data), config);

//console.log(ID3.MapRows(headers, data));
//console.log(alg.induce('Income'));
module.export = {
  ID3
}
