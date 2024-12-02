import { MainFooter, Navbar } from '@/components';
import { Layout } from 'antd';
import { PropsWithChildren } from 'react';

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <Layout className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='container mx-auto'>{children}</main>
      <MainFooter />
    </Layout>
  );
}
