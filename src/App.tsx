import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/ui/Footer';
import { AnalyticsDrawer } from './components/AnalyticsDrawer';
import { BatchLookup } from './pages/BatchLookup';
import { Home } from './pages/Home';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { CacheProvider } from './contexts/CacheContext';

export default function App() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  return (
    <ThemeProvider>
      <AnalyticsProvider>
        <CacheProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-radial from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
              <Header onOpenAnalytics={() => setIsAnalyticsOpen(true)} />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/batch" element={<BatchLookup />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <AnalyticsDrawer 
                isOpen={isAnalyticsOpen} 
                onClose={() => setIsAnalyticsOpen(false)} 
              />
            </div>
          </BrowserRouter>
        </CacheProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}