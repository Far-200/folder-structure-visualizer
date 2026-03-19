import { Copy, CornerDownRight } from "lucide-react";

function PathBar({ path }) {
  const handleCopy = async () => {
    if (!path) return;
    await navigator.clipboard.writeText(path);
  };

  return (
    <div className="pathbar">
      <div className="pathbar-left">
        <CornerDownRight size={16} />
        <span className="pathbar-label">Selected Path</span>
      </div>

      <div className="pathbar-center">{path || "Nothing selected yet"}</div>

      <button className="pathbar-copy" onClick={handleCopy} disabled={!path}>
        <Copy size={15} />
        <span>Copy</span>
      </button>
    </div>
  );
}

export default PathBar;
