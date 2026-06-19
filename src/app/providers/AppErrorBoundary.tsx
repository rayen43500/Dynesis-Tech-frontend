import React from 'react';
import { useTranslation } from 'react-i18next';

function ErrorDisplay({ error }: { error: Error | null }) {
  const { t } = useTranslation();

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ fontSize: 18, fontWeight: 400, marginBottom: 8 }}>{t('errorBoundary.title')}</div>
      <div style={{ opacity: 0.8, marginBottom: 12 }}>{t('errorBoundary.hint')}</div>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f7f9', padding: 12, borderRadius: 12 }}>
        {String(error?.message || error)}
      </pre>
    </div>
  );
}

type State = { error: Error | null };

export class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return <ErrorDisplay error={this.state.error} />;
  }
}
