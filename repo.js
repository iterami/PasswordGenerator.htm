'use strict';

function generate(){
    core_storage_save([
      'characters',
      'length',
      'repeat',
    ]);

    let loopcounter = core_storage_data['repeat'] - 1;
    let passwords = '';
    do{
        passwords += core_html_format(core_random_string({
          'characters': core_storage_data['characters'],
          'length': core_storage_data['length'] - 1,
        }));

        if(loopcounter > 0){
            passwords += '\n\n';
        }
    }while(loopcounter--);
    document.getElementById('passwords').value = passwords;
}

function repo_init(){
    core_repo_init({
      'events': {
        'generate': {
          'onclick': generate,
        },
      },
      'info': '<input id=generate type=button value="Generate [ENTER]"><br><textarea id=passwords></textarea>',
      'keybinds': {
        'Enter': {
          'todo': generate,
        },
      },
      'menu': true,
      'menu-block-events': false,
      'menu-lock': true,
      'storage': {
        'characters': '0123456789abcdefghijklmnopqrstuvwxyzáčďéěíňóřšťúůýžABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?',
        'length': 64,
        'repeat': 1,
      },
      'storage-menu': '<textarea id=characters></textarea>'
        + '<table><tr><td><input class=mini id=length min=1 step=any type=number><td>Length'
        + '<tr><td><input class=mini id=repeat min=1 step=any type=number><td>Repeat</table>',
      'title': 'PasswordGenerator.htm',
    });

    generate();
}
