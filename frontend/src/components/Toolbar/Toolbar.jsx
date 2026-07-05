import "./Toolbar.css";
import { useEditor } from "../../contexts/EditorContext";
import useSaveLyrics from "../../hooks/useSaveLyrics";
import transformProfiles from "../../constants/transformProfiles";
import useFetchLyrics from "../../hooks/useFetchLyrics";
import useTransformLyrics from "../../hooks/useTransformLyrics";

export default function Toolbar() {

  const {
    dirty,
    profile,
    setProfile,
    selectedSong
  } = useEditor();

  const { transform } = useTransformLyrics();
  const { save } = useSaveLyrics();
  const { fetch } = useFetchLyrics();

  return (
    <footer className="toolbar">

      <button
        disabled={!selectedSong}
        onClick={fetch}
      >
        Fetch
      </button>

      <button
        disabled={!selectedSong}     
        onClick={transform} 
      >
        Transform
      </button>

      <button
        disabled={!dirty}
        onClick={save}
      >
        Save
      </button>

      <select
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      >
        {transformProfiles.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>

    </footer>
  );

}