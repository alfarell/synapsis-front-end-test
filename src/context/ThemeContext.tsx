import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect
} from 'react';
import { ConfigProvider, theme, type ThemeConfig } from 'antd';

export enum Themes {
  light,
  dark
}
export type ThemeContexttype = {
  currentTheme: Themes;
  toggleTheme: Function;
};
const ThemeContext = createContext<ThemeContexttype>({
  currentTheme: Themes.light,
  toggleTheme: () => {}
});

const initThemeConfig: ThemeConfig = {
  token: {}
};

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(Themes.light);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 0;
    setCurrentTheme(Number(theme));
  }, []);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      const changeTheme =
        prevTheme === Themes.light ? Themes.dark : Themes.light;
      localStorage.setItem('theme', JSON.stringify(changeTheme));
      return changeTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ConfigProvider
        theme={{
          ...initThemeConfig,
          algorithm:
            currentTheme === Themes.light
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
