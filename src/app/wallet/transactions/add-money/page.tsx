"use client"
import AddMoneyHeader from '@/components/wallet/add-money/AddMoneyHeader'
import BalanceSheet from '@/components/wallet/BalanceSheet'
import Numpad from '@/components/wallet/Numpad'
import { useAuth } from '@/global-states/zustand/auth'
import React from 'react'


const page = () => {
  const user = useAuth(state => state.user);
  const isAuthenticated = useAuth(state => state.isAuthenticated);
  
    if(!user){
      return (
        <div>Not Authorized</div>
      )
    }
  
    const updatedBalance = `${(Math.round(user.balance * 100) / 100)}`.split(".")
    
  return (
    <div style={{padding: 10}}>
      <AddMoneyHeader template='Add money' />
      <BalanceSheet balance={{rupee: updatedBalance[0], paisa: updatedBalance[1]?updatedBalance[1]:"00"}} template='balance' />
      <Numpad authorization={isAuthenticated} buttonTemplate='Add Money' />
    </div>
  )
}

export default page
