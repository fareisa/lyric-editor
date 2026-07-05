import "./Toolbar.css";
import transformProfiles from "../../constants/transformProfiles";

export default function Toolbar() {
  return (
    <footer className="toolbar">
      <button>
        Fetch
      </button>
      
      <button>
        Transform
      </button>
      
      <button>
        Save
      </button>
        
      <select>
        {transformProfiles.map(profile => (
          <option
            key={profile.id}
            value={profile.id}
          >
            {profile.name}
          </option>
        ))}
      </select>
      
    </footer>
  );
}