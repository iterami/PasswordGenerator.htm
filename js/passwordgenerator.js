'use strict';

function generate(){
    save();

    var charlist = '';
    var ids = {
      'latin-lowercase': 'abcdefghijklmnopqrstuvwxyz',
      'latin-uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'numbers': '0123456789',
      'other-lowercase': settings['other-lowercase-touse'],
      'other-uppercase': settings['other-uppercase-touse'],
      'symbols': settings['symbols-touse'],
    };
    for(var id in ids){
        if(settings[id]){
            charlist += ids[id];
        }
    }

    if(charlist.length <= 0){
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
        return;
    }

    var passwords = '';

    // Create new password.
    var character_looptotal = settings['length'] - 1;
    var password_loopcounter = settings['number-of-passwords'] - 1;
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

window.onload = function(e){
    init_input(
      {
        13: {
          'todo': generate,
        },
      }
    );
    init_settings(
      'PasswordGenerator.htm-',
      {
        'length': 15,
        'latin-lowercase': true,
        'latin-uppercase': true,
        'number-of-passwords': 1,
        'numbers': true,
        'other-lowercase': true,
        'other-lowercase-touse': 'áčďéěíňóřšťúůýž',
        'other-uppercase': true,
        'other-uppercase-touse': 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ',
        'symbols': true,
        'symbols-touse': '~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
      }
    );

    update_settings();
};
