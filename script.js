
let cards = document.querySelectorAll('.card')
let submitDom = document.querySelector('input[type=submit]')
let inputsDom = document.querySelectorAll('input[type=radio]')
let startButton = document.querySelector('.start')
let setIntervalID
let inputsChecked = []
let inputCorrectAnswers = [2, 5, 8, 12, 14]//[2, 5, 8, 12, 14]
let totalCorrectAnswers = 0

startButton.onclick = () => {
    startTimer()
}

submitDom.onclick = function(event) {
    event.preventDefault()
    
    //filtrar os inputs checked
    filterInputsChecked(inputsDom)

    //comparar o array de input e de respostas
    compareAnswers(inputsChecked, inputCorrectAnswers)

    //parar o timer
    stopTimer()

    //mostrar o resultado
    showResult(totalCorrectAnswers)
    totalCorrectAnswers = 0    
    inputsChecked = []   
}

//Evento ao clicar nos cards
cards.forEach(function(card){
    card.addEventListener('click', function(event){

        //nao funciona no primeiro card, class='fixed'
        if(event.currentTarget.classList.contains('fixed')) {
            return
        }
    
        //se o click for no label/input/result, não faz expande/contrai o card
        if (event.target.parentElement.classList.contains('label') || event.target.classList.contains('label') || event.target.classList.contains('result')) {
            return
        
        //se o click for em qualquer outra área do card, executa a function
        } else {
            showCard(event.currentTarget)
        }
    })
})


// Functions
function startTimer() {
    let minutes = 0
    let seconds = 0

    startButton.style.pointerEvents = 'none'
                
    setIntervalID = setInterval(() => {
            if (seconds < 59) {
                seconds += 1

            } else {
                minutes += 1
                seconds = 0
            }

            //formatacao de texto
            if (minutes < 10 && seconds < 10) {
                document.querySelector('.time').innerHTML = `0${minutes}:0${seconds}`
            } else if (minutes < 10) {
                document.querySelector('.time').innerHTML = `0${minutes}:${seconds}`
            } else if (seconds < 10) {
                document.querySelector('.time').innerHTML = `${minutes}:0${seconds}`
            } else {
                document.querySelector('.time').innerHTML = `${minutes}:${seconds}`
            }
            
        }, 1000)
}

function stopTimer() {
    clearInterval(setIntervalID)
    startButton.style.pointerEvents = 'all'
}

function filterInputsChecked(inputs) {
    for (let input of inputs) {
        if (input.checked) {
            inputsChecked.push(Number(input.value))
        }
    }
}

function compareAnswers(inputs, answers) {
    inputs.forEach(function(input) {
        if (answers.includes(input)) {
            totalCorrectAnswers += 1
        }
    })
}

function showResult(answers) {
    document.getElementById('results').innerHTML = `Great! Your score: ${answers}/5 (${(answers/5)*100}%)`
}

function showCard(expandedCard){
    if (expandedCard.classList.contains('expands')) {
        expandedCard.classList.remove('expands')
        return

    } else {
        //remove o expands de todos os cards
        cards.forEach((card) => card.classList.remove('expands'))
    }
    //expande o card clicado
    expandedCard.classList.add('expands')
}