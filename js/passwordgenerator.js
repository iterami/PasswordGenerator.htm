'use strict';

function generate(){
    settings_save();

    var charlist = '';
    var ids = {
      'latin-lowercase': 'abcdefghijklmnopqrstuvwxyz',
      'latin-uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'numbers': '0123456789',
      'other-lowercase': settings_settings['other-lowercase-touse'],
      'other-uppercase': settings_settings['other-uppercase-touse'],
      'symbols': settings_settings['symbols-touse'],
    };
    for(var id in ids){
        if(settings_settings[id]){
            charlist += ids[id];
        }
    }

    if(charlist.length <= 0){
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
        return;
    }

    var passwords = '';

    // Create new password.
    var loopcounter = settings_settings['number-of-passwords'] - 1;
    do{
        passwords += random_string(
          settings_settings['length'] - 1,
          charlist
        ) + '<br>';
    }while(loopcounter--);

    document.getElementById('passwords').innerHTML = passwords;
}

window.onload = function(e){
    input_init(
      {
        13: {
          'todo': generate,
        },
      }
    );
    settings_init(
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

    settings_update();
    generate();
};
