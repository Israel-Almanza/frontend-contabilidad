import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

import { useNotifcacionesService } from '../modules/notificaciones-service/services/useNotifcacionesService';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOAD_NOTIFICATIONS': {
      return { ...state, notifications: action.payload };
    }

    case 'UPDATE_NOTIFICATIONS': {
      return { ...state, notifications: action.payload };
    }


    case 'DELETE_NOTIFICATION': {
      return { ...state, notifications: action.payload };
    }

    case 'CLEAR_NOTIFICATIONS': {
      return { ...state, notifications: action.payload };
    }

    default:
      return state;
  }
};

const NotificationContext = createContext({
  notifications: [],
  deleteNotification: () => { },
  clearNotifications: () => { },
  getNotifications: () => { },
  createNotification: () => { }
});

export const NotificationProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);
  const { loadApiGetListNoficaciones, loadApiReadNotification, loadApiReadAllNotification } = useNotifcacionesService();

  const deleteNotification = async (notificationID: any) => {
    try {
      //  const res = await axios.post('/api/notification/delete', { id: notificationID });

      const response = await loadApiReadNotification(notificationID)
      console.log("response delete ",response)
      if (response.status) {
        //load api
        await getNotifications();
      }
      //dispatch({ type: 'DELETE_NOTIFICATION', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const clearNotifications = async () => {
    try {
     // const res = await axios.post('/api/notification/delete-all');
    //  dispatch({ type: 'CLEAR_NOTIFICATIONS', payload: res.data });

      const response = await loadApiReadAllNotification()
      console.log("response delete ",response)
      if (response.status) {
        //load api
        await getNotifications();
      }

    } catch (e) {
      console.error(e);
    }
  };

  const getNotifications = async () => {

    try {
      // const res = await axios.get('/api/notification');
      //dispatch({ type: 'LOAD_NOTIFICATIONS', payload: res.data });
      const response = await loadApiGetListNoficaciones();
      console.log("response load noti ",response)
      if (response.status && response.notificaciones) {
        console.log("entre load");
        dispatch({ type: 'LOAD_NOTIFICATIONS', payload: response.notificaciones });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createNotification = async (notification: any) => {
    try {
      const res = await axios.post('/api/notification/add', { notification });
      dispatch({ type: 'CREATE_NOTIFICATION', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getNotifications();


  }, []);

  return (
    <NotificationContext.Provider
      value={{
        getNotifications,
        deleteNotification,
        clearNotifications,
        createNotification,
        notifications: state.notifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
