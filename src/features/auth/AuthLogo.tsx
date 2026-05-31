import React from 'react';
import { Link } from 'react-router-dom';

export function AuthLogo() {
  return (
    <Link to="/" className="auth-logo-only" aria-label="Dynesis Tech home">
      <span className="auth-logo-only__mark">D</span>
      <span className="auth-logo-only__text">Dynesis Tech</span>
    </Link>
  );
}
