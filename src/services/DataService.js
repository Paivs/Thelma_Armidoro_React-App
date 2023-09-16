// Função para verificar se um ano é bissexto
function ehAnoBissexto(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
}

// Função para calcular o dia seguinte
export function getDiaSeguinte(data) {
    const meses = [
        { nome: "Janeiro", dias: 31 },
        { nome: "Fevereiro", dias: ehAnoBissexto(data.ano) ? 29 : 28 }, // O valor de dias será atualizado conforme o ano
        { nome: "Marco", dias: 31 },
        { nome: "Abril", dias: 30 },
        { nome: "Maio", dias: 31 },
        { nome: "Junho", dias: 30 },
        { nome: "Julho", dias: 31 },
        { nome: "Agosto", dias: 31 },
        { nome: "Setembro", dias: 30 },
        { nome: "Outubro", dias: 31 },
        { nome: "Novembro", dias: 30 },
        { nome: "Dezembro", dias: 31 }
    ];
   
    const { ano, mes, dia } = data;
    const ultimoDiaDoMes = meses[mes].dias;

    if (dia < ultimoDiaDoMes) {
        return { ano, mes, dia: dia + 1 };
    } else {
        if (mes < 11) {
            return { ano, mes: mes + 1, dia: 1 };
        } else {
            return { ano: ano + 1, mes: 0, dia: 1 };
        }
    }
}

// Função para calcular o dia anterior
export function getDiaAnterior(data) {
    const meses = [
        { nome: "Janeiro", dias: 31 },
        { nome: "Fevereiro", dias: ehAnoBissexto(data.ano) ? 29 : 28 }, // O valor de dias será atualizado conforme o ano
        { nome: "Marco", dias: 31 },
        { nome: "Abril", dias: 30 },
        { nome: "Maio", dias: 31 },
        { nome: "Junho", dias: 30 },
        { nome: "Julho", dias: 31 },
        { nome: "Agosto", dias: 31 },
        { nome: "Setembro", dias: 30 },
        { nome: "Outubro", dias: 31 },
        { nome: "Novembro", dias: 30 },
        { nome: "Dezembro", dias: 31 }
    ];

    const { ano, mes, dia } = data;
    if (dia > 1) {
        return { ano, mes, dia: dia - 1 };
    } else {
        if (mes > 0) {
            const mesAnterior = mes - 1;
            return { ano, mes: mesAnterior, dia: meses[mesAnterior].dias };
        } else {
            const anoAnterior = ano - 1;
            const mesAnterior = 11;
            return { ano: anoAnterior, mes: mesAnterior, dia: meses[mesAnterior].dias };
        }
    }
}


// // Pegar a data atual
// const dataAtual = new Date();
// const mesAtual = dataAtual.getMonth(); // Janeiro é 0, Fevereiro é 1, e assim por diante
// const diaAtual = dataAtual.getDate();
// const anoAtual = dataAtual.getFullYear(); // Pegar o ano atual

// // Atualizar a quantidade de dias de Fevereiro de acordo com o ano atual
// // meses[1].dias = ehAnoBissexto(anoAtual) ? 29 : 28;

// // console.log(`Estamos em ${meses[mesAtual].nome}.`);
// // console.log(`O mes tem ${meses[mesAtual].dias} dias.`);
// // console.log(`Hoje é o dia ${diaAtual}.`);

// // Calcular o dia seguinte
// const proximoDia = diaSeguinte({ ano: anoAtual, mes: mesAtual, dia: diaAtual });
// console.log(`O dia seguinte é ${proximoDia.dia}/${proximoDia.mes + 1}/${proximoDia.ano}.`);

// // Calcular o dia seguinte
// const proximoDiaproximo = diaSeguinte(proximoDia);
// console.log(`O dia seguinte ao próximo é ${proximoDiaproximo.dia}/${proximoDiaproximo.mes + 1}/${proximoDiaproximo.ano}.`);

// // Calcular o dia anterior
// const diaAnteriorHoje = diaAnterior({ ano: anoAtual, mes: mesAtual, dia: diaAtual });
// console.log(`O dia anterior foi ${diaAnteriorHoje.dia}/${diaAnteriorHoje.mes + 1}/${diaAnteriorHoje.ano}.`);

// // Calcular o dia anterior ao dia anterior (2 dias atrás)
// const diaAnteontem = diaAnterior(diaAnteriorHoje);
// console.log(`O dia anteontem foi ${diaAnteontem.dia}/${diaAnteontem.mes + 1}/${diaAnteontem.ano}.`);
