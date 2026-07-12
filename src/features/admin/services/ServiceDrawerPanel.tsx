import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type AdminServicePayload,
  useAdminService,
  useCreateService,
  useUpdateService
} from './adminServicesHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';

type Props = {
  serviceId: string | null;
  onClose: () => void;
  onSaved: () => void;
};

type FormState = {
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  tagsText: string;
  ordering: string;
  highlight: boolean;
  visible: boolean;
  ctaLabelEn: string;
  ctaLabelFr: string;
  ctaHref: string;
  ctaActionType: 'link' | 'modal' | 'scroll';
};

const initialForm: FormState = {
  titleEn: '',
  titleFr: '',
  descriptionEn: '',
  descriptionFr: '',
  tagsText: '',
  ordering: '0',
  highlight: false,
  visible: true,
  ctaLabelEn: '',
  ctaLabelFr: '',
  ctaHref: '',
  ctaActionType: 'link'
};

function parseTags(value: string) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function ServiceDrawerPanel({ serviceId, onClose, onSaved }: Props) {
  const { t } = useTranslation();
  const isEditing = !!serviceId;
  const serviceQuery = useAdminService(serviceId);
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const [form, setForm] = useState<FormState>(initialForm);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!serviceQuery.data) {
      setForm(initialForm);
      return;
    }

    const service = serviceQuery.data;
    setForm({
      titleEn: service.title?.en || '',
      titleFr: service.title?.fr || '',
      descriptionEn: service.shortDescription?.en || '',
      descriptionFr: service.shortDescription?.fr || '',
      tagsText: (service.supportingTags || []).join(', '),
      ordering: String(service.ordering ?? 0),
      highlight: Boolean(service.highlight),
      visible: service.visible !== false,
      ctaLabelEn: service.cta?.label?.en || '',
      ctaLabelFr: service.cta?.label?.fr || '',
      ctaHref: service.cta?.href || '',
      ctaActionType: service.cta?.actionType || 'link'
    });
  }, [serviceQuery.data]);

  const previewTags = useMemo(() => parseTags(form.tagsText), [form.tagsText]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFeedback(null);
    setForm((current) => ({ ...current, [key]: value }));
  }

  function buildPayload(): AdminServicePayload {
    const hasCta = form.ctaLabelEn.trim() || form.ctaLabelFr.trim() || form.ctaHref.trim();

    return {
      title: {
        en: form.titleEn.trim(),
        fr: form.titleFr.trim()
      },
      shortDescription: {
        en: form.descriptionEn.trim(),
        fr: form.descriptionFr.trim()
      },
      supportingTags: previewTags,
      highlight: form.highlight,
      visible: form.visible,
      ordering: Number.parseInt(form.ordering, 10) || 0,
      cta: hasCta
        ? {
            label: {
              en: form.ctaLabelEn.trim(),
              fr: form.ctaLabelFr.trim()
            },
            href: form.ctaHref.trim(),
            actionType: form.ctaActionType
          }
        : null
    };
  }

  async function save() {
    try {
      const payload = buildPayload();
      if (isEditing && serviceId) {
        await updateMutation.mutateAsync({ id: serviceId, payload });
        setFeedback(t('admin.services.drawer.updated'));
      } else {
        await createMutation.mutateAsync(payload);
        setFeedback(t('admin.services.drawer.created'));
      }
      onSaved();
      onClose();
    } catch {
      setFeedback(t('admin.services.drawer.saveFailed'));
    }
  }

  return (
    <>
      <div className="admin-drawer-overlay" role="presentation" onClick={onClose} />
      <aside className="admin-drawer" aria-modal="true" role="dialog" aria-labelledby="admin-service-drawer-title">
        <div className="admin-drawer__header">
          <h2 className="admin-drawer__title" id="admin-service-drawer-title">
            {isEditing ? t('admin.services.drawer.editTitle') : t('admin.services.drawer.addTitle')}
          </h2>
          <button type="button" className="admin-drawer__close" onClick={onClose} aria-label={t('common.close')}>
            x
          </button>
        </div>

        <div className="admin-drawer__body">
          {serviceQuery.isLoading ? (
            <LoadingState label={t('admin.services.loading')} />
          ) : (
            <>
              <section className="admin-section">
                <h3 className="admin-section__title">{t('admin.services.drawer.basicInfo')}</h3>
                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.titleEn')}</span>
                    <input value={form.titleEn} onChange={(e) => updateField('titleEn', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.titleFr')}</span>
                    <input value={form.titleFr} onChange={(e) => updateField('titleFr', e.target.value)} />
                  </label>
                </div>
                <label className="admin-field">
                  <span className="admin-field__label">{t('admin.services.drawer.descriptionEn')}</span>
                  <textarea rows={4} value={form.descriptionEn} onChange={(e) => updateField('descriptionEn', e.target.value)} />
                </label>
                <label className="admin-field">
                  <span className="admin-field__label">{t('admin.services.drawer.descriptionFr')}</span>
                  <textarea rows={4} value={form.descriptionFr} onChange={(e) => updateField('descriptionFr', e.target.value)} />
                </label>
              </section>

              <section className="admin-section">
                <h3 className="admin-section__title">{t('admin.services.drawer.display')}</h3>
                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.ordering')}</span>
                    <input
                      type="number"
                      value={form.ordering}
                      onChange={(e) => updateField('ordering', e.target.value)}
                    />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.tags')}</span>
                    <input value={form.tagsText} onChange={(e) => updateField('tagsText', e.target.value)} />
                  </label>
                </div>
                {previewTags.length ? (
                  <div className="admin-tags">
                    {previewTags.map((tag) => (
                      <span key={tag} className="admin-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <label className="admin-toggle-row">
                  <button
                    type="button"
                    className={`admin-switch${form.visible ? ' admin-switch--on' : ''}`}
                    onClick={() => updateField('visible', !form.visible)}
                    aria-pressed={form.visible}
                  >
                    <span className="admin-switch__knob" />
                  </button>
                  {t('admin.services.drawer.visible')}
                </label>
                <label className="admin-toggle-row">
                  <button
                    type="button"
                    className={`admin-switch${form.highlight ? ' admin-switch--on' : ''}`}
                    onClick={() => updateField('highlight', !form.highlight)}
                    aria-pressed={form.highlight}
                  >
                    <span className="admin-switch__knob" />
                  </button>
                  {t('admin.services.drawer.highlight')}
                </label>
              </section>

              <section className="admin-section">
                <h3 className="admin-section__title">{t('admin.services.drawer.cta')}</h3>
                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.ctaLabelEn')}</span>
                    <input value={form.ctaLabelEn} onChange={(e) => updateField('ctaLabelEn', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.ctaLabelFr')}</span>
                    <input value={form.ctaLabelFr} onChange={(e) => updateField('ctaLabelFr', e.target.value)} />
                  </label>
                </div>
                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.ctaHref')}</span>
                    <input value={form.ctaHref} onChange={(e) => updateField('ctaHref', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.services.drawer.ctaAction')}</span>
                    <select
                      value={form.ctaActionType}
                      onChange={(e) => updateField('ctaActionType', e.target.value as FormState['ctaActionType'])}
                    >
                      <option value="link">{t('admin.services.drawer.ctaAction.link')}</option>
                      <option value="modal">{t('admin.services.drawer.ctaAction.modal')}</option>
                      <option value="scroll">{t('admin.services.drawer.ctaAction.scroll')}</option>
                    </select>
                  </label>
                </div>
              </section>

              {feedback ? <p className="admin-message">{feedback}</p> : null}
            </>
          )}
        </div>

        <div className="admin-drawer__footer">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button type="button" className="admin-btn" disabled={isSaving} onClick={() => void save()}>
            {isSaving ? t('common.saving') : t('admin.services.drawer.save')}
          </button>
        </div>
      </aside>
    </>
  );
}
