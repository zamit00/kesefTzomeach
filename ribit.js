function onch(){
    const tablediv= document.getElementById("tozaot");
       tablediv.innerHTML=""; 
}

function opn(x){
    var element=document.getElementById(x)
    if(element.style.display==='none' || element.style.display==='' ){
        element.style.display='flex'
        if(x==='dropdown-schom'){rdchange()}
        if(x==='dropdown-tkofa'){addelement()}
    
    }
    else{element.style.display='none'}

}
function rdchange(){
   
        var rd1=document.getElementById('rdbutton1');
        var rd2=document.getElementById('rdbutton2');
        var rd3=document.getElementById('rdbutton3');
        if(rd1.checked){
            document.getElementById('schomdiv1').style.display='block';
            document.getElementById('schomdiv2').style.display='none';
            document.getElementById('hodshi').innerText=100;
        }
        else if(rd2.checked){
            document.getElementById('schomdiv1').style.display='none';
            document.getElementById('schomdiv2').style.display='block';
            document.getElementById('hadpeami').innerText=100;
        }
        else if (rd3.checked){
            document.getElementById('schomdiv1').style.display='block';
            document.getElementById('schomdiv2').style.display='block';
        }
    
}
function addelement(){
    const select=document.getElementById('txttkofa1');
    const dmn=document.getElementById('txttkofa2');
    for (let i = 1; i <= 30; i++) {
        let option = document.createElement('option');
        option.value = i;  
        option.textContent = i;  
        if(i===10){option.selected = true;}
        select.appendChild(option);  
        
    }
      
    for (let i = 0; i <= 1.1; i += 0.05) {
        let option = document.createElement('option');
        
        // Check if i is approximately 1, with a tolerance
        if (Math.abs(i - 1) < 0.0001) {
            option.selected = true;
        }
        
        let value = Math.round(i * 100) / 100;  
        option.value = value;  
        option.textContent = value; 
        dmn.appendChild(option);  
    }
    
     
}


function hashev() {
    
            
    // Retrieve values from input fields
    const hp=document.getElementById("hadpeami");
    const tash=document.getElementById("hodshi");
    let x1 = parseInt(hp.value);
    if(!x1){x1=0};
    let x2 = parseInt(tash.value);
    if(!x2){x2=0};
    if(x1===0 && x2===0){alert('הוסף סכומי השקעה')
        var element=document.getElementById('dropdown-schom')
        element.style.display='flex' ;
        
        var rd1=document.getElementById('rdbutton1');
        var rd2=document.getElementById('rdbutton2');
        var rd3=document.getElementById('rdbutton3');
        if(rd1.checked){
            document.getElementById('schomdiv1').style.display='block';
            document.getElementById('schomdiv2').style.display='none';
            document.getElementById('hodshi').innerText=100;
        }
        else if(rd2.checked){
            document.getElementById('schomdiv1').style.display='none';
            document.getElementById('schomdiv2').style.display='block';
            document.getElementById('hadpeami').innerText=100;
        }
        else if (rd3.checked){
            document.getElementById('schomdiv1').style.display='block';
            document.getElementById('schomdiv2').style.display='block';
        }        
               
        return;}
    let dn =document.getElementById("txttkofa2").value;
    /*let simul=document.getElementById('selectRibit');*/
    
    //let ribitchoose=document.getElementById("selectribit");
    //let ribit=ribitchoose.value;
    if(!dn || dn===0){dn=1;}
    let z=0.04-dn/100;

    if(x1<0||x2<0){alert('סכומים לא תקינים');return;}
    let selectElement = document.getElementById("txttkofa1");
    if(!selectElement.value || selectElement.value===0){addelement(); }
    let x3 = selectElement.value; 
    
    
   const textopen="סכום השקעה עתידי לתקופה של - ";
   const textshanim=" שנים:       ";
   const shach = " ש\"ח"; 
   
   let sum;let sum10;let sum20;let sum30;let sumsimul;
   sum=hishuv(x1,x2,z,x3);
   sum10=hishuv(x1,x2,z,10);
   sum20=hishuv(x1,x2,z,20);
   sum30=hishuv(x1,x2,z,30);
 
    if (isNaN(sum) ) {alert('סכומים לא תקינים');return;}
        
      /* console.log(sum.toLocaleString());
       console.log(sum10.toLocaleString());
       console.log(sum20.toLocaleString());
       console.log(sum30.toLocaleString());*/

       var table; var td; var tr;let par;let selectsim;
       const tablediv= document.getElementById("tozaot");
       tablediv.innerHTML=""; 
       par= document.createElement("p"); 
       par.innerHTML='חישוב לפי ריבית של 4% שנתי:';
       par.className='kottoz';
       
       tablediv.appendChild(par);
       table= document.createElement("table");
        table.id="tbltoz";table.className="tbltoz";
       tablediv.appendChild(table);
       
        
        
        if(x1>0){
                tr=document.createElement("tr");
                table.appendChild(tr);
                td=document.createElement("td");
                td.innerText="סכום חד פעמי";
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                td.innerText= x1.toLocaleString()+shach;
                td.className="numtd";
                tr.appendChild(td);
            }
        if(x2>0){
                tr=document.createElement("tr");
                table.appendChild(tr);
                td=document.createElement("td");
                td.innerText="סך הפקדות בתשלומים";
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                console.log(x2 + ","+x3)
                td.innerText=(x2*x3*12).toLocaleString() + shach;
                td.className="numtd";
                tr.appendChild(td);
            }
                tr=document.createElement("tr");
                table.appendChild(tr);
                td=document.createElement("td");
                td.innerText="סך השקעה";
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                td.innerText=Number(x1+(x2*x3*12)).toLocaleString()+shach;
                 td.className="numtd";
                tr.appendChild(td);
                
                tr=document.createElement("tr");
                table.appendChild(tr);
                td=document.createElement("td");
                td.innerHTML="שווי השקעה עתידי ב - "+x3+textshanim;
                td.className="txttd";
                tr.appendChild(td);
                td=document.createElement("td");
                 td.className="numtd";
                td.innerText=parseInt(sum).toLocaleString() + shach;
                td.className="numtd";
                tr.appendChild(td);


            if(x3<10){
            tr=document.createElement("tr");
            table.appendChild(tr);
            td=document.createElement("td");
             td.innerHTML="שווי השקעה ל - 10 שנים";
             td.className="txttd";
            tr.appendChild(td);
            td=document.createElement("td");
            td.innerText=parseInt(sum10).toLocaleString() + shach;
            td.className="numtd";
            tr.appendChild(td);
            }
   
            if(x3<20){
            tr=document.createElement("tr");
            table.appendChild(tr);
            td=document.createElement("td");
            td.innerHTML="שווי השקעה ל - 20 שנים";
            td.className="txttd";
            tr.appendChild(td);
            td=document.createElement("td");
            td.innerText=parseInt(sum20).toLocaleString() + shach;
            td.className="numtd";
            tr.appendChild(td);
            }
    
            if(x3<30){
            tr=document.createElement("tr");
            table.appendChild(tr);
            td=document.createElement("td");
            td.innerHTML="שווי השקעה ל - 30 שנים";
            td.className="txttd";
            tr.appendChild(td);
            td=document.createElement("td");
            td.innerText=parseInt(sum30).toLocaleString() + shach;
            td.className="numtd";
            tr.appendChild(td);
            }
            var element=document.getElementById('dropdown-tkofa');
            element.style.display='flex';
             var elementa=document.getElementById('dropdown-schom');
            elementa.style.display='none';
            var elementb=document.getElementById('dropdown-sug');
            elementb.style.display='none';
        
        function hishuv(x,y,z,t){
            let hishuv = x + y;
            hishuv=hishuv * (1+z/12);
            for (let i = 1; i < t*12; i++) {
                hishuv = (hishuv+y) * (1+z/12);
            }
            //hishuv= part(hishuv)
            return hishuv;
        }
    }
