$('.select2').select2({
  templateResult: function(option) {
     if(option.element && (option.element).hasAttribute('hidden')){
        return null;
     }
     return option.text;
  }
});

fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSdYLZf2PjsVn5qfeNX32FjIXj-4rF4pLqT8SAL57An7cj3hh47-hjx1ZEYwTwQeGJWtQ5d3L_5YY8c/pubhtml')
  .then(response => response.text())
  .then(html => {
    // Use o conteúdo HTML para extrair os dados da tabela
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table'); // Supondo que a tabela contenha os dados

    // Percorra as linhas da tabela e extraia os dados
    const data = [];
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const columns = row.querySelectorAll('td');
      const rowData = [];
      columns.forEach(column => {
        rowData.push(column.textContent.trim());
      });
      data.push(rowData);
    });
    criarLinhas(data)
  })
  .catch(error => {
    console.error('Erro ao acessar a planilha:', error);
  });
  function criarLinhas(nomes)
  {
    var pai = document.getElementById('nome')
    for(var indice of nomes)
    {
      var filho = document.createElement('option');
      filho.innerHTML = indice;
      pai.appendChild(filho);
    }
  }
$(document).ready(function() {
    $('#nome').select2();
});



function clicouCheckbox(){
  if(nomeCompleto.style.display === 'block'){
    nomeCompleto.style.display = 'none'
    listaNomes.style.display = 'block'
  }else{
    nomeCompleto.style.display = 'block'
    listaNomes.style.display = 'none'
  }
}

function gerarData()
{
  var d = new Date();
  var dia = String(d.getDate()).padStart(2,'0');
  var mes = String(d.getMonth()+1).padStart(2,'0');
  var ano = String(d.getFullYear()).substr(-2)
  var hora = String(d.getHours())
  var min = String(d.getMinutes())
  var sec = String(d.getSeconds())
  var data = dia +'/' + mes + '/' + ano + ' ' + hora + ':' + min + ':' + sec
  return data

}
function limparDados(){
  $( "#nome").val('Selecione o Nome').trigger('change');
  $("#nome").select2({placeholder: "Selecione o Nome"});
  document.getElementById('nomeCompleto').value = "";
  document.getElementById('checkbox').checked = false;
  nomeCompleto.style.display = 'none'
  listaNomes.style.display = 'block'
  document.getElementById('pg').selectedIndex = 0;
  document.getElementById('om').selectedIndex = 0;
  document.getElementById('sb').selectedIndex = 0;
  document.getElementById('idade').value = "";
  document.getElementById('peso').value = "";
  document.getElementById('altura').value = "";
  document.getElementById('cintura').value = "";
  document.getElementById('abdomen').value = "";
  document.getElementById('quadril').value = "";
  document.getElementById('pressao').value = "";
  document.getElementById('parecerOdt').selectedIndex = 0;
  document.getElementById('parecer').selectedIndex = 0;
}
function passarDados(){}

document.addEventListener('DOMContentLoaded', function() {

    const clicou = (event) => {
        event.preventDefault();
        var nome = document.getElementById("nome").value
        if(nome === 'Selecione o Nome')
        {
          if(document.getElementById("nomeCompleto").value === ''){
            alert('PREENCHA TODOS OS CAMPOS')

          }else
          {
            nome = document.getElementById('nomeCompleto').value
            const postodeGraduacao = document.querySelector('#pg').value
            const organizacaoMilitar = document.querySelector('#om').value
            const subunidade = document.querySelector('#sb').value
            const idade = document.querySelector('#idade').value
            const peso = document.querySelector('#peso').value
            const altura = document.querySelector('#altura').value
            const cintura = document.querySelector('#cintura').value
            const abdomen = document.querySelector('#abdomen').value
            const quadril = document.querySelector('#quadril').value
            const pressao = document.querySelector('#pressao').value
            const parecerOdonto = document.querySelector('#parecerOdt').value
            const parecerMedico = document.querySelector('#parecer').value
            const data = gerarData()
            fetch('https://api.sheetmonkey.io/form/gWNF9GS36ff4Bqrido88dK', {
            method: 'post',
            headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ nome , idade, postodeGraduacao, organizacaoMilitar,subunidade,peso, altura, cintura,abdomen,quadril,pressao,parecerOdonto,parecerMedico, data })
            });

            alert('ENVIADO COM SUCESSO')
            limparDados();
            //recarregar
          }
        }else if(document.getElementById("nomeCompleto").value !== ''){
          nome = document.getElementById('nomeCompleto').value
          const postodeGraduacao = document.querySelector('#pg').value
            const organizacaoMilitar = document.querySelector('#om').value
            const subunidade = document.querySelector('#sb').value
            const idade = document.querySelector('#idade').value
            const peso = document.querySelector('#peso').value
            const altura = document.querySelector('#altura').value
            const cintura = document.querySelector('#cintura').value
            const abdomen = document.querySelector('#abdomen').value
            const quadril = document.querySelector('#quadril').value
            const pressao = document.querySelector('#pressao').value
            const parecerOdonto = document.querySelector('#parecerOdt').value
            const parecerMedico = document.querySelector('#parecer').value
            const data = gerarData()
            fetch('https://api.sheetmonkey.io/form/gWNF9GS36ff4Bqrido88dK', {
            method: 'post',
            headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ nome , idade, postodeGraduacao, organizacaoMilitar,subunidade,peso, altura, cintura,abdomen,quadril,pressao,parecerOdonto,parecerMedico, data })
            });

            alert('ENVIADO COM SUCESSO')
            limparDados();
        }
        else
        {
          const postodeGraduacao = document.querySelector('#pg').value
          const organizacaoMilitar = document.querySelector('#om').value
          const subunidade = document.querySelector('#sb').value
          const idade = document.querySelector('#idade').value
          const peso = document.querySelector('#peso').value
          const altura = document.querySelector('#altura').value
          const cintura = document.querySelector('#cintura').value
          const abdomen = document.querySelector('#abdomen').value
          const quadril = document.querySelector('#quadril').value
          const pressao = document.querySelector('#pressao').value
          const parecerOdonto = document.querySelector('#parecerOdt').value
          const parecerMedico = document.querySelector('#parecer').value
          const data = gerarData()
          fetch('https://api.sheetmonkey.io/form/gWNF9GS36ff4Bqrido88dK', {
          method: 'post',
          headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ nome , idade, postodeGraduacao, organizacaoMilitar,subunidade,peso, altura, cintura,abdomen,quadril,pressao,parecerOdonto,parecerMedico, data })
          });

          alert('ENVIADO COM SUCESSO')
          limparDados();
          //Recarragar
        }
        
    }
    window.document.querySelector('form').addEventListener('submit', clicou);
});
