var url = 'Forte.xlsx';
        var vetorNomes = []; // Defina a variável fora da função assíncrona

        // Função para ler a planilha
        function readExcelFile(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';

                // Defina um tempo limite maior (em milissegundos)
                var timeoutValue = 10000000; // 10 segundos

                xhr.timeout = timeoutValue;

                xhr.onload = function(e) {
                    var data = new Uint8Array(xhr.response);
                    var workbook = XLSX.read(data, { type: 'array' });
                    var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    var jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

                    resolve(jsonData);
                };

                xhr.ontimeout = function() {
                    reject(new Error('Tempo limite de requisição excedido.'));
                };

                xhr.onerror = function() {
                    reject(new Error('Erro ao ler a planilha.'));
                };

                xhr.send();
            });
        }

        // Função para processar os dados
        function processData(data) {
            var names = [];
            var ages = [];

            // Supondo que a primeira coluna seja "Nomes" e a segunda coluna seja "Idades"
            for (var i = 1; i < data.length; i++) {
                names.push(data[i][0]);
                ages.push(data[i][1]);
            }

            var result = {
                nomes: names,
                idades: ages
            };

            return result;
        }

        // Chamando a função para ler a planilha e processar os dados
        readExcelFile(url)
            .then(function(data) {
                var processedData = processData(data);
                vetorNomes = processedData.idades; // Atribui valor à variável global

                //console.log(vetorNomes);

                // Agora você pode usar a variável vetorNomes fora dessa função.
                // Por exemplo, você pode fazer algo como:
                criaLinhas(vetorNomes);
            })
            .catch(function(error) {
                console.error(error);
            });


        $(document).ready(function() {
            $('#nome').select2();
        });

        //console.log(vetorNomes) 
        function criaLinhas(vetornomes){
            var pai = document.getElementById('nome')
        
            for (var i = 0; i < vetornomes.length; i++) 
            {
                var filho = document.createElement('option');
                filho.innerHTML = vetornomes[i];
                pai.appendChild(filho);
            }
        }
document.addEventListener('DOMContentLoaded', function() {

    const clicou = (event) => {
        event.preventDefault();
        var valorNome = document.getElementById("nome").value
        if(valorNome === 'Selecionar'){
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
    }

    window.document.querySelector('form').addEventListener('submit', clicou);
});