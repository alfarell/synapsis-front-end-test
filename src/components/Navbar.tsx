import { Themes, useTheme } from '@/context/ThemeContext';
import { Button, Drawer, Layout, Tooltip } from 'antd';
import {
  SunOutlined,
  MoonOutlined,
  PlusOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { usePostForm } from '@/context/PostFormContext';
import { useState } from 'react';

const { Header } = Layout;

const MenuComponent = ({
  handleToggleMenu
}: {
  handleToggleMenu?: Function;
}) => {
  const { currentTheme, toggleTheme } = useTheme();
  const { handleOpenCraeteModal } = usePostForm();

  return (
    <div className='flex'>
      <Button
        className='mr-20'
        icon={<PlusOutlined />}
        onClick={() => {
          handleOpenCraeteModal();
          handleToggleMenu?.();
        }}
      >
        Create Post
      </Button>
      <Tooltip title='Change theme'>
        <Button
          shape='circle'
          onClick={() => toggleTheme()}
          icon={
            currentTheme === Themes.light ? <SunOutlined /> : <MoonOutlined />
          }
        />
      </Tooltip>
    </div>
  );
};
MenuComponent.defaultProps = {
  handleToggleMenu: () => {}
};

const Navbar = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setOpenMenu((prevState) => !prevState);
  };

  return (
    <Header className='flex items-center justify-center sticky top-0 z-10'>
      <div className='container flex items-center justify-between relative'>
        <div id='logo'>
          <span
            className='text-blue-500 font-bold text-xl cursor-pointer select-none'
            onClick={() => router.push('/')}
          >
            BlogApp
          </span>
        </div>

        <Button
          className='md:hidden'
          icon={<MenuOutlined />}
          onClick={handleToggleMenu}
        />
        <div id='actions' className='max-md:hidden'>
          <MenuComponent />
        </div>

        <Drawer
          title='Basic Drawer'
          placement='right'
          closable
          onClose={handleToggleMenu}
          open={openMenu}
        >
          <MenuComponent handleToggleMenu={handleToggleMenu} />
        </Drawer>
      </div>
    </Header>
  );
};

export default Navbar;
