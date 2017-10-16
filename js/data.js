'use strict';

function generate(){
    core_storage_save();

    // Generate passwords.
    var loopcounter = core_storage_data['repeat'] - 1;
    var passwords = '';
    do{
        passwords += string_format_html({
          'string': core_random_string({
            'characters': core_storage_data['characters'],
            'length': core_storage_data['length'] - 1,
          }),
        }) + '<br>';
    }while(loopcounter--);
    document.getElementById('passwords').innerHTML = passwords;
}
