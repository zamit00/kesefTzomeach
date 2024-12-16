/*document.addEventListener('DOMContentLoaded', function() {
    
    console.log("המסמך נטען!");
	const fileUrl = 'madadim.xlsx';

    fetch(fileUrl)
                .then(response => response.arrayBuffer())  
                .then(data => {
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];  
                    const sheet = workbook.Sheets[sheetName];

                    const json = XLSX.utils.sheet_to_json(sheet);
                    console.log(json);  // מציג את הנתונים בקונסול
                })
                .catch(error => console.error('Error loading Excel file:', error));
        });
});


*/

const todayd=new Date();

const day = String(todayd.getDate()).padStart(2,'0');
console.log(document.getElementById('dateto'));
const month=String(todayd.getMonth()+1).padStart(2,'0');
const year=todayd.getFullYear();
document.getElementById('dateto').max=`${year}-${month}-${day}`;
document.getElementById('datefrom').max=`${year}-${month}-${day}`;



function shita(){
    const boded=document.getElementById('boded');
    const kovetz=document.getElementById('kovetz');
    const outputDiv = document.getElementById('output');
  

    if (boded.checked) {
        document.getElementById('madadstyle').style.display='flex';
        document.getElementById('taarich').style.display='flex';
        document.getElementById('schomdiv').style.display='flex';
        document.getElementById('hashevdiv').style.display='flex';
        document.getElementById('btnlblup').style.display='none';
        outputDiv.innerHTML = '';
        document.getElementById('input-excel').value = '';
    }
    else{
        document.getElementById('madadstyle').style.display='none';
        document.getElementById('taarich').style.display='none';
        document.getElementById('schomdiv').style.display='none';
        document.getElementById('hashevdiv').style.display='none';
        document.getElementById('tables').style.display='none';
        document.getElementById('btnlblup').style.display='block';
    }
    }

function cnl(){
    const boded=document.getElementById('boded');
    const kovetz=document.getElementById('kovetz');
    const yadoa=document.getElementById('yadoa');
    const begin=document.getElementById('begin');
    
    if (boded.checked) {
        if(begin.checked){bodedf('begin');}
        if(yadoa.checked){bodedf('yadoa');}
    } 
    else if (kovetz.checked) {
      return;
    } 
}

function bodedf(x) {
    let df = document.getElementById('datefrom');
    let dt = document.getElementById('dateto');
    
    
    let datef = new Date(df.value); 
    let datet = new Date(dt.value); 
    const numericValue = document.getElementById('schom').value.replace(/[^\d]/g, '');
    const schom=parseFloat(numericValue);
    
    if( isNaN(datef) || isNaN(datet) || datef>datet){alert('בדוק תקינות תאריכים');return;}
    if(!schom ){alert('חסר סכום');return;}
    
    let dayf = datef.getDate(); 
    let monthf = datef.getMonth() + 1; 
    let yearf = datef.getFullYear(); 
    
    let dayt = datet.getDate(); 
    let montht = datet.getMonth() + 1; 
    let yeart = datet.getFullYear();
    
    let formatdatef
    let formatdatet

    if(x==="yadoa"){

    if(dayf<15 && Number(monthf) <3){
        formatdatef=String(monthf+10)+String(yearf-1);    
    }
    else if(dayf>=15 && Number(monthf) ===1){
        formatdatef="12"+String(yearf-1);   
    }
    else if(dayf<15){
        formatdatef=String(monthf-2)+String(yearf);    
    }
    else if(dayf>=15 ){
        formatdatef=String(monthf-1)+String(yearf);
    }

    if(dayt<15 && Number(montht) <3){
        formatdatet=String(montht+10)+String(yeart-1);    
    }
    else if(dayt>=15 && Number(montht) ===1){
        formatdatet="12"+String(yeart-1);   
    }
    else if(dayt<15){
        formatdatet=String(montht-2)+String(yeart);    
    }
    else if(dayt>=15 ){
        formatdatet=String(montht-1)+String(yearf);
    }
}
else{
    
    formatdatef=String(monthf)+String(yearf);  
    formatdatet=String(montht)+String(yeart);    
}  

    	
    var x= madad.indexOf (Number("-"+formatdatef));
    const madadf= madad.slice(x+1, x+2)*-1;
    var x= madad.indexOf (Number("-"+formatdatet));
    const madadt= madad.slice(x+1, x+2)*-1;



    /*if(isNaN(x)|| x===0){alert('לא קיים מדד בגין לתאריך הנבחר');return;}
    */
   
    var schommemudad=(schom*madadt/madadf).toFixed(2);
    schommemudad=Number(schommemudad).toLocaleString();
    
    document.getElementById('frt1').textContent=dayf+"/"+monthf+"/"+yearf;
    document.getElementById('frt2').textContent=dayt+"/"+montht+"/"+yeart;

    document.getElementById('md1').textContent=formatdatef.slice(0,formatdatef.length-4)+"/"+
    formatdatef.slice(formatdatef.length-4,formatdatef.length);
    document.getElementById('md2').textContent=formatdatet.slice(0,formatdatet.length-4)+"/"+
    formatdatet.slice(formatdatet.length-4,formatdatet.length);


    document.getElementById('nm1').textContent=madadf.toFixed(2);
    document.getElementById('nm2').textContent=madadt.toFixed(2);

    document.getElementById('tozk').textContent=Number(schom).toLocaleString();
    document.getElementById('tozm').textContent=schommemudad;
    document.getElementById('tables').style.display="block";
    
}


function yavee(e) {
            
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            jsonData=jsonData.slice(1);
            

            // המרת תאריך Excel לפורמט JavaScript Date
            const convertExcelDateToJSDate = (excelDate) => {
                return new Date((excelDate - (25567 + 2)) * 86400 * 1000); // המרה ל-epoch
                
            };

            // סינון שורות עם ערכים חסרים או NaN
            jsonData = jsonData.filter(row => {
                return row[0] !== undefined &&   row[0]!==0 && row[1] !== undefined &&   row[1]!==0  ;
            });

            // המרת כל הנתונים בתאריך לפורמט תאריך
            jsonData.forEach(row => {
                row[0] = convertExcelDateToJSDate(row[0]);
            
    });
            

            

            // מיון הנתונים לפי תאריך
            jsonData.sort((a, b) => a[0] - b[0]);

            // הצגת הנתונים בטבלה
            displayDataInTable(jsonData);

          
           
        };

        reader.readAsBinaryString(file);
    }
}

// פונקציה להצגת הנתונים בטבלה
function displayDataInTable(data) {
const table = document.createElement('table');
table.id = 'myTable';
table.className = 'tbldata';
table.style.display = 'block';
    

    const headerRow = document.createElement('tr');
    if (data.length > 0) {

        th = document.createElement('th');
        th.textContent = 'תאריך הפקדה';
        headerRow.appendChild(th);
        
        th = document.createElement('th');
        th.textContent = 'סכום';
        headerRow.appendChild(th);

        th = document.createElement('th');
        th.textContent = 'מדד בסיס';
        headerRow.appendChild(th);
                    

        th = document.createElement('th');
        th.textContent = 'סכום צמוד למדד';
        headerRow.appendChild(th);
        table.appendChild(headerRow);
                    
            
        
        
        
        

        // יצירת שורות עבור הנתונים
        data.forEach(row => { 
            let formatdate;
            const tr = document.createElement('tr');
            row.forEach((cell, index) => {
                const td = document.createElement('td');
    
                if (index === 0 && cell instanceof Date) {	
                    td.textContent = formatDate(cell);
                    tr.appendChild(td);
                
                } 
                
                else {                                
                        td.textContent = Number(cell.toFixed(2)).toLocaleString();
                        tr.appendChild(td);
                }
                
        if (index === 1){
                
        const da= row[0].getDate(); let mo=row[0].getMonth()+1;const yr=row[0].getFullYear();
        
        if(da<15 && Number(mo) <3){
            formatdate="-"+String(mo+10)+String(yr-1);    
        }
        else if(da>=15 && Number(mo) ===1){
            formatdate="-"+"12"+String(yr-1);   
        }
        else if(da<15){
            formatdate="-"+String(mo-2)+String(yr);    
        }
        else if(da>=15 ){
            formatdate="-"+String(mo-1)+String(yr);
        }
        


        
var x= madad.indexOf (Number(formatdate));
        
        //if(mads=2){x=x+2};
        
const w= madad.slice(x+1, x+2)*-1;
const madadnow=madad.slice(madad.length-2,madad.length-1)*-1;
        
const td2 = document.createElement('td');
td2.textContent = Number(w).toFixed(2);
tr.appendChild(td2);
const td3 = document.createElement('td');
        td3.textContent = Number(Number((row[1]*madadnow/w)).toFixed(2)).toLocaleString();
         tr.appendChild(td3);
        }
            
                
            });				
            
            table.appendChild(tr);
        });
        
    }
    

    // הצגת הטבלה בדף
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // ניקוי התוכן הקודם
    outputDiv.appendChild(table);
    calculateColumnSum()


}

// פונקציה להמיר תאריך לפורמט dd/mm/yyyy
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function calculateColumnSum(x) {
    var table = document.getElementById('myTable'); // שולף את הטבלה
    var sum = 0; var suma = 0;
    var rows = table.getElementsByTagName('tr'); // שולף את כל השורות בטבלה
    
    // מעגלים על כל השורות, מתחילים מ-1 כדי לדלג על השורה הראשונה (כותרות)
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td'); // שולף את התאים של כל שורה
        if (cells.length > 1) { // אם השורה לא ריקה ויש לפחות שני תאים
            var value = parseFloat(cells[3].textContent); // מקבל את הערך בעמודה השנייה
            var valuea = parseFloat(cells[1].textContent);
            if (!isNaN(value)) { // אם הערך הוא מספר
                sum += value; // מוסיף את הערך לסכום
                
            }
            if (!isNaN(valuea)) { // אם הערך הוא מספר
                suma += valuea; // מוסיף את הערך לסכום
                
            }
        }
    }
    
    // מציג את הסכום באלמנט #total
    document.getElementById('toz').textContent = Number(sum.toFixed()).toLocaleString();
    document.getElementById('toza').textContent = Number(suma.toFixed()).toLocaleString();

}











		var madad=[-11980,-10561.0495497966,-0.0292960904,-21980,-11081.6513850786,-0.030740227,-31980,-11647.5229451677,-0.0323099408,-41980,-12835.8532213549,-0.0356063396,
            -51980,-14050.5908370128,-0.0389759917,-61980,-14699.4568925817,-0.0407759301,-71980,-15342.6642325497,-0.0425601714,-81980,-16608.3302886157,-0.0460710977,
            -91980,-17815.5229501391,-0.0494198203,-101980,-19775.3247865811,-0.0548562622,-111980,-21629.4972651398,-0.0599996908,-121980,-22923.4568992103,-0.0635891029,
            -11981,-24598.6970179917,-0.0682361775,-21981,-25953.0426924778,-0.071993099,-31981,-27197.1509283429,-0.0754442245,-41981,-30094.8207435225,-0.0834822889,
            -51981,-31102.7058966284,-0.0862781374,-61981,-31953.1089945615,-0.0886371346,-71981,-33890.138273187,-0.0940104059,-81981,-35212.9875366385,-0.0976799571,
            -91981,-38079.1609407835,-0.1056306513,-101981,-41512.2697435506,-0.1151540102,-111981,-43921.7451876945,-0.1218378356,-121981,-46189.4867821829,-0.1281284947,
            -11982,-50032.0489283992,-0.1387876671,-21982,-52882.4741270269,-0.1466946762,-31982,-55559.6690649646,-0.1541211488,-41982,-61480.9943394619,-0.1705467587,
            -51982,-65307.808280161,-0.181162246,-61982,-69244.8596594811,-0.1920835292,-71982,-75622.8828939796,-0.209776008,-81982,-81575.7045795115,-0.2262889883,
            -91982,-87764.7493478026,-0.2434572455,-101982,-95134.9095298897,-0.2639018876,-111982,-101308.206092664,-0.2810264597,-121982,-106930.315462333,-0.2966220522,
            -11983,-116001.281840286,-0.3217846887,-21983,-123040.72970651,-0.3413119431,-31983,-129985.688339631,-0.3605770867,-41983,-147229.973381053,-0.4084123072,
            -51983,-155356.047427969,-0.4309538357,-61983,-160946.660386604,-0.4464620579,-71983,-171009.763712146,-0.4743768578,-81983,-183261.86760459,-0.5083638912,
            -91983,-199734.490575665,-0.5540585402,-101983,-241813.695717838,-0.6707852152,-111983,-278507.0145731,-0.7725715748,-121983,-310838.080500077,-0.8622571525,
            -11984,-357216.545748467,-0.9909098688,-21984,-399972.923727883,-1.1095150046,-31984,-442634.812474195,-1.2278580295,-41984,-533816.922419247,-1.4807949488,
            -51984,-610132.726355987,-1.6924931027,-61984,-691613.941702395,-1.9185199801,-71984,-777032.208428123,-2.1554681408,-81984,-905033.622872576,-2.5105409007,
            -91984,-1098437.33483029,-3.0470380175,-101984,-1365778.87169164,-3.788636833,-111984,-1632679.45879851,-4.5290124648,-121984,-1693688.00697245,-4.6982486696,
            -11985,-1782696.86455612,-4.9451570405,-21985,-2023644.40897051,-5.6135395734,-31985,-2267741.59448835,-6.2906591328,-41985,-2707116.52842047,-7.5094743398,
            -51985,-2891370.53297265,-8.0205903944,-61985,-3322871.36414612,-9.2175630349,-71985,-4236267.28414838,-11.7513007412,-81985,-4401623.44207982,-12.2099946363,
            -91985,-4535483.1889767,-12.5813182657,-101985,-4746509.14290826,-13.1666990461,-111985,-4768556.63063245,-13.2278582321,-121985,-4829974.63214984,-13.3982302503,
            -11986,-4765800.69466692,-13.2202133339,-21986,-4843754.31197746,-13.4364547415,-31986,-4918164.58304661,-13.6428669943,-41986,-5081158.51015046,-14.0950081195,
            -51986,-5162655.47370239,-14.3210786821,-61986,-5247695.7834957,-14.5569783996,-71986,-5247695.7834957,-14.5569783996,-81986,-5304389.32335791,-14.7142448779,
            -91986,-5407146.36435816,-14.9992903699,-101986,-5534706.82904813,-15.3531399461,-111986,-5694157.40991059,-15.7954519164,-121986,-5779197.71970391,-16.0313516338,
            -11987,-5903214.83815249,-16.3753720552,-21987,-5959908.37801469,-16.5326385335,-31987,-6037861.99532523,-16.7488799412,-41987,-6172509.15249798,-17.1223878272,
            -51987,-6211485.96115325,-17.230508531,-61987,-6271722.84725684,-17.3976041643,-71987,-6285896.2322224,-17.4369207838,-81987,-6363849.84953293,-17.6531621915,
            -91987,-6424086.73563653,-17.8202578247,-101987,-6523300.43039539,-18.0954741618,-111987,-6626057.47139565,-18.3805196538,-121987,-6711097.78118896,-18.6164193712,
            -11988,-6817752.50305474,-18.9122769336,-21988,-6874357.45926092,-19.069297683,-31988,-6987567.37167326,-19.3833391819,-41988,-7176250.55902718,-19.9067416801,
            -51988,-7264302.71312567,-20.1509961792,-61988,-7283171.03186106,-20.2033364291,-71988,-7289460.47143953,-20.220783179,-81988,-7346065.4276457,-20.3778039284,
            -91988,-7471854.21921497,-20.7267389272,-101988,-7647958.52741196,-21.2152479255,-111988,-7773747.31898124,-21.5641829243,-121988,-7811483.95645202,-21.6688634239,
            -11989,-8176271.45200292,-22.6807749204,-21989,-8314639.12272912,-23.064603419,-31989,-8352375.7601999,-23.1692839186,-41989,-8566216.70586767,-23.7624734166,
            -51989,-8641689.98080924,-23.9718344158,-61989,-8748610.45364312,-24.2684291648,-71989,-8798925.97027083,-24.4080031643,-81989,-8905846.44310472,-24.7045979132,
            -91989,-9044214.11383092,-25.0884264119,-101989,-9207739.54287098,-25.5420419103,-111989,-9327238.89486179,-25.8735301591,-121989,-9427869.92811721,-26.1526781582,
            -11990,-9528500.96137263,-26.4318261572,-21990,-9578816.47800034,-26.5714001567,-31990,-9698315.82999115,-26.9028884055,-41990,-9943603.97355124,-27.5833116531,
            -51990,-10100839.9630128,-28.0194804016,-61990,-10176313.2379544,-28.2288414009,-71990,-10339838.6669945,-28.6824568993,-81990,-10503364.0960345,-29.1360723977,
            -91990,-10723494.4812808,-29.7467086455,-101990,-10905888.2290562,-30.2526643938,-111990,-11044255.8997824,-30.6364928924,-121990,-11088281.9768317,-30.758620142,
            -11991,-11232939.0871363,-31.1598953906,-21991,-11302122.9224994,-31.3518096399,-31991,-11440490.5932256,-31.7356381386,-41991,-11692068.1763642,-32.4335081361,
            -51991,-11912198.5616104,-33.044144384,-61991,-12144907.8260136,-33.6896741317,-71991,-12509695.3215645,-34.7015856281,-81991,-12767562.3442815,-35.4169023756,
            -91991,-12968824.4107923,-35.9751983737,-101991,-13025429.3669985,-36.1322191231,-111991,-13044297.6857339,-36.1845593729,-121991,-13088323.7627831,-36.3066866225,
            -11992,-13088323.7627831,-36.3066866225,-21992,-13220401.9939309,-36.6730683712,-31992,-13415374.6208633,-37.2139176193,-41992,-13654373.3248449,-37.876894117,
            -51992,-13604057.8082172,-37.7373201175,-61992,-13622926.1269526,-37.7896603673,-71992,-13717267.7206295,-38.0513616164,-81992,-13824188.1934634,-38.3479563653,
            -91992,-14006581.9412388,-38.8539121136,-101992,-14075765.7766019,-39.0458263629,-111992,-14163817.9307004,-39.290080862,-121992,-14314764.4805836,-39.7088028606,
            -11993,-14497158.228359,-40.2147586088,-21993,-14673262.536556,-40.7032676071,-31993,-14861945.7239099,-41.2266701052,-41993,-15069497.2299992,-41.8024128532,
            -51993,-15113523.3070485,-41.9245401028,-61993,-15151259.9445193,-42.0292206024,-71993,-15170128.2632546,-42.0815608522,-81993,-15314785.3735593,-42.4828361008,
            -91993,-15465731.9234424,-42.9015580993,-101993,-15685862.3086887,-43.5121943472,-111993,-15805361.6606795,-43.843682596,-121993,-15924861.0126703,-44.1751708449,
            -11994,-16033750.0800922,-44.4772264266,-21994,-16125110.479409,-44.7306579162,-31994,-16292604.5448231,-45.1952823138,-41994,-16612365.9424318,-46.0822925274,
            -51994,-16810313.4742847,-46.6313940883,-61994,-17038714.4725767,-47.2649728123,-71994,-17221435.2712102,-47.7718357915,-81994,-17404156.0698437,-48.2786987707,
            -91994,-17602103.6016967,-48.8278003315,-101994,-17845731.3332081,-49.5036176372,-111994,-18074132.3315,-50.1371963612,-121994,-18226399.6636946,-50.5595821772,
            -11995,-18256853.1301335,-50.6440593404,-21995,-18287306.5965724,-50.7285365036,-31995,-18272079.863353,-50.686297922,-41995,-18439573.9287671,-51.1509223196,
            -51995,-18622294.7274006,-51.6577852989,-61995,-18683201.6602784,-51.8267396253,-71995,-18728881.8599368,-51.9534553701,-81995,-18957282.8582287,-52.5870340941,
            -91995,-19140003.6568623,-53.0938970733,-101995,-19337951.1887152,-53.6429986341,-111995,-19474991.7876904,-54.0231458685,-121995,-19703392.7859823,-54.6567245926,
            -11996,-19870886.8513964,-55.1213489902,-21996,-20053607.6500299,-55.6282119694,-31996,-20251555.1818829,-56.1773135302,-41996,-20586543.312711,-57.1065623255,
            -51996,-20936758.1767586,-58.0780497023,-61996,-21089025.5089532,-58.5004355183,-71996,-21149932.4418311,-58.6693898447,-81996,-21226066.1079284,-58.8805827527,
            -91996,-21317426.5072451,-59.1340142423,-101996,-21484920.5726592,-59.59863864,-111996,-21621961.1716344,-59.9787858744,-121996,-21789455.2370484,-60.443410272,
            -11997,-21880815.6363652,-60.6968417616,-21997,-22139670.101096,-61.4148976488,-31997,-22352844.3661685,-62.0062377913,-41997,-22520338.4315826,-62.4708621889,
            -51997,-22626925.5641188,-62.7665322601,-61997,-22870553.2956302,-63.4423495657,-71997,-23098954.2939221,-64.0759282897,-81997,-23190314.6932388,-64.3293597794,
            -91997,-23175087.9600194,-64.2871211978,-101997,-23449169.1579697,-65.0474156666,-111997,-23388262.2250918,-64.8784613402,-121997,-23312128.5589945,-64.6672684322,
            -11998,-23388262.2250918,-64.8784613402,-21998,-23373035.4918724,-64.8362227586,-31998,-23327355.292214,-64.7095070138,-41998,-23647116.6898227,-65.5965172274,
            -51998,-23738477.0891394,-65.849948717,-61998,-23829837.4884562,-66.1033802066,-71998,-23799384.0220173,-66.0189030434,-81998,-23921197.8877729,-66.3568116962,
            -91998,-24256186.0186011,-67.2860604915,-101998,-24987069.2131352,-69.3135124084,-111998,-25306830.6107439,-70.200522622,-121998,-25322057.3439633,-70.2427612036,
            -11999,-25204918.085306,-69.9178197953,-21999,-25012330.3635463,-69.3835862152,-31999,-24964183.4331064,-69.2500278202,-41999,-25036403.8287663,-69.4503654127,
            -51999,-25156771.1548661,-69.7842614003,-61999,-25228991.550526,-69.9845989928,-71999,-25301211.9461859,-70.1849365854,-81999,-25421579.2722857,-70.5188325729,
            -91999,-25541946.5983856,-70.8527285605,-101999,-25710460.8549253,-71.3201829431,-111999,-25662313.9244854,-71.1866245481,-121999,-25662313.9244854,-71.1866245481,
            -12000,-25541946.5983856,-70.8527285605,-22000,-25421579.2722857,-70.5188325729,-32000,-25349358.8766258,-70.3184949804,-42000,-25469726.2027257,-70.652390968,
            -52000,-25686387.3897054,-71.2534037456,-62000,-25758607.7853653,-71.4537413381,-72000,-25830828.1810252,-71.6540789306,-82000,-25686387.3897054,-71.2534037456,
            -92000,-25541946.5983856,-70.8527285605,-102000,-25686387.3897054,-71.2534037456,-112000,-25686387.3897054,-71.2534037456,-122000,-25662313.9244854,-71.1866245481,
            -12001,-25511710.3260693,-70.7688538884,-22001,-25486096.1590753,-70.6978008223,-32001,-25537324.4930633,-70.8399069546,-42001,-25767851.9960098,-71.47938455,
            -52001,-25870308.6639859,-71.7635968146,-62001,-25947151.1649681,-71.976756013,-72001,-26049607.8329443,-72.2609682776,-82001,-26126450.3339264,-72.4741274761,
            -92001,-26177678.6679145,-72.6162336084,-102001,-26203292.8349085,-72.6872866746,-112001,-26049607.8329443,-72.2609682776,-122001,-26023993.6659502,-72.1899152115,
            -12002,-26305749.5028847,-72.9714989392,-22002,-26510662.8388371,-73.5399234684,-32002,-26638733.6738073,-73.8951887992,-42002,-27048560.345712,-75.0320378576,
            -52002,-27304702.0156525,-75.7425685191,-62002,-27663300.3535691,-76.7373114453,-72002,-27842599.5225274,-77.2346829083,-82002,-27740142.8545513,-76.9504706437,
            -92002,-27842599.5225274,-77.2346829083,-102002,-28021898.6914858,-77.7320543714,-112002,-27791371.1885393,-77.092576776,-122002,-27714528.6875572,-76.8794175776,
            -12003,-27766269.3048852,-77.0229447712,-22003,-27875693.0262837,-77.3264834698,-32003,-27930404.886983,-77.4782528191,-42003,-27875693.0262837,-77.3264834698,
            -52003,-27738913.3745355,-76.9470600966,-62003,-27574777.7924377,-76.4917520487,-72003,-27383286.2799902,-75.9605593261,-82003,-27437998.1406895,-76.1123286754,
            -92003,-27301218.4889413,-75.7329053021,-102003,-27301218.4889413,-75.7329053021,-112003,-27246506.628242,-75.5811359528,-122003,-27191794.7675427,-75.4293666035,
            -12004,-27137082.9068434,-75.2775972542,-22004,-27191794.7675427,-75.4293666035,-32004,-27164438.8371931,-75.3534819289,-42004,-27465354.0710391,-76.18821335,
            -52004,-27574777.7924377,-76.4917520487,-62004,-27574777.7924377,-76.4917520487,-72004,-27520065.9317384,-76.3399826993,-82004,-27574777.7924377,-76.4917520487,
            -92004,-27520065.9317384,-76.3399826993,-102004,-27520065.9317384,-76.3399826993,-112004,-27492710.0013888,-76.2640980247,-122004,-27520065.9317384,-76.3399826993,
            -12005,-27355930.3496406,-75.8846746514,-22005,-27410642.2103399,-76.0364440007,-32005,-27355930.3496406,-75.8846746514,-42005,-27547421.8620881,-76.415867374,
            -52005,-27629489.653137,-76.643521398,-62005,-27656845.5834866,-76.7194060726,-72005,-27957760.8173327,-77.5541374938,-82005,-28012472.6780319,-77.7059068431,
            -92005,-28039828.6083816,-77.7817915177,-102005,-28258676.0511787,-78.3888689149,-112005,-28231320.1208291,-78.3129842403,-122005,-28176608.2601298,-78.161214891,
            -12006,-28094540.4690809,-77.933560867,-22006,-28258676.0511787,-78.3888689149,-32006,-28340743.8422276,-78.6165229389,-42006,-28586947.2153744,-79.2994850108,
            -52006,-28586947.2153744,-79.2994850108,-62006,-28614303.145724,-79.3753696854,-72006,-28641659.0760737,-79.4512543601,-82006,-28641659.0760737,-79.4512543601,
            -92006,-28395455.7029269,-78.7682922882,-102006,-28203964.1904794,-78.2370995656,-112006,-28149252.3297802,-78.0853302163,-122006,-28149252.3297802,-78.0853302163,
            -12007,-28111501.1458976,-77.9806093653,-22007,-28026314.7787889,-77.7443044884,-32007,-28083105.6901947,-77.901841073,-42007,-28225082.9687094,-78.2956825345,
            -52007,-28225082.9687094,-78.2956825345,-62007,-28423851.1586298,-78.8470605805,-72007,-28736201.171362,-79.7135117957,-82007,-28934969.3612825,-80.2648898417,
            -92007,-28792992.0827679,-79.8710483802,-102007,-28821387.5384708,-79.9498166725,-112007,-28934969.3612825,-80.2648898417,-122007,-29105342.0955001,-80.7374995954,
            -12008,-29105342.0955001,-80.7374995954,-22008,-29048551.1840942,-80.5799630108,-32008,-29133737.551203,-80.8162678877,-42008,-29559669.3867469,-81.997792272,
            -52008,-29758437.5766674,-82.549170318,-62008,-29786833.0323703,-82.6279386103,-72008,-30127578.5008055,-83.5731581178,-82008,-30383137.6021318,-84.2820727484,
            -92008,-30383137.6021318,-84.2820727484,-102008,-30411533.0578347,-84.3608410407,-112008,-30241160.3236172,-83.8882312869,-122008,-30212764.8679142,-83.8094629946,
            -12009,-30052529.3113826,-83.3649735213,-22009,-30022685.6874388,-83.2821880461,-32009,-30171903.8071577,-83.696115422,-42009,-30470340.0465955,-84.523970174,
            -52009,-30589714.5423706,-84.8551120748,-62009,-30858307.1578646,-85.6001813515,-72009,-31186587.0212461,-86.5108215787,-82009,-31335805.140965,-86.9247489546,
            -92009,-31246274.2691337,-86.6763925291,-102009,-31305961.5170212,-86.8419634794,-112009,-31395492.3888525,-87.090319905,-122009,-31395492.3888525,-87.090319905,
            -12010,-31186587.0212461,-86.5108215787,-22010,-31097056.1494148,-86.2624651531,-32010,-31126899.7733586,-86.3452506283,-42010,-31395492.3888525,-87.090319905,
            -52010,-31514866.8846277,-87.4214618058,-62010,-31604397.756459,-87.6698182314,-72010,-31753615.8761779,-88.0837456074,-82010,-31902833.9958967,-88.4976729833,
            -92010,-31992364.8677281,-88.7460294089,-102010,-32081895.7395594,-88.9943858345,-112010,-32111739.3635032,-89.0771713097,-122010,-32231113.8592783,-89.4083132105,
            -12011,-32297366.7044335,-89.5920969654,-22011,-32392358.9594465,-89.855603133,-32011,-32455687.1294552,-90.0312739113,-42011,-32645671.6394813,-90.5582862464,
            -52011,-32803992.064503,-90.9974631923,-62011,-32930648.4045204,-91.3488047491,-72011,-32835656.1495074,-91.0852985815,-82011,-32993976.5745291,-91.5244755274,
            -92011,-32930648.4045204,-91.3488047491,-102011,-32962312.4895247,-91.4366401382,-112011,-32930648.4045204,-91.3488047491,-122011,-32930648.4045204,-91.3488047491,
            -12012,-32930648.4045204,-91.3488047491,-22012,-32930648.4045204,-91.3488047491,-32012,-33057304.7445378,-91.7001463058,-42012,-33342281.5095769,-92.4906648084,
            -52012,-33342281.5095769,-92.4906648084,-62012,-33247289.2545639,-92.2271586409,-72012,-33278953.3395682,-92.3149940301,-82012,-33627258.274616,-93.2811833111,
            -92012,-33627258.274616,-93.2811833111,-102012,-33563930.1046073,-93.1055125327,-112012,-33405609.6795856,-92.6663355868,-122012,-33468937.8495943,-92.8420063651,
            -12013,-33410549.2768463,-92.6800379075,-22013,-33410549.2768463,-92.6800379075,-32013,-33477170.5116954,-92.8648435663,-42013,-33610412.9813937,-93.234454884,
            -52013,-33643723.5988183,-93.3268577134,-62013,-33910208.5382149,-94.0660803488,-72013,-34010140.3904886,-94.343288837,-82013,-34076761.6253377,-94.5280944959,
            -92013,-34076761.6253377,-94.5280944959,-102013,-34176693.4776114,-94.8053029841,-112013,-34043451.0079131,-94.4356916665,-122013,-34076761.6253377,-94.5280944959,
            -12014,-33876897.9207903,-93.9736775194,-22014,-33810276.6859411,-93.7888718605,-32014,-33910208.5382149,-94.0660803488,-42014,-33943519.1556394,-94.1584831782,
            -52014,-33976829.773064,-94.2508860076,-62014,-34076761.6253377,-94.5280944959,-72014,-34110072.2427623,-94.6204973253,-82014,-34076761.6253377,-94.5280944959,
            -92014,-33976829.773064,-94.2508860076,-102014,-34076761.6253377,-94.5280944959,-112014,-34010140.3904886,-94.343288837,-122014,-34010140.3904886,-94.343288837,
            -12015,-33705015.1348795,-93.4968789196,-22015,-33467177.326468,-92.8371227175,-32015,-33569107.8157872,-93.1198753755,-42015,-33772968.7944256,-93.6853806916,
            -52015,-33840922.4539718,-93.8738824636,-62015,-33942852.9432909,-94.1566351216,-72015,-34010806.6028371,-94.3451368936,-82015,-33942852.9432909,-94.1566351216,
            -92015,-33806945.6241987,-93.7796315776,-102015,-33840922.4539718,-93.8738824636,-112015,-33705015.1348795,-93.4968789196,-122015,-33671038.3051064,-93.4026280336,
            -12016,-33501154.1562411,-92.9313736035,-22016,-33399223.6669219,-92.6486209455,-32016,-33331270.0073758,-92.4601191735,-42016,-33467177.326468,-92.8371227175,
            -52016,-33569107.8157872,-93.1198753755,-62016,-33671038.3051064,-93.4026280336,-72016,-33806945.6241987,-93.7796315776,-82016,-33705015.1348795,-93.4968789196,
            -92016,-33671038.3051064,-93.4026280336,-102016,-33738991.9646526,-93.5911298056,-112016,-33603084.6455603,-93.2141262615,-122016,-33603084.6455603,-93.2141262615,
            -12017,-33535878.4762692,-93.027698009,-22017,-33535878.4762692,-93.027698009,-32017,-33636687.7302059,-93.3073403878,-42017,-33703893.899497,-93.4937686403,
            -52017,-33838306.2380792,-93.8666251454,-62017,-33603084.6455603,-93.2141262615,-72017,-33569481.5609147,-93.1209121353,-82017,-33670290.8148514,-93.4005545141,
            -92017,-33703893.899497,-93.4937686403,-102017,-33804703.1534337,-93.7734110191,-112017,-33703893.899497,-93.4937686403,-122017,-33737496.9841425,-93.5869827666,
            -12018,-33569481.5609147,-93.1209121353,-22018,-33603084.6455603,-93.2141262615,-32018,-33703893.899497,-93.4937686403,-42018,-33838306.2380792,-93.8666251454,
            -52018,-34006321.661307,-94.3326957767,-62018,-34039924.7459526,-94.4259099029,-72018,-34039924.7459526,-94.4259099029,-82018,-34073527.8305981,-94.5191240292,
            -92018,-34107130.9152437,-94.6123381555,-102018,-34207940.1691804,-94.8919805342,-112018,-34107130.9152437,-94.6123381555,-122018,-34006321.661307,-94.3326957767,
            -12019,-33973054.6075079,-94.2404137917,-22019,-34006993.7229999,-94.3345600592,-32019,-34176689.30046,-94.8052913968,-42019,-34278506.6469361,-95.0877301994,
            -52019,-34516080.4553802,-95.7467540721,-62019,-34312445.7624281,-95.1818764669,-72019,-34210628.415952,-94.8994376643,-82019,-34278506.6469361,-95.0877301994,
            -92019,-34210628.415952,-94.8994376643,-102019,-34346384.8779201,-95.2760227344,-112019,-34210628.415952,-94.8994376643,-122019,-34210628.415952,-94.8994376643,
            -12020,-34074871.953984,-94.5228525942,-22020,-34040932.838492,-94.4287063267,-32020,-34176689.30046,-94.8052913968,-42020,-34074871.953984,-94.5228525942,
            -52020,-33973054.6075079,-94.2404137917,-62020,-33939115.4920159,-94.1462675242,-72020,-34006993.7229999,-94.3345600592,-82020,-34006993.7229999,-94.3345600592,
            -92020,-33973054.6075079,-94.2404137917,-102020,-34074871.953984,-94.5228525942,-112020,-34006993.7229999,-94.3345600592,-122020,-33973054.6075079,-94.2404137917,
            -12021,-33938810.0399765,-94.1454202077,-22021,-34040932.838492,-94.4287063267,-32021,-34245178.4355229,-94.9952785647,-42021,-34347301.2340384,-95.2785646837,
            -52021,-34483464.9653924,-95.656279509,-62021,-34517505.8982308,-95.7507082153,-72021,-34653669.6295848,-96.1284230406,-82021,-34755792.4281003,-96.4117091596,
            -92021,-34823874.2937773,-96.6005665722,-102021,-34857915.2266158,-96.6949952786,-112021,-34823874.2937773,-96.6005665722,-122021,-34925997.0922927,-96.8838526912,
            -12022,-34994078.9579697,-97.0727101039,-22022,-35232365.4878392,-97.7337110482,-32022,-35436611.0848701,-98.3002832861,-42022,-35708938.5475781,-99.0557129367,
            -52022,-35913184.144609,-99.6222851747,-62022,-36049347.875963,-100,-72022,-36457839.0700249,-101.1331444759,-82022,-36355716.2715094,-100.8498583569,
            -92022,-36423798.1371864,-101.0387157696,-102022,-36628043.7342173,-101.6052880076,-112022,-36662084.6670558,-101.6997167139,-122022,-36764207.4655713,-101.9830028329,
            -12023,-36878482.8771101,-102.3,-22023,-37058729.6164899,-102.8,-32023,-37202927.0079938,-103.2,-42023,-37491321.7910015,-104,
            -52023,-37563420.4867534,-104.2,-62023,-37563420.4867534,-104.2,-72023,-37671568.5303813,-104.5,-82023,-37851815.2697611,-105,
            -92023,-37815765.9218852,-104.9,-102023,-37996012.661265,-105.4,-112023,-37887864.6176371,-105.1,-122023,-37851815.2697611,-105,
            -12024,-37851815.2697611,-105,-22024,-37996012.661265,-105.4,-32024,-38212308.7485208,-106,-42024,-38536752.8794044,-106.9,
            -52024,-38608851.5751563,-107.1,-62024,-38644900.9230323,-107.2,-72024,-38861197.0102881,-107.8,-82024,-39221690.4890477,-108.8,
            -92024,-39149591.7932958,-108.6,-102024,-39329838.5,-109.1,-112024,-39185641.142,-108.7
            
            
];
