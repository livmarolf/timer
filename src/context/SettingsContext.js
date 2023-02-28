import { createContext, useState } from "react";

export const SettingsContext = createContext();

export default function UserSettings(props) {
  const [showSettings, setShowSettings] = useState(false);
  const [workDuration, setWorkDuration] = useState(45);
  const [breakDuration, setBreakDuration] = useState(15);

  const settings = {
    showSettings,
    setShowSettings,
    workDuration,
    setWorkDuration,
    breakDuration,
    setBreakDuration,
  };

  return (
    <SettingsContext.Provider value={settings}>
      {props.children}
    </SettingsContext.Provider>
  );
}
