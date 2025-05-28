document.addEventListener('DOMContentLoaded', function() {
    var resultado = document.getElementById('resultado');
    var historicoTbody = document.querySelector('#historico tbody');
    let expressaoAtual = '';
    
    // Adiciona eventos aos botões numéricos
    document.querySelectorAll('.numero').forEach(botao => {
        botao.addEventListener('click', function() {
            expressaoAtual += this.textContent;
            resultado.value = expressaoAtual;
        });
    });

    // Adiciona eventos aos botões de operadores
    document.querySelectorAll('.operador').forEach(botao => {
        botao.addEventListener('click', function() {
            var operador = this.textContent;
            
            // Verifica se o último caractere já é um operador
            if (expressaoAtual.length > 0 && !isNaN(expressaoAtual.slice(-1))) {
                expressaoAtual += operador;
                resultado.value = expressaoAtual;
            } else if (expressaoAtual.length === 0 && operador === '-') {
                // Permite números negativos
                expressaoAtual += '-';
                resultado.value = expressaoAtual;
            }
        });
    });

    // Botão de limpar
    document.querySelector('.limpar').addEventListener('click', function() {
        expressaoAtual = '';
        resultado.value = '';
    });

    // Botão de igual
    document.querySelector('.igual').addEventListener('click', function() {
        if (expressaoAtual) {
            try {
                var resultadoCalculo = calcular(expressaoAtual);
                adicionarAoHistorico(expressaoAtual, resultadoCalculo);
                expressaoAtual = resultadoCalculo.toString();
                resultado.value = expressaoAtual;
            } catch (error) {
                resultado.value = 'Erro: ' + error.message;
                expressaoAtual = '';
            }
        }
    });

    // Botão para limpar histórico
    document.querySelector('.limpar-historico').addEventListener('click', function() {
        historicoTbody.innerHTML = '';
    });

    // Função para calcular a expressão
    function calcular(expressao) {
        // Verifica se é uma operação de primo
        if (expressao.includes('primo')) {
            var numero = parseFloat(expressao.replace('primo', ''));
            return ehPrimo(numero) ? 'Sim' : 'Não';
        }
        
        // Verifica se é uma operação de fatorial
        if (expressao.includes('!')) {
            var numero = parseFloat(expressao.replace('!', ''));
            return fatorial(numero);
        }
        
        // Calcula expressões com operadores padrão
        var operadores = ['+', '-', '*', '/', '^'];
        for (var op of operadores) {
            if (expressao.includes(op)) {
                var partes = expressao.split(op);
                var num1 = parseFloat(partes[0]);
                var num2 = parseFloat(partes[1]);
                
                switch (op) {
                    case '+': return num1 + num2;
                    case '-': return num1 - num2;
                    case '*': return num1 * num2;
                    case '/': 
                        if (num2 === 0) throw new Error('Divisão por zero');
                        return num1 / num2;
                    case '^': return Math.pow(num1, num2);
                }
            }
        }
        
        // Se não for nenhuma das operações acima, retorna o número
        return parseFloat(expressao);
    }

    // Função para calcular fatorial
    function fatorial(n) {
        if (n < 0) throw new Error('Fatorial de número negativo');
        if (n % 1 !== 0) throw new Error('Fatorial apenas para inteiros');
        if (n === 0 || n === 1) return 1;
        
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }

    // Função para verificar se um número é primo
    function ehPrimo(n) {
        if (n <= 1) return false;
        if (n % 1 !== 0) return false;
        
        for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    // Função para adicionar uma entrada ao histórico
    function adicionarAoHistorico(operacao, resultado) {
        // Cria uma nova linha na tabela
        var novaLinha = document.createElement('tr');
        
        var celulaOperacao = document.createElement('td');
        celulaOperacao.textContent = operacao;
        
        var celulaResultado = document.createElement('td');
        celulaResultado.textContent = resultado;
        
        var celulaAcao = document.createElement('td');
        var botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.className = 'remover-item';
        botaoRemover.addEventListener('click', function() {
            novaLinha.remove();
        });
        celulaAcao.appendChild(botaoRemover);
        
        novaLinha.appendChild(celulaOperacao);
        novaLinha.appendChild(celulaResultado);
        novaLinha.appendChild(celulaAcao);
        
        historicoTbody.prepend(novaLinha);
    }
});