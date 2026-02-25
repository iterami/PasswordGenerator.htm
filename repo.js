'use strict';

function generate(){
    let passwords = '';
    for(let i = 0; i < core_storage_data.repeat; i++){
        passwords += core_random_string({
          'characters': core_storage_data.characters,
          'length': core_storage_data.length,
        });

        if(i > 0){
            passwords += '\n\n';
        }
    }
    core_elements.passwords.value = passwords;
}

function repo_init(){
    core_repo_init({
      'events': {
        'generate': {
          'onclick': generate,
        },
      },
      'info': '<button class=medium id=generate type=button>Generate [ENTER]</button><br><textarea id=passwords></textarea>',
      'keybinds': {
        'Enter': {
          'down': generate,
        },
      },
      'menu_block_events': false,
      'menu_lock': true,
      'storage': {
        'characters': '0123456789abcdefghijklmnopqrstuvwxyzáčďéěíňóřšťúůýžABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
        'length': 64,
        'repeat': 1,
      },
      'storage_menu': '<textarea id=characters></textarea>'
        + '<table><tr><td><input class=mini id=length min=1 step=1 type=number><td>Length'
        + '<tr><td><input class=mini id=repeat min=1 step=1 type=number><td>Repeat</table>',
      'title': 'PasswordGenerator.htm',
      'ui_elements': [
        'passwords',
      ],
    });

    generate();
}
