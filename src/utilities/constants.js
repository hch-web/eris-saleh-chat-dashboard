const domain = 'eris-ai-backend.beyonderissolutions.com/api';
export const NOTIFICATION_SOCKET_URL = `wss://${domain}/ws/admin-chat/notification-channel`;
export const CHAT_SOCKET_URL = `wss://${domain}/ws/admin-chat`;
export const API_URL = `https://${domain}`;
export const HELP_AND_SUPPORT_URL = 'https://portal.beyonderissolutions.com/api';
export const COMPANY_ID = '145785f5-008b-4022-a36d-3638b527532b';

export const getChatSocketURL = roomId => {
  const token = localStorage.getItem('token');

  return `${CHAT_SOCKET_URL}/${roomId}/${token}`;
};

export const acceptedFileTypes =
  '.doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.png,jpg,.jpeg,.webp,.ico,.bmp,.gif';

export const avatarImgURL =
  'https://besportal.s3.ap-south-1.amazonaws.com/media/Untitled-2.jpg';

export const PENDING = 'Pending';
export const CLOSED = 'Closed';

// USER ROLES
export const ADMIN = 'Admin';
export const SUPPORT = 'Support';
