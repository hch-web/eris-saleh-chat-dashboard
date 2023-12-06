import { customScrollDesign } from '../commonStyles';

export const cardListItemBtnStyles = {
  '@media screen and (max-width: 768px)': { padding: '4px 8px' },
};

export const cardDateTimeStyles = {
  '@media screen and (max-width: 768px)': { fontSize: '10px' },
};

export const gridPaperStyles = {
  minHeight: '570px',
  height: '85vh',

  '@media screen and (max-width: 1100px)': {
    height: '80vh',
  },
};

export const chatListWrapperStyles = {
  ...gridPaperStyles,
  overflow: 'auto',

  ...customScrollDesign,
};

export const chatBoxPaperStyles = {
  ...gridPaperStyles,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
};

export const chatMessageContainerStyles = {
  flexGrow: 1,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '15px',
  gap: '15px',

  ...customScrollDesign,
};
