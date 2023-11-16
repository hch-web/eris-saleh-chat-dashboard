import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import propTypes from 'prop-types';
import { Link, useMatch } from 'react-router-dom';

import styles from 'styles/common/layout.module.scss';

function SidebarItem({ icon, text, path }) {
  const isActive = useMatch(path);

  return (
    <ListItemButton component={Link} to={path} selected={!!isActive}>
      <ListItemIcon className={styles.listItemIcon}>{icon}</ListItemIcon>

      <ListItemText className="d-none d-md-block" primary={text} />
    </ListItemButton>
  );
}

SidebarItem.propTypes = {
  icon: propTypes.element.isRequired,
  text: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
};

export default SidebarItem;
