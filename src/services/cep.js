import { Alert } from "react-native"
import axios from "axios"

export async function buscaCEP(cep){
    let endereco = {}

    axios.get(`viacep.com.br/ws/${cep}/json`)
    .then((response) => {
        if(response.status == 200){
            endereco = response.data
        }else{
            throw Error
        }
        console.log("Erro")
        console.log(`Status ${response.status} \nData ${response.data}`)
    })
    .catch((error) => {
        console.log("Erro grave")
        console.log(error)
    })

    return endereco
}