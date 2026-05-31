import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../app/providers/AuthProvider';
import { Button } from '../primitives/Button';

export function UserMenu() {
  const { user, status, logout } = useAuth();
  const navigate = useNavigate();

  const isAuthed = status === 'authenticated' && !!user;

  return (
    <div className="flex items-center gap-2">
      {isAuthed ? (
        <>
          <div className="hidden sm:block">
            <div className="text-xs text-muted leading-tight">{user?.email}</div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={async () => {
              await logout();
              navigate('/');
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
          Sign in
        </Button>
      )}
    </div>
  );
}

