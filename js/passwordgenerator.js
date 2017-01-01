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

    // Generate passwords.
    var loopcounter = settings_settings['number-of-passwords'] - 1;
    var passwords = '';
    do{
        passwords += string_format_html({
          'string': random_string({
            'characters': charlist,
            'length': settings_settings['length'] - 1,
          }),
        }) + '<br>';
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
    settings_init({
      'prefix': 'PasswordGenerator.htm-',
      'settings': {
        'latin-lowercase': true,
        'latin-uppercase': true,
        'length': 15,
        'number-of-passwords': 1,
        'numbers': true,
        'other-lowercase': true,
        'other-lowercase-touse': 'áčďéěíňóřšťúůýž',
        'other-uppercase': true,
        'other-uppercase-touse': 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ',
        'symbols': true,
        'symbols-touse': '~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
      },
    });

    settings_update();
    generate();

    document.getElementById('generate').onclick = generate;
    document.getElementById('settings-reset').onclick = settings_reset;
};
