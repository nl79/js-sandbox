class Agglomerative {

  constructor(points, config) {
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

    // Loop over and create clusters.
    for(let i = 0; i < k; ++i) {
      this.cluster();
    }
  }

  cluster() {
    // Current minimum distance between 2 clusters
    let min = 0;

    // Current Clusters that have the minimum distance.
    let cA, cB;

    let distance;
    let a, b;

    // Calculate the distance from each cluster to every other cluster.
    for(let i = 0; i < this.clusters.length; ++i) {
      a = this.clusters[i];

      for(let j = i; i < this.clusters.length; ++j) {
        b = this.clusters[j];

        distance = this.clusterDistance(a, b);

        if(distance < min) {
          min = distance;
          cA = a;
          cB = b;
        }
      }
    }

    // Merge the clusters.
  }

  merge(a, b) {

  }

  /*
   * Compare the distance between 2 clusters by comparing every point in cluster a to every point in
   * cluster b and pick the lowest distance.
   * @a - Cluster a
   * @b - Cluster b
   */
  clusterDistance(a, b) {
    let p1, p2, min = 0, distance;

    for(let i = 0; i < a.length; ++i) {
      p1 = a[i];
      for( let j = 0; j < b.length; ++j) {
        p2 = b[j];

        distance = this.pointDistance(p1, p2);

        if(distance < min) {
          min = distance;
        }
      }
    }

    return min;
  }

  pointDistance(a, b) {

  }

}

module.exports = {
  Agglomerative
};