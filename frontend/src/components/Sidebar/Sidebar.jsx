import "./Sidebar.css";
import { FaMusic } from "react-icons/fa";
import useSongs from "../../hooks/useSongs";

export default function Sidebar() {

  const {
    songs,
    loading
  } = useSongs();
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        Songs
      </div>
      {
        loading ?
        (<p>Loading...</p>):
        songs.map(song => (
          <div key={song.id}className="song">
            <FaMusic />
            <span>
              {song.title}
            </span>
          </div>
        ))
      }
    </aside>
  );
}