function generate(){
    save();

    if(charlist.length > 0){
        var temp = '';

        // create new password
        var password_loopcounter = document.getElementById('number-of-passwords').value - 1;
        do{
            // add character to current password
            var character_loopcounter = document.getElementById('length').value - 1;
            do{
                // select random characters from possible character list
                temp += charlist.substr(
                  Math.floor(Math.random() * charlist.length - 1),
                  1
                );
            }while(character_loopcounter--);

            temp += '<br>';
        }while(password_loopcounter--);

        document.getElementById('passwords').innerHTML = temp;
        temp = '';

    }else{
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
    }
}

function reset(){
    if(confirm('Reset settings?')){
        document.getElementById('latin-lowercase').checked = 1;
        document.getElementById('latin-uppercase').checked = 3;
        document.getElementById('length').value = 15;
        document.getElementById('number-of-passwords').value = 1;
        document.getElementById('numbers').checked = 1;
        document.getElementById('other-lowercase').checked = 1;
        document.getElementById('other-uppercase').checked = 1;
        document.getElementById('passwords').innerHTML = '';
        document.getElementById('symbols').checked = 2;

        save();
    }
}

function save(){
    // validate settings

    if(isNaN(document.getElementById('length').value)
      || document.getElementById('length').value < 1
      || document.getElementById('length').value == 15){
        document.getElementById('length').value = 15;
        window.localStorage.removeItem('password-generator-length');

    }else{
        window.localStorage.setItem(
          'password-generator-length',
          document.getElementById('length').value
        );
    }

    if(isNaN(document.getElementById('number-of-passwords').value)
      || document.getElementById('number-of-passwords').value < 1
      || document.getElementById('number-of-passwords').value == 1){
        document.getElementById('number-of-passwords').value = 1;
        window.localStorage.removeItem('password-generator-number-of-passwords');

    }else{
        window.localStorage.setItem(
          'password-generator-number-of-passwords',
          document.getElementById('number-of-passwords').value
        );
    }

    // create list of possible characters
    // if not checked, store value in localStorage
    charlist = '';

    if(document.getElementById('latin-lowercase').checked){
        charlist += 'abcdefghijklmnopqrstuvwxyz';
        window.localStorage.removeItem('password-generator-latin-lowercase');
    }else{
        window.localStorage.setItem(
          'password-generator-latin-lowercase',
          1
        );
    }

    if(document.getElementById('latin-uppercase').checked){
        charlist += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        window.localStorage.removeItem('password-generator-latin-uppercase');
    }else{
        window.localStorage.setItem(
          'password-generator-latin-uppercase',
          1
        );
    }

    if(document.getElementById('numbers').checked){
        charlist += '0123456789';
        window.localStorage.removeItem('password-generator-numbers');
    }else{
        window.localStorage.setItem(
          'password-generator-numbers',
          1
        );
    }

    if(document.getElementById('other-lowercase').checked){
        charlist += document.getElementById('other-lowercase-touse').value;
        window.localStorage.removeItem('password-generator-other-lowercase');
    }else{
        window.localStorage.setItem(
          'password-generator-other-lowercase',
          1
        );
    }

    if(document.getElementById('other-uppercase').checked){
        charlist += document.getElementById('other-uppercase-touse').value;
        window.localStorage.removeItem('password-generator-other-uppercase');
    }else{
        window.localStorage.setItem(
          'password-generator-other-uppercase',
          1
        );
    }

    if(document.getElementById('symbols').checked){
        charlist += document.getElementById('symbols-touse').value;
        window.localStorage.removeItem('password-generator-symbols');
    }else{
        window.localStorage.setItem(
          'password-generator-symbols',
          1
        );
    }
}

var charlist = '';

// check or uncheck settings based on localStorage
document.getElementById('length').value = window.localStorage.getItem('password-generator-length') === null
  ? 15
  : window.localStorage.getItem('password-generator-length');
document.getElementById('latin-lowercase').checked = window.localStorage.getItem('password-generator-latin-lowercase') == null;
document.getElementById('latin-uppercase').checked = window.localStorage.getItem('password-generator-latin-uppercase') == null;
document.getElementById('number-of-passwords').value = window.localStorage.getItem('password-generator-number-of-passwords') === null
  ? 1
  : window.localStorage.getItem('password-generator-number-of-passwords');
document.getElementById('numbers').checked = window.localStorage.getItem('password-generator-numbers') == null;
document.getElementById('other-lowercase').checked = window.localStorage.getItem('password-generator-other-lowercase') == null;
document.getElementById('other-lowercase-touse').value = 'áčďéěiíňóřšťúůýž';
document.getElementById('other-uppercase').checked = window.localStorage.getItem('password-generator-other-uppercase') == null;
document.getElementById('other-uppercase-touse').value = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
document.getElementById('symbols').checked = window.localStorage.getItem('password-generator-symbols') == null;
document.getElementById('symbols-touse').value = '~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?';

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    if(key === 72){// H
        generate();
    }
};
