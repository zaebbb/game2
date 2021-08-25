//  globals
let buttonStartGame = document.querySelector('.startGame button')
let startGameNamePlayer = document.querySelector('.nameHero')
let audioBg = document.querySelector('.audioBg audio')
let startMenu = document.querySelector('.startMenu')
let loadVideo = document.querySelector('.loadVideo')
let videoLoaded = document.querySelector('.videoLoaded')
let giens = document.querySelector('.giens')
let game = document.querySelector('.game')
let animal = document.querySelector('.playerAnimal');
let platforms = document.querySelector('.platforms');
let foodIndicator = document.querySelector('.food_eat span')
let endGameDeclared = document.querySelector('.gameEnd');

// end
let nameValue = document.querySelector('.name');
let ratingValue = document.querySelector('.rating');
let submitValue = document.querySelector('.submit');

audioBg.play();
audioBg.addEventListener("canplaythrough", event => {
    /* аудио может быть воспроизведено; проиграть, если позволяют разрешения */
    audioBg.play();
  });

// settings persons
let timonSkin = document.querySelector('.timon img');
let pumbaSkin = document.querySelector('.pumba img');

timonSkin.addEventListener('click', () => {
    timonSkin.classList.add('filtNone');
    pumbaSkin.classList.add('filt');
    pumbaSkin.classList.remove('filtNone');
    checkDataStartGame();
    animal.src = "./img/skin_game_timon.png"
})
pumbaSkin.addEventListener('click', () => {
    pumbaSkin.classList.add('filtNone');
    timonSkin.classList.remove('filtNone');
    timonSkin.classList.add('filt');
    checkDataStartGame();
    animal.src = "./img/skin_game_pumba.png"
})

//  check data start game
function checkDataStartGame(){
    if(timonSkin.classList.contains('filtNone') || 
       pumbaSkin.classList.contains('filtNone') &&
       !!startGameNamePlayer && 
       startGameNamePlayer.value !== '' &&
       startGameNamePlayer.value !== ' '
    ){
        buttonStartGame.classList.add('start');
        return;
    }
    else{
        buttonStartGame.classList.remove('start');
        return;
    }
}

//  manual
document.querySelector('.manual').addEventListener('click', () => {
    document.querySelector('.menualDescr').classList.toggle('hidd')
})

// start game
buttonStartGame.addEventListener('click', () => {
    audioBg.pause();
    startMenu.classList.add('hidd');
    setTimeout(() => {
        startMenu.classList.add('dn');

        loadVideo.classList.remove('dn')

        setTimeout(() => {
            loadVideo.classList.remove('hidd')

            setTimeout(() => {
                videoLoaded.play();

                setTimeout(() => {
                    videoLoaded.pause();

                    setTimeout(() => {
                        loadVideo.classList.add('hidd');

                        setTimeout(() => {
                            loadVideo.classList.add('dn');

                            game.classList.remove('dn')

                            setTimeout(() => {
                                game.classList.remove("hidd")
                                playGame();
                            }, 500)
                        }, 500)
                    }, 500)
                }, 5000)
            }, 500)
        }, 500)
    }, 500)
})

function playGame() {
    function keyClick(e){
        animal.style.transition = "left 0.5s"
        if(e.key == "ArrowUp"){
            animal.style.bottom = '300px';
            setTimeout(() => {
                animal.style.transition = "bottom 2s"
                animal.style.bottom = '65px';
            }, 500)
            animal.style.transition = "bottom 0.5s"
        }
        if(e.key == "ArrowDown"){
            animal.style.transition = "bottom 0.5s"
            animal.style.bottom = '-70px';
            setTimeout(() => {
                animal.style.bottom = '65px';
            }, 500)
        }
        if(e.key == "ArrowLeft"){
            if(animal.style.left != "0px"){
                animal.style.left = (parseInt(animal.style.left) || 0) - 20 + "px";
            }
            animal.style.transform = "rotateY(180deg)"
            animal.style.transition = "left 0.5s"
        }
        if(e.key == "ArrowRight"){
            if(animal.style.left != "1000px"){
                animal.style.left = (parseInt(animal.style.left) || 0) + 20 + "px";
            }
            animal.style.transform = "rotateY(0deg)"
            animal.style.transition = "left 0.5s"
        }
    }

    function formatTime(time){
        return time < 10 ? (`0${time}`) : time;
    }

    // timer
    let minutes = document.querySelector('.minutes')
    let seconds = document.querySelector('.seconds')
    let minutesNumber = 0;
    let secondsNumber = 0;

    let timer = 0;
    setInterval(() => {
        timer++;
        secondsNumber++;

        seconds.textContent = formatTime(secondsNumber)
        if(secondsNumber % 60 === 0){
            secondsNumber = 0
            seconds.textContent = formatTime(secondsNumber)
        }

        if(timer % 60 === 0){
            minutesNumber++;
            secondsNumber = 0;
            minutes.textContent = formatTime(minutesNumber)
        }
    }, 1000)

    // hp
    let countFood = 0;
    let hp = 100;
    let hpIndicate = document.querySelector('.hp span')
    setInterval(() => {
        hp--;

        hpIndicate.textContent = hp + " HP"
    }, 1000)


    setInterval(() => {
        let giena = document.createElement("img");
        giena.src = "./img/scene_giena.png";
        giena.classList.add('giena')
        giens.appendChild(giena)
        giena.style.right = "-500px";
        setTimeout(() => {
            giena.style.right = "2000px";
        }, 500)
    }, 6000)
    audioBg.play();

    setInterval(() => {
        // platform
        let platform = document.createElement('div');
        platform.classList.add('platform');

        // platform block
        let platformBlock = document.createElement('img');
        platformBlock.classList.add('platformBlock');
        platformBlock.src = './img/platform.png'

        // add platformBlock to platformBlock
        platform.appendChild(platformBlock);

        // foods
        let foods = document.createElement('div')
        foods.classList.add('foods');

        platform.appendChild(foods)

        // food
        let food = document.createElement('img');
        food.classList.add('food')
        
        for(let i = 0; i < 2;i++){
            food.src = './img/food_'+ Math.floor(Math.random() * 3 + 1) +'.png'
            foods.appendChild(food)
        }


        platforms.appendChild(platform)

        platformBlock.style.right = "-500px"
        platformBlock.style.bottom = Math.random() * 100 + 100 + "px"
        food.style.bottom =  250 + "px"
        food.style.right = - Math.random() * 100 - 200 + "px"
        setTimeout(() => {
            platformBlock.style.transition = "right "+ (Math.random() * 10 + 20) +"s"
            platformBlock.style.right = "4000px"

            food.style.right = "4000px"
            food.style.transition = platformBlock.style.transition
        }, 500)
    }, 5000)

    document.addEventListener('keydown', keyClick)


    setInterval(() => {
        let gienaAll = document.querySelectorAll('.giena');
        for(let i = 0; i < gienaAll.length; i++){
            if(
                gienaAll[i].getBoundingClientRect().left > animal.getBoundingClientRect().left && 
                gienaAll[i].getBoundingClientRect().left - 150 < animal.getBoundingClientRect().left &&
                animal.getBoundingClientRect().top > 600 &&
                animal.getBoundingClientRect().top < 820
            ){
                // alert('dlmfsdjf')
                animal.style.transition = "filter 0s !importnant"
                animal.style.filter = 'hue-rotate(270deg)'
                setTimeout(() => {
                    animal.style.filter = 'hue-rotate(0deg)'
                    
                }, 200)
                setTimeout(() => {
                    hp -= 10;
                }, 1000)
            }
            
        }
    }, 100)

    setInterval(() => {
        let platformsAll = document.querySelectorAll('.platformBlock')
        for(let i = 0; i < platformsAll.length; i++) {
            if(
                platformsAll[i].getBoundingClientRect().left > animal.getBoundingClientRect().left &&
                platformsAll[i].getBoundingClientRect().left - 150 < animal.getBoundingClientRect().left &&
                platformsAll[i].getBoundingClientRect().bottom > animal.getBoundingClientRect().bottom
            ){
                animal.style.bottom = "300px";
                setTimeout(() => {
                    
                }, 500)
                setTimeout(() => {
                    animal.style.bottom = "65px";
                }, 1000)
            }
        }
    }, 100)

    setInterval(() => {
        let foodAll = document.querySelectorAll('.food');
        for(let i = 0; i < foodAll.length; i++){
            if(
                foodAll[i].getBoundingClientRect().left > animal.getBoundingClientRect().left && 
                foodAll[i].getBoundingClientRect().left - 150 < animal.getBoundingClientRect().left && 
                foodAll[i].getBoundingClientRect().bottom > animal.getBoundingClientRect().bottom
            ){
                foodAll[i].style.display = "none";
                hp += 15
                countFood++;
                foodIndicator.textContent = countFood + " - съедено гусениц";
            }
        }

        
        if(hp <= 0){
            endGame(timer, countFood);
            return;
        }
    }, 100)

        
}

function endGame(timer, countFood){
    let time = timer
    let count = countFood;

    let rating = 1000 - time + count * 10;

    setTimeout(() => {
        game.classList.add("hidd")
        
        setTimeout(() => {
            game.classList.add('dn')

            endGameDeclared.classList.remove("dn")

            setTimeout(() => {
                endGameDeclared.classList.remove("hidd")
            }, 500)
        }, 500)
    }, 500)

    nameValue.value = startGameNamePlayer.value;
    ratingValue.value = rating;

    submitValue.addEventListener('click', (e) => {
        e.preventDefault();

        setTimeout(() => {
            location.reload()
        }, 1000)
    })
}