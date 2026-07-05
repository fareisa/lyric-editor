import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Editor from "../Editor/Editor";
import Toolbar from "../Toolbar/Toolbar";
import Statusbar from "../Statusbar/Statusbar";

import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">

      <Header />

      <div className="layout-body">
        <Sidebar />
        <Editor />
      </div>

      <Toolbar />

      <Statusbar />

    </div>
  );
}
