"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/Config/context/UserDetailContext';

function Provider ({ children}: any) {


  const [UserDetail,setUserDetail]=useState();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    console.log("Provider mounted");
    console.log("isLoaded:", isLoaded);
    console.log("user:", user);
    
    if (isLoaded && user) {
      console.log("Calling CreateNewUser...");
      CreateNewUser();
    }
  }, [isLoaded, user])

  const CreateNewUser = async () => {
    let result;
    try {
      console.log("About to call API with:", {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
      });
      
      result = await axios.post('/api/user', {
        name: user?.fullName ?? '',
        email: user?.primaryEmailAddress?.emailAddress
      });

      console.log("✅ API Response:", result.data);
      console.table(result.data); // This will display the data in a table format
    } catch (error) {
      console.error('❌ Error creating user:', error);
    }

    setUserDetail(result?.data);
  }

  return (
    <UserDetailContext.Provider value={{UserDetail,setUserDetail}}>
    <div>
      {children}
    </div>
    </UserDetailContext.Provider>
  )
}

export default Provider