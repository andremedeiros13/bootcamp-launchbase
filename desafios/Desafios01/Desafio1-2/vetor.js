const usuario = {
    nome: "Diego",
    empresa: {
      nome: "Rocketseat",
      cor: 'roxo',
      foco: 'programacao'
    },
    endereco: {       
        rua: 'Rua Guilherme Gembala',
        numero: 260

    }
  };

  console.log(`A empresa ${usuario.empresa.nome} está localizada em ${usuario.endereco.rua}, ${usuario.endereco.numero}`)


  const programador = {
      nomeUsuario: 'Andre',
      idade: 28,
      tecnologias:[
          {
            nomeTecnologia: 'C#',
            especialidade: 'Desktop'
          },

          {
            nomeTecnologia: 'JavaScript', 
            especialidade: 'Web/Mobile'
          },

          {
            nomeTecnologia: 'Python', 
            especialidade: 'Data Science'
          }
      ]
  }

  console.log(`O usuário ${programador.nomeUsuario} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nomeTecnologia} com especialidade em ${programador.tecnologias[0].especialidade}`)