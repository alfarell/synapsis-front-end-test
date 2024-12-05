import { getUserData } from '@/utils/userData';
import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
  useCallback,
  useMemo
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

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleWelcomeOpen = useCallback(() => {
    handleOpenDialog();
    setIsWelcome(true);
  }, [handleOpenDialog]);

  const handleWelcomeClose = useCallback(() => {
    handleCloseDialog();
    setIsWelcome(false);
    localStorage.setItem('init_open', 'false');
  }, [handleCloseDialog]);

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

  const providerValue = useMemo(() => {
    return {
      isWelcome,
      isOpen,
      handleOpenDialog,
      handleCloseDialog,
      handleWelcomeOpen,
      handleWelcomeClose,
      isLoggedIn
    };
  }, [
    isWelcome,
    isOpen,
    handleOpenDialog,
    handleCloseDialog,
    handleWelcomeOpen,
    handleWelcomeClose,
    isLoggedIn
  ]);

  return (
    <LoginDialogContext.Provider value={providerValue}>
      {children}
    </LoginDialogContext.Provider>
  );
};

export const useLoginDialog = () => useContext(LoginDialogContext);
