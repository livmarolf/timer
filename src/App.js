import UserSettings from "./context/SettingsContext";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";

import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <UserSettings>
        <Pomodoro />
        <Settings />
      </UserSettings>
    </div>
  );
}

export default App;
