import {vino, Vino} from "./vino";


export class Vinarija {
    constructor(ime)
    {
        this.ime=ime;
        this.niz=[];
    }
    updatearray(niz,id){
        niz.forEach(element => {
          if(element.id == id){
            element.naziv=document.getElementById("labelica0").value,
            element.vrsta=document.getElementById("labelica1").value,
            element.procenat=document.getElementById("labelica2").value,
            element.godina=document.getElementById("labelica3").value,
            element.adresa=document.getElementById("labelica4").value,
            element.cena=document.getElementById("labelica5").value
            
          }
          
        });
       
    }
}

