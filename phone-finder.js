

//spinner function
let spinnerDisplay = spinnerStyle => {
    document.getElementById('spinner-container').style.display = spinnerStyle;
  }
  //container display
let phoneDisplay = spinnerStyle => {
    document.getElementById('phone-container-display').style.display = spinnerStyle;
  }


  //error msg
  let errorMessage = (msg,text,searchText) => {

      let errorId = document.getElementById('error');
      errorId.style.display = msg;

      if(text == false){
        // errorId.innerText = `Your "${searchText.toUpperCase()}" Phone is not found`
        errorId.innerHTML = `
        <h4 style="color:#000080">Your <span style="color:#FF0000">${searchText.toUpperCase()}</span> phone is not found</h4>
        `
      }else{
        errorId.innerText = `Please Provide correct Phone Name`
      }

  }

  //search button clicked > function start
let loadPhone = () => {

    spinnerDisplay('block');
    phoneDisplay('none');

    let phoneInput = document.getElementById('phone-input')
    let searchText = phoneInput.value;


    if(searchText === ''){
        // document.getElementById('error').style.display = 'block';
        errorMessage('block')
         document.getElementById('phone-container').textContent = '';
         spinnerDisplay('none');

    }else{
        // document.getElementById('error').style.display = 'none'
        errorMessage('none')
        let url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            displayPhone(data.data)
            if(data.status === false){
                errorMessage('block',false,searchText);
                spinnerDisplay('none');
            }
        })
    }
    phoneInput.value = '';
}

function loadMore(div){
    let divs = div;
    divs.classList.remove('d-none')
   }
//show all search phone in display
let displayPhone = data => {
    let phoneContainer = document.getElementById('phone-container')

    phoneContainer.textContent = '';

    // console.log(data.length)
    let count = 0;
    data.forEach(element => {
      count++;
            let div = document.createElement('div')
            div.classList.add('col')
            
    if(count > 20){
        div.classList.add('d-none');
        let showMoreButton = document.getElementById('show-more-button')
        showMoreButton.classList.remove('d-none');
        showMoreButton.addEventListener('click',function(){
            div.classList.remove('d-none')
            showMoreButton.style.display = 'none';
        })
    }


            div.innerHTML = `
            <div class="card h-100">
            <img src="${element.image}" class="card-img-top w-50" alt="..." >
            <div class="card-body">
              <h5 class="card-title">
              ${element.phone_name} <br>
              <span class="lead my-2 fst-italic d-block">brand:${element.brand}</span>
              </h5>
              <button type="button" onclick="loadDetails('${element.slug}')" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">show details
        </button>
            </div>
          </div>
            `
            // console.log(element)
            phoneContainer.appendChild(div);
            


    });
    spinnerDisplay('none');
    phoneDisplay('block');

}
//this function will start when show details button will clicked
let loadDetails =async id => {
    let url = `https://openapi.programming-hero.com/api/phone/${id}
    `
   let res = await fetch(url);
   let data = await res.json()
    displayPhoneDetails(data.data)
}

//modal open
let displayPhoneDetails = phone => {
    console.log(phone)
    let modalHeader = document.getElementById('phoneModalLabel');
    modalHeader.innerText = phone.name;
    let modalBody = document.getElementById('phone-details-modal')

    modalBody.innerHTML = `
    <p>Relase Date: ${phone.releaseDate ? phone.releaseDate : 'No relase data found'
    }</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Information'
    }</p>
    <p>Others: Bluetooth- ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] :  'No sensor'}</p>
    `
}