import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

//const App = () => {
  //useEffect(() => {
    //Configurando o pacote GoogleSignin
    //GoogleSignin.configure({
      //scopes: ['email'], // Escopos de acesso
      //webClientId: 'SEU_WEB_CLIENT_ID', // ID do cliente web obtido do Console do Google
    //});
//  }, []);

  // Função para efetuar o login com o Google
  
export async function signInGoogle(){
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // Aqui você pode tratar a resposta do login com o Google e fazer as ações necessárias
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Login não efetuado!", "Login com o Google Cancelado")
        console.log('Login com o Google cancelado');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Login não efetuado", "Login com o Google em andamento")
        console.log('Login com o Google em andamento');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Login não efetuado!", "Os serviços do Google Play não estão disponíveis")
        console.log('Os serviços do Google Play não estão disponíveis');
      } else {
        Alert.alert("Erro!", "Erro:" + error)
        console.log('Erro ao efetuar login com o Google', error);
      }
    }
  };

export async function botaoGoogle (){
    <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
    disabled={this.state.isSigninInProgress}
    />
 }