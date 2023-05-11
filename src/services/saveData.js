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
