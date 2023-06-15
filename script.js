$(document).ready(function () {
  $('#cpf').inputmask('999.999.999-99');
});

const btnValidar = document.querySelector('button');

btnValidar.addEventListener('click', () => {
  validarCPF()
})


function validarCPF() {

  const cpfFormatado = document.querySelector('#cpf').value;
  const cpf = limparFormatacao(cpfFormatado);


  if(cpf.length !== 11) {
    mostrarResultado('CPF deve conter 11 digitos.', 'red');
    return;
  }

  if(verificarDigitosRepetidos(cpf)) {
    mostrarResultado('CPF não pode conter repetição do mesmo digito.', 'red')
  }

  const digito1 = calcularDigitoVerificador(cpf, 1)
  const digito2 = calcularDigitoVerificador(cpf, 2)

  if (!digito1 && !digito2) {
    mostrarResultado(`CPF inválido - ${cpfFormatado}`, 'red');
    return;
  }

  else {
      mostrarResultado('CPF válido!', 'green');
  }
}

function calcularDigitoVerificador(cpf, posicao) {
  const sequencia = cpf.slice(0, 8 + posicao).split('');

  let soma = 0;
  let multiplicador = 9 + posicao;

  for(const numero of sequencia) {
    soma += multiplicador * Number(numero);
    multiplicador--
  }

  const restoDivisao = (soma * 10) % 11;
  const digito = cpf.slice(8 + posicao, 9 + posicao)

  return restoDivisao == digito;
}

function limparFormatacao(cpf){
  cpf = cpf.replace(/\D/g, ''); //remove qualquer coisa diferente de caracteres por vazio
  return cpf;
}

function mostrarResultado(texto, cor) {
  const span = document.querySelector('span')
  span.innerText = texto;
  span.style.color = cor;
}

function verificarDigitosRepetidos(cpf) {
  return cpf.split('').every((d) => d === cpf[0]);
}