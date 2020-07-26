
function generate(count) {
  let fields = [];

  for(i = 0; i < count; ++i) {
    const node = {
      name: `${count} - ${i}`,
      level: count,
      children:null,
      display: () => {
        return Promise.resolve(Math.random() < .5);
      }
    };
    fields.push(node)
  }
  return fields;
}
const fields = generate(5);
fields.forEach(
  (item) => {
    item.children = generate(3);
  }
)

module.exports = fields;