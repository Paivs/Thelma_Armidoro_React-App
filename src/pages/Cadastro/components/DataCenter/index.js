import React, { createContext, useState } from 'react';

const DataStateContext = createContext();

const DataStateProvider = ({ children }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [curso, setCurso] = useState('');
  const [profissao, setProfissao] = useState('');
  const [cargo, setCargo] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    complemento: '',
    numero: '',
  });
  const [contatoEmergencia, setContatoEmergencia] = useState({
    contato_nome: '',
    contato_vinculo: '',
    contato_telefone: '',
  });

  return (
    <DataStateContext.Provider
      value={{
        nome,
        setNome,
        email,
        setEmail,
        telefone,
        setTelefone,
        telefoneFixo,
        setTelefoneFixo,
        cpf,
        setCpf,
        nascimento,
        setNascimento,
        estadoCivil,
        setEstadoCivil,
        curso,
        setCurso,
        profissao,
        setProfissao,
        cargo,
        setCargo,
        nacionalidade,
        setNacionalidade,
        endereco,
        setEndereco,
        contatoEmergencia,
        setContatoEmergencia,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

export { DataStateContext, DataStateProvider };
