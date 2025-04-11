export const API_CONFIG = {
  BASE_URL: '/api',
  VERSION: 'v1',
  ROUTES: {
    AUTH: {
      SIGNIN: '/signin',
      REGISTER: '/user',
    },
    PRODUCTS: {
      BASE: '/products',
      BY_ID: '/products/:id',
    },
    UPDATES: {
      BASE: '/updates',
      BY_ID: '/updates/:id',
    },
    UPDATE_POINTS: {
      BASE: '/updatepoints',
      BY_ID: '/updatepoints/:id',
    }
  }
} as const;

export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${path}`;
}; 