
const search = () => {
    console.log("dziala");
    const startCity = document.getElementById('inputstart').value;
    const select = document.getElementById('inputdestination');
    const endCity = select.options[select.selectedIndex].value;
    const date = document.getElementById('inputdate').value;
    const time = document.getElementById('inputtime').value;

    document.cookie = `startCity=${startCity}`;
    document.cookie = `endCity=${endCity}`;
    document.cookie = `date=${date}`;
    document.cookie = `time=${time}`;
}

const removeCookies = () => {
    document.cookie = "startCity=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "endCity=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "date=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "time=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const connectJson = () => {
    const startCity = getCookie('startCity')
    const endCity = getCookie('endCity');
    const date = getCookie('date');
    const [year, month, day] = date.split('-');
    console.log(day + ' ' + month + ' ' + year);
    const time = getCookie('time');
    const direction = document.getElementById('pDirection');
    const search_date = document.getElementById('pDate');

    direction.innerHTML = `${startCity} -> ${endCity}`;
    search_date.innerHTML = day + '-' + month + '-' + year + " " + time;

    let array = [];
    let array2 = [];
    let array3 = [];
    let array4 = [];
    
    fetch("./connections.json")
    .then(response => {
       return response.json();
    })
    .then(jsondata => {
        // console.log(jsondata);
            Object.entries(jsondata).forEach((entry) => {
                const [key, value] = entry;
                // console.log(`${key}: ${value}`);
                Object.entries(value).forEach((entry) => {
                    const [key2, value2] = entry;
                    // console.log(`${key2}: ${value2}`);
                    if(value2 === startCity)
                        // generateField(startCity, endCity);
                        array.push(key)
                    if(key2 === "start_time" && parseFloat(value2) > parseFloat(time))
                        array2.push(key);
                    if(key2 === "date"){
                        const [dayJson, monthJson, yearJson] = value2.split(".")
                        if(parseInt(dayJson) >= parseInt(day) && parseInt(monthJson) >= parseInt(month) && parseInt(yearJson) >= parseInt(year)){
                            // console.log(dayJson + " " + monthJson + " " + yearJson);
                            array3.push(key)
                        }
                    }
                    if(value2 === endCity)
                        array4.push(key);
                });
            });
            // indeksy obiektow ktore spelniają wyszukane kryteria
            const array_intersection1 = array.filter(function(x) {
                    if(array2.indexOf(x) != -1)
                        return true;
                    else
                        return false;
                });
            const array_intersection2 = array3.filter(function(x) {
                    if(array_intersection1.indexOf(x) != -1)
                        return true;
                    else
                        return false;
                });
            const array_intersection3 = array4.filter(function(x) {
                    if(array_intersection2.indexOf(x) != -1)
                        return true;
                    else
                        return false;
                });

            for( let i = 0; i < array_intersection3.length; i++ ) {
                // console.log(jsondata[array_intersection2[i]]); 
                const wynik = jsondata[array_intersection3[i]];
                generateField(wynik);
                
            }
        });
}

const generateField = (wynik) => {
    let startCity, endCity, startStation, startTime, endTime, date;
    const peron = () => {
        const peron = Math.floor(Math.random() * 5 + 1)
        return peron
    }
    const tor = () => {
        const tor = Math.floor(Math.random() * 10 + 1)
        return tor
    }
    

    Object.entries(wynik).forEach(entry => {
        const [key, value] = entry;
        // console.log(`${key}: ${value}`);
        if (key === "start_city")
            startCity = value;
        if (key === "end_station")
            endCity = value;
        if (key === "start_station")
            startStation = value;
        if (key === "start_time")
            startTime = value;
        if (key === "end_time")
            endTime = value;
        if (key === "date")
            date = value;
    });
    // przekazywanie parametrow wybranego polacznia do dalszych podstron w querystringu
    const queryString = `startCity=${startCity}&endCity=${endCity}&startTime=${startTime}&endTime=${endTime}&startStation=${startStation}&date=${date}`;

    const newA = document.createElement('a');
    newA.style = 'color:black'
    newA.href = `./buyTicket.html?${new URLSearchParams(queryString)}`;
    document.body.appendChild(newA);
    const newDiv = document.createElement('div');
    newDiv.className = 'ticket_main_info';
    newA.appendChild(newDiv);
    const newDivRow = document.createElement('div');
    newDivRow.className = 'row';
    newDiv.appendChild(newDivRow);
    const newDivCol = document.createElement('div');
    newDivCol.className = 'col-8';
    newDivRow.appendChild(newDivCol);
    const newSmallDate = document.createElement('small');
    newDivCol.appendChild(newSmallDate);
    newSmallDate.innerText = date;
    const newP = document.createElement('p');
    newDivCol.appendChild(newP);
    newP.innerText = startStation;
    const newSmall = document.createElement('small');
    newDivCol.appendChild(newSmall);
    newSmall.innerText = `Peron ${peron()} Tor ${tor()}`;
    const newDivCol2 = document.createElement('div')
    newDivCol2.className = 'col';
    newDivRow.appendChild(newDivCol2);
    const newSmall2 = document.createElement('small');
    newDivCol2.appendChild(newSmall2);
    newSmall2.innerText = "Odjazd";
    const newP2 = document.createElement('p');
    newDivCol2.appendChild(newP2);
    newP2.innerText = `${startTime}`;

    const newDivRow2 = document.createElement('div');
    newDivRow2.className = 'row';
    newDiv.appendChild(newDivRow2);
    const newDivCol3 = document.createElement('div');
    newDivCol3.className = 'col-8';
    newDivRow2.appendChild(newDivCol3);
    const newP3 = document.createElement('p');
    newDivCol3.appendChild(newP3);
    newP3.innerText = `${endCity}`;;
    const newSmall3 = document.createElement('small');
    newDivCol3.appendChild(newSmall3);
    newSmall3.innerText = `Peron ${peron()} Tor ${tor()}`;
    const newDivCol4 = document.createElement('div')
    newDivCol4.className = 'col';
    newDivRow2.appendChild(newDivCol4);
    const newSmall4 = document.createElement('small');
    newDivCol4.appendChild(newSmall4);
    newSmall4.innerText = "Przyjazd";
    const newP4 = document.createElement('p');
    newDivCol4.appendChild(newP4);
    newP4.innerText = `${endTime}`;
}

const getDataFromQueryString = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const startCity = urlParams.get('startCity');
    const endCity = urlParams.get('endCity');
    const startTime = urlParams.get('startTime');
    const endTime = urlParams.get('endTime');
    const startStation = urlParams.get('startStation');
    const date = urlParams.get('date');

    fillStations(startCity, endCity);

    const parent = document.getElementById('train_info_top');
    const direction = parent.getElementsByClassName('pDirection');
    const search_date = document.getElementsByClassName('timeInfo');
    direction[0].innerHTML = `${startCity} -> ${endCity}`;
    search_date[0].innerHTML = `${startStation}: ${startTime} -> ${endTime}`;
    const tripDate = document.getElementsByClassName('tripDate');
    tripDate[0].innerHTML = date;

    const cityName = document.getElementsByClassName('cityName');
    cityName[0].innerHTML = startStation;
    const timeLeave = document.getElementById('timeLeave').innerHTML = startTime;
    const endCityName = document.getElementsByClassName('endCityName');
    endCityName[0].innerHTML = endCity;
    const timeArrive = document.getElementById('timeArrive').innerHTML = endTime;


    const queryStringPass = `startCity=${startCity}&endCity=${endCity}&startTime=${startTime}&endTime=${endTime}&startStation=${startStation}&date=${date}`;
    const divparent = document.getElementById('icons_bottom')
    const newA = document.createElement('a');
    divparent.appendChild(newA);
    newA.className = 'btn btn-primary btn-lg active';
    newA.role = 'button';
    newA.href = `./chooseOffer.html?${new URLSearchParams(queryStringPass)}`;
    newA.innerHTML = 'Kup bilet';
}

const fillStations = (startCity, endCity) => {
    fetch("./connections.json")
    .then(response => {
       return response.json();
    })
    .then(jsondata => {
        // console.log(jsondata);
            Object.entries(jsondata).forEach((entry) => {
                const [key, value] = entry;
                // console.log(`${key}: ${value}`);
            });
        });
}

const addButtonDalej = () => {
    const divparent = document.getElementById('icons_bottom')
    const newA = document.createElement('a');
    divparent.appendChild(newA);
    newA.id = 'chooseOfferNext'
    newA.className = 'btn btn-primary btn-lg active';
    newA.role = 'button';
    newA.innerHTML = 'Dalej';
    
    newA.setAttribute("onclick", "addTicketToQueryString()");
}

const addTicketToQueryString = () => {
    console.log("dziala");

    let checkedValue = null; 
    let inputElements = document.getElementsByClassName('form-check-input');
    for(let i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            checkedValue = inputElements[i].value;
            break;
        }
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const startCity = urlParams.get('startCity');
    const endCity = urlParams.get('endCity');
    const startTime = urlParams.get('startTime');
    const endTime = urlParams.get('endTime');
    const startStation = urlParams.get('startStation');
    const date = urlParams.get('date');
    const queryStringPass = `startCity=${startCity}&endCity=${endCity}&startTime=${startTime}&endTime=${endTime}&startStation=${startStation}&date=${date}&ticket=${checkedValue}`;

    const newA = document.getElementById('chooseOfferNext');
    newA.href = `./assumeTicket.html?${new URLSearchParams(queryStringPass)}`;
}   

const fillAssumeTicket = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const startCity = urlParams.get('startCity');
    const endCity = urlParams.get('endCity');
    const startTime = urlParams.get('startTime');
    const endTime = urlParams.get('endTime');
    const startStation = urlParams.get('startStation');
    const date = urlParams.get('date');
    const ticket = urlParams.get('ticket');

    document.getElementsByClassName('directionP')[0].innerHTML = `${startCity} -> ${endCity}`;
    document.getElementById('dateP').innerHTML = date;
    document.getElementById('startTimeP').innerHTML = startTime;
    document.getElementById('endTimeP').innerHTML = endTime;
    document.getElementById('ticketPriceP').innerHTML = `${ticket} zł`;

    const queryStringPass = `startCity=${startCity}&endCity=${endCity}&startTime=${startTime}&endTime=${endTime}&startStation=${startStation}&date=${date}&ticket=${ticket}`;

    const newA = document.getElementById('assumeTicketNext');
    newA.href = `./ticketBought.html?${new URLSearchParams(queryStringPass)}`;
}

const ticketBoughtInfo = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const startCity = urlParams.get('startCity');
    const endCity = urlParams.get('endCity');
    const startTime = urlParams.get('startTime');
    const endTime = urlParams.get('endTime');
    const date = urlParams.get('date');

    document.getElementById('directionP').innerHTML = `${startCity} -> ${endCity} ${date}`;
    document.getElementById('startTime').innerHTML = startTime;
    document.getElementById('endTime').innerHTML = endTime;
}


