import { useEffect, useMemo, useState } from "react";
import TreeNode from "./TreeNode";

function normalize(text) {
  return text.toLowerCase().trim();
}

function collectSearchInfo(nodes, query, parentPath = "") {
  const matchedPaths = new Set();
  const visiblePaths = new Set();
  const autoExpandedPaths = new Set();

  function walk(node, currentParentPath) {
    const currentPath = currentParentPath
      ? `${currentParentPath}/${node.name}`
      : node.name;

    const selfMatches = normalize(node.name).includes(query);
    let hasMatchingDescendant = false;

    if (node.type === "folder" && node.children?.length) {
      for (const child of node.children) {
        const childHasMatch = walk(child, currentPath);
        if (childHasMatch) {
          hasMatchingDescendant = true;
        }
      }
    }

    const hasMatch = selfMatches || hasMatchingDescendant;

    if (selfMatches) {
      matchedPaths.add(currentPath);
    }

    if (hasMatch) {
      visiblePaths.add(currentPath);
    }

    if (node.type === "folder" && hasMatchingDescendant) {
      autoExpandedPaths.add(currentPath);
    }

    return hasMatch;
  }

  for (const node of nodes) {
    walk(node, parentPath);
  }

  return { matchedPaths, visiblePaths, autoExpandedPaths };
}

function TreeView({
  treeData,
  selectedPath,
  setSelectedPath,
  expandedPaths,
  toggleFolder,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const trimmedQuery = normalize(searchQuery);

  const searchInfo = useMemo(() => {
    if (!trimmedQuery) {
      return {
        matchedPaths: new Set(),
        visiblePaths: new Set(),
        autoExpandedPaths: new Set(),
      };
    }

    return collectSearchInfo(treeData, trimmedQuery);
  }, [treeData, trimmedQuery]);

  const effectiveExpandedPaths = useMemo(() => {
    if (!trimmedQuery) return expandedPaths;

    return new Set([...expandedPaths, ...searchInfo.autoExpandedPaths]);
  }, [expandedPaths, searchInfo.autoExpandedPaths, trimmedQuery]);

  const hasVisibleMatches = !trimmedQuery || searchInfo.visiblePaths.size > 0;

  useEffect(() => {
    if (!trimmedQuery) return;

    if (
      selectedPath &&
      !searchInfo.visiblePaths.has(selectedPath) &&
      !searchInfo.matchedPaths.has(selectedPath)
    ) {
      setSelectedPath("");
    }
  }, [
    trimmedQuery,
    selectedPath,
    searchInfo.visiblePaths,
    searchInfo.matchedPaths,
    setSelectedPath,
  ]);

  return (
    <div className="tree-wrap">
      <div className="section-head">
        <div>
          <h2>Folder Tree</h2>
          <p>Visualized output of the parsed structure</p>
        </div>
      </div>

      <div className="tree-searchbar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search files or folders..."
          className="tree-search-input"
        />
        {searchQuery && (
          <button
            type="button"
            className="tree-search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="tree-scroll-area">
        {treeData.length === 0 ? (
          <div className="empty-state">
            <p>No structure parsed yet.</p>
            <span>Paste a tree on the left, then hit Parse Structure.</span>
          </div>
        ) : !hasVisibleMatches ? (
          <div className="empty-state">
            <p>No matches found.</p>
            <span>Try a different file or folder name.</span>
          </div>
        ) : (
          treeData.map((node, index) => (
            <TreeNode
              key={`${node.name}-${index}`}
              node={node}
              depth={0}
              parentPath=""
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              expandedPaths={effectiveExpandedPaths}
              toggleFolder={toggleFolder}
              searchQuery={trimmedQuery}
              matchedPaths={searchInfo.matchedPaths}
              visiblePaths={searchInfo.visiblePaths}
              isFiltering={Boolean(trimmedQuery)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TreeView;
