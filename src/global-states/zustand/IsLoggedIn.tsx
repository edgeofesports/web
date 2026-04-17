'use client'
import React from 'react'
import { useAuth } from './auth';

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export default function IsLoggedIn({children, fallback}: Props) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return isAuthenticated === true ? children : fallback;
}
