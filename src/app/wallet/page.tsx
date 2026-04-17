"use client"
import { getPersonalInfo } from '@/api/user'
import BalanceSheet from '@/components/wallet/BalanceSheet'
import TransactionsBtn from '@/components/wallet/TransactionsBtn'
import WalletHeader from '@/components/wallet/WalletHeader'
import { useAuth } from '@/global-states/zustand/auth'
import React from 'react'

const page = () => {
  const isAuthenticated = useAuth(state => state.isAuthenticated);
  const user = useAuth(state => state.user);
    if(!isAuthenticated){
      return (
        <div>Not Authorized</div>
      )
    };

    const updatedBalance = `${(Math.round(user.balance * 100) / 100)}`.split(".")
  return (
    <div style={{padding: 10}}>
      <WalletHeader />
      <BalanceSheet balance={{rupee: updatedBalance[0], paisa: updatedBalance[1]?updatedBalance[1]:"00"}} template='balance' />
      <TransactionsBtn />
    </div>
  )
}

export default page
