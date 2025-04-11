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

export const API_ENDPOINTS = {
  auth: {
    login: `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.AUTH.SIGNIN}`,
    register: `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.AUTH.REGISTER}`,
  },
  products: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.PRODUCTS.BASE}`,
    detail: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.PRODUCTS.BASE}/${id}`,
  },
  updates: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.UPDATES.BASE}`,
    detail: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.UPDATES.BASE}/${id}`,
  },
  updatePoints: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.UPDATE_POINTS.BASE}`,
    detail: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ROUTES.UPDATE_POINTS.BASE}/${id}`,
  }
}; 