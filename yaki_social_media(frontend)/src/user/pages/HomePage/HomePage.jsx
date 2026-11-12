import React, { useState, useMemo } from 'react';
import { Drawer } from '@mui/material';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomeRight from '../../components/HomeRight/HomeRight';
import { Outlet, useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // Show right sidebar on home feed, not on profile / settings
  const showHomeRight = useMemo(() => {
    return (
      location.pathname === '/home' ||
      location.pathname === '/home/' ||
      location.pathname === '/home/reels'
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Sticky Modern Navigation Header (Image 1 & 2) */}
      <Header onToggleSidebar={toggleDrawer} />

      {/* Mobile Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: '#F8FAFC',
              p: 2,
            },
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main 3-Column Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex gap-6 lg:gap-8 justify-center items-start">
          
          {/* Left Column: Fixed/Sticky Sidebar */}
          <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-20 h-[calc(100vh-6rem)]">
            <Sidebar />
          </div>

          {/* Middle Column: Dynamic Outlet Content */}
          <div className="flex-1 max-w-2xl min-w-0">
            <Outlet />
          </div>

          {/* Right Column: Sticky Widgets (Trending & Suggested) */}
          {showHomeRight && (
            <div className="hidden lg:block w-80 xl:w-88 flex-shrink-0 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-none">
              <HomeRight />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default HomePage;
