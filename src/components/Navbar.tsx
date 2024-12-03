import { Themes, useTheme } from '@/context/ThemeContext';
import { Button, Layout, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

const Navbar = () => {
  const router = useRouter();
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <Header className='flex items-center justify-center sticky top-0 z-10'>
      <div className='container flex items-center justify-between'>
        <div id='logo'>
          <span
            className='text-blue-500 font-bold text-xl cursor-pointer select-none'
            onClick={() => router.push('/')}
          >
            BlogApp
          </span>
        </div>
        <div id='actions'>
          <Tooltip title='Change theme'>
            <Button
              shape='circle'
              onClick={() => toggleTheme()}
              icon={
                currentTheme === Themes.light ? (
                  <SunOutlined />
                ) : (
                  <MoonOutlined />
                )
              }
            />
          </Tooltip>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
