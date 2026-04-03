function createNode(rawName) {
  const isFolder = rawName.endsWith("/");
  const cleanName = isFolder ? rawName.slice(0, -1) : rawName;

  return {
    name: cleanName,
    type: isFolder ? "folder" : "file",
    children: [],
  };
}

function getAsciiNodeInfo(line) {
  const normalized = line.replace(/\t/g, "    ");
  const branchMatch = normalized.match(/[├└]──\s*(.+)$/);

  if (branchMatch) {
    const rawName = branchMatch[1].trim();
    const branchIndex = normalized.search(/[├└]/);

    return {
      rawName,
      depth: branchIndex === -1 ? 0 : branchIndex + 1,
      isRootLike: false,
    };
  }

  return {
    rawName: normalized.trim(),
    depth: 0,
    isRootLike: true,
  };
}

function parseAsciiTree(lines) {
  const root = [];
  const stack = [];
  const branchColumns = [
    ...new Set(
      lines
        .map((rawLine) => rawLine.replace(/\t/g, "    ").search(/[├└]/))
        .filter((index) => index !== -1),
    ),
  ].sort((a, b) => a - b);

  const columnDepthMap = new Map(
    branchColumns.map((col, index) => [col, index + 1]),
  );

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, "    ");
    const { rawName, isRootLike } = getAsciiNodeInfo(line);

    if (!rawName || rawName === "│") continue;

    const branchIndex = line.search(/[├└]/);
    let depth = 0;

    if (branchIndex !== -1) {
      depth = columnDepthMap.get(branchIndex) ?? 1;
    } else if (isRootLike && stack.length === 0) {
      depth = 0;
    } else if (isRootLike) {
      depth = 0;
    }

    const node = createNode(rawName);

    if (depth === 0) {
      root.push(node);
      stack.length = 0;

      if (node.type === "folder") {
        stack.push(node);
      }

      continue;
    }

    while (stack.length > depth) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    if (parent && parent.type === "folder") {
      parent.children.push(node);
    } else {
      root.push(node);
    }

    if (node.type === "folder") {
      stack.push(node);
    }
  }

  return root;
}

function getIndentUnit(lines) {
  const indents = lines
    .map((line) => {
      const match = line.match(/^(\s+)/);
      return match ? match[1].length : 0;
    })
    .filter((n) => n > 0);

  if (indents.length === 0) return 2;

  return Math.min(...indents);
}

function parseIndentedTree(lines) {
  const root = [];
  const stack = [];
  const indentUnit = getIndentUnit(lines);

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, "    ").trimEnd();
    if (!line.trim()) continue;

    const leadingSpaces = line.match(/^(\s*)/)[1].length;
    const rawName = line.trim();

    if (!rawName) continue;

    if (leadingSpaces % indentUnit !== 0) {
      console.warn("Inconsistent indentation detected");
    }

    const depth = Math.floor(leadingSpaces / indentUnit);
    const node = createNode(rawName);

    while (stack.length > depth) {
      stack.pop();
    }

    if (depth === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1];

      if (parent && parent.type === "folder") {
        parent.children.push(node);
      } else {
        root.push(node);
      }
    }

    if (node.type === "folder") {
      stack.push(node);
    }
  }

  return root;
}

function isAsciiTree(lines) {
  return lines.some((line) => /[├└]──/.test(line));
}

export function parseTree(input) {
  const lines = input
    .split("\n")
    .map((line) => line.replace(/\r/g, "").trimEnd())
    .filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return [];
  }

  if (isAsciiTree(lines)) {
    return parseAsciiTree(lines);
  }

  return parseIndentedTree(lines);
}
