import { http } from './httpClient';

export const endpoints = {
  quotes: {
    create: (payload: {
      projectType: string;
      budget: string;
      timeline: string;
      description: string;
      name: string;
      email: string;
      company?: string;
      wantsDiscoveryCall?: boolean;
    }) => http.post('/api/quotes', payload)
  },
  contact: {
    create: (payload: { name: string; email: string; phone?: string; company?: string; message: string }) =>
      http.post('/api/contact', payload)
  },
  public: {
    settings: {
      get: () => http.get('/api/v1/public/settings')
    },
    developers: {
      list: (params?: { lang?: 'en' | 'fr'; featuredOnly?: boolean }) => {
        const search = new URLSearchParams();
        if (params?.lang) search.set('lang', params.lang);
        if (typeof params?.featuredOnly === 'boolean') search.set('featuredOnly', String(params.featuredOnly));
        const qs = search.toString();
        const url = qs ? `/api/v1/public/developers?${qs}` : `/api/v1/public/developers`;
        return http.get(url);
      },
      getById: (id: string, params?: { lang?: 'en' | 'fr' }) => {
        const search = new URLSearchParams();
        if (params?.lang) search.set('lang', params.lang);
        const qs = search.toString();
        const url = qs ? `/api/v1/public/developers/${id}?${qs}` : `/api/v1/public/developers/${id}`;
        return http.get(url);
      }
    }
  },
  admin: {
    notifications: (since?: number) => {
      const qs = since ? `?since=${encodeURIComponent(new Date(since).toISOString())}` : '';
      return http.get(`/api/v1/admin/notifications${qs}`);
    },
    quotes: {
      list: () => http.get('/api/v1/admin/quotes'),
      getById: (id: string) => http.get(`/api/v1/admin/quotes/${id}`),
      update: (id: string, payload: { status?: string; adminNotes?: string }) =>
        http.patch(`/api/v1/admin/quotes/${id}`, payload),
      remove: (id: string) => http.delete(`/api/v1/admin/quotes/${id}`),
      notifications: (since?: number) => {
        const qs = since ? `?since=${encodeURIComponent(new Date(since).toISOString())}` : '';
        return http.get(`/api/v1/admin/quotes/notifications${qs}`);
      },
      sendProposal: (id: string, payload: { subject: string; body: string }) =>
        http.post(`/api/v1/admin/quotes/${id}/send-proposal`, payload)
    },
    messages: {
      list: () => http.get('/api/v1/admin/messages'),
      getById: (id: string) => http.get(`/api/v1/admin/messages/${id}`),
      update: (id: string, payload: { status?: string }) => http.patch(`/api/v1/admin/messages/${id}`, payload),
      remove: (id: string) => http.delete(`/api/v1/admin/messages/${id}`),
      reply: (id: string, payload: { reply: string }) => http.post(`/api/v1/admin/messages/${id}/reply`, payload)
    },
    developers: {
      list: (params?: { page?: number; limit?: number; visible?: boolean }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (typeof params?.visible === 'boolean') search.set('visible', String(params.visible));
        const qs = search.toString();
        const url = qs ? `/api/v1/admin/developers?${qs}` : `/api/v1/admin/developers`;
        return http.get(url);
      },
      getById: (id: string) => http.get(`/api/v1/admin/developers/${id}`),
      create: (formData: FormData) =>
        http.post('/api/v1/admin/developers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      update: (id: string, formData: FormData) =>
        http.put(`/api/v1/admin/developers/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      remove: (id: string) => http.delete(`/api/v1/admin/developers/${id}`),
      uploadPhoto: (id: string, formData: FormData) =>
        http.post(`/api/v1/admin/developers/${id}/photo`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      addPortfolio: (id: string, formData: FormData) =>
        http.post(`/api/v1/admin/developers/${id}/portfolio`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      updatePortfolio: (id: string, projectId: string, formData: FormData) =>
        http.put(`/api/v1/admin/developers/${id}/portfolio/${projectId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      removePortfolio: (id: string, projectId: string) =>
        http.delete(`/api/v1/admin/developers/${id}/portfolio/${projectId}`)
    },
    settings: {
      get: () => http.get('/api/v1/admin/settings'),
      update: (payload: Record<string, unknown>) => http.put('/api/v1/admin/settings', payload),
      reset: (payload: { scope: string }) => http.post('/api/v1/admin/settings/reset', payload)
    },
    account: {
      update: (formData: FormData) =>
        http.patch('/api/v1/admin/account', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      changePassword: (payload: { currentPassword: string; newPassword: string }) =>
        http.patch('/api/v1/admin/account/password', payload)
    }
  },
  client: {
    quotes: {
      list: () => http.get('/api/v1/client/quotes')
    },
    messages: {
      list: () => http.get('/api/v1/client/messages')
    },
    account: {
      update: (formData: FormData) =>
        http.patch('/api/v1/client/account', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      changePassword: (payload: { currentPassword: string; newPassword: string }) =>
        http.patch('/api/v1/client/account/password', payload)
    }
  },
  auth: {
    register: (payload: { name: string; email: string; password: string }) => http.post('/api/v1/auth/register', payload),
    login: (payload: { email: string; password: string }) => http.post('/api/v1/auth/login', payload),
    activate: (token: string) => http.get(`/api/v1/auth/activate/${token}`),
    resendActivation: (payload: { email: string }) => http.post('/api/v1/auth/resend-activation', payload),
    me: () => http.get('/api/v1/auth/me'),
    refresh: () => http.post('/api/v1/auth/refresh', {}),
    logout: () => http.post('/api/v1/auth/logout', {})
  },
  invitations: {
    create: (payload: { email: string; role: 'admin' | 'client' }) => http.post('/api/v1/invitations/create', payload),
    accept: (payload: { token: string; email?: string; password: string; displayName?: string }) =>
      http.post('/api/v1/invitations/accept', payload)
  },
  media: {
    signUpload: (payload: { folder?: string; resourceType?: 'image' | 'video' | 'raw' }) => http.post('/api/v1/media/sign-upload', payload)
  },
  payments: {
    createCheckout: (payload: { amount: number; currency: string; successUrl: string; cancelUrl: string; metadata?: Record<string, string> }) =>
      http.post('/api/v1/payments/checkout', payload)
  }
};

