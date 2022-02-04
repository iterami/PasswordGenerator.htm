'use strict';

function repo_init(){
    core_repo_init({
      'events': {
        'generate': {
          'onclick': generate,
        },
      },
      'info': '<input id=generate type=button value="Generate [ENTER]"><br><textarea id=passwords></textarea>',
      'keybinds': {
        13: {
          'todo': generate,
        },
      },
      'menu': true,
      'menu-block-events': false,
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
