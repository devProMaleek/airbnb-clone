import { Nunito } from 'next/font/google';

import './globals.css';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Airbnb Clone',
  description: 'A airbnb clone app developed by devProMaleek',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
