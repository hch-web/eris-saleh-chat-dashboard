import bgImg from 'assets/LoginBg.png';

export const authContainerWrapperStyles = {
  background: `url(${bgImg}) center/cover no-repeat`,
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

export const cardStyles = {
  width: '500px',
  maxWidth: '500px',
  borderRadius: '20px',
  background: 'rgba(255,255,255, 1)',
  backdropFilter: 'blur(5px)',
};
