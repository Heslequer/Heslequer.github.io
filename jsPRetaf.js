$('.select2').select2({
  templateResult: function(option) {
     if(option.element && (option.element).hasAttribute('hidden')){
        return null;
     }
     return option.text;
  }
});
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTq9cuxu_qIW0JLyUAs1EKwBDygifvKlHRWqWYbLIGOgQGebke-VWfomTl6arIIt1PoygkQadrXHMEe/pubhtml')
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
    console.log(data); // Dados extraídos da planilha
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
document.addEventListener('DOMContentLoaded', function() {

    const clicou = (event) => {
        event.preventDefault();
        var nome = document.getElementById("nome").value
        if(nome === 'Selecione o Nome'){
            nome = document.getElementById('nomeCompleto').value
        }
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
         window.location.reload()
        
    }

    window.document.querySelector('form').addEventListener('submit', clicou);
});