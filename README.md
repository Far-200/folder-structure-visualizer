📁 Folder Structure Visualizer

Folder Structure Visualizer is a developer tool that converts ASCII folder trees into an interactive visual explorer and allows exporting the structure as a downloadable scaffold ZIP.

Instead of manually creating dozens of folders and files when starting a project, you can paste a tree structure and generate the entire scaffold instantly.

✨ Features

📂 ASCII → Visual Tree
Paste a standard ASCII folder tree and instantly visualize it.

🌳 Collapsible Folder Explorer
Expand or collapse folders like a real file explorer.

📊 File & Folder Counters
Automatically counts total files and directories.

📋 Copy Path
Click any file or folder and copy its full path.

📄 Copy Tree as Markdown
Export the folder structure as Markdown.

📦 Download Project Scaffold
Generate and download a ZIP containing the entire folder structure.

🚫 Smart Ignore Rules
Automatically ignores generated folders like:

node_modules

dist

build

.next

🖱 Drag & Drop Input
Drop ASCII trees directly into the editor.

🖼 Preview
my-app/
├── public/
│ └── favicon.ico
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ └── Footer.jsx
│ ├── pages/
│ │ └── HomePage.jsx
│ ├── App.jsx
│ └── main.jsx
├── package.json
└── README.md

This becomes an interactive visual tree in the UI.

📦 Scaffold Export

The Download ZIP feature creates a project scaffold like this:

my-app/
├── public/
│ └── favicon.ico
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ └── Footer.jsx
│ ├── pages/
│ │ └── HomePage.jsx
│ ├── App.jsx
│ └── main.jsx
├── package.json
└── README.md

All files are generated empty, so developers can start coding immediately.

🛠 Tech Stack

React

Vite

JavaScript

CSS

Lucide React

React Icons

JSZip

🚀 Installation

Clone the repository:

git clone https://github.com/<your-username>/folder-structure-visualizer.git

Navigate into the project:

cd folder-structure-visualizer

Install dependencies:

npm install

Start the development server:

npm run dev

Open in browser:

http://localhost:5173
🧠 How It Works

User pastes an ASCII folder tree.

The parser converts the text into a nested data structure.

The UI renders it as a collapsible file explorer.

The structure can then be:

copied as Markdown

explored visually

exported as a ZIP scaffold.

📋 Example Input
my-project/
├── src/
│ ├── components/
│ │ └── Button.jsx
│ ├── pages/
│ │ └── Home.jsx
│ └── App.jsx
├── package.json
└── README.md
📁 Generated Output

Download ZIP → Extract → Ready-to-use project scaffold.

🎯 Use Cases

Quickly scaffold new projects

Visualize repository structures

Share project architecture

Generate starter templates

Documentation for README files

🔮 Future Improvements

Possible upgrades:

VSCode-style tree guide lines

Import folder structure from GitHub repo

Export as JSON

Custom ignore rules

Template file contents

Dark/light theme toggle

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Farhaan Khan

Computer Science Engineering student passionate about building developer tools and learning through projects.

⭐ Support

If you found this project useful, consider starring the repository to support development.
