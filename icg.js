var screens = document.querySelectorAll('.screen')

var choose_insect_btns = document.querySelectorAll('.choose-insect-btn')
var start_btn = document.getElementById('start-btn')
var game_container = document.querySelector('game-container')
var timeeEl = document.getElementById('time')
var scoreEl = document.getElementById('score')
var message = document.getElementById('message')

let seconds = 0
let score = 0
let selected_insect = {}

start_btn.addEventListener('click' , () => screens[0].classList.add('up'))

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        var img = btn.querySelector('img')
        var src = img.getAttribute('src')
        var alt = img.getAttribute('alt')

        selected_insect = {src,  alt}
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
}) 

function startGame(){
    setInterval(increasetime, 1000)
}

function increasetime(){
    let  m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeeEl.innerHTML = `Time: ${m} : ${s}`
    seconds++
}

function createInsect(){
    var insect = document.createElement('div')
    insect.classList.add('insect')
    var { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML - `<img src="${selected_insect.src} alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)"/>`

    insect.addEventListener('click' , catchInsect)
    game_container.appendChild(insect)
}

function getRandomLocation(){
    var width = window.innerWidth
    var height = window.innerHeight
    var x = Math.random() * (width - 200) + 100
    var y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect(){
   increacsescore() 
   this.classList.add(caught)
   setTimeout(() => this.remove(), 2000)
   addInsects()
}

function addInsects(){
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increacsescore(){
    score++
    if(score > 19){
        message.classList.add('visible')
    }

    scoreEl.innerHTML = `Score: ${score}`
}