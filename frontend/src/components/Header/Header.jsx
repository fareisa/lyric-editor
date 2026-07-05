import "./Header.css";
import { FaMusic } from "react-icons/fa";

export default function Header() {

  return (
    <header className="header">
      <div className="logo">
        <FaMusic />
        <span>
          Lyric Editor
        </span>
      </div>
      <input
        placeholder="Search..."
      />
    </header>
  );

}