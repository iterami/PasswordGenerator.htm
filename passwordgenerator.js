function generate(){
    save();

    if(charlist.length > 0){
        temp = '';

        /*create new password*/
        ii = get(7).value - 1;
        do{
            /*add character to current password*/
            i = get(0).value - 1;
            do{
                /*select random characters from possible character list*/
                temp += charlist.substr(Math.floor(Math.random() * charlist.length - 1),1)
            }while(i--);
            temp += '<br>'
        }while(ii--);

        get('password').innerHTML = temp;
        temp = ''
    }else{
        get('password').innerHTML = 'You must select at least one option.'
    }
}

function get(i){
    return document.getElementById(i)
}

function reset(){
    if(confirm('Reset settings?')){
        get(0).value = 15;
        get(1).checked = 1;
        get(2).checked = 1;
        get(3).checked = 1;
        get(4).checked = 2;
        get(5).checked = 3;
        get(6).checked = 1;
        get(7).value = 1;
        get('password').innerHTML = '';
        save()
    }
}

function save(){
    /*validate settings*/
    i = 1;
    do{
        if(isNaN(get([0,7][i]).value) || get([0,7][i]).value < 1 || get([0,7][i]).value == [15,1][i]){
            get([0,7][i]).value = [15,1][i];
            ls.removeItem('password-generator-' + [0,7][i])
        }else{
            ls.setItem('password-generator-' + [0,7][i],get([0,7][i]).value)
        }
    }while(i--);

    /*create list of possible characters*/
    i = 5;
    charlist = '';
    do{
        if(get(i + 1).checked){
            if(i === 0){
                /*lowercase letters*/
                charlist += 'abcdefghijklmnopqrstuvwxyz'
            }else if(i === 1){
                /*lowercase special letters*/
                charlist += 'áčďéěiíňóřšťúůýž'
            }else if(i === 2){
                /*numbers*/
                charlist += '0123456789'
            }else if(i === 3){
                /*symbols*/
                charlist += '~!@#$%^&*()-_=+[{]}|,.;:"?/'
            }else if(i === 4){
                /*uppercase letters*/
                charlist += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            }else{
                /*upercase special letters*/
                charlist += 'ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ'
            }
            ls.removeItem('password-generator-' + (i + 1))
        }else{
            ls.setItem('password-generator-' + (i + 1),1)
        }
    }while(i--)
}

var charlist = '';
var i = 5;
var ii = 5;
var ls = window.localStorage;
var temp = '';

get(0).value = ls.getItem('password-generator-0')===null ? 15 : ls.getItem('password-generator-0');
get(7).value = ls.getItem('password-generator-7')===null ? 1 : ls.getItem('password-generator-7');

do{
    get(i+1).checked = ls.getItem('password-generator-'+(i+1))==null
}while(i--);

window.onkeydown = function(e){
    i = window.event ? event : e;
    i = i.charCode ? i.charCode : i.keyCode;
    if(i === 72){/*H*/
        generate()
    }
}
