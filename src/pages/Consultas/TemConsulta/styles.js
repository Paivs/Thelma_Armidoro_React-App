import * as React from 'react';
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#674188',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 175,
  },
  header: {
    marginBottom: 0,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoDireita: {
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#282A3A",
    zIndex: 9999,
  },
  botaoDireitaText: {
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    margin: 20,
    marginBottom: 5,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    fontWeight: "bold",
    width: "75%",
  },  
  input: {
    margin: 20,
    marginBottom: 0,
    marginTop: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    fontWeight: "bold",
    width: "75%",
    borderRadius: 15,
    color: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    borderColor: "#282A3A",
    height: 50,
    backgroundColor: "#F7EFE5",
  },
  
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
  },
  map: {
    width: '90%',
    height: 200,
    textAlign: "center"
  },
  description: {
    margin: 20,
    marginBottom: 0,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    width: "75%",
  },
});