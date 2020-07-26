const fields = require("./fixtures/fields");

// console.log('fields', fields);

class Runner {
  iterator;

  constructor(generator, ...args) {
    this.iterator = generator.apply(this, args);
  }

  execute() {
    return Promise.resolve().then(this.next);
  }

  handler = (value) => {
    if (value.done) {
      return value.value;
    } else {
      return Promise.resolve(value.value).then(this.next, this.error);
    }
  };

  error = (err) => {
    return Promise.resolve(this.iterator.throw(err)).then(this.handler);
  };

  next = (value) => {
    let result = this.iterator.next(value);
    return this.handler(result);
  };
}

function* filter(list, predicate) {
  // console.log("filter()#list", list);
  let items = [];

  for (let i = 0; i < list.length; ++i) {
    let item = list[i];

    let keep = yield predicate(item);

    console.log("filter()#keep, item", keep, item);

    if (Array.isArray(item.children) && item.children.length) {
      let children = yield new Runner(
        filter,
        item.children,
        predicate
      ).execute();

      item.children = children;
    }

    if (keep === true) {
      items.push(item);
    }
  }
  return items;
}

function predicate(field) {
  const fn = field.display;
  return fn();
}

const runner = new Runner(filter, fields, predicate);
runner.execute().then((results) => {
  console.log("completed: ", results);
});
