import { customScrollDesign } from '../commonStyles';

export const profileMenuStyles = {
  '& .MuiPaper-root': { minWidth: '120px', marginTop: '10px' },
};

export const notificationMenuStyles = {
  '& .MuiPaper-root': {
    minWidth: '120px',
    marginTop: '10px',
    maxWidth: '240px',
    maxHeight: '300px',
    overflow: 'auto',

    ...customScrollDesign,
  },
};

export const profileMenuPositionProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};

export const notificationMenuPositionProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
};

export const notiListItemBtnStyles = {
  '& .MuiTypography-root': {
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    overflow: 'hidden',
  },
};
