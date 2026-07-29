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
    services: {
      list: () => http.get('/api/v1/public/services')
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
    },
    pricing: {
      list: () => http.get('/api/v1/public/pricing')
    },
    chatbot: {
      send: (message: string) => http.post('/api/v1/public/chatbot/message', { message })
    },
    portfolio: {
      list: (_params?: Record<string, unknown>) => http.get('/api/v1/public/portfolio')
    },
    faq: {
      list: () => http.get('/api/v1/public/faq')
    },
    blog: {
      list: (_params?: Record<string, unknown>) => http.get('/api/v1/public/blog'),
      getBySlug: (slug: string) => http.get(`/api/v1/public/blog/${slug}`)
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
    services: {
      list: (params?: { page?: number; limit?: number; visible?: boolean; highlighted?: boolean }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (typeof params?.visible === 'boolean') search.set('visible', String(params.visible));
        if (typeof params?.highlighted === 'boolean') search.set('highlighted', String(params.highlighted));
        const qs = search.toString();
        const url = qs ? `/api/v1/admin/services?${qs}` : '/api/v1/admin/services';
        return http.get(url);
      },
      getById: (id: string) => http.get(`/api/v1/admin/services/${id}`),
      create: (payload: Record<string, unknown>) => http.post('/api/v1/admin/services', payload),
      update: (id: string, payload: Record<string, unknown>) => http.patch(`/api/v1/admin/services/${id}`, payload),
      remove: (id: string) => http.delete(`/api/v1/admin/services/${id}`)
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
    },
    newsletter: {
      stats: () => http.get('/api/v1/admin/newsletter/stats'),
      subscribers: (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (params?.status) search.set('status', params.status);
        if (params?.search) search.set('search', params.search);
        const qs = search.toString();
        return http.get(qs ? `/api/v1/admin/newsletter/subscribers?${qs}` : '/api/v1/admin/newsletter/subscribers');
      },
      addSubscriber: (payload: { email: string; source?: string }) =>
        http.post('/api/v1/admin/newsletter/subscribers', payload),
      deleteSubscriber: (id: string) => http.delete(`/api/v1/admin/newsletter/subscribers/${id}`),
      campaigns: () => http.get('/api/v1/admin/newsletter/campaigns'),
      sendCampaign: (payload: { subject: string; content: string }) =>
        http.post('/api/v1/admin/newsletter/send', payload)
    },

    projects: {
      list: (params?: { page?: number; limit?: number; clientId?: string; status?: string }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (params?.clientId) search.set('clientId', params.clientId);
        if (params?.status) search.set('status', params.status);
        const qs = search.toString();
        const url = qs ? `/api/v1/admin/projects?${qs}` : '/api/v1/admin/projects';
        return http.get(url);
      },
      getById: (id: string) => http.get(`/api/v1/admin/projects/${id}`),
      create: (payload: Record<string, unknown>) => http.post('/api/v1/admin/projects', payload),
      update: (id: string, payload: Record<string, unknown>) => http.patch(`/api/v1/admin/projects/${id}`, payload),
      getBlockchainLog: (id: string) => http.get(`/api/v1/admin/projects/${id}/blockchain`),
      completeBlockchainStage: (id: string, payload: { stageIndex: number; adminNote?: string }) =>
        http.post(`/api/v1/admin/projects/${id}/blockchain/complete-stage`, payload)
    },
    inquiries: {
      list: (params?: { page?: number; limit?: number; status?: string }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (params?.status) search.set('status', params.status);
        const qs = search.toString();
        const url = qs ? `/api/v1/admin/inquiries?${qs}` : '/api/v1/admin/inquiries';
        return http.get(url);
      },
      getById: (id: string) => http.get(`/api/v1/admin/inquiries/${id}`),
      update: (id: string, payload: Record<string, unknown>) => http.patch(`/api/v1/admin/inquiries/${id}`, payload),
      setStatus: (id: string, payload: { status: string }) => http.patch(`/api/v1/admin/inquiries/${id}/status`, payload),
      convertToProject: (id: string) => http.post(`/api/v1/admin/inquiries/${id}/convert-to-project`)
    },
    portfolios: {
      list: (params?: { page?: number; limit?: number; featured?: boolean }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (typeof params?.featured === 'boolean') search.set('featured', String(params.featured));
        const qs = search.toString();
        const url = qs ? `/api/v1/admin/portfolios?${qs}` : '/api/v1/admin/portfolios';
        return http.get(url);
      },
      getById: (id: string) => http.get(`/api/v1/admin/portfolios/${id}`),
      create: (payload: Record<string, unknown>) => http.post('/api/v1/admin/portfolios', payload),
      update: (id: string, payload: Record<string, unknown>) => http.patch(`/api/v1/admin/portfolios/${id}`, payload)
    },
    clients: {
      list: (params?: { page?: number; limit?: number }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        const qs = search.toString();
        const url = qs ? `/api/v1/admin/clients?${qs}` : '/api/v1/admin/clients';
        return http.get(url);
      },
      getById: (id: string) => http.get(`/api/v1/admin/clients/${id}`),
      create: (payload: Record<string, unknown>) => http.post('/api/v1/admin/clients', payload),
      update: (id: string, payload: Record<string, unknown>) => http.patch(`/api/v1/admin/clients/${id}`, payload)
    },
    users: {
      list: (params?: { page?: number; limit?: number; role?: string; search?: string }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (params?.role) search.set('role', params.role);
        if (params?.search) search.set('search', params.search);
        const qs = search.toString();
        const url = qs ? `/api/v1/admin/users?${qs}` : '/api/v1/admin/users';
        return http.get(url);
      },
      getById: (id: string) => http.get(`/api/v1/admin/users/${id}`),
      update: (id: string, payload: { displayName?: string; role?: string; permissions?: string[]; isActivated?: boolean }) =>
        http.patch(`/api/v1/admin/users/${id}`, payload),
      remove: (id: string) => http.delete(`/api/v1/admin/users/${id}`),
      invite: (payload: { email: string; role: string }) => http.post('/api/v1/admin/users/invite', payload)
    },
    pricing: {
      list: (params?: { page?: number; limit?: number; visible?: boolean }) => {
        const search = new URLSearchParams();
        if (params?.page) search.set('page', String(params.page));
        if (params?.limit) search.set('limit', String(params.limit));
        if (typeof params?.visible === 'boolean') search.set('visible', String(params.visible));
        const qs = search.toString();
        return http.get(qs ? `/api/v1/admin/pricing?${qs}` : '/api/v1/admin/pricing');
      },
      getById: (id: string) => http.get(`/api/v1/admin/pricing/${id}`),
      create: (payload: Record<string, unknown>) => http.post('/api/v1/admin/pricing', payload),
      update: (id: string, payload: Record<string, unknown>) => http.patch(`/api/v1/admin/pricing/${id}`, payload),
      remove: (id: string) => http.delete(`/api/v1/admin/pricing/${id}`)
    },
    invoices: {
      list: (params?: Record<string, unknown>) => http.get('/api/v1/admin/invoices')
    },
    tickets: {
      list: (params?: Record<string, unknown>) => http.get('/api/v1/admin/tickets')
    },
    faq: {
      list: (params?: Record<string, unknown>) => http.get('/api/v1/admin/faq')
    },
    blog: {
      list: (params?: Record<string, unknown>) => http.get('/api/v1/admin/blog')
    },
    homepage: {
      get: () => http.get('/api/v1/admin/homepage')
    },
    translations: {
      list: (params?: Record<string, unknown>) => http.get('/api/v1/admin/translations')
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
    },
    projects: {
      list: () => http.get('/api/v1/client/projects'),
      getById: (id: string) => http.get(`/api/v1/client/projects/${id}`),
      roadmap: (id: string) => http.get(`/api/v1/client/projects/${id}/roadmap`),
      blockchainLog: (id: string) => http.get(`/api/v1/client/projects/${id}/blockchain`)
    },
    invoices: {
      list: () => http.get('/api/v1/client/invoices')
    },
    tickets: {
      list: () => http.get('/api/v1/client/tickets'),
      create: (payload: Record<string, unknown>) => http.post('/api/v1/client/tickets', payload)
    }
  },
  projectManager: {
    dashboard: () => http.get('/api/v1/project-manager/dashboard'),
    projects: (params?: { page?: number; limit?: number; status?: string }) => {
      const search = new URLSearchParams();
      if (params?.page) search.set('page', String(params.page));
      if (params?.limit) search.set('limit', String(params.limit));
      if (params?.status) search.set('status', params.status);
      const qs = search.toString();
      const url = qs ? `/api/v1/project-manager/projects?${qs}` : '/api/v1/project-manager/projects';
      return http.get(url);
    }
  },
  notifications: {
    list: (params?: { page?: number; limit?: number; unreadOnly?: boolean }) => {
      const search = new URLSearchParams();
      if (params?.page) search.set('page', String(params.page));
      if (params?.limit) search.set('limit', String(params.limit));
      if (params?.unreadOnly) search.set('unreadOnly', 'true');
      const qs = search.toString();
      const url = qs ? `/api/v1/notifications?${qs}` : '/api/v1/notifications';
      return http.get(url);
    },
    markRead: (id: string) => http.patch(`/api/v1/notifications/${id}/read`),
    markAllRead: () => http.post('/api/v1/notifications/read-all')
  },
  developer: {
    dashboard: () => http.get('/api/v1/developer/dashboard'),
    projects: () => http.get('/api/v1/developer/projects'),
    tasks: {
      list: () => http.get('/api/v1/developer/tasks'),
      updateStatus: (id: string, payload: { status: string }) => http.patch(`/api/v1/developer/tasks/${id}/status`, payload),
      addComment: (id: string, payload: { body: string }) => http.post(`/api/v1/developer/tasks/${id}/comments`, payload)
    },
    timeEntries: {
      list: () => http.get('/api/v1/developer/time-entries'),
      create: (payload: {
        projectId?: string;
        taskId?: string;
        startedAt: string;
        endedAt?: string;
        durationMinutes: number;
        note?: string;
        source?: 'timer' | 'manual';
      }) => http.post('/api/v1/developer/time-entries', payload)
    },
    bugs: {
      list: () => http.get('/api/v1/developer/bugs')
    },
    deployments: {
      list: () => http.get('/api/v1/developer/deployments')
    },
    leaves: {
      list: () => http.get('/api/v1/developer/leaves'),
      request: (payload: { startDate: string; endDate: string; reason?: string }) => http.post('/api/v1/developer/leaves', payload)
    },
    account: {
      update: (formData: FormData) =>
        http.patch('/api/v1/developer/account', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }),
      changePassword: (payload: { currentPassword: string; newPassword: string }) =>
        http.patch('/api/v1/developer/account/password', payload)
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
    create: (payload: { email: string; role: 'admin' | 'client' | 'developer' | 'project_manager' }) => http.post('/api/v1/invitations/create', payload),
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

