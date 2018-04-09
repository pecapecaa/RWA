import {vinarija, Vinarija} from "./vinarija";
import {VinarijaService} from "./vinarija.service";
import { Vino } from "./vino";
import * as Rxjs from 'rxjs';

  const vin=new Vinarija("Petijevic");
  const v1=new Vino("Borko","belo",12,2012,"Nemanjica 12",3000);
  let suma=0;
  
  window.onload = function() {
    ucitaj();
  };
  
  let pretraga=document.createElement('div');
  document.body.appendChild(pretraga);
  pretraga.className="pretraga";
  
  let temp=document.createElement('div');
  temp.innerHTML="Pretrazi trazeno vino: ";
  pretraga.appendChild(temp);
  
  let unos=document.createElement('input');
  unos.className="temp";
  unos.id="pretragainput";
  pretraga.appendChild(unos);
  
  let glavniDiv=document.createElement('div');
  document.body.appendChild(glavniDiv);
  
  let leviDiv=document.createElement('div');
  leviDiv.className="levidiv";
  glavniDiv.appendChild(leviDiv);
  
  let desniDiv=document.createElement('div');
  desniDiv.className="desnidiv";
  glavniDiv.appendChild(desniDiv);
  

  let ing=document.createElement('div');
  ing.className="ing";
  glavniDiv.appendChild(ing);

  let divPretraga=document.createElement('div');
  divPretraga.id="divPretraga";
  pretraga.appendChild(divPretraga); 

  let dugmePrikaz=document.createElement('button');
  dugmePrikaz.innerHTML="Prikazi vina";
  dugmePrikaz.className="btn btn-info";
  leviDiv.appendChild(dugmePrikaz);

  let dugmeDodaj=document.createElement('button');
  dugmeDodaj.innerHTML="Dodaj vino";
  dugmeDodaj.className="btn btn-info";
  leviDiv.appendChild(dugmeDodaj);

  let dugmeKalkulator=document.createElement('button');
  dugmeKalkulator.innerHTML="Kalkulator";
  dugmeKalkulator.className="btn btn-info";
  desniDiv.appendChild(dugmeKalkulator);

  Rxjs.Observable.fromEvent(dugmePrikaz,"click")
        .subscribe((res) => {
          ucitaj();
})
  function ucitaj()
  { 
    ing.innerHTML="";
    vin.niz=[];
    VinarijaService.getData().then(vina => vina.forEach(element => {
      vin.niz.push(new Vino(element.naziv,element.vrsta,element.procenat,element.berba,element.cena,element.adresa,element.id))
      iscrtajPrikazi(element)
    }));
  }
    
  let ponoviRacunanje=document.createElement('div'); 
  ponoviRacunanje.className="ponovoRacunaj";
  ponoviRacunanje.innerHTML=""; 
  glavniDiv.appendChild(ponoviRacunanje);
  
  let sumaLabela=document.createElement('div');
  glavniDiv.appendChild(sumaLabela);

   Rxjs.Observable.fromEvent(dugmeDodaj,"click")
        .subscribe(() => {
          ing.innerHTML="";
          sumaLabela.innerHTML="";
          ponoviRacunanje.innerHTML="";
          iscrtajDodaj();
        })
  
      
   function findSugestions(str) {
    let pom = vin.niz.filter(element => element.naziv.includes(str));
    return pom;
}
Rxjs.Observable.fromEvent(pretraga, "input")
    .map(ev => ev.target.value)
    .map(l => findSugestions(l))
    .subscribe(s => {
      document.getElementById("divPretraga").innerHTML="";
      ing.innerHTML="";
      s.forEach(element => iscrtajPrikazi(element));
    })     


function iscrtajPrikazi(pom){
      
  let red=document.createElement('div');
  red.className='red';
  ing.appendChild(red);

  let naziv=document.createElement('div');
  naziv.innerHTML="Naziv: "+pom.naziv;
  naziv.className="razmak";
  red.appendChild(naziv);

  let vrsta=document.createElement('div');
  vrsta.innerHTML="Vrsta: "+pom.vrsta;
  vrsta.className="razmak";
  red.appendChild(vrsta);
  
  let procenat=document.createElement('div');
  procenat.innerHTML="Procenat: "+pom.procenat;
  procenat.className="razmak";
  red.appendChild(procenat);

  let berba=document.createElement('div');
  berba.innerHTML="Godina berbe: "+pom.berba;
  berba.className="razmak";
  red.appendChild(berba);

  let adresa=document.createElement('div');
  adresa.innerHTML="Adresa prodavnice: "+pom.adresa;
  adresa.className="razmak";
  red.appendChild(adresa);

  let cena=document.createElement('div');
  cena.innerHTML="Cena: "+pom.cena;
  cena.className="razmak";
  red.appendChild(cena);
  
  let LabelaBrojArtikala=document.createElement('input');
  LabelaBrojArtikala.id="plus"+pom.id;
  LabelaBrojArtikala.placeholder="Broj vina";
  LabelaBrojArtikala.className="dugmelevo";
  red.appendChild(LabelaBrojArtikala);
  
  let dugmeKupi=document.createElement('button');
  dugmeKupi.innerHTML='Kupi';
  dugmeKupi.className="dugmelevo";
  red.appendChild(dugmeKupi);
  
  let dugmeBrisi=document.createElement('button');
  dugmeBrisi.innerHTML="Brisi";
  dugmeBrisi.className="dugmedesno";
  red.appendChild(dugmeBrisi);

  let dugmeIzmeni=document.createElement('button');
  dugmeIzmeni.innerHTML="Izmeni";
  dugmeIzmeni.className="dugmedesno";
  red.appendChild(dugmeIzmeni);
  
  Rxjs.Observable.fromEvent(dugmeBrisi,"click")
        .subscribe(()=> {
          VinarijaService.delete("http://localhost:3000/vinarija/",pom.id);
          setTimeout(ucitaj, 1000);
      })
  Rxjs.Observable.fromEvent(dugmeIzmeni,"click")
      .subscribe(()=> {
        const atributi=['Naziv:','Vrsta:','Procenat:','Godina berbe:','Adresa prodavnice:','Cena:',];
        const atributi1=[pom.naziv,pom.vrsta,pom.procenat,pom.berba,pom.adresa,pom.cena,];
        ing.innerHTML="";
          
        for(let p=0;p<6;p++)
        {
          let labela=document.createElement('input');
          labela.id="labelica"+p;
          labela.value=atributi1[p];
         
          let naziv=document.createElement('div');
          naziv.innerHTML=atributi[p];
         
          ing.appendChild(naziv);
          ing.appendChild(labela);
        }
        let dugmePotvrdi=document.createElement('button');
        dugmePotvrdi.innerHTML='Potvrdi izmenu';
        dugmePotvrdi.className='dugmelevo';
        ing.appendChild(dugmePotvrdi); 
        
        dugmePotvrdi.addEventListener("click",function(){
              VinarijaService.update(pom.id);
              setTimeout(vin.updatearray(vin.niz,pom.id), 500);
              ing.innerHTML=""
            });
        
    })

 Rxjs.Observable.fromEvent(dugmeKupi,"click")
        .subscribe((x)=> {
          suma=suma+document.getElementById("plus"+pom.id).value*pom.cena;
          sumaLabela.innerHTML="Ukupna cena: "+suma+" dinara";
          sumaLabela.className="sumaLabela";
          LabelaBrojArtikala.value="";
          ponoviRacunanje.innerHTML="Resetuj kalkulator";
          
          Rxjs.Observable.fromEvent(ponoviRacunanje,"click")
        .subscribe((x)=> {
          sumaLabela.innerHTML="";
          ponoviRacunanje.innerHTML="";
          suma=0;
        })
    })
}   


function iscrtajDodaj(){
  const atributi=['Naziv:','Vrsta:','Procenat:','Godina berbe:','Adresa prodavnice:','Cena:',];
 
  for(let a=0;a<6;a++)
  {
    let labela=document.createElement('input');
    labela.id=a;
   
    let naziv=document.createElement('div');
    naziv.innerHTML=atributi[a];
   
    ing.appendChild(naziv);
    ing.appendChild(labela);
    
  }
  
  let dugme=document.createElement('button');
  dugme.innerHTML='Dodaj Vino';
  dugme.className='dugmelevo';
  ing.appendChild(dugme); 
  
  Rxjs.Observable.fromEvent(dugme,"click")
  .subscribe((x) => {
        
        const uhvati=[];
        let k=true;
    for(let c=0;c<6;c++){
        uhvati[c]=document.getElementById(c).value;
        if(uhvati[c]===null || uhvati[c] ==="" || uhvati[c]===undefined)
        {
          k=false;
        }
      }
    const v2=new Vino(uhvati[0],uhvati[1],uhvati[2],uhvati[3],uhvati[5],uhvati[4]);
    if(k==true)
    {
      VinarijaService.postData(v2);
      ing.innerHTML="";
    } 
    else{
      alert("Niste uneli sve podatke");
    }
  })
}
  
     

     




