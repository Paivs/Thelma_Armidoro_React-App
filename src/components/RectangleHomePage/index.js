import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, TextInput, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LoadingModal from '../../components/Carregando/index.js';

// import { displayNotification } from "../../services/NotificationService.js"
import { login } from "../../services/api"


export const RectangleHomePage = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const heightRectangle = windowHeight * 0.65;

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaOculta, setSenhaOculta] = useState(true);
  const [canPressButton, setCanPressButton] = useState(true); // Novo estado
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer; // Armazenar o timer do setTimeout

    if (!canPressButton) {
      // Se o botão não puder ser pressionado, definir um timer para reativá-lo após 2 segundos
      timer = setTimeout(() => {
        setCanPressButton(true);
      }, 2000);
    }

    return () => {
      // Limpar o timer ao desmontar o componente
      clearTimeout(timer);
    };
  }, [canPressButton]);

  // useEffect(() => {
  //   navigation.navigate('Dados Pessoais');
  // }, []);


  const focusListener = navigation.addListener('focus', () => {
    setEmail("");
    setSenha("");
  });


  const toggleSenhaOculta = () => {
    setSenhaOculta(!senhaOculta);
  };

  const handleSubmit = async () => {
    if (canPressButton) {
      console.log("entrar do login");
      setCanPressButton(false); // Desativar o botão
      
      setIsLoading(true)
      const foi = await login(email.trim(), senha, navigation);
      setIsLoading(false)
      
      if (foi) {
        navigation.navigate('Home', { reset: true });
      }
    }
  };


  const handleCadastrar = () => {
    navigation.navigate('Cadastro');
    // navigation.navigate('Dados Pessoais');
  };

  const handleEsqueciMinhaSenha = () => {
    navigation.navigate('EsqueciMinhaSenha');
  };

  return (
    <View style={[styles.rectangle, {height: heightRectangle}]}>
          <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LoadingModal isVisible={isLoading} />
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        
        <View style={styles.inputSenhaContainer}>
        <Text style={styles.label}>Senha:</Text>
        <View style={styles.inputSenha}>
          <TextInput
            style={styles.inputSenhaTexto}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry={senhaOculta}
          />
          <TouchableOpacity
            style={styles.btnOcultarSenha}
            onPress={toggleSenhaOculta}
          >
            <Text style={styles.btnOcultarSenhaTexto}>
              {senhaOculta ? 'Mostrar' : 'Ocultar'}
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>

        <TouchableOpacity style={styles.btnEntrar} onPress={handleSubmit}>
          <Text style={styles.btnEntrarTexto}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleCadastrar}>
            <Text style={styles.link}>Cadastrar-se</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEsqueciMinhaSenha}>
            <Text style={styles.link}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'absolute',
    bottom: -35,
    backgroundColor: '#8868A5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 30,
    paddingTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  inputSenha: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  btnOcultarSenha: {
    width: 50,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 12,
  },
  btnEntrar: {
    backgroundColor: '#6e5baa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEntrarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnEntrarGoogle: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEntrarGoogleTexto: {
    color: '#6e5baa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linksContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputSenhaContainer: {
    marginBottom: 20,
  },
  inputSenha: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  inputSenhaTexto: {
    flex: 1,
  },
  btnOcultarSenha: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOcultarSenhaTexto: {
    color: '#9b7bb2',
    fontSize: 16,
  },
});