import axios from "axios"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { storeUserData, storePacienteData, getPacienteId, getCredentials, getPacienteData, storeLogado } from "./saveData";
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import { format } from 'date-fns';
import { Alert } from "react-native"
import { CommonActions } from '@react-navigation/native';

// const urlBase = "http://89.116.214.128:8080/"
const urlBase = "http://10.0.2.2:8080/"

export async function login(username, password, navigation) {
    return await axios.post(urlBase + "login",
        {
            "login": username,
            "senha": password
        }, {
        timeout: 7500 // 7,5 segundos
    })
        .then((res) => {
            console.log("then()")
            if (res.status == 200) {
                storeUserData(username, password, res.data.token);
                getPacienteUserData(username, res.data.token, navigation)

                storeLogado(true)

                Alert.alert(
                    'Sucesso', 'Login autorizado!',
                    [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                    { cancelable: false }
                );

                return true
            } else {
                console.log("erro: " + res.status + "\n" + res.data)

                Alert.alert(
                    'Alerta', 'Login não autorizado!',
                    [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                    { cancelable: false }
                );

                return false
            }
        })
        .catch((error) => {
            console.log("catch()")

            Alert.alert(
                'Erro', 'Não há conexão ao servidor',
                [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') }],
                { cancelable: false }
            );
            return false
        })
}

export async function loginZen(username, password) {
    return await axios.post(urlBase + "login",
        {
            "login": username,
            "senha": password
        }, {
        timeout: 7500 // 7,5 segundos
    })
        .then((res) => {
            console.log("then()")
            if (res.status == 200) {
                storeUserData(username, password, res.data.token);
                storeLogado(true)
            } else {
                return false
            }
        })
        .catch((error) => {
            return false
        })
}

export async function renovarCredenciais() {
    const credenciais = await getCredentials();

    await loginZen(credenciais.username, credenciais.password)
}

async function getPacienteUserData(login, token, navigation) {

    const instance = axios.create({
        baseURL: urlBase + `usuario/${login}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    const foi = await instance.get()
        .then((res) => {
            console.log("then()")
            console.log(res.data)

            if (res.status == 200) {
                storePacienteData(res.data)

                return true
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log("erro: " + error.response.status + "\n" + error.response.data)

            Alert.alert(
                'Alerta', 'Nenhum paciente com esse login. Faça seu cadastro!',
                [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') }],
                { cancelable: false }
            );

            renovarCredenciais()

            // navigation.navigate('Dados Pessoais');

            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: 'Dados Pessoais' }] // Replace 'Dados Pessoais' with the name of the screen you want to navigate to
            });
            navigation.dispatch(resetAction);

            return false
        })

    return foi
}

export async function cadastrarUsuario(username, password) {
    Alert.alert(
        'Sucesso', `Requisição de cadastro realizada!\nVocê vai receber um PIN em seu email ${username}. Aguarde ao menos 30 segundos.`,
        [{
            text: 'OK', onPress: () => {
                console.log('Botão OK pressionado')
            }
        },],
        { cancelable: false }
    );
    try {
        return await axios.post(urlBase + "cadastrar",
            {
                "login": username,
                "senha": password
            })
            .then((res) => {
                console.log("then() \n" + res)

                if (res.status == 200) {
                    console.log("Requisição de cadastro realizada: " + res.status)
                    console.log(res.data)

                    return true
                } else {
                    console.log("erro: " + res.status + "\n" + res.data)

                    return true
                }
            })
            .catch((error) => {
                console.log("catch() \n" + error)
                console.log("erro: " + error.status + " - " + error.response.data)
                return true
            })
    } catch (error) {
        console.log("ERRO GRAVE")
        console.log(error)
    }
}

export async function cadastrarUsuarioPin(login, senha, pin) {
    console.log("Realizando requisição PUT")
    const envio = {
        "pin": {
            "login": login,
            "pin": pin
        },
        "usuario": {
            "login": login,
            "senha": senha
        }
    }

    console.log(envio)

    return await axios.put(urlBase + "cadastrar", envio
    )
        .then((res) => {
            if (res.status == 200) {
                console.log("Cadastro realizado: " + res.status)
                console.log(res.data)

                Alert.alert(
                    'Sucesso', `Cadastro realizado!\nVocê pode realizar seu login agora`,
                    [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                    { cancelable: false }
                );

                return true
            } else {
                console.log("Alerta: " + res.status + "\n" + res.data)

                Alert.alert(
                    'Alerta', 'Requisição de cadastro inválida!',
                    [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                    { cancelable: false }
                );

                return false
            }
        })
        .catch((error) => {
            console.log("erro: " + error.response.status + " - " + error.response.data)
            console.log(error.response.data)

            Alert.alert(
                'Alerta', 'Requisição de cadastro inválida!',
                [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                { cancelable: false }
            );
            return null
        })
}

export async function validarPin(login, PIN) {
    const dado = {
        "login": login,
        "pin": PIN
    }

    console.log("post em: " + urlBase + "cadastrar/validar")
    console.log("mandando: ")
    console.log(dado)

    return await axios.post(urlBase + "cadastrar/validar",
        {
            "login": login,
            "pin": PIN
        })
        .then((res) => {
            console.log("then()")
            if (res.status == 200) {
                console.log("PIN autorizado")
                console.log("Usuário: " + login + "\nPIN: " + PIN)

                Alert.alert(
                    'Sucesso', 'PIN Válido!',
                    [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                    { cancelable: false }
                );

                return true
            } else if (res.status == 404) {
                console.log("PIN inválido")
                console.log("Usuário: " + login + "\PIN: " + PIN)

                Alert.alert(
                    'Alerta', 'PIN Inválido!',
                    [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                    { cancelable: false }
                );

                return false
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log("erro: ")
            console.log(error.response.data)

            Alert.alert(
                'Alerta', 'PIN Inválido!',
                [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                { cancelable: false }
            );
            return false
        })
}

export async function esqueciMinhaSenha(login) {

    console.log("\n")
    console.log("esqueciMinhaSenha")
    console.log("=------------------------------------=")

    return await axios.put(urlBase + `cadastrar/alterar/${login}`)
        .then((res) => {
            console.log("then()")
            if (res.status == 200) {
                console.log("E-mail enviado")
                console.log("Usuário: " + login)

                return true
            } else {
                return false
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log("erro: " + error.response.status + "\n" + error.response.data)

            Alert.alert(
                'Alerta', 'Erro ao enviar e-mail!',
                [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                { cancelable: false }
            );

            return false
        })
}

export async function esqueciMinhaSenhaPin(login, senha, pin) {

    console.log("\n")
    console.log("esqueciMinhaSenhaPin")
    console.log("=------------------------------------=")

    const data = {
        "login": login,
        "senha": senha,
        "pin": {
            "login": login,
            "pin": pin
        }
    }

    console.log("post em " + urlBase + `cadastrar/alterar`)
    console.log(data)


    return await axios.post(urlBase + `cadastrar/alterar`, {
        "login": login,
        "senha": senha,
        "pin": {
            "login": login,
            "pin": pin
        }
    })
        .then((res) => {
            console.log("then()")
            if (res.status == 200) {
                console.log("Senha Alterada")
                console.log("Usuário: " + login)
                console.log("Senha: " + senha)

                Alert.alert(
                    'Sucesso', 'Senha alterada!',
                    [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                    { cancelable: false }
                );

                return true
            } else {
                return false
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log("erro: " + error.response.status + "\n" + error.response.data)

            Alert.alert(
                'Alerta', 'Erro ao enviar e-mail!',
                [{ text: 'OK', onPress: () => console.log('Botão OK pressionado') },],
                { cancelable: false }
            );

            return false
        })
}


//DIARIOS - DIARIOS - DIARIOS - DIARIOS - DIARIOS - DIARIOS - DIARIOS
export async function salvarDiario(titulo, texto, tipo, paciente, token) {

    const data = {
        "tipo": tipo,
        "titulo": titulo,
        "texto": texto,
        "paciente": paciente
    }

    console.log("\n")
    console.log("salvarDiario")
    console.log("=------------------------------------=")

    console.log("post em: " + urlBase + `diarios`)
    console.log(data)

    const instance = axios.create({
        baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    await instance.post("diarios", data)
        .then((res) => {
            console.log("then()")
            console.log(res.data)

            if (res.status == 200) {

                Alert.alert(
                    'Sucesso', `Diário salvo!`,
                    [{
                        text: 'OK', onPress: () => {
                            console.log('Botão OK pressionado')
                        }
                    },],
                    { cancelable: false }
                );

                return true
            } else {

                return false
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log(error)

            renovarCredenciais()

            return false
        })
}

const formatarDia = (data) => {
    const partesData = data.split('-');
    const dia = partesData[2];

    if (dia.length === 1) {
        partesData[2] = `0${dia}`;
        return partesData.join('-');
    }

    return data;
};

export async function pegarAtualDiario(tipo, paciente, token, dataFormatada) {

    const currentDate = new Date();
    const formattedDateToday = format(currentDate, 'yyyy-MM-dd');

    const formattedDate = formatarDia(dataFormatada);


    let endpoint = tipo ? "emocoes" : "sonhos";

    const instance = axios.create({
        baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    });

    console.log("\n")
    console.log("pegarAtualDiario")
    console.log("=------------------------------------=")

    console.log("GET: " + `diarios/${endpoint}/${paciente}/${formattedDate}`)

    try {
        const response = await instance.get(`diarios/${endpoint}/${paciente}/${formattedDate}`)
            .then((res) => {

            })
            .catch((error) => {
                renovarCredenciais()
            })


        if (response.status === 200) {
            const diario = {
                titulo: response.data.titulo,
                texto: response.data.texto
            };
            return diario;
        } else {
            console.log(`Error: ${response.status}\nDescription: ${response.data}`);
            return false;
        }
    } catch (error) {
        console.log(error);

        if (formattedDateToday != formattedDate) {
            // Alert.alert(
            //     'Erro!', `Não foi possível visualizar o diário`,
            //     [{
            //         text: 'OK', onPress: () => {
            //             console.log('Botão OK pressionado')
            //         }
            //     },],
            //     { cancelable: false }
            // );
            console.log(formattedDateToday)
            console.log(formattedDate)
        }

        return false;
    }
}

export async function pegarAtualDiarioAnterior(tipo, paciente, token) {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    let endpoint = tipo ? "emocoes" : "sonhos";

    const instance = axios.create({
        baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    });

    console.log("\n")
    console.log("pegarAtualDiarioAnterior")
    console.log("=------------------------------------=")

    console.log("GET: " + `diarios/${endpoint}/${paciente}/${formattedDate}`)

    try {
        const response = await instance.get(`diarios/${endpoint}/${paciente}/${formattedDate}`)
            .then((res) => {

            })
            .catch((error) => {
                renovarCredenciais()
            })

        if (response.status === 200) {
            const diario = {
                titulo: response.data.titulo,
                texto: response.data.texto
            };
            return diario;
        } else {
            console.log(`Error: ${response.status}\nDescription: ${response.data}`);
            return false;
        }
    } catch (error) {
        console.log("Error:", error);
        return false;
    }
}

export async function listarDiarios(tipo) {
    try {
        const credenciais = await getCredentials();

        const url = urlBase + "diarios/" + tipo + "/listar/" + credenciais.username;
        console.log("Realizando uma requisição GET em: " + url);
        console.log("Token: " + credenciais.token);

        const instance = axios.create({
            baseURL: urlBase,
            headers: {
                'Authorization': `Bearer ${credenciais.token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });

        const response = await instance.get(`diarios/${tipo}/listar/${credenciais.username}`)
            .then((res) => {
                return res
            })
            .catch((error) => {
                renovarCredenciais()
            })
            

            if (response?.status === 200) {
                const retorno = response.data.content.map(diario => ({
                    "titulo": diario.titulo,
                    "texto": diario.texto,
                    "data": diario.data,
                }));

                console.log(retorno)

                return retorno;
            } else {
                // console.log(`Erro: ${response.status}\nDescrição: ${response.data}`);
                // throw new Error(`Erro: ${response.status}\nDescrição: ${response.data}`);
            }
    } catch (error) {
        console.log("Erro:", error);
    }
}


//MINHACONTA - MINHACONTA - MINHACONTA - MINHACONTA - MINHACONTA - MINHACONTA - MINHACONTA
export async function alterarSenha(senhaAntiga, senhaNova) {

    console.log("\n")
    console.log("alterarSenha")
    console.log("=------------------------------------=")

    const credenciais = await getCredentials()

    const data = {
        "login": credenciais.username,
        "senhaAntiga": senhaAntiga,
        "senhaNova": senhaNova,
    }

    console.log("put em: " + urlBase + `usuario`)
    console.log(data)



    await instance.put("usuario", data)
        .then((res) => {
            console.log("then()")

            if (res.status == 200) {

                Alert.alert(
                    'Sucesso', `Senha alterada!`,
                    [{
                        text: 'OK', onPress: () => {
                            console.log('Botão OK pressionado')
                        }
                    },],
                    { cancelable: false }
                );

                return true
            } else {

                return false
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log(error)

            Alert.alert(
                'Erro', `A senha não foi alterada!`,
                [{
                    text: 'OK', onPress: () => {
                        console.log('Botão OK pressionado')
                    }
                },],
                { cancelable: false }
            );

            renovarCredenciais()

            return false
        })
}

export async function alterarEndereco(endereco) {

    console.log("\n")
    console.log("alterarEndereco")
    console.log("=------------------------------------=")

    const credenciais = await getCredentials()
    const paciente = await getPacienteData()

    const data = {
        "id": paciente.id,
        endereco,
    }

    console.log("put em: " + urlBase + `pacientes`)
    console.log(data)

    const instance = axios.create({
        baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${credenciais.token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    await instance.put("pacientes", data)
        .then((res) => {
            console.log("then()")

            if (res.status == 200) {

                Alert.alert(
                    'Sucesso', `Endereço alterado!`,
                    [{
                        text: 'OK', onPress: () => {
                            console.log('Botão OK pressionado')
                        }
                    },],
                    { cancelable: false }
                );

                return true
            } else {

                return false
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log(error)

            Alert.alert(
                'Erro', `O endereço não foi alterado!`,
                [{
                    text: 'OK', onPress: () => {
                        console.log('Botão OK pressionado')
                    }
                },],
                { cancelable: false }
            );

            renovarCredenciais()

            return false
        })
}

export async function alterarTelefone(telefone, telefoneFixo) {

    console.log("\n")
    console.log("alterarEndereco")
    console.log("=------------------------------------=")

    const credenciais = await getCredentials()
    const paciente = await getPacienteData()

    let data = {}

    if (isNaN(telefoneFixo) || telefoneFixo == "") {
        console.log("telefone fixo não será alterado")
        data = {
            "id": paciente.id,
            "telefone": telefone,
        }
    } else if (isNaN(telefone) || telefone == "") {
        console.log("telefone não será alterado")
        data = {
            "id": paciente.id,
            "telefoneFixo": telefone,
        }
    } else {
        console.log("Ambos telefones serão alterados")
        data = {
            "id": paciente.id,
            "telefone": telefone,
            "telefoneFixo": telefoneFixo,
        }
    }


    console.log("put em: " + urlBase + `pacientes`)
    console.log(data)

    const instance = axios.create({
        baseURL: urlBase,
        headers: {
            'Authorization': `Bearer ${credenciais.token}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    await instance.put("pacientes", data)
        .then((res) => {
            console.log("then()")

            if (res.status == 200) {

                Alert.alert(
                    'Sucesso', `Telefone(s) alterado(s)!`,
                    [{
                        text: 'OK', onPress: () => {
                            console.log('Botão OK pressionado')
                        }
                    },],
                    { cancelable: false }
                );

                return true
            } else {

                return false
            }
        })
        .catch((error) => {
            console.log("catch()")
            console.log(error)

            Alert.alert(
                'Erro', `O valor não foi alterado!`,
                [{
                    text: 'OK', onPress: () => {
                        console.log('Botão OK pressionado')
                    }
                },],
                { cancelable: false }
            );

            renovarCredenciais()

            return false
        })
}


//PSICOLOGIA - PSICOLOGIA - PSICOLOGIA - PSICOLOGIA - PSICOLOGIA - PSICOLOGIA - PSICOLOGIA  
export async function listaMedicos() {
    try {
        const credenciais = await getCredentials();

        const url = urlBase + "medicos";
        console.log("Realizando uma requisição GET em: " + url);
        console.log("Token: " + credenciais.token);

        const instance = axios.create({
            baseURL: urlBase,
            headers: {
                'Authorization': `Bearer ${credenciais.token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });

        const response = await instance.get("medicos")
            .then((res) => {

            })
            .catch((error) => {
                renovarCredenciais()
            });

        if (response.status === 200) {
            const retorno = response.data.content.map(medico => ({
                "crm": medico.crm,
                "email": medico.email,
                "id": medico.id,
                "nome": medico.nome,
            }));

            console.log(retorno);
            return retorno;
        } else {
            console.log(`Erro: ${response.status}\nDescrição: ${response.data}`);
            throw new Error(`Erro: ${response.status}\nDescrição: ${response.data}`);
        }
    } catch (error) {
        console.log("Erro:", error);
        throw error;
    }
}


//CONSULTA - CONSULTA - CONSULTA - CONSULTA - CONSULTA - CONSULTA - CONSULTA  
export async function listaConsultas() {
    try {
        const credenciais = await getCredentials();
        const id = await getPacienteId();

        const url = urlBase + "consultas";
        console.log("Realizando uma requisição GET em: " + url);
        console.log("Token: " + credenciais.token);

        const instance = axios.create({
            baseURL: urlBase,
            headers: {
                'Authorization': `Bearer ${credenciais.token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });

        const response = await instance.get(`consultas/${id}`);

        if (response.status === 200) {
            const retorno = response.data.content.map(consulta => ({
                "id": consulta.id,
                "idMedico": consulta.idMedico,
                "idPaciente": consulta.idPaciente,
                "data": consulta.data
            }));

            console.log(retorno);
            return retorno;
        } else {
            console.log(`Erro logica: ${response.status}\nDescrição: ${response.data}`);
            throw new Error(`Erro logica: ${response.status}\nDescrição: ${response.data}`);
        }
    } catch (error) {
        console.log("Erro:", error.response.data);
        throw error;
    }
}

export async function temConsulta() {
    try {
        const credenciais = await getCredentials();
        const id = await getPacienteId();

        const url = urlBase + `consultas/contem/${id}`;
        console.log("Realizando uma requisição GET em: " + url);
        console.log("Token: " + credenciais.token);

        const instance = axios.create({
            baseURL: urlBase,
            headers: {
                'Authorization': `Bearer ${credenciais.token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });

        const response = await instance.get(`consultas/contem/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return true;
                } else if (response.status == 400) {
                    return false;
                } else {
                    console.log(`Erro: ${response.status}\nDescrição: ${response.data}`);
                }
            })
            .catch((error) => {
                console.log("erro")
                console.log(error)
                return false;
            })
        return response
    } catch (error) {
        console.log("Erro grave:", error);
        console.log(error)
        return false;
    }

}

export async function marcarUmaConsulta(data, idMedico) {
    try {
        const credenciais = await getCredentials();
        const id = await getPacienteId();

        const url = urlBase + "consultas";
        console.log("Realizando uma requisição post em: " + url);
        console.log("Token: " + credenciais.token);

        const instance = axios.create({
            baseURL: urlBase,
            headers: {
                'Authorization': `Bearer ${credenciais.token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });

        const response = await instance.post(`consultas`, {
            "idMedico": idMedico,
            "idPaciente": id,
            "data": data
        });

        if (response.status === 200) {
            console.log("FOI");
            return true;
        } else {
            console.log(`Erro: ${response.status}\nDescrição: ${response.data}`);
            return false;
        }
    } catch (error) {
        console.log("Erro:", error.response.data);
        alert(error.response.data)
        return false;
    }
}

export async function tempoConsulta() {
    try {
        const credenciais = await getCredentials();
        const id = await getPacienteId();

        const url = urlBase + `consultas/tempo/${id}`;
        console.log("Realizando uma requisição GET em: " + url);
        console.log("Token: " + credenciais.token);

        const instance = axios.create({
            baseURL: urlBase,
            headers: {
                'Authorization': `Bearer ${credenciais.token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });

        const response = await instance.get(`consultas/tempo/${id}`);
        if (response.status === 200) {
            tempoRestante = response.data.valor;
            console.log(tempoRestante)
            return tempoRestante;
        } else if (response.status === 400) {
            return "Indeterminado"
        }
        else {
            console.log(`Erro: ${response.status}\nDescrição: ${response.data}`);
            throw new Error(`Erro: ${response.status}\nDescrição: ${response.data}`);
        }
    } catch (error) {
        console.log("Erro:", error);
        return "Indeterminado"
    }
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
    try {
        const url = urlBase + "pacientes"
        console.log("Realizando uma requisição post em: " + url)
        console.log(paciente)

        const instance = axios.create({
            baseURL: urlBase,
            headers: {
                'Authorization': `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            }
        })

        const res = await instance.post("/pacientes", paciente, {
            timeout: 7500 // 7,5 segundos
        })
        if (res.status == 201) {

            console.log("Requisição concluída com sucesso")
            console.log(res.data)

            return true
        } else if (res.status == 400) {
            console.log("Bad Request")
            console.log(`Erro 400: ${res.status}\nDescrição: ${res.data}`)

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

        } else {
            return false
        }
    } catch (error) {
        try {
            const err = error.response.data

            Alert.alert(
                'Erro ao cadastrar novo usuário',
                res.array.forEach(err => {
                    return `${err.campo}: ${err.mensagem}`
                }),
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Botão OK pressionado'),
                    },
                ],
                { cancelable: false }
            );

        } catch (error) {
            Alert.alert(
                'Erro ao cadastrar novo usuário',
                "Sem conexão com o servidor",
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Botão OK pressionado'),
                    },
                ],
                { cancelable: false }
            );
        }

        return false
    }
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
