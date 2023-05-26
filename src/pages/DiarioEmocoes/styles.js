import * as React from 'react';
import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  botaoDireita: {
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#282A3A",
  },
  botaoDireitaText: {
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#282A3A",
    marginBottom: 10,
  },
  dataAtual: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#282A3A",
    marginBottom: 0,
  },
  dataAnterior: {
    fontSize: 15,
    color: "#282A3A",
    marginBottom: 0,
  },
  conData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 0,
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chamada: {
    fontSize: 26,
    color: "#282A3A",
    fontWeight: 'bold',
  },
  conChamada: {
marginTop: 55,
marginBottom: 15,
textAlign: "left",
  },
  line: {
    width: '65%',
    borderBottomWidth: 2,
  },
});