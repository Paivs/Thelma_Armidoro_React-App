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
  title: {
    margin: 25,
    marginBottom: 0,
    color: "#282A3A",
    fontWeight: "bold",
    fontSize: 24,
  },
  menus: {
    margin: 0,
    marginLeft: 15,
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