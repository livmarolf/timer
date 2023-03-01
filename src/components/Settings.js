import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export default function Settings() {
  const settingsInfo = useContext(SettingsContext);

  return (
    <div>
      <input
        type="range"
        min={1}
        max={60}
        value={settingsInfo.workDuration}
        onChange={(e) => settingsInfo.setWorkDuration(e.target.value)}
      />
      <input
        type="range"
        min={1}
        max={60}
        value={settingsInfo.breakDuration}
        onChange={(e) => settingsInfo.setBreakDuration(e.target.value)}
      />
    </div>
  );
}
