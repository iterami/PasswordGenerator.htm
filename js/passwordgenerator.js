function generate(){
    save();

    if(charlist.length > 0){
        temp = '';

        /* create new password */
        j = get(7).value - 1;
        do{
            /* add character to current password */
            i = get(0).value - 1;
            do{
                /* select random characters from possible character list */
                temp += charlist.substr(Math.floor(Math.random() * charlist.length - 1), 1);
            }while(i--);

            temp += '<br>';
        }while(j--);

        get('password').innerHTML = temp;
        temp = '';

    }else{
        get('password').innerHTML = 'You must select at least one option.';
    }
}

function get(i){
    return document.getElementById(i);
}

function reset(){
    if(confirm('Reset settings?')){
        get(0).value = 15;
        get(1).checked = 1;
        get(2).checked = 1;
        get(3).checked = 1;
        get(4).checked = 2;
        get(5).checked = 3;
        get(6).checked = 1;
        get(7).value = 1;
        get('password').innerHTML = '';

        save();
    }
}

function save(){
    /* validate settings */
    if(isNaN(get(0).value) || get(0).value < 1 || get(0).value == 15){
        get(0).value = 15;
        ls.removeItem('password-generator-0');

    }else{
        ls.setItem(
            'password-generator-0',
            get(0).value
        );
    }

    if(isNaN(get(7).value) || get(7).value < 1 || get(7).value == 1){
        get(7).value = 1;
        ls.removeItem('password-generator-7');

    }else{
        ls.setItem(
            'password-generator-7',
            get(7).value
        );
    }

    /* create list of possible characters */
    i = 5;
    charlist = '';
    do{
        if(get(i + 1).checked){
            if(i === 0){
                /* lowercase letters */
                charlist += 'abcdefghijklmnopqrstuvwxyz';

            }else if(i === 1){
                /* lowercase special letters */
                charlist += 'áčďéěiíňóřšťúůýž';

            }else if(i === 2){
                /* numbers */
                charlist += '0123456789';

            }else if(i === 3){
                /* symbols */
                charlist += '~!@#$%^&*()-_=+[{]}|,.;:"?/';

            }else if(i === 4){
                /* uppercase letters */
                charlist += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            }else{
                /* upercase special letters */
                charlist += 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
            }

            ls.removeItem('password-generator-' + (i + 1));

        }else{
            ls.setItem(
                'password-generator-' + (i + 1),
                1
            );
        }
    }while(i--);
}

var charlist = '';
var i = 0;
var j = 5;
var ls = window.localStorage;
var temp = '';

get(0).value = ls.getItem('password-generator-0') === null ? 15 : ls.getItem('password-generator-0');
get(1).checked = ls.getItem('password-generator-1') == null;
get(2).checked = ls.getItem('password-generator-2') == null;
get(3).checked = ls.getItem('password-generator-3') == null;
get(4).checked = ls.getItem('password-generator-4') == null;
get(5).checked = ls.getItem('password-generator-5') == null;
get(6).checked = ls.getItem('password-generator-6') == null;
get(7).value = ls.getItem('password-generator-7') === null ? 1 : ls.getItem('password-generator-7');

window.onkeydown = function(e){
    i = window.event ? event : e;
    i = i.charCode ? i.charCode : i.keyCode;

    if(i === 72){/* H */
        generate();
    }
}
