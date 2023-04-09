import { Nunito } from 'next/font/google';

import './globals.css';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';

export const metadata = {
  title: 'Airbnb Clone',
  description: 'A airbnb clone app developed by devProMaleek',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        {children}
      </body>
    </html>
  );
}
