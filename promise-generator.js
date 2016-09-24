/*
 * Runner Method that accepts a generator as an argument and iterates over all of the values.
 * @param {Function*} generator - a generator function.
 * @param {Array} ...args - an arbitrary number of arguments supplied to the
    function will be gathered inside the 'args' array.
 */
function runner(generator, ...args) {
  /* Initilize the generator and get its `iterator` */
  var iterator = generator.apply(this, args);

  /*
   * handler method that will be called for
   * each 'yield' expression in the generator.
   * @param {Mixed} value - values yielded from the generator.
   */
  function handler (value) {

    /*
     * Check if the supplied value is the
     * last value in the generator.
     */
    if(value.done) {
      return value.value;
    }

    /*
     * Keep Iterating.
     * Unwarap the
     */
    else {
      return Promise.resolve(value.value).then(
        /*
         * Supply a success handler.
         * This would be the next function.
         */
        next,
        /*
         * Supply the error handler.
         * this will catch any errors/exceptions inside the generator function
         */
        error
      )
    }

  };

  /*
   * Error Handler for the promise rejection
   * {Object} err - Error object.
   */
  function error(err) {
    /* This will throw the error back into the generator
     * so that it has a chance to handle it.
     * If the `yield` expression is wrapped inside a try {} catch block,
     * the generator will have the opportunity to handle the error or rethrow it.
     */
    return Promise.resolve(it.throw(err)).then(handler);
  };

  /*
   * The Handler function to handle each yield expression in the generator.
   * It will receive a value from the resolved promise and push it back into
   * the generator.
   * @param {Mixed} value - value with which the promise was resolved.
   */
  function next (value) {
    /*
     * Pass the 'value' into the generator and get the next yielded value.
     * 'value', is the value with which the promise was resolved.
     * it is passed back into the generator.
     */
    var result = iterator.next(value);

    /*
     * Handle the result based on if the generator is done.
     * the `handler` function return either a value if the generator is done
     * or a promise thats resolved will function `next`.
     * This will essentially keep chaining promises until the end of the function,
     * or a return statement, or iterator.return() is called.
     */
    return handler(result)
  }

  /*
   * Return a promise to the calling code.
   * Bootstrap the process by calling the 'next' function to start the generator.
   * This will keep chaining promises until the generator is done.
   */
  return Promise.resolve()
    .then(next);

}

/* Tester */
function promiser(timer) {
  var timer = Number(timer);
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      return resolve(timer);
    }, timer);
  })
}

/*
 * Basic Generator function.
 * any additional values supplied to the runner
 * will be spread and passed into the generator
 * Any missing values will be given default values.
 *  In this example `z` will defalt to `501`.
 */
function* generator(a=0, b=10, x=20, y=30, z=501) {
  console.log('generator initilized!');

  /*
   * The yielded value does not need to be a promise.
   * by using `Promise.resolve()`, inside the runner
   * every value is wrapped into a promise.
   */
  a = yield 10;
  console.log('a', a);

  /*
   * All yielded promises will wait for completion before
   * the generator will continue. Therefore the timeout values
   * do no cause race conditions.
   */
  b = yield promiser(b);
  console.log('b', b);
  x = yield promiser(x);
  console.log('x', x);
  y = yield promiser(y);
  console.log('y', y);
  z = yield promiser(z);
  console.log('z', z);

  /* This value will be passed to the `runners` .then method. */
  return a + b + x + y + z;
}

console.log('Staring Test!');
runner(generator, 10,1001,5000,500).then(function(result) {
  console.log('generator completed! with result', result );
})
