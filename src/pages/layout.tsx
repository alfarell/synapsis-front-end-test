import { MainFooter, Navbar, LoginDialog } from '@/components';
import PostFormModal from '@/components/PostFormModal';
import { Layout } from 'antd';
import { PropsWithChildren } from 'react';

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <Layout className='flex min-h-screen flex-col'>
      <LoginDialog />
      <PostFormModal />
      <Navbar />
      <main className='container mx-auto'>{children}</main>
      <MainFooter />
    </Layout>
  );
}
