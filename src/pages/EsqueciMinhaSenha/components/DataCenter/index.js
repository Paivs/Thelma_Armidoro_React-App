import React, { createContext, useState } from 'react';

const DataStateContextEsqueciMinhaSenha = createContext();

const DataStateProviderEsqueciMinhaSenha = ({ children }) => {

  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <DataStateContextEsqueciMinhaSenha.Provider
      value={{
        pin,
        setPin,
        email,
        setEmail,
        senha,
        setSenha,
      }}
    >
      {children}
    </DataStateContextEsqueciMinhaSenha.Provider>
  );
};

export { DataStateContextEsqueciMinhaSenha, DataStateProviderEsqueciMinhaSenha };
