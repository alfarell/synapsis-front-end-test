import { getUserData } from '@/services/users';
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
  isLoggedIn: Function;
};
const LoginDialogContext = createContext<ThemeContexttype>({
  isWelcome: false,
  isOpen: false,
  handleOpenDialog: () => {},
  handleCloseDialog: () => {},
  handleWelcomeOpen: () => {},
  handleWelcomeClose: () => {},
  isLoggedIn: () => {}
});

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

  const isLoggedIn = useCallback((): boolean => {
    const data = getUserData();
    return !!data?.user && !!data?.accessToken;
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
        isLoggedIn
      }}
    >
      {children}
    </LoginDialogContext.Provider>
  );
};

export const useLoginDialog = () => useContext(LoginDialogContext);
