import React from 'react';
import { Box, List } from '@mui/material';
import { Diversity3, Forum, SupportAgent } from '@mui/icons-material';

// COMPONENTS & STYLES
import styles from 'styles/common/layout.module.scss';
import useGetUserData from 'customHooks/useGetUserData';
import SidebarItem from './SidebarItem';

function Sidebar() {
  const { isAdmin } = useGetUserData();

  return (
    <Box className={styles.sidebarContainer}>
      <List>
        {isAdmin && (
          <>
            <SidebarItem icon={<Forum />} text="Chat Rooms" path="/" />

            <SidebarItem icon={<Diversity3 />} text="Users" path="/users" />
          </>
        )}

        <SidebarItem icon={<SupportAgent />} text="Human Agent" path="/human-agent" />

        {/* <SidebarItem icon={<Help />} text="Ticket & Support" path="/ticket-and-support" /> */}
      </List>
    </Box>
  );
}

export default Sidebar;
