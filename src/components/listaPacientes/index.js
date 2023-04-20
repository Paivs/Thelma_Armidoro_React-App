import React,{Component} from "react"
import {View,Text,Image, StyleSheet} from "react-native"

export default class Pacientes extends Component{
    render(){
        return (
            <View style={styles.caixa}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.valor}>{this.props.data.nome}</Text>
      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.valor}>{this.props.data.email}</Text>
      <Text style={styles.label}>CPF:</Text>
      <Text style={styles.valor}>{this.props.data.cpf}</Text>
    </View>
        )
    }
}
const styles = StyleSheet.create({
    caixa: {
        backgroundColor: '#D6B8E7',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 10,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    valor: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
    },
  });