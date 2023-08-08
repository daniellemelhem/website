

let j = 0;
let jsonCards;
const pageSize = 9;
let rows;

function Mylist() {
    const elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        element.classList.add('newClass');
    })
}
function MyGrid() {
    const elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        element.classList.remove('newClass');
    })
}
async function loadFunction() {
    let options = {
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // default, *no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // *no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    const url = "https://localhost:7175/api/Card";


    const response = await fetch(url, options);
    const jsonData = await response.json();
    console.log(jsonData);
}
loadFunction();

async function GetCards() {


    let options = {
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // default, *no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // *no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    const url = "https://localhost:7175/api/Card";


    const response = await fetch(url, options);
    jsonCards = await response.json();

}
function CreateCards(pagenumber) {
    rows = null;
    document.getElementById("cont").innerHTML = " ";


        for (let i = (pagenumber - 1) * pageSize; i < pagenumber * pageSize; i++) {
            if (jsonCards.length <= i) {
                break;
            }

            if (i % 3 == 0) {
                if (rows != null) {
                    document.getElementById('cont').appendChild(rows);
                }

                rows = document.createElement('div');
                rows.classList.add('row');


            }

            let myObj = jsonCards[i];

            let card = document.createElement('div');
            card.classList.add('card');

            let body = document.createElement('div');
            body.classList.add('card-body');

            let img = document.createElement('img');
            img.src = myObj.image;
            card.appendChild(img);

            let title = document.createElement('div');
            title.classList.add('card-title');
            title.textContent = myObj.title;
            body.appendChild(title);

            let text = document.createElement('div');
            text.classList.add('card-text');
            text.textContent = myObj.text;
            body.appendChild(text);

            let date = document.createElement('div');
            date.classList.add('card-date');
            date.textContent = myObj.date;
            body.appendChild(date);
            card.appendChild(body);
            rows.appendChild(card);

        }
    

    if (rows.hasChildNodes) {
        document.getElementById('cont').appendChild(rows);

    }
}
function pages() {
    pagecount = Math.ceil(jsonCards.length / pageSize)
    let previous = document.createElement('li');
    previous.innerHTML = 'Previous'
    document.getElementById('page').appendChild(previous);
    while (j < pagecount) {
        var page = document.createElement("li")
        var text = document.createTextNode(j + 1);

        page.appendChild(text);
       
        page.addEventListener("click", function () {
            CreateCards(this.textContent);
        });
        page.style.cursor = 'pointer';
        document.getElementById('page').appendChild(page);
        j++;
    }
    let next = document.createElement('li');
    next.innerHTML = 'Next'
    document.getElementById('page').appendChild(next);
}
async function call() {
   await  GetCards();
 
    pages();
}
