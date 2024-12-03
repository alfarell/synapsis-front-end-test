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
};
const LoginDialogContext = createContext<ThemeContexttype>({
  isWelcome: false,
  isOpen: false,
  handleOpenDialog: () => {},
  handleCloseDialog: () => {},
  handleWelcomeOpen: () => {},
  handleWelcomeClose: () => {}
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

  useEffect(() => {
    const isInitOpen = localStorage.getItem('init_open');
    const isLoggedIn = localStorage.getItem('user_data');
    if (!isLoggedIn && !isInitOpen) {
      handleWelcomeOpen();
    }
  }, [isWelcome, handleWelcomeOpen]);

  return (
    <LoginDialogContext.Provider
      value={{
        isWelcome,
        isOpen,
        handleOpenDialog,
        handleCloseDialog,
        handleWelcomeOpen,
        handleWelcomeClose
      }}
    >
      {children}
    </LoginDialogContext.Provider>
  );
};

export const useLoginDialog = () => useContext(LoginDialogContext);
