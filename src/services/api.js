import axios from "axios"
import { storeUserData, getUserData, getCredentials } from "./saveData";
import { Alert } from "react-native"

const urlBase = "http://10.84.9.140:8080/"

export async function login(username, password) {
    return await axios.post(urlBase + "login",
        {
            "login": username,
            "senha": password
        })
        .then((res) => {
            if (res.status == 200) {
                storeUserData(username, password, res.data.token);
                console.log("Acesso autorizado")
                console.log("Usuário: " + username + "\nToken: " + res.data.token)
                Alert.alert(
                    'Sucesso','Login autorizado!',
                    [{text: 'OK',onPress: () => console.log('Botão OK pressionado')},],
                    { cancelable: false }
                );

                return res.data.token
            } else {
                console.log("erro: " + res.status + "\n" + res.data)

                Alert.alert(
                    'Alerta', 'Login não autorizado!',
                    [{text: 'OK',onPress: () => console.log('Botão OK pressionado')},],
                    { cancelable: false }
                );

                return null
            }
        })
        .catch((error) => {
            console.log("erro: " + error.response.status + "\n" + error.response.data)

            Alert.alert(
                'Alerta', 'Login não autorizado!',
                [{text: 'OK', onPress: () => console.log('Botão OK pressionado')}],
                { cancelable: false }
            );
            return null
        })
}

export async function cadastrarUsuario(username, password) {
    return await axios.post(urlBase + "cadastrar",
        {
            "login": username,
            "senha": password
        })
        .then((res) => {
            if (res.status == 200) {
                console.log("Requisição de cadastro realizada: " + res.status)
                console.log(res.data)

                return true
            } else {
                console.log("erro: " + res.status + "\n" + res.data)

                Alert.alert(
                    'Alerta', 'Requisição de cadastro inválida!',
                    [{text: 'OK',onPress: () => console.log('Botão OK pressionado')},],
                    { cancelable: false }
                );

                return false
            }
        })
        .catch((error) => {
            console.log("erro: " + error.response.status + " - " + error.response.data)

            Alert.alert(
                'Alerta', 'Requisição de cadastro inválida!',
                [{text: 'OK',onPress: () => console.log('Botão OK pressionado')},],
                { cancelable: false }
            );
            return null
        })
}

export async function cadastrarUsuarioPin(login, senha, pin) {
    return await axios.post(urlBase + "cadastrar",
    {
        "pin": {
          "login": login,
          "pin": pin
        },
        "usuario": {
          "login": login,
          "senha": senha
        }
      })
        .then((res) => {
            if (res.status == 200) {
                console.log("Cadastro realizado: " + res.status)
                console.log(res.data)

                Alert.alert(
                    'Sucesso',`Cadastro realizado!\nVocê pode realizar seu login agora`,
                    [{text: 'OK',onPress: () => console.log('Botão OK pressionado')},],
                    { cancelable: false }
                );

                return true
            } else {
                console.log("erro: " + res.status + "\n" + res.data)

                Alert.alert(
                    'Alerta', 'Requisição de cadastro inválida!',
                    [{text: 'OK',onPress: () => console.log('Botão OK pressionado')},],
                    { cancelable: false }
                );

                return false
            }
        })
        .catch((error) => {
            console.log("erro: " + error.response.status + " - " + error.response.data)

            Alert.alert(
                'Alerta', 'Requisição de cadastro inválida!',
                [{text: 'OK',onPress: () => console.log('Botão OK pressionado')},],
                { cancelable: false }
            );
            return null
        })
}

//PACIENTES - PACIENTES - PACIENTES - PACIENTES - PACIENTES - PACIENTES - PACIENTES

//lista as propriedades dos pacientes, de acordo com o definido
export async function listaPacientes(token) {

    const url = urlBase + "pacientes"
    console.log("Realizando uma requisição get em: " + url)
    console.log("Token: " + token)

    const instance = axios.create({
        baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    const pacientes = await instance.get("/pacientes")
        .then((res) => {
            if (res.status == 200) {
                return res.data.content
            } else {
                console.log(`Erro: ${res.status}\nDescrição: ${res.data}`)
                throw new Error(`Erro: ${res.status}\nDescrição: ${res.data}`)
            }
        })
        .catch((error) => {
            console.log("Erro: " + error.status)
            console.log("Descrição: " + error.response.data)
        })
}

//cadastrar paciente
//OBS: acrescentar tratativa de erro, retornar o que está errado
export async function cadastrarPaciente(token, paciente) {

    const url = urlBase + "pacientes"
    console.log("Realizando uma requisição post em: " + url)
    console.log("Token: " + token)

    const instance = axios.create({
       baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    const pacientes = await instance.post("/pacientes", paciente)
        .then((res) => {
            if (res.status == 200) {
                console.log("Requisição concluída com sucesso")
                console.log(res.data)
                return res.data
            } else if (res.status == 400) {
                console.log(`Erro: ${res.status}\nDescrição: ${res.data}`)

                Alert.alert(
                    'Erro ao cadastrar novo usuário',
                    res.array.forEach(element => {
                        return `${element.campo}: ${element.mensagem}`
                    }),
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Botão OK pressionado'),
                        },
                    ],
                    { cancelable: false }
                );

            }
            else {
                console.log(`Erro: ${res.status}\nDescrição: ${res.data}`)
                throw new Error(`Erro: ${res.status}\nDescrição: ${res.data}`)
            }
        })
        .catch((error) => {
            console.log("Erro: " + error.status)
            console.log("Descrição: " + error.response.data)
        })
}

//alterar paciente
export async function alterarPaciente(token, paciente) {

    const url = urlBase + "pacientes"
    console.log("Realizando uma requisição PUT em: " + url)
    console.log("Token: " + token)

    const instance = axios.create({
       baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    const pacientes = await instance.put("/pacientes", paciente)
        .then((res) => {
            if (res.status == 200) {
                console.log("Requisição concluída com sucesso")
                console.log(res.data)
                return res.data
            }
            else {
                console.log(`Erro: ${res.status}\nDescrição: ${res.data}`)
                throw new Error(`Erro: ${res.status}\nDescrição: ${res.data}`)
            }
        })
        .catch((error) => {
            console.log("Erro: " + error.status)
            console.log("Descrição: " + error.response.data)
        })
}

//deleta paciente (inativa)
export async function deletarPaciente(token, id) {

    const url = urlBase + "pacientes"
    console.log("Realizando uma requisição DELETE em: " + url)
    console.log("Token: " + token)

    const instance = axios.create({
       baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    const pacientes = await instance.delete(`/pacientes/${id}`)
        .then((res) => {
            if (res.status == 204) {
                console.log("Requisição concluída com sucesso")
                return true
            }
            else {
                console.log(`Erro: ${res.status}\nDescrição: ${res.data}`)
                throw new Error(`Erro: ${res.status}\nDescrição: ${res.data}`)
            }
        })
        .catch((error) => {
            console.log("Erro: " + error.status)
            console.log("Descrição: " + error.response.data)
        })
}
