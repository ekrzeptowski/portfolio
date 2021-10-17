import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

import { breakLiquidTag } from "./utils";

import getGithub from "./embeds/github";

export default liquidTags;
function liquidTags() {
  return transformer;
}

function transformer(tree) {
  visit(tree, "paragraph", node => {
    // Grab the innerText of the paragraph node
    let text = toString(node);

    // Test paragraph if it includes a liquid tag format
    let exp = /{%.*%}/g;
    const matches = text.match(exp);

    // Only show embeds for liquid tags
    if (matches !== null) {
      let tagDetails = breakLiquidTag(matches[0]); // only interested in the first match
      let { tagName, tagOptions } = tagDetails;

      let embed;

      // check the tagname to know which embed is to be used
      switch (tagName) {
        case "github":
          embed = getGithub(tagOptions);
          break;
        default:
          break;
      }

      if (embed === undefined) return;

      node.type = "github";
      node.children = undefined;
      node.value = text.replace(exp, embed);
    }
  });

  return tree;
}
