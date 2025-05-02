import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { DirectoryPage } from './pages/DirectoryPage';
import ITRequestPage from './pages/ITRequestPage';
import { TicketsPage } from './pages/TicketsPage';
import TodoPage from './pages/TodoPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/it-request" element={<ITRequestPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/todos" element={<TodoPage />} />
    </Routes>
  );
};