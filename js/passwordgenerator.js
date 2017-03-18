'use strict';

function generate(){
    storage_save();

    if(storage_data['touse'].length <= 0){
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
        return;
    }

    // Generate passwords.
    var loopcounter = storage_data['repeat'] - 1;
    var passwords = '';
    do{
        passwords += string_format_html({
          'string': random_string({
            'characters': storage_data['touse'],
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
        'length': 15,
        'repeat': 1,
        'touse': '0123456789abcdefghijklmnopqrstuvwxyzáčďéěíňóřšťúůýžABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
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
