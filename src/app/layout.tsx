'use client'
import "./globals.css";
import ReduxProvider from "@/store/redux-provider";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <ReduxProvider>
            <SnackbarProvider>
              {children}
            </SnackbarProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}