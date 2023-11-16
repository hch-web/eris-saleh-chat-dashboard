import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

// COMPONENTS
import styles from 'styles/common/layout.module.scss';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function LayoutWrapper() {
  return (
    <Box>
      <Navbar />

      <Box className="d-flex align-items-start">
        <Sidebar />

        <Box className={styles.mainContainer}>
          <Container className="p-0" maxWidth="xl" fixed>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default LayoutWrapper;
