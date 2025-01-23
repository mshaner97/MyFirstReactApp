import { useState } from 'react';
import { ThemeContext } from './ThemeContext'

const themes = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    primaryColor: '#ff4da3',
    secondaryColor: '#f7c3e9'
  },
  dark: {
    backgroundColor: '#323232',
    textColor: '#ffffff',
    primaryColor: '#c5a0eb',
    secondaryColor: '#5c4c6b'
  }
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((previousMode) => {
      const nextMode = previousMode === 'light' ? 'dark' : 'light';
      document.body.className = nextMode;
      return nextMode;
    });
  }

  const theme = themes[mode];

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
