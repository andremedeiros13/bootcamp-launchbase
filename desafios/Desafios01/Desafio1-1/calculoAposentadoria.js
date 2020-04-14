//Calculo de Aposentadoria

const nome = 'Fabiana';
const sexo = 'F';
const idadde = 55;
const contribuicao = 29;


const tempoMinimoContribuicaoHomen = 35;
const tempoMinimoContribuicaoMulher = 30;

const calculoAposentadoria = idadde + contribuicao;

const verificaAposentadoriaHomen = calculoAposentadoria >= 95 && contribuicao >= 35;
const verificaAposentadoriaMulher = calculoAposentadoria >= 85 && contribuicao >= 30;

if (sexo == 'M'){
    if(verificaAposentadoriaHomen){

        console.log(`${nome}, você pode se aposentar`);
    }else{

        console.log(`${nome}, você ainda não pode se aposentar`)
    }

}else{
    if(verificaAposentadoriaMulher){

        console.log(`${nome}, você pode se aposentar`);
  
    }else{
        console.log(`${nome}, você ainda não pode se aposentar`)
    }
}


