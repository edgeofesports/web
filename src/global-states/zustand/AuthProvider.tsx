'use client'
import React, { useEffect } from 'react'
import { useAuth } from './auth'
import { AxiosResponse } from 'axios';
import { ApiResponse } from '@/axios/api';
import Loading from '@/app/loading';

interface Props {
  children: React.ReactNode;
  res: ApiResponse<unknown>;
}

export default function AuthProvider({children, res}: Props) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    setIsAuthenticated(res.success);
    setUser(res.data);
  }, [res])
  
  
  return (
    isAuthenticated === true ? <div>{children}</div> :
    isAuthenticated === false ? <div>{children}</div> :
    <Loading />
  )
}
