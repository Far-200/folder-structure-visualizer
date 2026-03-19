import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { parseTree } from "../utils/parseTree";
import sampleData from "../utils/sampleData";

function InputPanel({ setTreeData }) {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef(null);

  const handleParse = () => {
    if (!text.trim()) {
      setTreeData([]);
      return;
    }

    const parsed = parseTree(text);
    setTreeData(parsed);
  };

  const handleLoadSample = () => {
    setText(sampleData);
    setTreeData(parseTree(sampleData));
  };

  const handleClear = () => {
    setText("");
    setTreeData([]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedText = e.dataTransfer.getData("text/plain");
    if (!droppedText.trim()) return;

    setText(droppedText);
    setTreeData(parseTree(droppedText));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="input-wrap">
      <div className="section-head">
        <div>
          <h2>Paste Folder Structure</h2>
          <p>Supports standard ASCII trees using ├──, └── and │</p>
        </div>
      </div>

      <div
        className={`drop-zone ${isDragging ? "drop-zone-active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={() => textareaRef.current?.focus()}
      >
        <div className="drop-zone-hint">
          <UploadCloud size={16} />
          <span>Paste or drag plain text here</span>
        </div>

        <textarea
          ref={textareaRef}
          className="structure-textarea"
          placeholder={`my-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   └── App.jsx
└── package.json`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="action-row">
        <button className="primary-btn" onClick={handleParse}>
          Parse Structure
        </button>
        <button className="secondary-btn" onClick={handleLoadSample}>
          Load Sample
        </button>
        <button className="ghost-btn" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default InputPanel;
