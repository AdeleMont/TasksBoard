let users = [];
let tasks = [];
let avatars = [];
let taskUser = [];
const columnNotStarted = document.querySelector('.card_column--not-started');
const columnInProgress = document.querySelector('.card_column--in-progress');
const columnDone = document.querySelector('.card_column--done');
const card = document.querySelector('#card').content.querySelector('.card');
const cardElement = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.card__column');


const setTaskUsers = (usersArray, tasksArray) => {
    taskUser = tasksArray.map(element => {

        const user = usersArray.find(item => item.id === element.userId)
        return {
            ...element,
            username: user.name,
        }
    });

    console.log('taskUser', taskUser);
    createCardList(taskUser);
}


const getUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
    // .then((json) => {
    //     users = json;
    //     setTaskUsers(users, tasks);
    // })

}


const getTasks = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
    // .then((json) => {
    //     tasks = json;
    //     getUsers();

    // })
}

const getAvatar = () => {
    return fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json());

}

getAvatar();

console.log('avatar', getAvatar());

Promise.all([getUsers(), getTasks(), getAvatar()]).then(
    responses => { setTaskUsers(responses[0], responses[1], responses[2]) },
);


const createCard = (task) => {

    const cardElement = card.cloneNode(true);
    cardElement.querySelector('.card__user-name').textContent = task.username;
    cardElement.querySelector('.card__title').textContent = task.title;
    columnNotStarted.appendChild(cardElement);

    cardElement.addEventListener('dragstart', dragStart);
    cardElement.addEventListener('dragend', dragEnd);
   
}

const createCardList = (tasks) => {
    tasks.slice(0, 5).forEach(createCard);
    columnCount(columnNotStarted)
    
}

const columnCount = (column) => {
    const articles = column.querySelectorAll('.card');
    const count = document.querySelector('.column__card-count');
    count.textContent = articles.length

    console.log('count', articles.length);
}


// Drag’n’Drop

const dragStart = (e) => {
    const itemClass = e.target.classList;
    console.log(e.target);
    itemClass.add('card__hold', 'selected');
    setTimeout(() => { itemClass.add('hidden') })
}

const dragEnd = (e) => {
    e.target.className = "card";

};


columns.forEach((i) => {
    i.addEventListener("dragover", dragover);
    i.addEventListener("dragenter", dragenter);
    i.addEventListener("dragleave", dragleave);
    i.addEventListener("drop", dragdrop);
});


console.log('column', columns);

function dragover(e) {
    e.preventDefault()
    console.log('dragover');
}
function dragenter(e) {
    e.target.classList.add("hovered");
    console.log('dragenter');
}
function dragleave(e) {
    e.target.classList.remove("hovered");
    console.log('dragleave');
}
function dragdrop(e) {
    const cardItem = document.querySelector(`.selected`);
    
    e.target.append(cardItem);
    e.target.classList.remove("hovered");
    console.log('dragdrop');

    columnCount(columnNotStarted);
}
