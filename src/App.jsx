import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/common/LoadingSpinner';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DirectoryPage = lazy(() => import('./pages/DirectoryPage/DirectoryPage'));
const ITRequestPage = lazy(() => import('./pages/ITRequestPage'));
const TicketsPage = lazy(() => import('./pages/TicketsPage'));
const TodoPage = lazy(() => import('./pages/TodoPage'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#6e8efb',
    },
    secondary: {
      main: '#a777e3',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/it-request" element={<ITRequestPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/todos" element={<TodoPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;