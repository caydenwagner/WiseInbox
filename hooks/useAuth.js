// hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafariView from "react-native-safari-view";
import { useNavigation } from '@react-navigation/native';
import { getLastLogin } from '../functions/helpers';
import { ROUTES } from '../constants/routes';

const AUTH_BASE_URL = 'https://hopelessly-summary-chow.ngrok-free.app/user/login/google';

export const useAuth = () => {
  const [uri, setUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkExistingSession = async () => {
      setIsLoading(true);
      try {
        const lastLogin = await getLastLogin();
        if (lastLogin !== null) {
          openUrl(AUTH_BASE_URL);
        }
      } catch (err) {
        setError('Failed to initiate login. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();

    const handleInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleAuthenticationResponse( url );
      }
    };

    Linking.addEventListener('url', ({ url }) => handleAuthenticationResponse( url ));
    handleInitialUrl();

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const lastLogin = await getLastLogin();
      const loginUrl = lastLogin 
        ? AUTH_BASE_URL
        : `${AUTH_BASE_URL}/newuser`;
      
      openUrl(loginUrl);
    } catch (err) {
      setError('Failed to initiate login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openUrl = (url) => {
    if (Platform.OS === 'ios') {
      SafariView.show({
        url,
        fromBottom: true,
      });
    } else {
      setUri(url);
    }
  };

  const handleAuthenticationResponse = ( url ) => {
    const decodedUrl = decodeURI(url);
    const status = decodedUrl.match(/status=([^/]+)/);
    
    if (status && status[1] === 'Success') {
      const firstName = decodedUrl.match(/firstName=([^/]+)/)?.[1];
      const email = decodedUrl.match(/email=([^/]+)/)?.[1];
      const accessToken = decodedUrl.match(/accessToken=([^/]+)/)?.[1];

      if (firstName && email && accessToken) {
        const user = [{
          firstName,
          email,
          accessToken,
          lastLogin: new Date().toString(),
        }];

        AsyncStorage.setItem('User', JSON.stringify(user))
          .then(() => {
            if (Platform.OS === 'ios') {
              SafariView.dismiss();
            } else {
              setUri('');
            }
            navigation.navigate(ROUTES.VIEW_EMAIL_SCREEN);
          })
          .catch(() => {
            setError('Failed to save user data. Please try again.');
          });
      } else {
        setError('Invalid authentication response. Please try again.');
      }
    } else {
      setError('Authentication failed. Please try again.');
    }

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    } else {
      setUri('');
    }
  };

  return {
    uri,
    isLoading,
    error,
    handleLogin,
    handleAuthenticationResponse,
  };
};