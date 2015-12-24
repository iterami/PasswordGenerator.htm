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
    var ids = {
      'length': 15,
      'number-of-passwords': 1,
    };
    for(var id in ids){
        var value = document.getElementById(id).value;
        if(value == ids[id]
          || isNaN(value)
          || value < 1){
            document.getElementById(id).value = ids[id];
            window.localStorage.removeItem('PasswordGenerator.htm-' + id);

        }else{
            window.localStorage.setItem(
              'PasswordGenerator.htm-' + id,
              value
            );
        }
    }

    // Create list of possible characters.
    charlist = '';
    ids = {
      'latin-lowercase': 'abcdefghijklmnopqrstuvwxyz',
      'latin-uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'numbers': '0123456789',
      'other-lowercase': document.getElementById('other-lowercase-touse').value,
      'other-uppercase': document.getElementById('other-uppercase-touse').value,
      'symbols': document.getElementById('symbols-touse').value,
    };
    for(id in ids){
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

    ids = {
      'length': 15,
      'latin-lowercase': 'abcdefghijklmnopqrstuvwxyz',
      'latin-uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'number-of-passwords': 1,
      'numbers': '0123456789',
      'other-lowercase-touse': 'áčďéěiíňóřšťúůýž',
      'other-uppercase-touse': 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ',
      'symbols-touse': '~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
    };
    for(id in ids){
        document.getElementById(id).value =
          window.localStorage.getItem('PasswordGenerator.htm-' + id)
          || ids[id];
    }
};
