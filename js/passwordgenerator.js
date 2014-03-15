function generate(){
    save();

    if(charlist.length > 0){
        temp = '';

        // create new password
        j = document.getElementById(7).value - 1;
        do{
            // add character to current password
            i = document.getElementById(0).value - 1;
            do{
                // select random characters from possible character list
                temp += charlist.substr(Math.floor(Math.random() * charlist.length - 1), 1);
            }while(i--);

            temp += '<br>';
        }while(j--);

        document.getElementById('password').innerHTML = temp;
        temp = '';

    }else{
        document.getElementById('password').innerHTML = 'You must select at least one option.';
    }
}

function reset(){
    if(confirm('Reset settings?')){
        document.getElementById(0).value = 15;
        document.getElementById(1).checked = 1;
        document.getElementById(2).checked = 1;
        document.getElementById(3).checked = 1;
        document.getElementById(4).checked = 2;
        document.getElementById(5).checked = 3;
        document.getElementById(6).checked = 1;
        document.getElementById(7).value = 1;
        document.getElementById('password').innerHTML = '';

        save();
    }
}

function save(){
    // validate settings
    if(isNaN(document.getElementById(0).value)
      || document.getElementById(0).value < 1
      || document.getElementById(0).value == 15){
        document.getElementById(0).value = 15;
        window.localStorage.removeItem('password-generator-0');

    }else{
        window.localStorage.setItem(
            'password-generator-0',
            document.getElementById(0).value
        );
    }

    if(isNaN(document.getElementById(7).value)
      || document.getElementById(7).value < 1
      || document.getElementById(7).value == 1){
        document.getElementById(7).value = 1;
        window.localStorage.removeItem('password-generator-7');

    }else{
        window.localStorage.setItem(
            'password-generator-7',
            document.getElementById(7).value
        );
    }

    // create list of possible characters
    i = 5;
    charlist = '';
    do{
        if(document.getElementById(i + 1).checked){
            if(i === 0){
                // lowercase letters
                charlist += 'abcdefghijklmnopqrstuvwxyz';

            }else if(i === 1){
                // lowercase special letters
                charlist += 'áčďéěiíňóřšťúůýž';

            }else if(i === 2){
                // numbers
                charlist += '0123456789';

            }else if(i === 3){
                // symbols
                charlist += '~!@#$%^&*()-_=+[{]}|,.;:"?/';

            }else if(i === 4){
                // uppercase letters
                charlist += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            }else{
                // upercase special letters
                charlist += 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
            }

            window.localStorage.removeItem('password-generator-' + (i + 1));

        }else{
            window.localStorage.setItem(
                'password-generator-' + (i + 1),
                1
            );
        }
    }while(i--);
}

var charlist = '';
var i = 0;
var j = 5;
var temp = '';

document.getElementById(0).value = window.localStorage.getItem('password-generator-0') === null
  ? 15
  : window.localStorage.getItem('password-generator-0');
document.getElementById(1).checked = window.localStorage.getItem('password-generator-1') == null;
document.getElementById(2).checked = window.localStorage.getItem('password-generator-2') == null;
document.getElementById(3).checked = window.localStorage.getItem('password-generator-3') == null;
document.getElementById(4).checked = window.localStorage.getItem('password-generator-4') == null;
document.getElementById(5).checked = window.localStorage.getItem('password-generator-5') == null;
document.getElementById(6).checked = window.localStorage.getItem('password-generator-6') == null;
document.getElementById(7).value = window.localStorage.getItem('password-generator-7') === null
  ? 1
  : window.localStorage.getItem('password-generator-7');

window.onkeydown = function(e){
    i = window.event ? event : e;
    i = i.charCode ? i.charCode : i.keyCode;

    if(i === 72){// H
        generate();
    }
}
