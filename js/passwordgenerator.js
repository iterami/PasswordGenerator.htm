'use strict';

function generate(){
    save();

    if(charlist.length <= 0){
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
        return;
    }

    var passwords = '';

    // Create new password.
    var password_loopcounter = document.getElementById('number-of-passwords').value - 1;
    var character_looptotal = document.getElementById('length').value - 1;
    do{
        // Add character to current password.
        var character_loopcounter = character_looptotal;
        do{
            // Select random characters from possible character list...
            //   ...handle the HTML symbols...
            //   ...and add it to the passwords string.
            passwords += charlist.substr(
              Math.floor(Math.random() * charlist.length - 1),
              1
            ).replace(/&/g,'&amp;')
             .replace(/>/g,'&gt;')
             .replace(/</g,'&lt;')
             .replace(/"/g,'&quot;');
        }while(character_loopcounter--);

        passwords += '<br>';
    }while(password_loopcounter--);

    document.getElementById('passwords').innerHTML = passwords;
}

function reset(override){
    if(!override
      && !window.confirm('Reset settings?')){
        return;
    }

    document.getElementById('latin-lowercase').checked = true;
    document.getElementById('latin-uppercase').checked = true;
    document.getElementById('length').value = 15;
    document.getElementById('number-of-passwords').value = 1;
    document.getElementById('numbers').checked = true;
    document.getElementById('other-lowercase').checked = true;
    document.getElementById('other-lowercase-touse').value = 'áčďéěiíňóřšťúůýž';
    document.getElementById('other-uppercase').checked = true;
    document.getElementById('other-uppercase-touse').value = 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ';
    document.getElementById('symbols').checked = true;
    document.getElementById('symbols-touse').value = '~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?';

    save();
}

// Save settings into window.localStorage if they differ from default.
function save(){
    var length = document.getElementById('length').value;
    if(isNaN(length)
      || length < 1
      || length == 15){
        document.getElementById('length').value = 15;
        window.localStorage.removeItem('PasswordGenerator.htm-length');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-length',
          length
        );
    }

    var number_of_passwords = document.getElementById('number-of-passwords').value;
    if(isNaN(number_of_passwords)
      || number_of_passwords < 1
      || number_of_passwords == 1){
        document.getElementById('number-of-passwords').value = 1;
        window.localStorage.removeItem('PasswordGenerator.htm-number-of-passwords');

    }else{
        window.localStorage.setItem(
          'PasswordGenerator.htm-number-of-passwords',
          number_of_passwords
        );
    }

    // Create list of possible characters.
    charlist = '';
    var ids = {
      'latin-lowercase': 'abcdefghijklmnopqrstuvwxyz',
      'latin-uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'numbers': '0123456789',
      'other-lowercase': document.getElementById('other-lowercase-touse').value,
      'other-uppercase': document.getElementById('other-uppercase-touse').value,
      'symbols': document.getElementById('symbols-touse').value,
    };
    for(var id in ids){
        if(document.getElementById(id).checked){
            charlist += ids[id];
            window.localStorage.removeItem('PasswordGenerator.htm-' + id);

        }else{
            window.localStorage.setItem(
              'PasswordGenerator.htm-' + id,
              1
            );
        }
    }
}

var charlist = '';

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ENTER: generate a new password.
    if(key === 13){
        generate();
    }
};

window.onload = function(e){
    reset(true);

    // Fetch settings from window.localStorage and update settings inputs.
    var ids = [
      'latin-lowercase',
      'latin-uppercase',
      'numbers',
      'other-lowercase',
      'other-uppercase',
      'symbols',
    ];
    for(var id in ids){
        document.getElementById(ids[id]).checked =
          window.localStorage.getItem('PasswordGenerator.htm-' + ids[id]) === null;
    }
    document.getElementById('length').value =
      window.localStorage.getItem('PasswordGenerator.htm-length') || 15;
    document.getElementById('number-of-passwords').value =
      window.localStorage.getItem('PasswordGenerator.htm-number-of-passwords') || 1;
};
