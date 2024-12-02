import { useTheme } from "@/context/ThemeContext";
import { Button, Layout } from "antd";

const { Header } = Layout;

const Navbar = () => {
  const { toggleTheme } = useTheme();

  return (
    <Header className='flex items-center justify-between sticky top-0 z-10'>
      <div className='demo-logo' />
      <Button onClick={() => toggleTheme()}>Change Theme</Button>
    </Header>
  );
};

export default Navbar;
