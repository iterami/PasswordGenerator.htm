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
        document.getElementById('latin-lowercase').checked = true;
        document.getElementById('latin-uppercase').checked = true;
        document.getElementById('length').value = 15;
        document.getElementById('number-of-passwords').value = 1;
        document.getElementById('numbers').checked = true;
        document.getElementById('other-lowercase').checked = true;
        document.getElementById('other-uppercase').checked = true;
        document.getElementById('passwords').innerHTML = '';
        document.getElementById('symbols').checked = true;

        save();
    }
}

function save(){
    // validate settings

    if(isNaN(document.getElementById('length').value)
      || document.getElementById('length').value < 1
      || document.getElementById('length').value == 15){
        document.getElementById('length').value = 15;
        window.localStorage.removeItem('PasswordGenerator.htm-length');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-length',
          document.getElementById('length').value
        );
    }

    if(isNaN(document.getElementById('number-of-passwords').value)
      || document.getElementById('number-of-passwords').value < 1
      || document.getElementById('number-of-passwords').value == 1){
        document.getElementById('number-of-passwords').value = 1;
        window.localStorage.removeItem('PasswordGenerator.htm-number-of-passwords');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-number-of-passwords',
          document.getElementById('number-of-passwords').value
        );
    }

    // create list of possible characters
    // if not checked, store value in localStorage
    charlist = '';

    if(document.getElementById('latin-lowercase').checked){
        charlist += 'abcdefghijklmnopqrstuvwxyz';
        window.localStorage.removeItem('PasswordGenerator.htm-latin-lowercase');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-latin-lowercase',
          1
        );
    }

    if(document.getElementById('latin-uppercase').checked){
        charlist += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        window.localStorage.removeItem('PasswordGenerator.htm-latin-uppercase');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-latin-uppercase',
          1
        );
    }

    if(document.getElementById('numbers').checked){
        charlist += '0123456789';
        window.localStorage.removeItem('PasswordGenerator.htm-numbers');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-numbers',
          1
        );
    }

    if(document.getElementById('other-lowercase').checked){
        charlist += document.getElementById('other-lowercase-touse').value;
        window.localStorage.removeItem('PasswordGenerator.htm-other-lowercase');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-other-lowercase',
          1
        );
    }

    if(document.getElementById('other-uppercase').checked){
        charlist += document.getElementById('other-uppercase-touse').value;
        window.localStorage.removeItem('PasswordGenerator.htm-other-uppercase');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-other-uppercase',
          1
        );
    }

    if(document.getElementById('symbols').checked){
        charlist += document.getElementById('symbols-touse').value;
        window.localStorage.removeItem('PasswordGenerator.htm-symbols');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-symbols',
          1
        );
    }
}

var charlist = '';

// check or uncheck settings based on localStorage
document.getElementById('length').value = window.localStorage.getItem('PasswordGenerator.htm-length') === null
  ? 15
  : window.localStorage.getItem('PasswordGenerator.htm-length');

document.getElementById('latin-lowercase').checked =
  window.localStorage.getItem('PasswordGenerator.htm-latin-lowercase') === null;

document.getElementById('latin-uppercase').checked =
  window.localStorage.getItem('PasswordGenerator.htm-latin-uppercase') === null;

document.getElementById('number-of-passwords').value =
  window.localStorage.getItem('PasswordGenerator.htm-number-of-passwords') === null
    ? 1
    : window.localStorage.getItem('PasswordGenerator.htm-number-of-passwords');

document.getElementById('numbers').checked =
  window.localStorage.getItem('PasswordGenerator.htm-numbers') === null;

document.getElementById('other-lowercase').checked =
  window.localStorage.getItem('PasswordGenerator.htm-other-lowercase') === null;

document.getElementById('other-lowercase-touse').value = 'áčďéěiíňóřšťúůýž';

document.getElementById('other-uppercase').checked =
  window.localStorage.getItem('PasswordGenerator.htm-other-uppercase') === null;

document.getElementById('other-uppercase-touse').value = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';

document.getElementById('symbols').checked =
  window.localStorage.getItem('PasswordGenerator.htm-symbols') === null;

document.getElementById('symbols-touse').value = '~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?';

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    if(key === 72){// H
        generate();
    }
};
