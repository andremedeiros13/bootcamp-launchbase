const usuarios = [
    { 
        nome: "Carlos", 
        tecnologias: 
        [
            "HTML", 
            "CSS"
        ] },

    { 
        nome: "Jasmine", 
        tecnologias: 
        [
            "JavaScript", 
            "CSS"
        ] },

    { 
        nome: "Tuane", 
        tecnologias: 
        [
            "HTML", 
            "Node.js"
        ] }
  ];

  function informacoesUSuarios ( usuario ) {
      let dados = [];
      let mensagem
      for(let i = 0; i < usuario.length; i++) {
          dados = dados + usuario[i]          
          mensagem = (`${usuario[i].nome} trabalha com ${usuario[i].tecnologias}`)          
          console.log(mensagem)
      }      
  }

  informacoesUSuarios(usuarios)


  function checaSeUsuarioUsaCSS(usuario) {
    // Percorra o array de tecnologias do usuário até encontrar se ele trabalha com CSS
    let contador = 0
    for(let i = 0; i < usuario.length; i++) {
        if( usuario[i].tecnologias[1] == 'CSS'){
            contador = contador + usuario[i]
            return true
        }else{
            // SE encontrar, retorne true da função, caso contrário retorne false
            return false
        }        
    }    
  }

// function retorno ( usuario ) {
//     for (let i = 0; i < usuarios.length; i++) {
//         const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i]);
      
//         if (usuarioTrabalhaComCSS) {
//           console.log(`O usuário ${usuario[i].nome} trabalha com CSS`);
//         }
//       }    
// }

for (let i = 0; i < usuarios.length; i++) {
    const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i]);
  
    if (usuarioTrabalhaComCSS) {
      console.log(`O usuário ${usuario[i].nome} trabalha com CSS`);
    }
  }


  