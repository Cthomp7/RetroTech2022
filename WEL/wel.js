let letterPicked = 0;
let speed = 4300;
let tries = 0;
let won = 0;
let lostScene = false, scoreScene = false;
let timer, u_timer;
let scores = [];

$("body").keypress(function(e) {
    if (e.which == 32) {
        if ($('.title').length) {
            console.log("triggered")
            $('.interface').css({'border-color': 'lime'})
            $('.int-cont').css({'border': 'none'})
            fetch('/WEL/game.html').then(response => {
                return response.text();
              }).then(game => {
                $('.int-cont').empty();
                $('.int-cont').append(game);
                Game();
            });
        } else if (lostScene == true) {
            restartGame('lost');
            lostScene = false;
        } else if (scoreScene = true) {
            $('.int-cont').empty();
            Menu();
        }
    }
    if (e.which == 50 && lostScene == true) {
        lostScene = false;
        scores.push(...[tries, won]);
        fetch('/WEL/score.html').then(response => {
            return response.text();
          }).then(scoreHTML => {
            $('.int-cont').empty();
            $('.int-cont').append(scoreHTML);
            calculateScore();
        });
    }
    //TODO: Integrate 3 words mechanic (next level)
    // } else if (e.which == 49 && lostScene == true) {
    //     scores.push(...[tries, won]);
    //     speed = 4300; tries = 0; won = 0;
    //     $('.user').append('<p class="res-letter"></p>');
    //     $('.comp').append('<p class="res-letter"></p>')
    //     restartGame('new');
    // }
    if (e.which >= 97 && e.which <= 122 && $('.res').prop("style")["display"] == 'block') {
        if (letterPicked == 0) {
            clearTimeout(timer); clearTimeout(u_timer);
            $('.user .res-letter:nth-of-type(1)').text(e.key.toUpperCase());
            responseIdle(2);
        } else if (letterPicked == 1) {
            clearTimeout(timer); clearTimeout(u_timer);
            $('.user .res-letter:nth-of-type(2)').text(e.key.toUpperCase());
            checkAnswers();
        }
        letterPicked++;
    }
});

function Game() {
    tries++;
    $('.white-box').css({'opacity': '1'})
    setTimeout(()=> {$('.white-box').css({'opacity': '0'})}, "1000");
    setTimeout(() => {
        $('.letter:nth-of-type(1)').text(randomLetter());
        $('.letter:nth-of-type(2)').text(randomLetter());
    }, "1000");
    setTimeout(()=> {
        $('.req').css({'display':'none'});
        let spd = won + 1;
        $('.spd').text(`${spd.toString()}`)
        $('.res').css({'display':'block'});
        responseIdle(1);
    },`${speed}`)
}

function checkAnswers() {
    $('.comp .res-letter:nth-of-type(1)').text($('.letter:nth-of-type(1)').text());
    $('.comp .res-letter:nth-of-type(2)').text($('.letter:nth-of-type(2)').text());
    if ($('.user .res-letter:nth-of-type(1)').text() == $('.letter:nth-of-type(1)').text() || $('.user .res-letter:nth-of-type(2)').text() == $('.letter:nth-of-type(2)').text()) {
        $('.result').text("That's right.");
        $('.res-p').text("");
        setTimeout(() => {
            restartGame('won');
            won++;
        }, "3000");
    } else {
        $('.result').text("Wrong.");
        $('.res-p').text("Press space bar to continue");
        lost++;
        lostScene = true;
    }
    $('.options').css({'opacity':'1'});
}

function restartGame(result) {
    $('.letter').text("");
    $('.res-letter').text("");
    $('.res').css({'display':'none'});
    $('.options').css({'opacity':'0'});
    $('.req').css({'display':'block'});
    letterPicked = 0;
    if (result == 'won') {
        speed /= 1.5;
    }
    Game();
}

function randomLetter() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    console.log(result);
    return(result);
}

function responseIdle(answer) {
    $(`.user .res-letter:nth-of-type(${answer})`).text("");
    u_timer = setTimeout(() => {$(`.user .res-letter:nth-of-type(${answer})`).text("_")},"500");
    timer = setTimeout(() => {responseIdle(answer)}, "1000");
}

// ---------------- SCORE BOARD CODE ---------------- 

function calculateScore() {
    console.log(scores.length)
    if (scores.length == 2) {
        $('.l-tries p:nth-of-type(1)').text(`${scores[0].toString()}`);
        $('.l-correct p:nth-of-type(1)').text(`${(Math.round((scores[1]/scores[0])*100)).toString()} %`);
        $('.l-speed p:nth-of-type(1)').text(`${(scores[1]+1).toString()}`);
    }
    scoreScene = true;
}