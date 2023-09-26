import React, { FC } from 'react';
import Header from '../components/Header';
import './globals.css';

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body>
      <Header />
      <main>{children}</main>
    </body>
  </html>
);

export default RootLayout;
