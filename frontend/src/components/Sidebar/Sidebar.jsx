import "./Sidebar.css";
import { FaMusic } from "react-icons/fa";
import useSongs from "../../hooks/useSongs";
import useLyrics from "../../hooks/useLyrics";
import { useEditor } from "../../contexts/EditorContext";
import useUnsavedChanges from "../../hooks/useUnsavedChanges";

export default function Sidebar() {

  const { songs, loading } = useSongs();

  const { loadLyrics } = useLyrics();

  const { selectedSong, setSelectedSong } = useEditor();

  const { confirmDiscard } = useUnsavedChanges();

  async function selectSong(song) {

    if (!confirmDiscard()) {
      return;
    }
    setSelectedSong(song);
    await loadLyrics(song);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        Songs
      </div>

      {
        loading ?
        <p>Loading...</p>
        :
        songs.map(song => (

          <div
            key={song.id}
            className={
              selectedSong?.id === song.id
              ? "song active"
              : "song"
            }
            onClick={() => selectSong(song)}
          >

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