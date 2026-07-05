import "./Sidebar.css";
import useSongs from "../../hooks/useSongs";

export default function Sidebar() {

  const {
    songs,
    loading
  } = useSongs();

  if (loading)
    return <div className="sidebar">Loading...</div>;

  return (
    <aside className="sidebar">
      {songs.map(song => (
        <div
          key={song.id}
          className="song"
        >
          {song.title}
        </div>
      ))}
    </aside>
  );

}