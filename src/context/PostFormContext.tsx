import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren
} from 'react';
import { useLoginDialog } from './LoginDialogContext';

export type PostFormContexttype = {
  isModalOpen: boolean;
  toggleModalOpen: Function;
};
const PostFormContext = createContext<PostFormContexttype>({
  isModalOpen: false,
  toggleModalOpen: () => {}
});

export const PostFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isLoggedIn, handleOpenDialog } = useLoginDialog();

  const toggleModalOpen = () => {
    if (!isLoggedIn()) return handleOpenDialog();

    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <PostFormContext.Provider value={{ isModalOpen, toggleModalOpen }}>
      {children}
    </PostFormContext.Provider>
  );
};

export const usePostForm = () => useContext(PostFormContext);
