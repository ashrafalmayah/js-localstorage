const addItems = document.querySelector('.add-items');
const platesList = document.querySelector('.plates');
let plates = JSON.parse(localStorage.getItem('plates')) || [];
const platesButtons = document.querySelector('.plates-buttons');

function addItem(e){
    e.preventDefault();
    text = (this.querySelector('[name="item"]')).value;
    item = {
        text,
        done: false
    };
    plates.push(item);
    displayItems(plates, platesList);
    localStorage.setItem('plates', JSON.stringify(plates));
    this.reset();
}

function displayItems(items, itemsList){
    itemsList.innerHTML = '';
    items.forEach(item => {
        itemsList.innerHTML = items.map((item, i) => {
            return `
                <li>
                    <input type= "checkbox" id="item${i}" ${item.done ? 'checked' : ''} data-index=${i}>
                    <label for="item${i}">${item.text}</label>
                    <button class="delete-item-btn"><i class="fa-solid fa-times"></i></button>
                </li>
            `;
        }).join('');
    })
}

function manageItem(e){
    let el = e.target.closest('li');
    if (!el) return; // Return if 'li' is not found

    let index = el.querySelector('input').dataset.index;

    if(e.target.matches('input')){
        plates[index].done = !plates[index].done;
    }else if(e.target.matches('.delete-item-btn') || e.target.matches('.delete-item-btn i')){
        plates.pop(index);
        displayItems(plates, platesList);
    }
    localStorage.setItem('plates', JSON.stringify(plates));
}

function manageButtons(e) {
    const button = e.target.closest('button');
    if (!button) return;
    const action = button.dataset.action; 
    const check = button.dataset.check;
    if(check){
        plates.forEach(plate => {
            plate.done = check === 'true';
        });
    }
    if(action === 'delete'){
        plates = [];
    }

    displayItems(plates, platesList);
    localStorage.setItem('plates', JSON.stringify(plates));
}


displayItems(plates, platesList);
platesList.addEventListener('click', manageItem);
addItems.addEventListener('submit', addItem);
platesButtons.addEventListener('click', manageButtons);