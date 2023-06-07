import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptPassword, decryptPassword } from "../services/encriptador.js"


// função para fazer login e salvar os dados da sessão no AsyncStorage
export async function storeUserData (username, password, token){
  //const encryptedPassword = encryptPassword(password);

  try {
    // salva os dados da sessão no AsyncStorage
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('loginTime', new Date().getTime().toString());
  } catch (error) {
    console.log(error);
  }
};

export async function getCredentials(){
  try {
    // recupera as credenciais salvas no AsyncStorage
    const username = await AsyncStorage.getItem('username');
    const passwordC = await AsyncStorage.getItem('password');
    const password = 123//decryptPassword(passwordC);
    const token = await AsyncStorage.getItem('token');

    // retorna um objeto com as credenciais
    return { username, password, token };
  } catch (error) {
    console.log(error);
    return null;
  }
};

// função para salvar as informações de consulta
export async function storeConsultaData (temConsulta){

  try {
    await AsyncStorage.setItem('temConsulta', temConsulta);
  } catch (error) {
    console.log(error);
  }
};

export async function getConsulta(){
  try {
    // recupera as credenciais salvas no AsyncStorage
    const temConsulta = await AsyncStorage.getItem('temConsulta');

    // retorna um objeto com as credenciais
    return temConsulta;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// função para fazer login e salvar os dados da sessão no AsyncStorage
export async function storePacienteData(pacienteData) {
  const {
    id,
    nome,
    email,
    telefone,
    telefone_fixo,
    cpf,
    nascimento,
    estado_civil,
    curso,
    profissao,
    cargo,
    nacionalidade,
    endereco,
    contatoEmergencia
  } = pacienteData;

  try {
    // Salva os dados da sessão no AsyncStorage
    await AsyncStorage.setItem('id', JSON.stringify(id));
    await AsyncStorage.setItem('nome', nome);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('telefone', telefone);
    await AsyncStorage.setItem('telefone_fixo', telefone_fixo);
    await AsyncStorage.setItem('cpf', cpf);
    await AsyncStorage.setItem('nascimento', nascimento);
    await AsyncStorage.setItem('estado_civil', estado_civil);
    await AsyncStorage.setItem('curso', curso);
    await AsyncStorage.setItem('profissao', profissao);
    await AsyncStorage.setItem('cargo', cargo);
    await AsyncStorage.setItem('nacionalidade', nacionalidade);

    // Salva os dados de endereço
    await AsyncStorage.setItem('endereco.logradouro', endereco.logradouro);
    await AsyncStorage.setItem('endereco.bairro', endereco.bairro);
    await AsyncStorage.setItem('endereco.cep', endereco.cep);
    await AsyncStorage.setItem('endereco.cidade', endereco.cidade);
    await AsyncStorage.setItem('endereco.uf', endereco.uf);
    await AsyncStorage.setItem('endereco.complemento', endereco.complemento);
    await AsyncStorage.setItem('endereco.numero', endereco.numero);

    // Salva os dados de contato de emergência
    await AsyncStorage.setItem('contatoEmergencia.contato_nome', contatoEmergencia.contato_nome);
    await AsyncStorage.setItem('contatoEmergencia.contato_vinculo', contatoEmergencia.contato_vinculo);
    await AsyncStorage.setItem('contatoEmergencia.contato_telefone', contatoEmergencia.contato_telefone);

  } catch (error) {
    console.log(error);
  }
}

export async function getPacienteData() {
    try {
      const pacienteData = {};
  
      // Recupera os valores salvos no AsyncStorage
      pacienteData.id = await AsyncStorage.getItem('id');
      pacienteData.nome = await AsyncStorage.getItem('nome');
      pacienteData.email = await AsyncStorage.getItem('email');
      pacienteData.telefone = await AsyncStorage.getItem('telefone');
      pacienteData.telefoneFixo = await AsyncStorage.getItem('telefone_fixo');
      pacienteData.cpf = await AsyncStorage.getItem('cpf');
      pacienteData.nascimento = await AsyncStorage.getItem('nascimento');
      pacienteData.estado_civil = await AsyncStorage.getItem('estado_civil');
      pacienteData.curso = await AsyncStorage.getItem('curso');
      pacienteData.profissao = await AsyncStorage.getItem('profissao');
      pacienteData.cargo = await AsyncStorage.getItem('cargo');
      pacienteData.nacionalidade = await AsyncStorage.getItem('nacionalidade');
  
      // Recupera os valores do endereço
      pacienteData.endereco = {
        logradouro: await AsyncStorage.getItem('endereco.logradouro'),
        bairro: await AsyncStorage.getItem('endereco.bairro'),
        cep: await AsyncStorage.getItem('endereco.cep'),
        cidade: await AsyncStorage.getItem('endereco.cidade'),
        uf: await AsyncStorage.getItem('endereco.uf'),
        complemento: await AsyncStorage.getItem('endereco.complemento'),
        numero: await AsyncStorage.getItem('endereco.numero'),
      };
  
      // Recupera os valores de contato de emergência
      pacienteData.contatoEmergencia = {
        contato_nome: await AsyncStorage.getItem('contatoEmergencia.contato_nome'),
        contato_vinculo: await AsyncStorage.getItem('contatoEmergencia.contato_vinculo'),
        contato_telefone: await AsyncStorage.getItem('contatoEmergencia.contato_telefone'),
      };
  
      return pacienteData;
    } catch (error) {
      console.log(error);
      return null;
    }
}
  
export async function getPacienteId() {
    try {

      const id = await AsyncStorage.getItem('id');
  
      return id;
    } catch (error) {
      console.log(error);
      return null;
    }
}


export async function clearUserData(){
    try {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('loginTime');
    } catch (error) {
        console.log(error);
    }
};


// função para verificar se o usuário está logado há mais de 24 horas
export async function isUserLoggedFor24Hours(){
    try {
      // recupera o horário de entrada salvo no AsyncStorage
      const loginTime = await AsyncStorage.getItem('loginTime');
      if (!loginTime) {
        // usuário nunca logou
        return false;
      }
  
      // calcula a diferença entre o horário atual e o horário de entrada em horas
      const currentTime = new Date().getTime();
      const loginTimeInMillis = parseInt(loginTime);
      const hoursSinceLogin = (currentTime - loginTimeInMillis) / 1000 / 60 / 60;
  
      // verifica se a diferença é maior que 24 horas
      return hoursSinceLogin >= 24;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


export async function hasExpiredLogin(){
    try {
      // recupera a data do último login salva no AsyncStorage
      const lastLogin = await AsyncStorage.getItem('lastLogin');
      if (!lastLogin) {
        // se não houver data de login anterior, retorna true para exigir um novo login
        return true;
      }
  
      // converte a data de string para objeto Date
      const lastLoginDate = new Date(lastLogin);
  
      // verifica se já se passaram mais de 24 horas desde o último login
      const now = new Date();
      const diffInHours = Math.abs(now - lastLoginDate) / 36e5;
      return diffInHours > 24;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  

  // função para atualizar a data do último login no AsyncStorage
  // export async function updateLastLogin(){
  //   try {
  //     await AsyncStorage.setItem('lastLogin', new Date().toString());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  /**************************************************************************/

// exemplo de como chamar a função de login
// loginUser('meuusuario', 'minhasenha', 'meutoken');

// exemplo de como chamar a função de validação de tempo de login
//   const userLoggedFor24Hours = await isUserLoggedFor24Hours();
//   console.log(userLoggedFor24Hours); // true ou false

// exemplo de como chamar a função para obter as credenciais
// const credentials = await getCredentials();
// console.log(credentials); // { username: 'meuusuario', password: 'minhasenha', token: 'meutoken' }
