import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useMemo,
  useCallback
} from 'react';
import { CreatePostRequest, Post } from '@/types';
import { useLoginDialog } from './LoginDialogContext';

export enum ModalType {
  // eslint-disable-next-line no-unused-vars
  create,
  // eslint-disable-next-line no-unused-vars
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

  const toggleModalOpen = useCallback(() => {
    if (!isLoggedIn()) return handleOpenDialog();

    setIsModalOpen((prevState) => !prevState);
  }, [handleOpenDialog, isLoggedIn]);

  const handleOpenCraeteModal = useCallback(() => {
    toggleModalOpen();
    setModalType(ModalType.create);
  }, [toggleModalOpen]);

  const handleOpenEditModal = useCallback(
    (data: CreatePostRequest) => {
      toggleModalOpen();
      setModalType(ModalType.edit);
      setEditData(data);
    },
    [toggleModalOpen]
  );

  const handleCloseModal = useCallback(() => {
    toggleModalOpen();
  }, [toggleModalOpen]);

  const providerValue = useMemo(() => {
    return {
      isModalOpen,
      modalType,
      editData,
      toggleModalOpen,
      handleOpenCraeteModal,
      handleOpenEditModal,
      handleCloseModal
    };
  }, [
    isModalOpen,
    modalType,
    editData,
    toggleModalOpen,
    handleOpenCraeteModal,
    handleOpenEditModal,
    handleCloseModal
  ]);
  return (
    <PostFormContext.Provider value={providerValue}>
      {children}
    </PostFormContext.Provider>
  );
};

export const usePostForm = () => useContext(PostFormContext);
