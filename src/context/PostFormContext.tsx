import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren
} from 'react';
import { useLoginDialog } from './LoginDialogContext';
import { CreatePostRequest, Post } from '@/types';

export enum ModalType {
  create,
  edit
}
export type PostFormContexttype = {
  isModalOpen: boolean;
  modalType: ModalType;
  editData: Partial<Post>;
  toggleModalOpen: Function;
  handleOpenCraeteModal: Function;
  handleOpenEditModal: Function;
  handleCloseModal: Function;
};
const PostFormContext = createContext<PostFormContexttype>({
  isModalOpen: false,
  modalType: ModalType.create,
  editData: { title: '', body: '' },
  toggleModalOpen: () => {},
  handleOpenCraeteModal: () => {},
  handleOpenEditModal: () => {},
  handleCloseModal: () => {}
});

export const PostFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.create);
  const [editData, setEditData] = useState<CreatePostRequest>({
    title: '',
    body: ''
  });

  const { isLoggedIn, handleOpenDialog } = useLoginDialog();

  const toggleModalOpen = () => {
    if (!isLoggedIn()) return handleOpenDialog();

    setIsModalOpen((prevState) => !prevState);
  };
  const handleOpenCraeteModal = () => {
    toggleModalOpen();
    setModalType(ModalType.create);
  };
  const handleOpenEditModal = (data: CreatePostRequest) => {
    toggleModalOpen();
    setModalType(ModalType.edit);
    setEditData(data);
  };
  const handleCloseModal = () => {
    toggleModalOpen();
  };

  return (
    <PostFormContext.Provider
      value={{
        isModalOpen,
        modalType,
        editData,
        toggleModalOpen,
        handleOpenCraeteModal,
        handleOpenEditModal,
        handleCloseModal
      }}
    >
      {children}
    </PostFormContext.Provider>
  );
};

export const usePostForm = () => useContext(PostFormContext);
