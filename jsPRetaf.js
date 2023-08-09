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
document.addEventListener('DOMContentLoaded', function() {

    const clicou = (event) => {
        event.preventDefault();
        var valorNome = document.getElementById("nome").value
        if(valorNome === ''){
            valorNome = document.getElementById('nomeCompleto').value

        }
        const postoDeGraduacao = document.querySelector('#pg').value
        const organizacaoMilitar = document.querySelector('#om').value
        const subunidade = document.querySelector('#sb').value
        const valorIdade = document.querySelector('#idade').value
        const valorPeso = document.querySelector('#peso').value
        const valorAltura = document.querySelector('#altura').value
        const valorCintura = document.querySelector('#cintura').value
        const valorAbdomen = document.querySelector('#abdomen').value
        const valorQuadril = document.querySelector('#quadril').value
        const valorPressao = document.querySelector('#pressao').value
        const valorParecer = document.querySelector('#parecer').value
        console.log('foi '+valorNome)
        console.log('foi '+valorIdade)

        fetch('https://api.sheetmonkey.io/form/gWNF9GS36ff4Bqrido88dK', {
        method: 'post',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ valorNome , valorIdade, postoDeGraduacao, organizacaoMilitar,subunidade,valorPeso, valorAltura, valorCintura,valorAbdomen,valorQuadril,valorPressao,valorParecer })
        });
        
         alert('ENVIADO COM SUCESSO')
         window.location.reload()
        
    }

    window.document.querySelector('form').addEventListener('submit', clicou);
});