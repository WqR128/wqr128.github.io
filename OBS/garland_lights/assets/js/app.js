

'use strict';


let decorInner = document.querySelectorAll('.b-head-decor__inner');
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function randomRenderBall() {
    for (let i = 0; i < decorInner.length; i++) {
        let ranArr = shuffle(arr);
        for (let n = 0; n < 8; n++) {
            decorInner[i].innerHTML += `
            <div class="b-ball b-ball_n${ranArr[n]} b-ball_bounce" >
    			  <div class="b-ball__right"></div>
    			  <div class="b-ball__i"></div>
    		 </div>
            `;
        }
        for (let x = 0; x < 7; x++) {
            decorInner[i].innerHTML += `
            <div class="b-ball b-ball_i${x}">
              <div class="b-ball__right"></div>
              <div class="b-ball__i"></div>
              </div>
            `;
        }

    }

}


randomRenderBall()


var array2 = document.querySelectorAll('.b-ball_bounce .b-ball__right');

for (var i = 0; i < array2.length; i++) {
    array2[i].addEventListener('mouseenter', function() {
        ballBounce(this);
    });
}


function ballBounce(el) {
    if (el.className.indexOf(" bounce") > -1) {
        return;
    }
    toggleBounce(el);
}


function toggleBounce(i) {
    i.classList.add("bounce");

    function n() {
        i.classList.remove("bounce");
        i.classList.add("bounce1");

        function o() {
            i.classList.remove("bounce1");
            i.classList.add("bounce2");

            function p() {
                i.classList.remove("bounce2");
                i.classList.add("bounce3");

                function q() {
                    i.classList.remove("bounce3");
                }
                setTimeout(q, 300);
            }
            setTimeout(p, 300);
        }
        setTimeout(o, 300);
    }
    setTimeout(n, 300);
}


let watcher = setInterval(() => {
    let rand = Math.floor(Math.random() * array2.length);

    ballBounce(array2[rand]);
    console.log(`bonk ` + rand)

}, 4000);


let lightrope = document.querySelectorAll('.lightrope li');

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function randomLightrope() {
    for (let i = 0; i < lightrope.length; i++) {

        lightrope[i].style.transform = "rotate(" + getRandomArbitrary(-15, 15) + "deg)";
    }

}


randomLightrope()