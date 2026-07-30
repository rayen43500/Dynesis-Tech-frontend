import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Mail,
  Users,
  UserCheck,
  UserX,
  Send,
  Plus,
  Trash2,
  Search,
  Eye,
  Loader2,
  X
} from 'lucide-react';

import {
  useAdminNewsletterStats,
  useAdminNewsletterSubscribers,
  useAdminNewsletterCampaigns,
  useAddNewsletterSubscriber,
  useDeleteNewsletterSubscriber,
  useSendNewsletterCampaign,
  type NewsletterSubscriberItem,
  type NewsletterCampaignItem
} from './newsletterAdminHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import './newsletter-admin.css';


export function NewsletterAdminPage() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns'>('subscribers');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(1);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<NewsletterCampaignItem | null>(null);

  // Form states
  const [newEmail, setNewEmail] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  // Data queries
  const statsQuery = useAdminNewsletterStats();
  const subscribersQuery = useAdminNewsletterSubscribers({ page, limit: 15, search, status: statusFilter });
  const campaignsQuery = useAdminNewsletterCampaigns();

  // Mutations
  const addSubscriberMutation = useAddNewsletterSubscriber();
  const deleteSubscriberMutation = useDeleteNewsletterSubscriber();
  const sendCampaignMutation = useSendNewsletterCampaign();

  const stats = statsQuery.data || {
    totalSubscribers: 0,
    activeSubscribers: 0,
    unsubscribedCount: 0,
    totalCampaignsSent: 0
  };

  async function handleAddSubscriber(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail.trim()) return;

    await addSubscriberMutation.mutateAsync({ email: newEmail.trim(), source: 'admin' });
    setNewEmail('');
    setIsAddModalOpen(false);
  }

  async function handleDeleteSubscriber(id: string, email: string) {
    if (window.confirm(`Are you sure you want to remove subscriber ${email}?`)) {
      await deleteSubscriberMutation.mutateAsync(id);
    }
  }

  async function handleSendCampaign(e: React.FormEvent) {
    e.preventDefault();
    if (!campaignSubject.trim() || !campaignContent.trim()) return;

    await sendCampaignMutation.mutateAsync({
      subject: campaignSubject.trim(),
      content: campaignContent.trim()
    });

    setCampaignSubject('');
    setCampaignContent('');
    setIsCampaignModalOpen(false);
  }

  if (statsQuery.isLoading) {
    return (
      <div className="newsletter-admin">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="newsletter-admin">
      <div className="newsletter-admin__header">
        <div className="newsletter-admin__header-info">
          <h1 className="newsletter-admin__title">{t('admin.newsletter.title')}</h1>
          <p className="newsletter-admin__subtitle">{t('admin.newsletter.subtitle')}</p>
        </div>
        <div className="newsletter-admin__header-actions">
          <button
            type="button"
            className="newsletter-admin__btn newsletter-admin__btn--primary"
            onClick={() => setIsCampaignModalOpen(true)}
          >
            <Send size={16} />
            <span>{t('admin.newsletter.campaigns.new')}</span>
          </button>
          <button
            type="button"
            className="newsletter-admin__btn newsletter-admin__btn--secondary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            <span>{t('admin.newsletter.subscribers.add')}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="newsletter-admin__stats-grid">
        <div className="newsletter-admin__stat-card">
          <div className="newsletter-admin__stat-icon newsletter-admin__icon--blue">
            <Users size={22} />
          </div>
          <div className="newsletter-admin__stat-info">
            <span className="newsletter-admin__stat-label">{t('admin.newsletter.stats.total')}</span>
            <span className="newsletter-admin__stat-val">{stats.totalSubscribers}</span>
          </div>
        </div>

        <div className="newsletter-admin__stat-card">
          <div className="newsletter-admin__stat-icon newsletter-admin__icon--green">
            <UserCheck size={22} />
          </div>
          <div className="newsletter-admin__stat-info">
            <span className="newsletter-admin__stat-label">{t('admin.newsletter.stats.active')}</span>
            <span className="newsletter-admin__stat-val">{stats.activeSubscribers}</span>
          </div>
        </div>

        <div className="newsletter-admin__stat-card">
          <div className="newsletter-admin__stat-icon newsletter-admin__icon--orange">
            <UserX size={22} />
          </div>
          <div className="newsletter-admin__stat-info">
            <span className="newsletter-admin__stat-label">{t('admin.newsletter.stats.unsubscribed')}</span>
            <span className="newsletter-admin__stat-val">{stats.unsubscribedCount}</span>
          </div>
        </div>

        <div className="newsletter-admin__stat-card">
          <div className="newsletter-admin__stat-icon newsletter-admin__icon--purple">
            <Mail size={22} />
          </div>
          <div className="newsletter-admin__stat-info">
            <span className="newsletter-admin__stat-label">{t('admin.newsletter.stats.campaigns')}</span>
            <span className="newsletter-admin__stat-val">{stats.totalCampaignsSent}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="newsletter-admin__tabs">
        <button
          type="button"
          className={`newsletter-admin__tab ${activeTab === 'subscribers' ? 'newsletter-admin__tab--active' : ''}`}
          onClick={() => setActiveTab('subscribers')}
        >
          {t('admin.newsletter.subscribers.title')}
        </button>
        <button
          type="button"
          className={`newsletter-admin__tab ${activeTab === 'campaigns' ? 'newsletter-admin__tab--active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          {t('admin.newsletter.campaigns.title')}
        </button>
      </div>

      {/* Subscribers Content */}
      {activeTab === 'subscribers' && (
        <div className="newsletter-admin__content-block">
          <div className="newsletter-admin__filters">
            <div className="newsletter-admin__search-box">
              <Search size={16} className="newsletter-admin__search-icon" />
              <input
                type="text"
                placeholder={t('admin.newsletter.subscribers.search')}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="newsletter-admin__input"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="newsletter-admin__select"
            >
              <option value="">{t('admin.newsletter.subscribers.allStatus')}</option>
              <option value="active">{t('admin.newsletter.subscribers.active')}</option>
              <option value="unsubscribed">{t('admin.newsletter.subscribers.unsubscribed')}</option>
            </select>
          </div>

          <div className="newsletter-admin__table-wrap">
            <table className="newsletter-admin__table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>{t('admin.newsletter.subscribers.source')}</th>
                  <th>{t('admin.newsletter.subscribers.date')}</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribersQuery.isLoading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                      <LoadingState />
                    </td>
                  </tr>
                ) : !subscribersQuery.data?.subscribers?.length ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }} className="newsletter-admin__empty">
                      {t('admin.newsletter.subscribers.empty')}
                    </td>
                  </tr>
                ) : (
                  subscribersQuery.data.subscribers.map((item: NewsletterSubscriberItem) => (
                    <tr key={item._id}>
                      <td className="newsletter-admin__email-cell">{item.email}</td>
                      <td>
                        <span
                          className={`newsletter-admin__badge ${
                            item.status === 'active'
                              ? 'newsletter-admin__badge--active'
                              : 'newsletter-admin__badge--unsubscribed'
                          }`}
                        >
                          {t(`admin.newsletter.subscribers.${item.status}`)}
                        </span>
                      </td>
                      <td>
                        <span className="newsletter-admin__source-tag">{item.source || 'footer'}</span>
                      </td>
                      <td>{new Date(item.subscribedAt).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="newsletter-admin__icon-btn newsletter-admin__icon-btn--danger"
                          onClick={() => handleDeleteSubscriber(item._id, item.email)}
                          title={t('common.delete')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {subscribersQuery.data?.pagination && subscribersQuery.data.pagination.pages > 1 && (
            <div className="newsletter-admin__pagination">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="newsletter-admin__btn newsletter-admin__btn--secondary"
              >
                Précédent
              </button>
              <span>
                Page {page} sur {subscribersQuery.data.pagination.pages}
              </span>
              <button
                type="button"
                disabled={page >= subscribersQuery.data.pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="newsletter-admin__btn newsletter-admin__btn--secondary"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      )}

      {/* Campaigns Content */}
      {activeTab === 'campaigns' && (
        <div className="newsletter-admin__content-block">
          <div className="newsletter-admin__table-wrap">
            <table className="newsletter-admin__table">
              <thead>
                <tr>
                  <th>{t('admin.newsletter.campaigns.subject')}</th>
                  <th>{t('admin.newsletter.campaigns.recipients')}</th>
                  <th>{t('admin.newsletter.campaigns.status')}</th>
                  <th>{t('admin.newsletter.campaigns.date')}</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaignsQuery.isLoading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                      <LoadingState />
                    </td>
                  </tr>
                ) : !campaignsQuery.data?.length ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }} className="newsletter-admin__empty">
                      {t('admin.newsletter.campaigns.empty')}
                    </td>
                  </tr>
                ) : (
                  campaignsQuery.data.map((item: NewsletterCampaignItem) => (
                    <tr key={item._id}>
                      <td className="newsletter-admin__email-cell">
                        <strong>{item.subject}</strong>
                      </td>
                      <td>{item.recipientCount} abonnés</td>
                      <td>
                        <span
                          className={`newsletter-admin__badge ${
                            item.status === 'sent'
                              ? 'newsletter-admin__badge--active'
                              : item.status === 'sending'
                              ? 'newsletter-admin__badge--pending'
                              : 'newsletter-admin__badge--unsubscribed'
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td>{item.sentAt ? new Date(item.sentAt).toLocaleString() : new Date(item.createdAt).toLocaleString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="newsletter-admin__icon-btn"
                          onClick={() => setSelectedCampaign(item)}
                          title={t('common.view')}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Subscriber Modal */}
      {isAddModalOpen && (
        <div className="newsletter-modal-overlay">
          <div className="newsletter-modal">
            <div className="newsletter-modal__header">
              <h3>{t('admin.newsletter.subscribers.add')}</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="newsletter-modal__close">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubscriber} className="newsletter-modal__body">
              <label className="newsletter-modal__label">
                Adresse Email
                <input
                  type="email"
                  required
                  placeholder="subscriber@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="newsletter-admin__input"
                />
              </label>
              <div className="newsletter-modal__footer">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="newsletter-admin__btn newsletter-admin__btn--secondary"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={addSubscriberMutation.isPending || !newEmail.trim()}
                  className="newsletter-admin__btn newsletter-admin__btn--primary"
                >
                  {addSubscriberMutation.isPending ? <Loader2 size={16} className="newsletter-admin__spinner" /> : t('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Campaign Modal */}
      {isCampaignModalOpen && (
        <div className="newsletter-modal-overlay">
          <div className="newsletter-modal newsletter-modal--large">
            <div className="newsletter-modal__header">
              <h3>{t('admin.newsletter.campaigns.new')}</h3>
              <button type="button" onClick={() => setIsCampaignModalOpen(false)} className="newsletter-modal__close">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendCampaign} className="newsletter-modal__body">
              <label className="newsletter-modal__label">
                {t('admin.newsletter.campaigns.subject')}
                <input
                  type="text"
                  required
                  placeholder="ex: Annonce de nos nouvelles fonctionnalités !"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  className="newsletter-admin__input"
                />
              </label>

              <div className="newsletter-modal__tabs">
                <button
                  type="button"
                  className={`newsletter-modal__tab ${!previewMode ? 'newsletter-modal__tab--active' : ''}`}
                  onClick={() => setPreviewMode(false)}
                >
                  Éditeur
                </button>
                <button
                  type="button"
                  className={`newsletter-modal__tab ${previewMode ? 'newsletter-modal__tab--active' : ''}`}
                  onClick={() => setPreviewMode(true)}
                >
                  Aperçu HTML
                </button>
              </div>

              {!previewMode ? (
                <label className="newsletter-modal__label">
                  {t('admin.newsletter.campaigns.content')}
                  <textarea
                    rows={10}
                    required
                    placeholder="Rédigez le corps de votre email ici. Le formatage HTML est pris en charge (ex: <p>Bonjour</p>)"
                    value={campaignContent}
                    onChange={(e) => setCampaignContent(e.target.value)}
                    className="newsletter-admin__textarea"
                  />
                </label>
              ) : (
                <div className="newsletter-modal__preview-box">
                  <div className="newsletter-modal__preview-header">
                    <strong>Objet:</strong> {campaignSubject || '(Aucun objet)'}
                  </div>
                  <div
                    className="newsletter-modal__preview-body"
                    dangerouslySetInnerHTML={{ __html: campaignContent || '<p><em>Aucun contenu saisi.</em></p>' }}
                  />
                </div>
              )}

              <div className="newsletter-modal__footer">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="newsletter-admin__btn newsletter-admin__btn--secondary"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={sendCampaignMutation.isPending || !campaignSubject.trim() || !campaignContent.trim()}
                  className="newsletter-admin__btn newsletter-admin__btn--primary"
                >
                  {sendCampaignMutation.isPending ? (
                    <>
                      <Loader2 size={16} className="newsletter-admin__spinner" />
                      <span>{t('admin.newsletter.campaigns.sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{t('admin.newsletter.campaigns.send')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="newsletter-modal-overlay">
          <div className="newsletter-modal newsletter-modal--large">
            <div className="newsletter-modal__header">
              <h3>Campagne: {selectedCampaign.subject}</h3>
              <button type="button" onClick={() => setSelectedCampaign(null)} className="newsletter-modal__close">
                <X size={18} />
              </button>
            </div>
            <div className="newsletter-modal__body">
              <p>
                <strong>Date d'envoi:</strong>{' '}
                {selectedCampaign.sentAt ? new Date(selectedCampaign.sentAt).toLocaleString() : 'N/A'}
              </p>
              <p>
                <strong>Destinataires:</strong> {selectedCampaign.recipientCount} abonnés
              </p>
              <p>
                <strong>Statut:</strong> {selectedCampaign.status}
              </p>
              <hr style={{ borderColor: 'hsl(var(--color-border, #334155))', margin: '1rem 0' }} />
              <div
                className="newsletter-modal__preview-body"
                dangerouslySetInnerHTML={{ __html: selectedCampaign.content }}
              />
            </div>
            <div className="newsletter-modal__footer">
              <button
                type="button"
                onClick={() => setSelectedCampaign(null)}
                className="newsletter-admin__btn newsletter-admin__btn--secondary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

