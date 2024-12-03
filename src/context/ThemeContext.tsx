import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren
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

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === Themes.light ? Themes.dark : Themes.light
    );
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
