'use strict';

function repo_init(){
    core_repo_init({
      'events': {
        'generate': {
          'onclick': generate,
        },
      },
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
        + '<table><tr><td><input id=length><td>Length'
        + '<tr><td><input id=repeat><td>Repeat</table>',
      'title': 'PasswordGenerator.htm',
    });

    generate();
}
