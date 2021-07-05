let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o que vai acontecer no canvas
let box = 32;    //cada quadrado em px.
let snake = [];  //Criando a cobrinha
snake[0] = {     //dados do que haverá dentro dela
	x: 8 * box,  //definindo o tamanho. Vai de 1 a 16 para cada lado
	y: 8 * box,  //definindo o tamanho. mostra o movimento do elemento
}

let direction = "right";
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box, // o Math.random gera números aleatorios até 1
	y: Math.floor(Math.random() * 15 + 1) * box // o Math.floor retira o 0. (chamado de flutuante)
}

function criarBG() {
	context.fillStyle = "lightgreen"; //trabalha com o stilo do contexto (canvas)
	context.fillRect(0, 0, 16 * box, 16 * box); //desenha o espaço do jogo e traalha com x, y, altura e largura (terá 16x16)
}

function criarCobrinha(){
	for(i=0; i < snake.length; i++){  //Vai percorrer todo o tamanho e incrementar
		context.fillStyle = "green";  //Vai pintar de verde a cobrinha
		context.fillRect(snake[i].x, snake[i].y, box, box);  //vai definir o tamanho dela
	} 
}

function drawFood(){
	context.fillStyle = "red"
	context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //Detecta o valor da tecla utilizada

function update (event){
	if (event.keyCode == 37 && direction != "right") direction = "left"; //Evita que a cobrinha siga para a direção contraria/ oposta
	if (event.keyCode == 38 && direction != "down") direction = "up";
	if (event.keyCode == 39 && direction != "left") direction = "right";
	if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarjogo(){  //Possui todas as funções para quando iniciar o jogo

	if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
	if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

	for (i = 1; i < snake.length; i++){ // Responsável pelo fim de jogo
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			clearInterval(jogo);
			alert('Game Over :(');
		}
	}


	criarBG();
    criarCobrinha(); //Função para chamar o elemento
    drawFood();

    let snakeX = snake[0].x; //Define a posição inicial da cobrinha
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;  //São as condicionais que definem as coordenadas da cobrinha
    if(direction == "left") snakeX -= box;  //Segue o sistema de plano cartesiano.
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;  //A esquerda e abaixo aumenta e a direita e acima diminui

    if (snakeX != food.x || snakeY != food.y) {
    	snake.pop(); //Retira o último elemento
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box; 
		food.y = Math.floor(Math.random() * 15 + 1) * box; 

    }

    let newHead = { //insere uma nova cabeça ao elemento
    	x: snakeX,
    	y: snakeY,
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarjogo, 100);  //seta o iniciar do jogo a cada 100 milisegundos sendo renovado

  