'use strict';

function generate(){
    core_storage_save();

    // Generate passwords.
    let loopcounter = core_storage_data['repeat'] - 1;
    let passwords = '';
    do{
        passwords += core_html_format({
          'string': core_random_string({
            'characters': core_storage_data['characters'],
            'length': core_storage_data['length'] - 1,
          }),
        }) + '<br>';
    }while(loopcounter--);
    document.getElementById('passwords').innerHTML = passwords;
}
