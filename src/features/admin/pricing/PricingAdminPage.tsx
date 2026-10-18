import React, { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
  useAdminPricingPlans,
  useCreatePricingPlan,
  useUpdatePricingPlan,
  useDeletePricingPlan,
  type PricingPlan
} from '../../pricing/pricingHooks';
import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import '../quotes/quotes-admin.css';

export function PricingAdminPage() {
  const { data: plans = [], isLoading } = useAdminPricingPlans();
  const createMutation = useCreatePricingPlan();
  const updateMutation = useUpdatePricingPlan();
  const deleteMutation = useDeletePricingPlan();

  const [editingPlan, setEditingPlan] = useState<Partial<PricingPlan> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PricingPlan | null>(null);

  function openCreate() {
    setEditingPlan({
      name: '',
      description: '',
      price: '',
      priceNote: '/ projet',
      category: 'vitrine',
      highlighted: false,
      badgeLabel: '',
      ctaLabel: 'Démarrer',
      ctaHref: '/contact',
      ctaType: 'contact',
      visible: true,
      order: (plans.length + 1) * 10,
      features: [{ label: '', included: true }]
    });
  }

  function openEdit(plan: PricingPlan) {
    setEditingPlan({ ...plan });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPlan || !editingPlan.name) return;

    // Filter out empty features
    const cleanFeatures = (editingPlan.features || []).filter((f) => f.label.trim().length > 0);

    const payload = {
      ...editingPlan,
      features: cleanFeatures
    };

    if (editingPlan._id) {
      await updateMutation.mutateAsync({ id: editingPlan._id, payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setEditingPlan(null);
  }

  async function toggleVisible(plan: PricingPlan) {
    await updateMutation.mutateAsync({
      id: plan._id,
      payload: { visible: !plan.visible }
    });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget._id);
    setDeleteTarget(null);
  }

  if (isLoading) return <LoadingState label="Chargement des services et devis..." />;

  return (
    <div className="admin-quotes-page">
      <div className="admin-quotes-page__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="admin-quotes-page__title">Services & Devis (Formules & Tarifs)</h1>
        <button type="button" className="admin-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={openCreate}>
          <Plus size={16} /> Ajouter un service / devis
        </button>
      </div>

      <p style={{ margin: '0 0 24px', fontSize: '14px', color: 'var(--admin-muted)' }}>
        Gérez les offres et devis affichés sur la page Services publique et la page d'accueil. Ajoutez, modifiez ou masquez (hide) des offres en un clic.
      </p>

      <div className="admin-quotes-table-wrap">
        <div className="admin-quotes-table__head" style={{ gridTemplateColumns: '1.4fr 1.6fr 1fr 0.8fr 0.8fr 110px' }}>
          <span>Service / Devis</span>
          <span>Description</span>
          <span>Prix</span>
          <span>Catégorie</span>
          <span>Visible</span>
          <span>Actions</span>
        </div>

        {plans.map((plan) => (
          <div key={plan._id} className="admin-quotes-table__row" style={{ gridTemplateColumns: '1.4fr 1.6fr 1fr 0.8fr 0.8fr 110px' }}>
            <div>
              <strong style={{ color: 'var(--admin-text)' }}>{plan.name}</strong>
              {plan.highlighted && (
                <span className="admin-pill" style={{ marginLeft: '8px', background: 'rgba(8, 124, 240, 0.15)', color: '#087cf0' }}>
                  {plan.badgeLabel || 'Recommandé'}
                </span>
              )}
            </div>
            <span style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {plan.description}
            </span>
            <span style={{ fontWeight: 500, color: 'var(--admin-text)' }}>
              {plan.price} <small style={{ fontWeight: 300, color: 'var(--admin-muted)' }}>{plan.priceNote}</small>
            </span>
            <span style={{ textTransform: 'capitalize' }}>{plan.category}</span>
            <button
              type="button"
              className={`admin-switch${plan.visible ? ' admin-switch--on' : ''}`}
              onClick={() => void toggleVisible(plan)}
              aria-label="Toggle visible"
              title={plan.visible ? 'Visible (Cliquer pour masquer)' : 'Masqué (Cliquer pour afficher)'}
            >
              <span className="admin-switch__knob" />
            </button>
            <div className="admin-quotes-table__actions">
              <button type="button" className="admin-action-btn" onClick={() => openEdit(plan)} title="Modifier ce devis">
                <Pencil size={15} />
              </button>
              <button type="button" className="admin-action-btn admin-action-btn--danger" onClick={() => setDeleteTarget(plan)} title="Supprimer ce devis">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <p className="admin-quotes-empty">Aucun service ou formule tarifaire configuré.</p>
        )}
      </div>

      {/* Edit / Create Drawer Modal */}
      {editingPlan ? (
        <div className="admin-modal-overlay" onClick={() => setEditingPlan(null)}>
          <div className="admin-modal" style={{ maxWidth: '640px', width: '100%', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 20px', fontFamily: 'Lora, serif', fontSize: '22px' }}>
              {editingPlan._id ? 'Modifier le service / devis' : 'Créer un nouveau service / devis'}
            </h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Nom du service / devis *</label>
                  <input
                    type="text"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.name || ''}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Catégorie</label>
                  <select
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.category || 'vitrine'}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, category: e.target.value as PricingPlan['category'] }))}
                  >
                    <option value="vitrine">Site Vitrine & Expérience Digitale</option>
                    <option value="blockchain">Blockchain & Web3</option>
                    <option value="custom">Application Sur Mesure & SaaS</option>
                    <option value="other">Autre / Solution spécifique</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Description</label>
                <textarea
                  rows={2}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                  value={editingPlan.description || ''}
                  onChange={(e) => setEditingPlan((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Prix affiché (ex: 990€, 3 500€, Sur devis)</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.price || ''}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, price: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Note de prix (ex: / projet, selon le projet)</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.priceNote || ''}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, priceNote: e.target.value }))}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Badge (ex: Populaire, Recommandé)</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.badgeLabel || ''}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, badgeLabel: e.target.value }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                  <input
                    type="checkbox"
                    id="highlighted-check"
                    checked={Boolean(editingPlan.highlighted)}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, highlighted: e.target.checked }))}
                  />
                  <label htmlFor="highlighted-check" style={{ fontSize: '14px' }}>Mettre en avant ce devis / service</label>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Texte du bouton CTA</label>
                  <input
                    type="text"
                    placeholder="ex: OBTENIR UN DEVIS, DÉMARRER MON PROJET"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.ctaLabel || ''}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, ctaLabel: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Lien de redirection CTA</label>
                  <input
                    type="text"
                    placeholder="ex: /work-with-us ou /contact"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.ctaHref || ''}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, ctaHref: e.target.value }))}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Ordre d'affichage (position)</label>
                  <input
                    type="number"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                    value={editingPlan.order ?? 1}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, order: Number(e.target.value) || 0 }))}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px' }}>
                  <button
                    type="button"
                    className={`admin-switch${editingPlan.visible !== false ? ' admin-switch--on' : ''}`}
                    onClick={() => setEditingPlan((prev) => ({ ...prev, visible: !prev?.visible }))}
                    aria-label="Toggle visible"
                  >
                    <span className="admin-switch__knob" />
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    {editingPlan.visible !== false ? 'Visible sur le site (Public)' : 'Masqué (Hidden)'}
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '8px' }}>Fonctionnalités incluses (Lignes de description)</label>
                {(editingPlan.features || []).map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={feature.included}
                      onChange={(e) => {
                        const updated = [...(editingPlan.features || [])];
                        updated[idx].included = e.target.checked;
                        setEditingPlan((prev) => ({ ...prev, features: updated }));
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Libellé de la prestation / fonctionnalité"
                      style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                      value={feature.label}
                      onChange={(e) => {
                        const updated = [...(editingPlan.features || [])];
                        updated[idx].label = e.target.value;
                        setEditingPlan((prev) => ({ ...prev, features: updated }));
                      }}
                    />
                    <button
                      type="button"
                      className="admin-action-btn admin-action-btn--danger"
                      onClick={() => {
                        const updated = (editingPlan.features || []).filter((_, i) => i !== idx);
                        setEditingPlan((prev) => ({ ...prev, features: updated }));
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#087cf0', fontSize: '13px', cursor: 'pointer', padding: 0, fontWeight: 500 }}
                  onClick={() => {
                    setEditingPlan((prev) => ({
                      ...prev,
                      features: [...(prev?.features || []), { label: '', included: true }]
                    }));
                  }}
                >
                  + Ajouter une ligne de prestation
                </button>
              </div>

              <div className="admin-modal__actions" style={{ marginTop: '16px' }}>
                <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setEditingPlan(null)}>
                  Annuler
                </button>
                <button type="submit" className="admin-btn" disabled={createMutation.isPending || updateMutation.isPending}>
                  Enregistrer et publier
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {deleteTarget ? (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal">
            <p className="admin-modal__text">Êtes-vous sûr de vouloir supprimer la formule "{deleteTarget.name}" ?</p>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setDeleteTarget(null)}>
                Annuler
              </button>
              <button type="button" className="admin-btn--delete" disabled={deleteMutation.isPending} onClick={() => void confirmDelete()}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
