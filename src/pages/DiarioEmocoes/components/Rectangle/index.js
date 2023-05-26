// Rectangle.js
import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TextInput, ScrollView, Keyboard } from 'react-native';
import { salvarDiario, pegarAtualDiario } from "../../../../services/api.js"
import { getCredentials, getPacienteId } from "../../../../services/saveData.js"

const windowHeight = Dimensions.get('window').height;
 
export default class Rectangle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightRectangle: windowHeight * 0.65,
      title: '',
      text: ''
    };
  }

  componentDidMount() {
    this.pegarAtual();
  }

  salvar = async () => {
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
    const [ano, mesString, dia] = data.split('-');
    const mesNumeral = this.transformarMesNumeral(mesString);
    const dataFormatada = ano + "-" + mesNumeral + "-" + dia;
  
    await this.atualizaMesmo(id, credenciais, dataFormatada);
  }

  transformarMesNumeral = (mesString) => {
    const mesesAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const mesNumeral = mesesAno.findIndex(mes => mes.toLowerCase() === mesString.toLowerCase()) + 1;
    return mesNumeral.toString().padStart(2, '0');
  };

  render() {
    return (
      <View style={[styles.rectangle, { height: this.state.heightRectangle }]}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor="white"
            value={this.state.title}
            onChangeText={text => {
              this.setState({ title: text });
            }}
            multiline
          />
        </View>
        <ScrollView>
          <View>
            <TextInput
              style={styles.inputText}
              placeholder="Digite suas emoções"
              placeholderTextColor="white"
              value={this.state.text}
              onChangeText={text => {
                this.setState({ text: text });
              }}
              multiline
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectangle: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#282A3A',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  input: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 15,
  },
  inputText: {
    fontSize: 20,
    color: "white",
    marginBottom: 15,
    paddingBottom: 80,
  }
});
