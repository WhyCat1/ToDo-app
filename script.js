document.addEventListener('DOMContentLoaded',()=>{
    const btnAdd = document.querySelector('.todo__form-btn'),
        inputQuest = document.querySelector('.todo__form-input'),
        todoList = document.querySelector('.todo__list'),
        btnClearAll = document.querySelector('.todo__calc-clearall');

    let value, id = 0, checked, todo = [];
    if(localStorage.getItem('todo')){
        todo = JSON.parse(localStorage.getItem('todo'));
        
    }
    function postLocalStorage(value, id, checked){
        if(value|| id|| checked|| todo){
        const obj = {
            'value': value,
            'checked': checked,
            'id': id
        };
            todo.push(obj);
            localStorage.setItem('todo', JSON.stringify(todo));
        }
    }
    function checkedLocalStorage(id){
        if(localStorage.getItem('todo')){
            let arr = JSON.parse(localStorage.getItem('todo'));
            arr.forEach(e=>{
                if(e.id == id){
                    if(e.checked){
                        e.checked = false;
                    }
                    else{
                        e.checked = true;
                    }
                }
            });
            localStorage.setItem('todo', JSON.stringify(arr));
            todo = arr;
        }
    }
    function renderStorageQuests(selector){
        if(localStorage.getItem('todo')){
            todo.forEach(e=>{
                checked = e.checked;
                const element = document.createElement('li');
                element.classList.add('todo__list-item');
                element.setAttribute('data-id', e.id);
                element.innerHTML = `<span>${e.value}</span>
                <button class="todo__list-clear">&times;</button>
                <button class="todo__list-ready">&#10004;</button>`;
                if(e.checked){
                    element.classList.add('todo__list-item_active');
                }
                element.addEventListener('click' , event =>{
                    console.log(event.target);
                    if(event.target.classList.contains('todo__list-clear')===true){
                        todo = todo.filter((elem,i)=>elem.id!=element.getAttribute('data-id'));
                        localStorage.setItem('todo', JSON.stringify(todo));
                        element.remove();
                        id -=1;
                        totalQuests('todo__calc');
                    }
                    if(event.target.classList.contains('todo__list-ready')===true){
                        element.classList.toggle('todo__list-item_active');
                        checkedLocalStorage(element.getAttribute('data-id'));
                    }
                });
                selector.append(element);
                value = e.quest;
                id +=1;
                totalQuests('todo__calc');
                });
            
        }else{
            return console.log('нет локальных данных!');
        }
    }
    function renderQuests(selector,quest){
        checked = false;
        const element = document.createElement('li');
        element.classList.add('todo__list-item');
        element.setAttribute('data-id', id);
        element.innerHTML = `<span>${quest}</span>
        <button class="todo__list-clear">&times;</button>
        <button class="todo__list-ready">&#10004;</button>`;
        element.addEventListener('click' , e =>{
            console.log(e.target);
            if(e.target.classList.contains('todo__list-clear')===true){
                todo = todo.filter((elem,i)=>elem.id!=element.getAttribute('data-id'));
                localStorage.setItem('todo', JSON.stringify(todo));
                element.remove();
                id -=1;
                totalQuests('todo__calc');
            }
            if(e.target.classList.contains('todo__list-ready')===true){
                if(element.checked){
                    checked = false;
                    element.classList.toggle('todo__list-item_active');
                    checkedLocalStorage(element.getAttribute('data-id'), checked);
                }else{
                    checked = true;
                    element.classList.toggle('todo__list-item_active');
                    checkedLocalStorage(element.getAttribute('data-id'), checked);
                    checked = false;
                }
            }
        });
        selector.append(element);
        value = quest;
        postLocalStorage(value, id, checked);
        id +=1;
        totalQuests('todo__calc');
        
    }
    function totalQuests(selector){
        const element = document.querySelector(`.${selector} span`);
        if(id){
            element.textContent = `You have ${id} pending tasks`;
        }else{
            element.textContent = `No tasks`;
        }

    }
    renderStorageQuests(todoList);
    btnAdd.addEventListener('click',()=>{
        if(inputQuest.value){
            renderQuests(todoList,inputQuest.value);
            inputQuest.style.borderColor = 'black';
            inputQuest.value = '';
        }else{
            inputQuest.style.borderColor = 'red';
        }
    });

    btnClearAll.addEventListener('click', ()=>{
        const elements = document.querySelectorAll('.todo__list-item');
        elements.forEach((e)=>{
            e.remove();
            id-=1;
        });
        localStorage.setItem('todo','');
        totalQuests('todo__calc');
    });

});