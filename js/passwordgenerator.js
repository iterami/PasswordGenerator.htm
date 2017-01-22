'use strict';

function generate(){
    storage_save();

    var charlist = '';
    var ids = {
      'latin-lowercase': 'abcdefghijklmnopqrstuvwxyz',
      'latin-uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'numbers': '0123456789',
      'other-lowercase': storage_data['other-lowercase-touse'],
      'other-uppercase': storage_data['other-uppercase-touse'],
      'symbols': storage_data['symbols-touse'],
    };
    for(var id in ids){
        if(storage_data[id]){
            charlist += ids[id];
        }
    }
    if(charlist.length <= 0){
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
        return;
    }

    // Generate passwords.
    var loopcounter = storage_data['number-of-passwords'] - 1;
    var passwords = '';
    do{
        passwords += string_format_html({
          'string': random_string({
            'characters': charlist,
            'length': storage_data['length'] - 1,
          }),
        }) + '<br>';
    }while(loopcounter--);
    document.getElementById('passwords').innerHTML = passwords;
}

window.onload = function(e){
    input_init({
      'keybinds': {
        13: {
          'todo': generate,
        },
      },
    });
    storage_init({
      'data': {
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
      'prefix': 'PasswordGenerator.htm-',
    });

    storage_update();
    generate();

    document.getElementById('generate').onclick = generate;
    document.getElementById('storage-reset').onclick = function(e){
        storage_reset();
    };
};
