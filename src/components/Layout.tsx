import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-16 min-h-screen"
      >
        {children}
      </motion.main>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'glass-card !bg-background-card !text-white !p-4 !rounded-lg !shadow-xl',
          duration: 5000,
          style: {
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px',
            color: '#FFF',
          },
        }}
      />
    </>
  );
};

export default Layout;