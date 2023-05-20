import './css/styles.css';
import Notiflix from 'notiflix';
import { onFetch } from './fetchCountries'
const DEBOUNCE_DELAY = 300;

import debounce from "lodash.debounce";

// function onFetch(name){
//   return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(res => {
//         if(!res.ok){
//             throw new Error(res.status)
//          }      
//    return res.json()}).then(res => {console.log(res); return res}).catch(err => console.log(err))
// }

const refs ={
    inputEl: document.querySelector('#search-box'),
    ulEl: document.querySelector('.country-list'),
    countryEl: document.querySelector('.country-info')
}


refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY, ));

// function onInput(evt){
   
//     let inputText = evt.currentTarget.value;
    
//     let selCont = onFetch(inputText);
//         console.log(selCont)

//         if(selCont.length > 10){
//             console.log('too much');
//             return
//         }
//         let selContLength = selCont.length
//         let selCountries = ''
//         selCont.map(cont => {
//           return  selCountries += `<li><img src='${cont.flags.svg}'></img><p>${cont.name.official}</p></li>`
//         })
//         refs.ulEl.innerHTML = selCountries;
// }

function onInput(evt) {
  
    // let inputText = evt.currentTarget.value;
    let inputText = refs.inputEl.value.trim() ;
    

    evt.preventDefault()
    onFetch(inputText)
      .then(selCont => {
        console.log(selCont);
        if(!inputText){
            refs.ulEl.innerHTML = '';
            refs.countryEl.innerHTML = '';
            return
        }
  
        if (selCont.length > 10) {
            
          console.log('too much');
          Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
          return;
        }
  
        let selCountries = '';
        if(selCont.length > 1){
            selCont.forEach(cont => {
                refs.countryEl.innerHTML = '';
                refs.ulEl.innerHTML = '';
                selCountries += `<li style='display: flex; align-items: center; margin-bottom: 20px ' ><img style='width: 40px; margin-right:20px;  ' src='${cont.flags.svg}'></img><p>${cont.name.official}</p></li>`;
              });
              refs.ulEl.innerHTML = selCountries;
            }
            if(selCont.length === 1){
                onFullCard(selCont)
            }
            
        }

        )
      .catch(error => {console.log(error); Notiflix.Notify.failure("Oops, there is no country with that name");});
  }
function onFullCard(selCont){
    let selCountries = '';
    refs.ulEl.innerHTML = '';
    selCountries  += `<li style=' align-items: center; margin-bottom: 20px ' ><img style='width: 80px; margin-right:20px;  ' src='${selCont[0].flags.svg}'></img><h3>${selCont[0].name.official}</h3><div><p><b>Capital</b>: ${selCont[0].capital}</p><p><b>Population</b>: ${selCont[0].population}</p><p><b>Languages</b>: ${Object.values(selCont[0].languages).join(', ')}</p></div></li>`;
    refs.countryEl.innerHTML = selCountries;
}





