import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  CheckCircle, 
  Clock, 
  Eye, 
  ExternalLink,
  Sparkles,
  Layers,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { 
  useAdminBlog, 
  useCreateBlog, 
  useUpdateBlog, 
  useSetMainBlog, 
  useDeleteBlog 
} from '../shared/adminModuleHooks';
import './blog-admin.css';

interface BlogFormData {
  id?: string;
  titleFr: string;
  titleEn: string;
  slug: string;
  excerptFr: string;
  excerptEn: string;
  contentFr: string;
  contentEn: string;
  category: string;
  badgeType: string;
  readTime: string;
  coverImageUrl: string;
  published: boolean;
  isMain: boolean;
}

const INITIAL_FORM: BlogFormData = {
  titleFr: '',
  titleEn: '',
  slug: '',
  excerptFr: '',
  excerptEn: '',
  contentFr: '',
  contentEn: '',
  category: 'Transformation Digitale',
  badgeType: 'BLOG',
  readTime: '3 MIN READ',
  coverImageUrl: '',
  published: true,
  isMain: false
};

function getLocalized(value: { en?: string; fr?: string } | string | undefined, lang: string) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function BlogAdminPage() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const query = useAdminBlog();
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();
  const setMainMutation = useSetMainBlog();
  const deleteMutation = useDeleteBlog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>(INITIAL_FORM);

  const items = query.data || [];
  const mainArticle = items.find((item: any) => item.isMain);

  function handleOpenCreate() {
    setFormData(INITIAL_FORM);
    setIsModalOpen(true);
  }

  function handleOpenEdit(item: any) {
    setFormData({
      id: item._id,
      titleFr: item.title?.fr || '',
      titleEn: item.title?.en || '',
      slug: item.slug || '',
      excerptFr: item.excerpt?.fr || '',
      excerptEn: item.excerpt?.en || '',
      contentFr: item.content?.fr || '',
      contentEn: item.content?.en || '',
      category: Array.isArray(item.categories) && item.categories[0] ? item.categories[0] : 'Transformation Digitale',
      badgeType: item.badgeType || 'BLOG',
      readTime: item.readTime || '3 MIN READ',
      coverImageUrl: item.coverImageUrl || '',
      published: Boolean(item.published),
      isMain: Boolean(item.isMain)
    });
    setIsModalOpen(true);
  }

  async function handleToggleMain(item: any) {
    try {
      await setMainMutation.mutateAsync({ id: item._id, isMain: !item.isMain });
    } catch (err) {
      console.error('Erreur lors du changement d article principal:', err);
    }
  }

  async function handleTogglePublish(item: any) {
    try {
      await updateMutation.mutateAsync({
        id: item._id,
        payload: { published: !item.published }
      });
    } catch (err) {
      console.error('Erreur lors du changement de statut:', err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article de blog ?')) return;
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: { fr: formData.titleFr, en: formData.titleEn || formData.titleFr },
      slug: formData.slug || slugify(formData.titleFr || formData.titleEn),
      excerpt: { fr: formData.excerptFr, en: formData.excerptEn || formData.excerptFr },
      content: { fr: formData.contentFr, en: formData.contentEn || formData.contentFr },
      categories: [formData.category],
      badgeType: formData.badgeType,
      readTime: formData.readTime,
      coverImageUrl: formData.coverImageUrl,
      published: formData.published,
      isMain: formData.isMain
    };

    try {
      if (formData.id) {
        await updateMutation.mutateAsync({ id: formData.id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Erreur lors de l enregistrement de l article:', err);
    }
  }

  if (query.isLoading) {
    return (
      <div className="blog-admin">
        <LoadingState label={t('admin.blog.loading', 'Chargement des articles...')} />
      </div>
    );
  }

  return (
    <div className="blog-admin">
      {/* Header */}
      <div className="blog-admin__header">
        <div className="blog-admin__title-wrap">
          <h1 className="blog-admin__title">Gestion du Blog & Actualités</h1>
          <p className="blog-admin__sub">
            Créez, publiez et choisissez quel article principal apparaîtra en tête de la page d'accueil (Home).
          </p>
        </div>
        <button type="button" className="blog-admin__create-btn" onClick={handleOpenCreate}>
          <Plus size={18} />
          <span>Nouvel Article</span>
        </button>
      </div>

      {/* Main Home Article Highlight Banner */}
      <div className="blog-admin__main-banner">
        <div className="blog-admin__main-icon">⭐</div>
        <div className="blog-admin__main-info">
          <strong>Article Principal Actuel (Page d'accueil) :</strong>
          {mainArticle ? (
            <p>
              « {getLocalized(mainArticle.title, lang) || mainArticle.slug} » — 
              Catégorie: {Array.isArray(mainArticle.categories) ? mainArticle.categories.join(', ') : mainArticle.badgeType}
            </p>
          ) : (
            <p>Aucun article n'est explicitement marqué comme principal. Le plus récent est utilisé par défaut.</p>
          )}
        </div>
      </div>

      {/* Grid of Articles */}
      {items.length === 0 ? (
        <div className="admin-quotes-empty" style={{ padding: '40px', textAlign: 'center', background: '#ffffff', borderRadius: '12px' }}>
          <p>Aucun article publié pour le moment. Cliquez sur "Nouvel Article" pour en créer un.</p>
        </div>
      ) : (
        <div className="blog-admin__grid">
          {items.map((item: any) => {
            const title = getLocalized(item.title, lang) || item.slug;
            const excerpt = getLocalized(item.excerpt, lang);
            const isMain = Boolean(item.isMain);
            const isPub = Boolean(item.published);
            const coverUrl = item.coverImageUrl || 'https://images.unsplash.com/photo-1517976487507-580da3a82371?auto=format&fit=crop&w=600&q=80';

            return (
              <div 
                key={item._id} 
                className={`blog-admin__card ${isMain ? 'blog-admin__card--main' : ''}`}
              >
                {/* Cover Image */}
                <div className="blog-admin__card-cover">
                  <img src={coverUrl} alt={title} className="blog-admin__card-img" />
                  <span className="blog-admin__card-badge">
                    {item.badgeType || (Array.isArray(item.categories) && item.categories[0]) || 'BLOG'}
                  </span>
                  {isMain && (
                    <span className="blog-admin__card-main-tag">
                      <Star size={11} fill="#ffffff" /> PRINCIPAL HOME
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="blog-admin__card-body">
                  <div className="blog-admin__card-meta">
                    <span>{item.readTime || '3 MIN READ'}</span>
                    <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Brouillon'}</span>
                  </div>
                  <h3 className="blog-admin__card-title">{title}</h3>
                  {excerpt && <p className="blog-admin__card-excerpt">{excerpt}</p>}
                </div>

                {/* Footer Controls */}
                <div className="blog-admin__card-footer">
                  <button
                    type="button"
                    className={`blog-admin__status-tag ${isPub ? 'blog-admin__status-tag--pub' : 'blog-admin__status-tag--draft'}`}
                    onClick={() => handleTogglePublish(item)}
                    title="Cliquer pour changer le statut"
                  >
                    {isPub ? '✓ Publié' : 'Brouillon'}
                  </button>

                  <div className="blog-admin__card-actions">
                    <button
                      type="button"
                      className={`blog-admin__btn-main ${isMain ? 'blog-admin__btn-main--active' : ''}`}
                      onClick={() => handleToggleMain(item)}
                      title="Définir comme l'article principal qui apparaîtra en tête sur la page d'accueil"
                    >
                      <Star size={12} fill={isMain ? '#ffffff' : 'none'} />
                      <span>{isMain ? 'Principal' : 'Mettre en Home'}</span>
                    </button>

                    <button
                      type="button"
                      className="blog-admin__btn-icon"
                      onClick={() => handleOpenEdit(item)}
                      title="Modifier l'article"
                    >
                      <Edit3 size={14} />
                    </button>

                    <button
                      type="button"
                      className="blog-admin__btn-icon blog-admin__btn-icon--del"
                      onClick={() => handleDelete(item._id)}
                      title="Supprimer l'article"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="blog-admin-modal-overlay">
          <div className="blog-admin-modal">
            <div className="blog-admin-modal__header">
              <h2 className="blog-admin-modal__title">
                {formData.id ? "Modifier l'article de Blog" : "Créer un nouvel article de Blog"}
              </h2>
              <button 
                type="button" 
                className="blog-admin-modal__close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="blog-admin-modal__body">
                {/* Titles */}
                <div className="blog-admin-form__row">
                  <div className="blog-admin-form__group">
                    <label>Titre (Français) *</label>
                    <input
                      type="text"
                      required
                      className="blog-admin-form__input"
                      placeholder="Ex: Une transformation digitale qui génère du résultat"
                      value={formData.titleFr}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          titleFr: val,
                          slug: prev.slug || slugify(val)
                        }));
                      }}
                    />
                  </div>

                  <div className="blog-admin-form__group">
                    <label>Titre (Anglais)</label>
                    <input
                      type="text"
                      className="blog-admin-form__input"
                      placeholder="Ex: A digital transformation that delivers results"
                      value={formData.titleEn}
                      onChange={(e) => setFormData((prev) => ({ ...prev, titleEn: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Slug & Cover Image URL */}
                <div className="blog-admin-form__row">
                  <div className="blog-admin-form__group">
                    <label>Slug URL *</label>
                    <input
                      type="text"
                      required
                      className="blog-admin-form__input"
                      placeholder="ex: transformation-digitale-croissance"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    />
                  </div>

                  <div className="blog-admin-form__group">
                    <label>URL Image de Couverture</label>
                    <input
                      type="url"
                      className="blog-admin-form__input"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.coverImageUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, coverImageUrl: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Category, Badge Type, Read Time */}
                <div className="blog-admin-form__row">
                  <div className="blog-admin-form__group">
                    <label>Catégorie</label>
                    <input
                      type="text"
                      className="blog-admin-form__input"
                      placeholder="TRANSFORMATION DIGITALE, IA & CLOUD..."
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    />
                  </div>

                  <div className="blog-admin-form__group">
                    <label>Type de Badge</label>
                    <select
                      className="blog-admin-form__select"
                      value={formData.badgeType}
                      onChange={(e) => setFormData((prev) => ({ ...prev, badgeType: e.target.value }))}
                    >
                      <option value="NEWS RELEASE">NEWS RELEASE</option>
                      <option value="BLOG">BLOG</option>
                      <option value="ARTICLE">ARTICLE</option>
                      <option value="TECH RADAR">TECH RADAR</option>
                    </select>
                  </div>
                </div>

                {/* Read time */}
                <div className="blog-admin-form__group">
                  <label>Temps de lecture estimé</label>
                  <input
                    type="text"
                    className="blog-admin-form__input"
                    placeholder="Ex: 3 MIN READ"
                    value={formData.readTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                  />
                </div>

                {/* Excerpts */}
                <div className="blog-admin-form__row">
                  <div className="blog-admin-form__group">
                    <label>Résumé / Extrait (FR)</label>
                    <textarea
                      className="blog-admin-form__textarea"
                      placeholder="Court résumé de l'article affiché sur les cartes..."
                      value={formData.excerptFr}
                      onChange={(e) => setFormData((prev) => ({ ...prev, excerptFr: e.target.value }))}
                    />
                  </div>

                  <div className="blog-admin-form__group">
                    <label>Résumé / Extrait (EN)</label>
                    <textarea
                      className="blog-admin-form__textarea"
                      placeholder="Short summary displayed on cards..."
                      value={formData.excerptEn}
                      onChange={(e) => setFormData((prev) => ({ ...prev, excerptEn: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="blog-admin-form__group">
                  <label>Contenu de l'article (Français)</label>
                  <textarea
                    className="blog-admin-form__textarea"
                    style={{ minHeight: '120px' }}
                    placeholder="Contenu complet de l'article..."
                    value={formData.contentFr}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contentFr: e.target.value }))}
                  />
                </div>

                {/* Switches */}
                <div className="blog-admin-form__switch-row">
                  <label className="blog-admin-form__switch-label">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                    />
                    <span>Publier immédiatement cet article</span>
                  </label>

                  <label className="blog-admin-form__switch-label">
                    <input
                      type="checkbox"
                      checked={formData.isMain}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isMain: e.target.checked }))}
                    />
                    <span>⭐ Définir comme <strong>Article Principal (Home)</strong></span>
                  </label>
                </div>
              </div>

              <div className="blog-admin-modal__footer">
                <button
                  type="button"
                  className="blog-admin-modal__cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="blog-admin-modal__submit-btn"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Enregistrement...'
                    : formData.id
                    ? 'Mettre à jour'
                    : 'Publier l\'article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
