import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileText,
  Folder,
  FolderOpen,
  Image as ImageIcon,
} from "lucide-react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaMarkdown,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiJavascript,
  SiJson,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiYaml,
} from "react-icons/si";

function getFileIcon(name, isFolder, isOpen) {
  if (isFolder) {
    return isOpen ? (
      <FolderOpen className="tree-icon folder-icon" size={18} />
    ) : (
      <Folder className="tree-icon folder-icon" size={18} />
    );
  }

  const lower = name.toLowerCase();

  if (lower === "package.json")
    return <FaNodeJs className="tree-icon node-icon" />;
  if (lower.endsWith(".jsx") || lower.endsWith(".tsx"))
    return <FaReact className="tree-icon react-icon" />;
  if (lower.endsWith(".js"))
    return <SiJavascript className="tree-icon js-icon" />;
  if (lower.endsWith(".ts"))
    return <SiTypescript className="tree-icon ts-icon" />;
  if (lower.endsWith(".html"))
    return <FaHtml5 className="tree-icon html-icon" />;
  if (lower.endsWith(".css"))
    return <FaCss3Alt className="tree-icon css-icon" />;
  if (lower.endsWith(".json"))
    return <SiJson className="tree-icon json-icon" />;
  if (lower.endsWith(".md"))
    return <FaMarkdown className="tree-icon md-icon" />;
  if (lower.endsWith(".yml") || lower.endsWith(".yaml"))
    return <SiYaml className="tree-icon yaml-icon" />;
  if (lower.includes("vite")) return <SiVite className="tree-icon vite-icon" />;
  if (lower.includes("tailwind"))
    return <SiTailwindcss className="tree-icon tailwind-icon" />;
  if (lower === ".gitignore" || lower.includes("git"))
    return <FaGitAlt className="tree-icon git-icon" />;

  if (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".svg") ||
    lower.endsWith(".ico") ||
    lower.endsWith(".webp")
  ) {
    return <ImageIcon className="tree-icon image-icon" size={18} />;
  }

  if (
    lower.endsWith(".txt") ||
    lower.endsWith(".env") ||
    lower.includes("readme")
  ) {
    return <FileText className="tree-icon file-icon" size={18} />;
  }

  return <FileCode2 className="tree-icon file-icon" size={18} />;
}

function TreeNode({
  node,
  depth,
  parentPath,
  selectedPath,
  setSelectedPath,
  expandedPaths,
  toggleFolder,
}) {
  const isFolder = node.type === "folder";
  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isSelected = currentPath === selectedPath;
  const isOpen = isFolder ? expandedPaths.has(currentPath) : false;

  const handleRowClick = () => {
    setSelectedPath(currentPath);

    if (isFolder) {
      toggleFolder(currentPath);
    }
  };

  return (
    <div>
      <div
        className={`tree-row ${isSelected ? "tree-selected" : ""}`}
        style={{ paddingLeft: `${depth * 18}px` }}
        onClick={handleRowClick}
      >
        <span className="tree-chevron">
          {isFolder ? (
            isOpen ? (
              <ChevronDown size={15} />
            ) : (
              <ChevronRight size={15} />
            )
          ) : (
            <span className="tree-chevron-spacer" />
          )}
        </span>

        <span className="tree-filetype-icon">
          {getFileIcon(node.name, isFolder, isOpen)}
        </span>

        <span className="tree-label">{node.name}</span>
      </div>

      {isFolder &&
        isOpen &&
        node.children?.map((child, index) => (
          <TreeNode
            key={`${currentPath}-${child.name}-${index}`}
            node={child}
            depth={depth + 1}
            parentPath={currentPath}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            expandedPaths={expandedPaths}
            toggleFolder={toggleFolder}
          />
        ))}
    </div>
  );
}

export default TreeNode;
