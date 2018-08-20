import {vino, Vino} from "./vino";
import * as Rxjs from 'rxjs';

const URL_ROOT = 'http://localhost:3000/vinarija/'

export class VinarijaService{

    
static postData(obj){
    
    fetch(`${URL_ROOT}`, {
        method: 'post',
        headers: {
            
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
    .then(response => {
        console.log('uspesno dodavanje');
      })
}

static getData() {
    return fetch(`${URL_ROOT}`)
        .then(response => response.json()) 
}

static delete(id){ 
            
  const addStudent=Rxjs.Observable.fromPromise(
      fetch(`${URL_ROOT}${id}`, {
          method: 'delete',
          headers: {
              
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
      .then(response => {
          console.log('uspesno brisanje!');
         
        })
      )
      
}
static update(id){     
  
  let put=Rxjs.Observable.fromPromise(
      fetch(`${URL_ROOT}${id}`, {
          method: 'put',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         
          body: JSON.stringify({
              naziv: document.getElementById("labelica0").value,
              vrsta: document.getElementById("labelica1").value,
              procenat: document.getElementById("labelica2").value,
              berba:document.getElementById("labelica3").value,
              adresa:document.getElementById("labelica4").value,
              cena:document.getElementById("labelica5").value
          })
          
        })

    )
  
}


}

