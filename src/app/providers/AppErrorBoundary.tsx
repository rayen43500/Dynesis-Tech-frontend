import React from 'react';

type State = { error: Error | null };

export class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Keep minimal; console is enough for V1 debugging.
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ fontSize: 18, fontWeight: 400, marginBottom: 8 }}>App crashed</div>
        <div style={{ opacity: 0.8, marginBottom: 12 }}>
          Open DevTools Console for full stack trace.
        </div>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f7f9', padding: 12, borderRadius: 12 }}>
          {String(this.state.error?.message || this.state.error)}
        </pre>
      </div>
    );
  }
}

