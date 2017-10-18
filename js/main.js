'use strict';

function repo_init(){
    core_repo_init({
      'info-events': {
        'generate': {
          'todo': generate,
        },
      },
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
}
