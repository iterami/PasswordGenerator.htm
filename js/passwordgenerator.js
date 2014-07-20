function generate(){
    save();

    if(charlist.length > 0){
        var passwords = '';

        // create new password
        var password_loopcounter = document.getElementById('number-of-passwords').value - 1;
        do{
            // add character to current password
            var character_loopcounter = document.getElementById('length').value - 1;
            do{
                // select random characters from possible character list
                // handle the HTML symbols
                // and add it to the passwords string
                passwords += charlist.substr(
                  Math.floor(Math.random() * charlist.length - 1),
                  1
                ).replace(/&/g,'&amp;') // &
                 .replace(/>/g,'&gt;') // >
                 .replace(/</g,'&lt;') // <
                 .replace(/"/g,'&quot;'); // "
            }while(character_loopcounter--);

            passwords += '<br>';
        }while(password_loopcounter--);

        document.getElementById('passwords').innerHTML = passwords;

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
        window.localStorage.removeItem('passwordgenerator-length');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-length',
          document.getElementById('length').value
        );
    }

    if(isNaN(document.getElementById('number-of-passwords').value)
      || document.getElementById('number-of-passwords').value < 1
      || document.getElementById('number-of-passwords').value == 1){
        document.getElementById('number-of-passwords').value = 1;
        window.localStorage.removeItem('passwordgenerator-number-of-passwords');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-number-of-passwords',
          document.getElementById('number-of-passwords').value
        );
    }

    // create list of possible characters
    // if not checked, store value in localStorage
    charlist = '';

    if(document.getElementById('latin-lowercase').checked){
        charlist += 'abcdefghijklmnopqrstuvwxyz';
        window.localStorage.removeItem('passwordgenerator-latin-lowercase');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-latin-lowercase',
          1
        );
    }

    if(document.getElementById('latin-uppercase').checked){
        charlist += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        window.localStorage.removeItem('passwordgenerator-latin-uppercase');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-latin-uppercase',
          1
        );
    }

    if(document.getElementById('numbers').checked){
        charlist += '0123456789';
        window.localStorage.removeItem('passwordgenerator-numbers');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-numbers',
          1
        );
    }

    if(document.getElementById('other-lowercase').checked){
        charlist += document.getElementById('other-lowercase-touse').value;
        window.localStorage.removeItem('passwordgenerator-other-lowercase');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-other-lowercase',
          1
        );
    }

    if(document.getElementById('other-uppercase').checked){
        charlist += document.getElementById('other-uppercase-touse').value;
        window.localStorage.removeItem('passwordgenerator-other-uppercase');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-other-uppercase',
          1
        );
    }

    if(document.getElementById('symbols').checked){
        charlist += document.getElementById('symbols-touse').value;
        window.localStorage.removeItem('passwordgenerator-symbols');

    }else{
        window.localStorage.setItem(
          'passwordgenerator-symbols',
          1
        );
    }
}

var charlist = '';

// check or uncheck settings based on localStorage
document.getElementById('length').value = window.localStorage.getItem('passwordgenerator-length') === null
  ? 15
  : window.localStorage.getItem('passwordgenerator-length');

document.getElementById('latin-lowercase').checked =
  window.localStorage.getItem('passwordgenerator-latin-lowercase') === null;

document.getElementById('latin-uppercase').checked =
  window.localStorage.getItem('passwordgenerator-latin-uppercase') === null;

document.getElementById('number-of-passwords').value =
  window.localStorage.getItem('passwordgenerator-number-of-passwords') === null
    ? 1
    : window.localStorage.getItem('passwordgenerator-number-of-passwords');

document.getElementById('numbers').checked =
  window.localStorage.getItem('passwordgenerator-numbers') === null;

document.getElementById('other-lowercase').checked =
  window.localStorage.getItem('passwordgenerator-other-lowercase') === null;

document.getElementById('other-lowercase-touse').value = 'áčďéěiíňóřšťúůýž';

document.getElementById('other-uppercase').checked =
  window.localStorage.getItem('passwordgenerator-other-uppercase') === null;

document.getElementById('other-uppercase-touse').value = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';

document.getElementById('symbols').checked =
  window.localStorage.getItem('passwordgenerator-symbols') === null;

document.getElementById('symbols-touse').value = '~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?';

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    if(key === 72){// H
        generate();
    }
};
