class HITS {

  constructor(sites) {
    this.sites = sites;
    this.data = {};

    this.initialize();
  }

  initialize() {
    let keys = Object.keys(this.sites);
    let key;

    for(let i = 0; i < keys.length; ++i) {
      key = keys[i];
      this.data[key] = {
        a: 1,
        h: 1
      };
    }
  }

  /*
   * @node - node for which to get the authority value.
   */
  authority(node) {

    // get the nodes that point to the current node.
    let keys = Object.keys(this.sites);
    let score = 0;
    let key;

    for(let i = 0; i < keys.length; ++i) {
      key = keys[i];

      if(this.sites[key].find((o) => { return o === node })) {
        score += this.data[key].h;
      }
    }
    return score;
  }

  /*
   * @node - node for which to calculate the hub value.
   */
  hub(node) {
    // get the nodes that the current node points to.
    let nodes = this.sites[node];
    let current;
    let count = 0;

    for(let i = 0; i < nodes.length; ++i) {
      current = nodes[i];
      count += this.data[current].a;
    }
    return count;
  }

  /*
   *@k - Number of passes.
   */
  process(k) {

    for(let i = 1; i <= k; ++i) {
      this.pass(i);
    }

    return this.data;
  }

  pass(k) {
    let keys = Object.keys(this.sites);
    let key;
    let temp = {};

    for(let i = 0; i < keys.length; ++i) {
      key = keys[i];

      temp[key] = {
        a: this.authority(key),
        h: this.hub(key)
      };
    }

    this.data = temp;
  }

  getScores() {
    return this.data;
  }
}

const sites = {
  'a': ['c', 'e', 'f', 'g'],
  'b': ['c', 'f'],
  'c': ['a', 'd', 'f', 'g'],
  'd': ['b', 'c'],
  'e': ['a', 'd', 'g'],
  'f': ['c', 'e', 'g'],
  'g': ['a', 'b', 'c', 'f']
};

const alg = new HITS(sites);

console.log('alg.process(6)', alg.process(6));

// console.log('alg.getScores', alg.getScores());
// console.log('alg.authority', alg.authority('a'));

module.exports = {
  HITS
};