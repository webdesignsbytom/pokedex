import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

const host: string | undefined = "https://bytetoast-studio.vercel.app";
const tokenKey: string | undefined = "token";

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  try {
    const token = await AsyncStorage.getItem(tokenKey || '');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error accessing AsyncStorage:', error);
    return {};
  }
};

const handleError = (error: AxiosError): Promise<never> => {
  let errorMessage = 'An unexpected error occurred.';

  if (error.response) {
    if (error.response.data && (error.response.data as any).message) {
      errorMessage = (error.response.data as any).message;
    } else {
      switch (error.response.status) {
        case 401:
          errorMessage = 'Unauthorized - Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Forbidden - You do not have access.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        default:
          errorMessage = 'An unexpected server error occurred.';
      }
    }
  } else if (error.request) {
    errorMessage = 'No response from the server. Please try again.';
  } else {
    errorMessage = error.message;
  }

  return Promise.reject({ ...error, message: errorMessage });
};

const client = {
  get: async <T>(path: string, withToken: boolean = true): Promise<T> => {
    const url = `${host}${path}`;
    const headers = withToken ? await getAuthHeaders() : {};

    try {
      const response = await axios.get<T>(url, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  post: async (path: string, data: any, withToken: boolean = true): Promise<any> => {
    const url = `${host}${path}`;
    const headers = withToken ? await getAuthHeaders() : {};

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  patch: async (path: string, data: any, withToken: boolean = true): Promise<any> => {
    const url = `${host}${path}`;
    const headers = withToken ? await getAuthHeaders() : {};

    try {
      const response = await axios.patch(url, data, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  delete: async (path: string, withToken: boolean = true): Promise<any> => {
    const url = `${host}${path}`;
    const headers = withToken ? await getAuthHeaders() : {};

    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
};

export default client;
