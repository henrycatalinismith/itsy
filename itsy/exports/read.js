const _ = require("lodash");
const { parse } = require("himalaya");

module.exports = html => {
  const tree = parse(html);

  const document = _.find(tree, {
    type: "element",
    tagName: "html"
  });

  const body = _.find(document.children, {
    type: "element",
    tagName: "body"
  });

  const { id, name, created, updated } = JSON.parse(
    _.get(
      _.find(
        body.children,
        node =>
          "element" === node.type &&
          "script" === node.tagName &&
          "metadata" ===
            _.mapValues(_.keyBy(node.attributes, "key"), "value").id
      ),
      "children[0].content"
    )
  );

  const lua = _.get(
    _.find(
      body.children,
      node =>
        "element" === node.type &&
        "script" === node.tagName &&
        "lua" === _.mapValues(_.keyBy(node.attributes, "key"), "value").id
    ),
    "children[0].content"
  ).trim();

  const palette = _.get(
    _.find(
      body.children,
      node =>
        "element" === node.type &&
        "img" === node.tagName &&
        "palette" === _.mapValues(_.keyBy(node.attributes, "key"), "value").id
    ),
    "attributes[3].value"
  ).split(",")[1];

  const snapshot = _.get(
    _.find(
      body.children,
      node =>
        "element" === node.type &&
        "img" === node.tagName &&
        "snapshot" === _.mapValues(_.keyBy(node.attributes, "key"), "value").id
    ),
    "attributes[3].value"
  ).split(",")[1];

  const spritesheet = _.get(
    _.find(
      body.children,
      node =>
        "element" === node.type &&
        "img" === node.tagName &&
        "spritesheet" ===
          _.mapValues(_.keyBy(node.attributes, "key"), "value").id
    ),
    "attributes[3].value"
  ).split(",")[1];

  return {
    id,
    name,
    created,
    updated,
    lua,
    palette,
    snapshot,
    spritesheet
  };
};
