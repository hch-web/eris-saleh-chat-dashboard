import { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import { NOTIFICATION_SOCKET_URL } from 'utilities/constants';
import { addNotification, updateNotifications } from 'store/slices/notificationsSlice';
import { useListNotificationsQuery } from 'services/private/notification';
import SnackbarActions from '../components/SnackbarActions';

const useNotificationsSocket = () => {
  const { enqueueSnackbar } = useSnackbar();
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  const { data: notificationsData } = useListNotificationsQuery();

  useEffect(() => {
    const websocket = new WebSocket(NOTIFICATION_SOCKET_URL);
    socketRef.current = websocket;

    websocket.onmessage = event => {
      const data = JSON.parse(event?.data);
      const { notification_text: message, room_id: chatRoomId, room } = data;

      const notification = new Notification(message);

      enqueueSnackbar(message, {
        action: () => SnackbarActions({ roomId: chatRoomId, room }),
        variant: 'default',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          notification.close();
        }
      });

      dispatch(addNotification(data));
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (notificationsData?.results?.length > 0) {
      dispatch(updateNotifications(notificationsData?.results));
    }
  }, [notificationsData]);

  // useEffect(() => {
  //   if (socketRef.current) {
  //     socketRef.current.onmessage = event => {
  //       // const { message, chat_id: chatRoomId } = event?.data || {};
  //       const { message } = event?.data || {};

  //       enqueueSnackbar(message, {
  //         // action: <SnackbarActions roomId={chatRoomId} />,
  //         action: SnackbarActions,
  //       });
  //     };
  //   }
  // }, [socketRef]);

  return socketRef;
};

export default useNotificationsSocket;
