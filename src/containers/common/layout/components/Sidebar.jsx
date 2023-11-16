import React from 'react';
import { Box, List } from '@mui/material';
import { Diversity3, Forum, SupportAgent } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// COMPONENTS & STYLES
import styles from 'styles/common/layout.module.scss';
import SidebarItem from './SidebarItem';

function Sidebar() {
  const isSuperUser = useSelector(state => state.auth.user.is_superuser);

  return (
    <Box className={styles.sidebarContainer}>
      <List>
        <SidebarItem icon={<Forum />} text="Chat Rooms" path="/" />

        {isSuperUser && <SidebarItem icon={<Diversity3 />} text="Users" path="/users" />}

        <SidebarItem icon={<SupportAgent />} text="Human Agent" path="/human-agent" />

        {/* <SidebarItem icon={<Help />} text="Ticket & Support" path="/ticket-and-support" /> */}
      </List>
    </Box>
  );
}

export default Sidebar;
