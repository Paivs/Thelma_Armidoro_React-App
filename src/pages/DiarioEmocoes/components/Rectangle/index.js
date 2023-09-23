// Rectangle.js
import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TextInput, ScrollView, Keyboard, Alert, KeyboardAvoidingView } from 'react-native';
import { salvarDiario, pegarAtualDiario } from "../../../../services/api.js"
import { getCredentials, getPacienteId } from "../../../../services/saveData.js"

const windowHeight = Dimensions.get('window').height;
 
export default class Rectangle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightRectangle: windowHeight * 0.65,
      keyboardVerticalOffset: 0,
      title: '',
      text: ''
    };
  }

  componentWillUnmount() {
    // Certifique-se de remover os ouvintes quando o componente for desmontado
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardDidShow = (event) => {
    const windowHeight = Dimensions.get('window').height;
    const keyboardHeight = event.endCoordinates.height;

    // Calcule o deslocamento vertical com base na altura do teclado
    const keyboardVerticalOffset = windowHeight - keyboardHeight;

    this.setState({ keyboardVerticalOffset });
  };

  handleKeyboardDidHide = () => {
    // Quando o teclado estiver oculto, redefina o deslocamento vertical para 0
    this.setState({ keyboardVerticalOffset: 0 });
  };

  componentDidMount() {
    this.pegarAtual();

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  salvar = async () => {

    const { title, text } = this.state;

    if (!title || !text) {
      Alert.alert(
        'Alerta', 'Para salvar sua emoção é necessário colocar título e texto',
        [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
        { cancelable: false }
    );
      return;
    }

      const credenciais = await getCredentials();
      const id = await getPacienteId();
  
      await salvarDiario(this.state.title, this.state.text, true, id, credenciais.token);

    
  }

  atualizaMesmo = async (id, credenciais, dataFormatada) => {
    let conteudo = await pegarAtualDiario(true, id, credenciais.token, dataFormatada);

    let tituloL = await conteudo.titulo;
    let textoL = await conteudo.texto;

    console.log("\n")

    console.log("idPaciente: " + id)
    console.log("titulo: " + tituloL)
    console.log("texto: " + textoL)

    console.log("\n")

    this.setState({ title: tituloL });
    this.setState({ text: textoL });
  }

  pegarAtual = async () => {
    const credenciais = await getCredentials();
    const id = await getPacienteId();
  
    const { data } = this.props;
    let [ano, mes, dia] = data.split('-');

    mes = parseInt(mes) + 1

    if (mes < 10) {
      mes = '0' + mes;
    }
    
    const dataFormatada = ano + "-" + (mes) + "-" + dia;
  
    await this.atualizaMesmo(id, credenciais, dataFormatada);
  }

  transformarMesNumeral = (mesString) => {
    const mesesAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const mesNumeral = mesesAno.findIndex(mes => mes.toLowerCase() === mesString.toLowerCase()) + 1;
    return mesNumeral.toString().padStart(2, '0');
  };

  render() {
    const { keyboardVerticalOffset } = this.state;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null} // Usamos null no Android
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
      <View style={[styles.rectangle]}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor="white"
              value={this.state.title}
              onChangeText={text => {
                this.setState({ title: text });
              }}
              numberOfLines={1}
            />
          </View>
   
          <ScrollView style={styles.descricaoContainer}>
          <TextInput
            style={styles.descricao}
            placeholder="Digite suas emoções"
            placeholderTextColor="white"
            value={this.state.text}
            onChangeText={text => {
              this.setState({ text: text });
            }}
            multiline
            scrollEnabled={true} // Habilitar o scroll na caixa de texto
          />
          </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textScrollView: {
    // flex: 1,
    // marginBottom: 15,
  },
  descricaoContainer: {
    flex: 1, // Isso fará com que a descrição preencha o espaço disponível
  },
  rectangle: {
    // position: 'absolute',
    // bottom: 0,
    backgroundColor: '#282A3A',
    width: '100%',
    height: "100%",
    paddingHorizontal: 40,
    paddingTop: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  input: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 15,
  },
  descricao: {
    fontSize: 20,
    color: "white",
    marginBottom: 15,
    paddingBottom: 15,
  }
});
