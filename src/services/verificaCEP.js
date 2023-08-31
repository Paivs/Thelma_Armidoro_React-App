import axios from "axios"


export default async function consultaCEP(CEP) {

    const urlBase = "https://viacep.com.br/ws"
    tipo = "json"

    console.log(`${urlBase}/${CEP}/${tipo}`)
    let dados = {}

    await axios.get(`${urlBase}/${CEP}/${tipo}`)
        .then((res) => {
            if (res.status == 200) {
                console.log("CEP Correto: " + res.status)
                dados = res.data;
                // dados = {...dados, erro: false}
            } else {
                console.log("erro: " + res.status + "\n" + res.data)
                // dados = {...dados, erro: true}
            }
        })
        .catch((error) => {
            console.log("erro: " + error.status)
            console.log(error)
            // dados = {...dados, erro: true}
            return dados
        })

    return dados
}