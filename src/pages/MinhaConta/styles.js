import * as React from 'react';
import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 50,
    marginTop: 90,
    padding: 20,
    borderRadius: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  
  line: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  
  text: {
    marginBottom: 10,
  },
});
