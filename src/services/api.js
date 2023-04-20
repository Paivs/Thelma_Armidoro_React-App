import axios from "axios"
import { storeUserData, getUserData } from "./saveData";
import {Alert} from "react-native"


const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndXN0YXZvLnBhaXZhLmdwMUBnbWFpbC5jb20iLCJpc3MiOiJBUEkgVm9sbC5tZWQiLCJleHAiOjE2ODE5NDUzMDV9.qYaoEE2tcNSOdtfPnhCF0_XaC2HFEp9jVqk8HSfElRM"

const api = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        'Authorization': `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*"
    }
})

export async function login(username, password) {
    return await api.post("/login",
        {
            "login": username,
            "senha": password
        })
        .then((res) => {
            if (res.status == 200) {
                storeUserData(username, password, res.data.token);
                console.log("Acesso autorizado")
                console.log(res.data.token)
                Alert.alert(
                    'Sucesso',
                    'Login autorizado!',
                    [
                      {
                        text: 'OK',
                        onPress: () => console.log('Botão OK pressionado'),
                      },
                    ],
                    { cancelable: false }
                  );
              
                return res.data.token
            } else {
                console.log("erro: " + res.status + "\n" + res.data)

                Alert.alert(
                    'Alerta',
                    'Login não autorizado!',
                    [
                      {
                        text: 'OK',
                        onPress: () => console.log('Botão OK pressionado'),
                      },
                    ],
                    { cancelable: false }
                  );

                return null
            }
        })
        .catch((error) => {
            console.log("erro: " + error.response.status + "\n" + error.response.data)

            Alert.alert(
                'Alerta',
                'Login não autorizado!',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('Botão OK pressionado'),
                  },
                ],
                { cancelable: false }
              );
            return null
        })
}

async function getToken() {
    return await axios.post("http://localhost:8080/login",
        {
            "login": "gustavo.paiva.gp1@gmail.com",
            "senha": "Guga04060810#"
        })
        .then((res) => {
            if (res.status == 200) {
                return res.data.token
            } else {
                return "erro: " + res.status + "\n" + res.data
            }
        })
        .catch((error) => {
            return "erro: " + error.response.status + "\n" + error.response.data
        })
}

export default api;