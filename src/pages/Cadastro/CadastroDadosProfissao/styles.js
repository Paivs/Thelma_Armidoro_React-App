import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      backgroundColor: '#674188',
    },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: 'center',
    },
    loginContainer: {
      alignSelf: 'flex-start',
      paddingLeft: '10%',
      paddingTop: '25%',
    },
    iconContainer: {
      marginBottom: 20,
    },
    loginIcon: {
      resizeMode: 'contain',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
      textAlign: 'left',
    },
    instructionsText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'left',
      width: 350
    },
  });
  