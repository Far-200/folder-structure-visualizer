import {
  FolderOpen,
  FolderClosed,
  Sparkles,
  Download,
  Copy,
  FolderTree,
  FileText,
} from "lucide-react";

function Toolbar({
  expandAll,
  collapseAll,
  treeData,
  downloadZip,
  copyMarkdown,
  stats,
}) {
  const hasTree = treeData.length > 0;

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button
          className="toolbar-action"
          onClick={expandAll}
          disabled={!hasTree}
        >
          <FolderOpen size={16} />
          <span>Expand All</span>
        </button>

        <button
          className="toolbar-action"
          onClick={collapseAll}
          disabled={!hasTree}
        >
          <FolderClosed size={16} />
          <span>Collapse All</span>
        </button>

        <button
          className="toolbar-action toolbar-download"
          onClick={downloadZip}
          disabled={!hasTree}
        >
          <Download size={16} />
          <span>Download ZIP</span>
        </button>

        <button
          className="toolbar-action"
          onClick={copyMarkdown}
          disabled={!hasTree}
        >
          <Copy size={16} />
          <span>Copy Tree</span>
        </button>
      </div>

      <div className="toolbar-right">
        <div className="toolbar-chip">
          <FolderTree size={14} />
          <span>{stats.folders} folders</span>
        </div>

        <div className="toolbar-chip">
          <FileText size={14} />
          <span>{stats.files} files</span>
        </div>

        <div className="toolbar-chip">
          <Sparkles size={14} />
          <span>ASCII → Visual Tree</span>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
