import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
const Home = () => {
    const loggedIn = {firstName: 'Pallavi', lastname:'kumari', email:'pk.23cs8067@nitdgp.ac.in'}
  return (
    <>
   <section className="home">
<div className="home-content">
    <header className="home-header">
      <HeaderBox 
      type = "greeting"
      title = "Welcome"
      user = {loggedIn?.firstName || 'Guest'}
      subtext = "Access and manage your account transaction"

      />
      <TotalBalanceBox 
      accounts = {[]}
      totalBanks = {1}
      totalCurrentBalance = {1250}
      />
    </header>
    RECENT TRANSACTION
</div>
<RightSidebar 
  user = {loggedIn}
  transactions = {[]}
  banks = {[{currentBalance:3456}, {currentBalance:3456}]}
  />
   </section>
    </>
  )
}

export default Home
