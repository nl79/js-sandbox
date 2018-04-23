class Agglomerative {

  constructor(points) {
    this.points = points;

    // Turn coordinate into clusters.
    this.clusters = this.points.map((o) => {
      return [o];
    });
  }

  /*
   * @k - number of clusters of stop at.
   */
  process(k) {

    let count = this.clusters.length;

    // Loop over and create clusters until the length of the cluster array 
    // is equal to k, or everything is clustered into a single huge cluster.
    while(count !== k && this.cluster.length !== 1) {
      this.cluster();
      count = this.clusters.length;
    }
  }

  cluster() {
    // Current minimum distance between 2 clusters
    let minDistance = Number.POSITIVE_INFINITY;

    // Current Clusters that have the minimum distance.
    let c1, c2, c1i, c2i;

    let distance;
    let a, b;

    // Calculate the distance from each cluster to every other cluster.
    for(let i = 0; i < this.clusters.length; ++i) {
      a = this.clusters[i];

      for(let j = i+1; j < this.clusters.length; ++j) {
        b = this.clusters[j];

        distance = this.clusterDistance(a, b);

        if(distance < minDistance) {
          minDistance = distance;
          c1 = a;
          c2 = b;

          // Save the indexes.
          c1i = i;
          c2i = j;
        }
      }
    }
  
    // Add the new cluster to the array at the position of c1.
    this.clusters[c1i] = this.merge(c1, c2);

    //remove the cluster at position of c2.
    this.clusters.splice(c2i, 1);
  }


  merge(a, b) {
    return a.concat(b);
  }

  /*
   * Compare the distance between 2 clusters by comparing every point in cluster a to every point in
   * cluster b and pick the lowest distance.
   * @a - Cluster a
   * @b - Cluster b
   */
  clusterDistance(a, b) {
    //console.log('clusterDistance', a, b);
    let p1, p2, minDistance = Number.POSITIVE_INFINITY, distance;

    //todo: Capture the points that satisfy the minimum distance between 2 clusters.
   
    for(let i = 0; i < a.length; ++i) {
      p1 = a[i];
      for( let j = 0; j < b.length; ++j) {
        p2 = b[j];

        distance = this.pointDistance(p1, p2);
        if(distance < minDistance) {
          minDistance = distance;
        }
      }
    }

    return minDistance;
  }

  pointDistance(a, b) {
    let deltaX = Math.abs(a[0] - b[0]);
    let deltaY = Math.abs(a[1] - b[1]);

    return Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
  }

  getClusters() {
    return this.clusters;
  }

}

const points = [
  [1, 11],
  [1, 7],
  [3, 17],
  [7, 18],
  [8, 4],
  [8, 12],
  [11, 7],
  [12, 14],
  [13, 17],
  [16, 11]
];

let alg = new Agglomerative(points);

alg.process(3);

console.log(alg.getClusters());

module.exports = {
  Agglomerative
};