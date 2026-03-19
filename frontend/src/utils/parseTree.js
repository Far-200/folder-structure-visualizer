export function parseTree(input) {
  const lines = input
    .split("\n")
    .map((line) => line.replace(/\r/g, "").trimEnd())
    .filter((line) => line.trim() !== "");

  const root = [];
  const stack = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, "    ");

    const nameMatch = line.match(/([^│├└─ ].*\/?$)/);

    if (!nameMatch) continue;

    const rawName = nameMatch[1].trim();

    if (!rawName || rawName === "│") continue;

    const prefix = line.slice(0, line.indexOf(rawName));

    let depth = 0;

    for (let i = 0; i < prefix.length; i += 4) {
      const segment = prefix.slice(i, i + 4);
      if (
        segment.includes("│") ||
        segment.includes("├") ||
        segment.includes("└") ||
        segment.trim() === ""
      ) {
        depth++;
      }
    }

    if (!line.includes("├──") && !line.includes("└──") && stack.length === 0) {
      depth = 0;
    } else if (line.includes("├──") || line.includes("└──")) {
      depth = Math.max(1, depth);
    }

    const isFolder = rawName.endsWith("/");
    const cleanName = isFolder ? rawName.slice(0, -1) : rawName;

    const node = {
      name: cleanName,
      type: isFolder ? "folder" : "file",
      children: [],
    };

    if (depth === 0) {
      root.push(node);
      stack.length = 0;
      stack.push(node);
      continue;
    }

    while (stack.length > depth) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (parent) {
      parent.children.push(node);
    } else {
      root.push(node);
    }

    stack.push(node);
  }

  return root;
}
