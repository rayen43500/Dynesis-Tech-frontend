import React from 'react';
import { ShieldCheck, CheckCircle2, Hash, Clock, Lock } from 'lucide-react';

export type BlockchainEntry = {
  _id?: string;
  stageTitle: string;
  stageIndex: number;
  completedAt: string;
  hash: string;
  previousHash: string;
  adminNote?: string;
};

function formatDate(isoStr: string) {
  if (!isoStr) return '';
  return new Date(isoStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function truncateHash(hash: string) {
  if (!hash) return '';
  if (hash.length <= 16) return hash;
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

export function BlockchainTimeline({ entries = [] }: { entries: BlockchainEntry[] }) {
  if (!entries || entries.length === 0) {
    return (
      <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--admin-surface-muted, #f8fafc)', border: '1px dashed var(--admin-border, #e2e8f0)', marginTop: '16px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--admin-muted, #64748b)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lock size={15} /> Le journal d'avancement blockchain sera généré dès la validation de la première étape par l'administrateur.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', borderRadius: '12px', border: '1px solid #10b98133', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="#10b981" />
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--admin-text, #0f172a)' }}>
            Registre Blockchain d'Avancement (Immuable)
          </h3>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 8px', borderRadius: '9999px', background: '#10b98120', color: '#059669' }}>
          {entries.length} bloc{entries.length > 1 ? 's' : ''} vérifié{entries.length > 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {entries.map((entry, idx) => (
          <div
            key={entry._id || idx}
            style={{
              padding: '14px 16px',
              borderRadius: '8px',
              background: 'var(--admin-white, #ffffff)',
              border: '1px solid var(--admin-row-border, #e2e8f0)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <strong style={{ fontSize: '14px', color: 'var(--admin-text, #0f172a)' }}>{entry.stageTitle}</strong>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--admin-muted, #64748b)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {formatDate(entry.completedAt)}
              </span>
            </div>

            {entry.adminNote && (
              <p style={{ margin: '4px 0 8px 24px', fontSize: '13px', color: 'var(--admin-text-secondary, #334155)', fontStyle: 'italic' }}>
                "{entry.adminNote}"
              </p>
            )}

            <div style={{ margin: '8px 0 0 24px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '11px', fontFamily: 'monospace', color: 'var(--admin-muted, #64748b)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Hash size={12} color="#10b981" />
                <strong>Hash SHA-256:</strong> <code style={{ color: '#059669' }}>{truncateHash(entry.hash)}</code>
              </span>
              <span>
                <strong>Hash Précédent:</strong> {truncateHash(entry.previousHash)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
