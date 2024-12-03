import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
  useCallback
} from 'react';

export type ThemeContexttype = {
  isWelcome: boolean;
  isOpen: boolean;
  handleOpenDialog: Function;
  handleCloseDialog: Function;
  handleWelcomeOpen: Function;
  handleWelcomeClose: Function;
  getUserData: Function;
  isLoggedIn: Function;
};
const LoginDialogContext = createContext<ThemeContexttype>({
  isWelcome: false,
  isOpen: false,
  handleOpenDialog: () => {},
  handleCloseDialog: () => {},
  handleWelcomeOpen: () => {},
  handleWelcomeClose: () => {},
  getUserData: () => {},
  isLoggedIn: () => {}
});

export interface UserData {
  name: string;
  accessToken: string;
}

export const LoginDialogProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [isWelcome, setIsWelcome] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleWelcomeOpen = useCallback(() => {
    handleOpenDialog();
    setIsWelcome(true);
  }, []);
  const handleWelcomeClose = () => {
    handleCloseDialog();
    setIsWelcome(false);
    localStorage.setItem('init_open', 'false');
  };

  const getUserData = (): UserData => {
    const userData = localStorage.getItem('user_data');
    return JSON.parse(userData || '{}') as UserData;
  };
  const isLoggedIn = useCallback((): boolean => {
    const data = getUserData();
    return !!data?.name && !!data?.accessToken;
  }, []);

  useEffect(() => {
    const isInitOpen = localStorage.getItem('init_open');
    if (!isLoggedIn() && !isInitOpen) {
      handleWelcomeOpen();
    }
  }, [isWelcome, handleWelcomeOpen, isLoggedIn]);

  return (
    <LoginDialogContext.Provider
      value={{
        isWelcome,
        isOpen,
        handleOpenDialog,
        handleCloseDialog,
        handleWelcomeOpen,
        handleWelcomeClose,
        getUserData,
        isLoggedIn
      }}
    >
      {children}
    </LoginDialogContext.Provider>
  );
};

export const useLoginDialog = () => useContext(LoginDialogContext);
