const alunosTurmaA = [
    {
        nome: 'Andre',
        nota: 10
    },

    {
        nome: 'Fabiana',
        nota: 9.5
    },

    {
        nome: 'Maria',
        nota: 7
    },

    {
        nome: 'Raiane',
        nota: 2
    }
]

const alunosTurmaB = [
    {
        nome: 'Gui',
        nota: 2.5
    },

    {
        nome: 'Thais',
        nota: 9.5
    },

    {
        nome: 'Magda',
        nota: 0.5
    },

    {
        nome: 'Dani',
        nota: 2
    }
]


function calculaMedia(aluno) {
    let soma = 0
    for (let i = 0; i < aluno.length; i++) {
        soma = soma + aluno[i].nota

    }

    const media = soma / aluno.length
    return media
}

const media1 = calculaMedia(alunosTurmaA);
const media2 = calculaMedia(alunosTurmaB);

console.log(media1)
console.log(media2)


function enviaMensagem(media, turma) {

    if (media > 5) {

        console.log(`A media da turma ${turma}, é de ${media}. Parabéns!`)

    } else {

        console.log(`A media da turma ${turma}, é menos que 5.`)

    }
}

enviaMensagem(media1, 'TurmaA')
enviaMensagem(media2, 'TurmaB')



function marcarAlunoReprovado(aluno) {
    aluno.reprovado = false
    if (aluno.nota < 5) {
        aluno.reprovado = true
    }

}

function enviarMensagemReprovado(aluno) {
    if (aluno.reprovado) {
        console.log(`O aluno ${aluno.nome}, foi reprovado!`)
    }
}

function alunoReprovado(alunos) {
    for (let aluno of alunos) {
        marcarAlunoReprovado(aluno)
        enviarMensagemReprovado(aluno)
    }
}

alunoReprovado(alunosTurmaA)
alunoReprovado(alunosTurmaB)