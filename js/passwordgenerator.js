'use strict';

function generate(){
    core_storage_save();

    if(core_storage_data['characters'].length <= 0){
        document.getElementById('passwords').innerHTML = 'You must select at least one option.';
        return;
    }

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

function repo_init(){
    core_repo_init({
      'keybinds': {
        13: {
          'todo': generate,
        },
      },
      'storage': {
        'characters': '0123456789abcdefghijklmnopqrstuvwxyzáčďéěíňóřšťúůýžABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
        'length': 15,
        'repeat': 1,
      },
      'storage-menu': '<textarea id=characters></textarea><table><tr><td><input id=length><td>Length<tr><td><input id=repeat><td>Repeat</table>',
      'title': 'PasswordGenerator.htm',
    });

    generate();

    document.getElementById('generate').onclick = generate;
}
