let menu = true;
let int_cont = document.getElementById('int-cont');
Menu();

function Menu() {
    menu = true;
    fetch('/MENU/index.html').then(response => {
        return response.text();
    }).then(header => {
        $('head').append('<link rel="stylesheet" href="/MENU/style.css">');
        $('.int-cont').empty();
        int_cont.insertAdjacentHTML("afterbegin", header);
        //$('.int-cont').append(header);
        console.log(header)
    });
}

let tb_timer, tb_t;
inputBoxDefault();

function inputBoxDefault() {
    $('#input-box').text(" ");
    tb_t = setTimeout(() => {$('#input-box').text("_")},"500")
    tb_timer = setTimeout(inputBoxDefault, "1000");
}

$( "body" ).keypress(function(e) {
    if (e.which <= 55 && e.which >= 49 && menu == true) {
        clearTimeout(tb_timer); clearTimeout(tb_t);
        $('#input-box').text(e.key);
        
        if (e.which == 49) {
            $('.int-cont').css({'border': '2px solid rgb(29, 146, 255)'})
                fetch('/WEL/start.html').then(response => {
                    return response.text();
                    }).then(header => {
                    $('.int-cont').empty();
                    // let int_cont = document.getElementById('int-cont');
                    console.log(header)
                    $('.int-cont').append(header);
                    if($('.wel'.length)){
                        $('head').append('<link class="wel" rel="stylesheet" href="/WEL/style.css">');
                        $('head').append('<script class="wel" src="/WEL/wel.js" defer></script>')
                    }
                    menu = false;
            });
        } else if (e.which == 50) {
            //Warm-up Exercise (words)
        } else if (e.which == 51) {
            //Eye Movement Lesson
        } else if (e.which == 52) {
            //Column Reading Lesson
        } else if (e.which == 53) {
            //Reading Passage Lesson
        } else if (e.which == 54) {
            //Timed Reading Test
        } else if (e.which == 55) {
            //Stop for Now
        } 
        
    }
});