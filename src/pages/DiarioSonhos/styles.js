import * as React from 'react';
import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    marginTop: 15,
    marginBottom: 15,
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