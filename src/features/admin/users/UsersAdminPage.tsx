import React, { useState } from 'react';
import { Search, Trash2, UserPlus, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LoadingState } from '../../../shared/ui/feedback/LoadingState';
import { useAdminUsers, useUpdateUser, useDeleteUser, useInviteUser, type AdminUserListItem, type UserRole } from './usersHooks';
import { resolveMediaUrl } from '../../../shared/utils/resolveMediaUrl';

export function UsersAdminPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  
  // Invite state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('developer');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState('');

  // Edit state
  const [editingUser, setEditingUser] = useState<AdminUserListItem | null>(null);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('developer');
  const [editIsActivated, setEditIsActivated] = useState(true);

  // Queries & Mutations
  const params = {
    role: selectedRole === 'all' ? undefined : selectedRole,
    search: search.trim() || undefined
  };
  const { data: users = [], isLoading, refetch } = useAdminUsers(params);
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const inviteUserMutation = useInviteUser();

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSuccess(false);
    if (!inviteEmail) return;

    try {
      await inviteUserMutation.mutateAsync({ email: inviteEmail, role: inviteRole });
      setInviteEmail('');
      setInviteSuccess(true);
      setShowInviteForm(false);
      refetch();
    } catch (err: any) {
      setInviteError(err?.response?.data?.message || 'Une erreur est survenue lors de l\'invitation.');
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await updateUserMutation.mutateAsync({
        id: editingUser._id,
        payload: {
          displayName: editDisplayName,
          role: editRole,
          isActivated: editIsActivated
        }
      });
      setEditingUser(null);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    try {
      await deleteUserMutation.mutateAsync(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingState label="Chargement des utilisateurs..." />;

  return (
    <div className="admin-overview" style={{ gap: '24px' }}>
      
      {/* Header Stats */}
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__value">{users.length}</div>
          <div className="admin-stat__label">Utilisateurs totaux</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{users.filter(u => u.role === 'developer').length}</div>
          <div className="admin-stat__label">Développeurs</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{users.filter(u => u.role === 'client').length}</div>
          <div className="admin-stat__label">Clients</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__value">{users.filter(u => u.isActivated).length}</div>
          <div className="admin-stat__label">Actifs / Activés</div>
        </div>
      </div>

      {/* Top Actions */}
      <div className="admin-actions" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="admin-search-field">
            <Search className="admin-search-field__icon" size={16} strokeWidth={2} aria-hidden />
            <input
              className="admin-search"
              placeholder="Rechercher par nom, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="admin-search"
            style={{ width: '180px' }}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Administrateur</option>
            <option value="client">Client</option>
            <option value="developer">Développeur</option>
            <option value="project_manager">Chef de projet</option>
          </select>
        </div>

        <button 
          className="admin-btn" 
          onClick={() => {
            setShowInviteForm(!showInviteForm);
            setInviteSuccess(false);
            setInviteError('');
          }}
        >
          <UserPlus size={16} />
          Inviter un utilisateur
        </button>
      </div>

      {/* Invitation Form Panel */}
      {showInviteForm && (
        <div className="admin-card-block" style={{ border: '1px solid var(--admin-border)', padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontFamily: 'Lora, Georgia, serif' }}>
            Envoyer une invitation par email
          </h3>
          <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="admin-grid-2">
              <label className="admin-field">
                <span className="admin-field__label">Adresse email</span>
                <input
                  type="email"
                  required
                  placeholder="exemple@entreprise.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Rôle attribué</span>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as UserRole)}
                >
                  <option value="developer">Développeur</option>
                  <option value="project_manager">Chef de projet</option>
                  <option value="client">Client</option>
                  <option value="admin">Administrateur</option>
                </select>
              </label>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="admin-btn" disabled={inviteUserMutation.isPending}>
                {inviteUserMutation.isPending ? 'Envoi...' : 'Envoyer l\'invitation'}
              </button>
              <button 
                type="button" 
                className="admin-btn admin-btn--ghost" 
                onClick={() => setShowInviteForm(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {inviteSuccess && (
        <div className="admin-message" style={{ color: 'var(--admin-green)', fontWeight: 500 }}>
          ✓ Invitation envoyée avec succès par email.
        </div>
      )}

      {inviteError && (
        <div className="admin-message" style={{ color: '#e05555', fontWeight: 500 }}>
          ⚠️ {inviteError}
        </div>
      )}

      {/* Users Table */}
      <div className="admin-table">
        <div className="admin-table__head" style={{ gridTemplateColumns: '2.5fr 1.5fr 1fr 1fr 120px' }}>
          <span>Utilisateur</span>
          <span>Rôle</span>
          <span>Statut</span>
          <span>Date d'inscription</span>
          <span>Actions</span>
        </div>
        {users.map((u) => {
          const userPhotoUrl = u.profilePicture ? resolveMediaUrl(u.profilePicture) : '';
          const initials = u.displayName ? u.displayName.slice(0, 2).toUpperCase() : u.email.slice(0, 2).toUpperCase();
          
          return (
            <div key={u._id} className="admin-table__row" style={{ gridTemplateColumns: '2.5fr 1.5fr 1fr 1fr 120px' }}>
              
              {/* User Identity */}
              <div className="admin-dev-cell">
                {userPhotoUrl ? (
                  <img className="admin-dev-cell__photo" src={userPhotoUrl} alt="" />
                ) : (
                  <div className="admin-dev-cell__photo" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: 'var(--admin-badge-neutral-bg)', 
                    color: 'var(--admin-text-secondary)',
                    fontWeight: 500,
                    fontSize: '13px'
                  }}>
                    {initials}
                  </div>
                )}
                <div>
                  <span className="admin-dev-cell__name" style={{ fontWeight: 500 }}>
                    {u.displayName || 'Sans nom'}
                  </span>
                  <span className="admin-table__role" style={{ fontSize: '12px' }}>
                    {u.email}
                  </span>
                </div>
              </div>

              {/* Role */}
              <span className="admin-table__role" style={{ textTransform: 'capitalize' }}>
                {u.role === 'project_manager' ? 'Chef de projet' : u.role}
              </span>

              {/* Status */}
              <div className="admin-availability">
                {u.isActivated ? (
                  <>
                    <CheckCircle size={14} style={{ color: 'var(--admin-green)' }} />
                    <span style={{ color: 'var(--admin-green)', fontWeight: 500 }}>Actif</span>
                  </>
                ) : (
                  <>
                    <XCircle size={14} style={{ color: 'var(--admin-muted)' }} />
                    <span style={{ color: 'var(--admin-muted)' }}>En attente</span>
                  </>
                )}
              </div>

              {/* Date */}
              <span className="admin-table__role">
                {new Date(u.createdAt).toLocaleDateString()}
              </span>

              {/* Actions */}
              <div className="admin-row-actions">
                <button
                  type="button"
                  className="admin-action-btn"
                  onClick={() => {
                    setEditingUser(u);
                    setEditDisplayName(u.displayName);
                    setEditRole(u.role);
                    setEditIsActivated(u.isActivated);
                  }}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="admin-action-btn admin-action-btn--danger"
                  onClick={() => handleDeleteUser(u._id)}
                >
                  <Trash2 size={13} />
                </button>
              </div>

            </div>
          );
        })}
        {users.length === 0 && (
          <div className="admin-empty">
            Aucun utilisateur trouvé.
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '500px' }}>
            <h3 style={{ margin: '0 0 20px', fontFamily: 'Lora, Georgia, serif', fontSize: '18px' }}>
              Modifier l'utilisateur
            </h3>
            <form onSubmit={handleUpdateUser}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label className="admin-field">
                  <span className="admin-field__label">Nom d'affichage</span>
                  <input
                    type="text"
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                  />
                </label>

                <label className="admin-field">
                  <span className="admin-field__label">Rôle de l'utilisateur</span>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                  >
                    <option value="developer">Développeur</option>
                    <option value="project_manager">Chef de projet</option>
                    <option value="client">Client</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </label>

                <div className="admin-toggle-row">
                  <button
                    type="button"
                    className={`admin-switch${editIsActivated ? ' admin-switch--on' : ''}`}
                    onClick={() => setEditIsActivated(!editIsActivated)}
                  >
                    <span className="admin-switch__knob" />
                  </button>
                  <span>Compte activé</span>
                </div>
              </div>

              <div className="admin-modal__actions" style={{ marginTop: '24px' }}>
                <button type="submit" className="admin-btn" disabled={updateUserMutation.isPending}>
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => setEditingUser(null)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
