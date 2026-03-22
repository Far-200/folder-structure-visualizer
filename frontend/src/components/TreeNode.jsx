import {
  ChevronRight,
  FileArchive,
  FileCode2,
  FileTerminal,
  FileText,
  Folder,
  FolderOpen,
  Image as ImageIcon,
} from "lucide-react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaMarkdown,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiJson,
  SiMysql,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiXml,
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

  if (lower === "package.json") {
    return <FaNodeJs className="tree-icon node-icon" />;
  }

  if (lower === "readme.md" || lower.includes("readme")) {
    return <FaMarkdown className="tree-icon md-icon" />;
  }

  if (lower.endsWith(".jsx") || lower.endsWith(".tsx")) {
    return <FaReact className="tree-icon react-icon" />;
  }

  if (lower.endsWith(".js")) {
    return <SiJavascript className="tree-icon js-icon" />;
  }

  if (lower.endsWith(".ts")) {
    return <SiTypescript className="tree-icon ts-icon" />;
  }

  if (lower.endsWith(".java")) {
    return <FaJava className="tree-icon java-icon" />;
  }

  if (lower.endsWith(".py")) {
    return <FaPython className="tree-icon python-icon" />;
  }

  if (lower.endsWith(".cpp") || lower.endsWith(".hpp")) {
    return <SiCplusplus className="tree-icon cpp-icon" />;
  }

  if (lower.endsWith(".c") || lower.endsWith(".h")) {
    return <SiC className="tree-icon c-icon" />;
  }

  if (lower.endsWith(".html")) {
    return <FaHtml5 className="tree-icon html-icon" />;
  }

  if (lower.endsWith(".css")) {
    return <FaCss3Alt className="tree-icon css-icon" />;
  }

  if (lower.endsWith(".json")) {
    return <SiJson className="tree-icon json-icon" />;
  }

  if (lower.endsWith(".md")) {
    return <FaMarkdown className="tree-icon md-icon" />;
  }

  if (lower.endsWith(".yml") || lower.endsWith(".yaml")) {
    return <SiYaml className="tree-icon yaml-icon" />;
  }

  if (lower.endsWith(".sql")) {
    return <SiMysql className="tree-icon sql-icon" />;
  }

  if (lower.endsWith(".xml")) {
    return <SiXml className="tree-icon xml-icon" />;
  }

  if (lower.endsWith(".zip")) {
    return <FileArchive className="tree-icon archive-icon" size={18} />;
  }

  if (lower.endsWith(".sh")) {
    return <FileTerminal className="tree-icon shell-icon" size={18} />;
  }

  if (lower.includes("vite")) {
    return <SiVite className="tree-icon vite-icon" />;
  }

  if (lower.includes("tailwind")) {
    return <SiTailwindcss className="tree-icon tailwind-icon" />;
  }

  if (
    lower === ".gitignore" ||
    lower === ".gitattributes" ||
    lower === ".gitmodules"
  ) {
    return <FaGitAlt className="tree-icon git-icon" />;
  }

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

  if (lower.endsWith(".txt") || lower.endsWith(".env")) {
    return <FileText className="tree-icon file-icon" size={18} />;
  }

  if (name.includes(".")) {
    return <FileCode2 className="tree-icon code-file-icon" size={18} />;
  }

  return <FileText className="tree-icon file-icon" size={18} />;
}

function highlightLabel(name, searchQuery) {
  if (!searchQuery) return name;

  const lowerName = name.toLowerCase();
  const index = lowerName.indexOf(searchQuery);

  if (index === -1) return name;

  const before = name.slice(0, index);
  const match = name.slice(index, index + searchQuery.length);
  const after = name.slice(index + searchQuery.length);

  return (
    <>
      {before}
      <mark className="tree-label-highlight">{match}</mark>
      {after}
    </>
  );
}

function TreeNode({
  node,
  depth,
  parentPath,
  selectedPath,
  setSelectedPath,
  expandedPaths,
  toggleFolder,
  searchQuery,
  matchedPaths,
  visiblePaths,
  isFiltering,
}) {
  const isFolder = node.type === "folder";
  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isSelected = currentPath === selectedPath;
  const isOpen = isFolder ? expandedPaths.has(currentPath) : false;
  const isMatch = matchedPaths?.has(currentPath);
  const isVisible = !isFiltering || visiblePaths?.has(currentPath);

  if (!isVisible) return null;

  const handleRowClick = () => {
    setSelectedPath(currentPath);

    if (isFolder) {
      toggleFolder(currentPath);
    }
  };

  return (
    <div>
      <div
        className={`tree-row ${isSelected ? "tree-selected" : ""} ${
          isMatch ? "tree-row-match" : ""
        }`}
        style={{ paddingLeft: `${depth * 18}px` }}
        onClick={handleRowClick}
      >
        <span className="tree-chevron">
          {isFolder ? (
            <ChevronRight
              size={15}
              className={`tree-chevron-icon ${isOpen ? "tree-chevron-open" : ""}`}
            />
          ) : (
            <span className="tree-chevron-spacer" />
          )}
        </span>

        <span className="tree-filetype-icon">
          {getFileIcon(node.name, isFolder, isOpen)}
        </span>

        <span className={`tree-label ${isMatch ? "tree-label-match" : ""}`}>
          {highlightLabel(node.name, searchQuery)}
        </span>
      </div>

      {isFolder && (
        <div className={`tree-children ${isOpen ? "tree-children-open" : ""}`}>
          <div className="tree-children-inner">
            {node.children?.map((child, index) => (
              <TreeNode
                key={`${currentPath}-${child.name}-${index}`}
                node={child}
                depth={depth + 1}
                parentPath={currentPath}
                selectedPath={selectedPath}
                setSelectedPath={setSelectedPath}
                expandedPaths={expandedPaths}
                toggleFolder={toggleFolder}
                searchQuery={searchQuery}
                matchedPaths={matchedPaths}
                visiblePaths={visiblePaths}
                isFiltering={isFiltering}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TreeNode;
