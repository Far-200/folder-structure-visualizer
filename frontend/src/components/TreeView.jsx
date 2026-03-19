import TreeNode from "./TreeNode";

function TreeView({
  treeData,
  selectedPath,
  setSelectedPath,
  expandedPaths,
  toggleFolder,
}) {
  return (
    <div className="tree-wrap">
      <div className="section-head">
        <div>
          <h2>Folder Tree</h2>
          <p>Visualized output of the parsed structure</p>
        </div>
      </div>

      <div className="tree-scroll-area">
        {treeData.length === 0 ? (
          <div className="empty-state">
            <p>No structure parsed yet.</p>
            <span>Paste a tree on the left, then hit Parse Structure.</span>
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
              expandedPaths={expandedPaths}
              toggleFolder={toggleFolder}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TreeView;
