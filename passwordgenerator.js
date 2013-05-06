function generate(){
    save();
    if(charlist.length>0){
        temp='';
        ii=get(7).value-1;
        do{
            i=get(0).value-1;
            do{
                temp+=charlist.substr(Math.floor(Math.random()*charlist.length-1),1)
            }while(i--);
            temp+='<br>'
        }while(ii--);
        get('password').innerHTML=temp;
        temp=''
    }else{
        get('password').innerHTML='You must select at least one option.'
    }
}
function get(i){
    return document.getElementById(i)
}
function reset(){
    if(confirm('Reset settings?')){
        get(0).value=15;
        get(1).checked=get(2).checked=get(3).checked=get(4).checked=get(5).checked=get(6).checked=1;
        get(7).value=1;
        get('password').innerHTML='';
        save()
    }
}
function save(){
    i=1;
    do{
        if(isNaN(get([0,7][i]).value)||get([0,7][i]).value<1||get([0,7][i]).value==[15,1][i]){
            get([0,7][i]).value=[15,1][i];
            ls.removeItem('password-generator-'+[0,7][i])
        }else{
            ls.setItem('password-generator-'+[0,7][i],get([0,7][i]).value)
        }
    }while(i--);
    i=5;
    charlist='';
    do{
        if(get(i+1).checked){
            if(i==0){
                charlist+='abcdefghijklmnopqrstuvwxyz'
            }else if(i==1){
                charlist+='áčďéěiíňóřšťúůýž'
            }else if(i==2){
                charlist+='0123456789'
            }else if(i==3){
                charlist+='~!@#$%^&*()-_=+[{]}|,.;:"?/'
            }else if(i==4){
                charlist+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            }else{
                charlist+='ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ'
            }
            ls.removeItem('password-generator-'+(i+1))
        }else{
            ls.setItem('password-generator-'+(i+1),1)
        }
    }while(i--)
}
var charlist=temp='',
i=ii=5,
ls=window.localStorage;

get(0).value=ls.getItem('password-generator-0')==null?15:ls.getItem('password-generator-0');
get(7).value=ls.getItem('password-generator-7')==null?1:ls.getItem('password-generator-7');

do{
    get(i+1).checked=ls.getItem('password-generator-'+(i+1))==null
}while(i--);

window.onkeydown=function(e){
    i=window.event?event:e;
    i=i.charCode?i.charCode:i.keyCode;
    if(i==72){/*H*/
        generate()
    }
}
