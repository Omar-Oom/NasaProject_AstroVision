import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserMode = 'normal' | 'researcher';

interface UserModeContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  isResearcher: boolean;
  isNormal: boolean;
}

const UserModeContext = createContext<UserModeContextType | undefined>(undefined);

export const useUserMode = () => {
  const context = useContext(UserModeContext);
  if (context === undefined) {
    throw new Error('useUserMode must be used within a UserModeProvider');
  }
  return context;
};

interface UserModeProviderProps {
  children: ReactNode;
}

export const UserModeProvider: React.FC<UserModeProviderProps> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>('normal');

  const value = {
    userMode,
    setUserMode,
    isResearcher: userMode === 'researcher',
    isNormal: userMode === 'normal',
  };

  return (
    <UserModeContext.Provider value={value}>
      {children}
    </UserModeContext.Provider>
  );
};
