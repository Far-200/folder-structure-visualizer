export function countTreeStats(nodes) {
  let folders = 0;
  let files = 0;

  function walk(list) {
    for (const node of list) {
      if (node.type === "folder") {
        folders += 1;
        walk(node.children || []);
      } else {
        files += 1;
      }
    }
  }

  walk(nodes);

  return { folders, files };
}

export function treeToMarkdown(nodes, depth = 0) {
  const lines = [];

  for (const node of nodes) {
    const indent = "  ".repeat(depth);
    const suffix = node.type === "folder" ? "/" : "";
    lines.push(`${indent}- ${node.name}${suffix}`);

    if (node.type === "folder" && node.children?.length) {
      lines.push(treeToMarkdown(node.children, depth + 1));
    }
  }

  return lines.filter(Boolean).join("\n");
}
