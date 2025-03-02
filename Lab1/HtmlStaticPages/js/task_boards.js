function update_tasks(root_obj_class, json_obj_name, class_name, subclass_name, create_task_element, get_children_list) {
    document.querySelector(root_obj_class).innerHTML = "";
    let json_string = localStorage.getItem(json_obj_name);
    if (json_string != null)
    {
        let json_global_tasks = JSON.parse(json_string);
        let root = document.querySelector(root_obj_class);
        for (let child of parse_task_json(json_global_tasks, class_name, subclass_name, create_task_element, get_children_list)) {
            root.appendChild(child);
        }
    }
}

const picker = new Pikaday({ 
    field: document.getElementById('datepicker') , 
    format: 'MM/DD/YYYY', 
    onSelect: function (){
        update_tasks(".planning__list_tasks.daily_tasks", get_choosen_data()  + "daily_tasks", "subtasks", "subtasks", create_daily_task_element, create_daily_tasks_list)
        }
    });
picker.setDate(new Date())
function get_choosen_data()
{
    return picker.getDate().toLocaleDateString();
}

function parse_task_json(element, span_class, child_span_class, create_task_element, get_children_list) {
    let list_tasks = []
    for (let item of element) {

        let span = create_task_span(item["value"], span_class);
        let children_list = get_children_list();
        // let children_list = create_global_tasks_list();
        if (item["children"].length != 0) {
            for (let child of parse_task_json(item["children"], child_span_class, child_span_class, create_task_element, get_children_list)) {
                children_list.appendChild(child);
            }
        }
        task = create_task_element(span, children_list)
        list_tasks.push(task)
    }
    return list_tasks
}


function save_tasks_state(class_name, json_label) {
    let root = document.querySelector(class_name);
    let json_global_tasks = parse_list_tree(root);
    localStorage.setItem(json_label, JSON.stringify(json_global_tasks));
}

function remove_global_task(event) {
    event.currentTarget.parentElement.parentElement.parentElement.remove();
    save_tasks_state(".planning__list_tasks.global_tasks", "global_tasks");
}

function remove_daily_task(event) {
    event.currentTarget.parentElement.parentElement.parentElement.remove();
    save_tasks_state(".planning__list_tasks.daily_tasks", get_choosen_data()  + "daily_tasks");
}

function parse_list_tree(element) {
    let task_arr = [];
    for(let item of element.children) {
        let curr_node = {};
        
        let value = item.querySelector("span");
        
        if (value == null) {
            continue;
        } 
        curr_node["value"] = value.textContent;
        let ul = item.querySelector("ul");
        let ul_list = parse_list_tree(ul);
       
        curr_node["children"] = ul_list;
        task_arr.push(curr_node);
    }
    return task_arr;
}


var form = document.getElementById("add_global_task");
form.addEventListener('submit', global_task_handleForm);

function global_task_handleForm(event) { 
    
    event.preventDefault(); 
    if (event.currentTarget.querySelector('input').value == ""){
        return
    }
    
    if (event.currentTarget.parentElement.className == "planning") {
        myLi = create_global_task(event.currentTarget.querySelector('input').value, "global_task");
        event.currentTarget.querySelector('input').value = "";
        ul = document.querySelector(".planning__list_tasks.global_tasks");
        ul.appendChild(myLi);
    }
    else
    {
        myLi = create_global_task(event.currentTarget.querySelector('input').value, "subtasks");
        event.currentTarget.querySelector('input').value = "";
        ul = event.currentTarget.parentElement;
        ul.appendChild(myLi);
    }
    save_tasks_state(".planning__list_tasks.global_tasks", "global_tasks");
} 

function transfer_task_between_tables(event) {  
    let task_root = event.currentTarget.parentElement.parentElement.parentElement;
    let curr_node = {};
    curr_node["children"] = parse_list_tree(task_root.querySelector("ul"));
    curr_node["value"] = task_root.querySelector("span").textContent;
    
    let ul_daily_task = document.querySelector(".planning__list_tasks.daily_tasks");
    for (let child of parse_task_json([curr_node], "subtasks", "subtasks", create_daily_task_element, create_daily_tasks_list)) {
        ul_daily_task.appendChild(child);
    }
    save_tasks_state(".planning__list_tasks.daily_tasks", get_choosen_data()  + "daily_tasks");
    remove_global_task(event);
} 

function add_global_task() {
    json_global_tasks = localStorage.getItem("b1_gt");
    if (json_global_tasks == null) {
        json_global_tasks = []
    }
}

function create_global_task(input_value, span_class) {
    return create_global_task_element(create_task_span(input_value, span_class), create_global_tasks_list())
}

function create_task_span(input_value, span_class) {
    let myText = document.createElement("span");
    myText.className = span_class;
    myText.textContent = input_value;
    return myText;
}

function create_global_task_buttons() {
    let myB1 = document.createElement("button");
    myB1.textContent = "+";
    myB1.className = "planning__task__button";
    myB1.addEventListener("click", transfer_task_between_tables);
    
    let myB2 = document.createElement("button");
    myB2.className = "planning__task__trashbox_button";
    let trash = document.createElement("img");
    trash.className = "planning__task__trashbox";
    trash.src = "images/trashbox.png";
    myB2.appendChild(trash);
    myB2.addEventListener("click", remove_global_task)
    let myButtons = document.createElement("div");
    myButtons.className = "planning__task__buttons"
    myButtons.appendChild(myB1);
    myButtons.appendChild(myB2);
    return myButtons;
}

function create_global_task_body(myText, myButtons) {
    let myTaskBody = document.createElement("div");
    myTaskBody.className = "planning__task__entity";
    myTaskBody.appendChild(myText);
    myTaskBody.appendChild(myButtons);
    return myTaskBody;
}

function create_global_tasks_list() {
    let myList = document.createElement("ul");
    myList.className = "planning__list_tasks";
    let myInput = document.createElement("input");
    myInput.type="text";
    myInput.className="planning__input_add_task";
    myInput.placeholder="Enter task name";
    let myForm = document.createElement("form");
    myForm.className = "add_global_task";
    myForm.appendChild(myInput);
    myForm.addEventListener('submit', global_task_handleForm);
    myList.appendChild(myForm);
    return myList;
}

function create_global_task_element(taskText, myList) {
    let myLi = document.createElement("li");
    myLi.className = "planning__task" ;
    myLi.appendChild(create_global_task_body(taskText, create_global_task_buttons()));
    myLi.appendChild(myList);
    return myLi;
}

function get_daily_element(value, span_class) {
    let span = create_task_span(value, span_class);
    let children_list = create_daily_tasks_list();
    return span, children_list;
}

function create_daily_task_element(taskText, myList) {
    let myLi = document.createElement("li");
    myLi.className = "planning__task" ;
    myLi.appendChild(create_daily_task_body(taskText, create_daily_task_buttons()));
    myLi.appendChild(myList);
    return myLi;
}

function create_daily_task_buttons() {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "planning__task__checkbox";
    
    let myB2 = document.createElement("button");
    myB2.className = "planning__task__trashbox_button";
    let trash = document.createElement("img");
    trash.className = "planning__task__trashbox";
    trash.src = "images/trashbox.png";
    myB2.appendChild(trash);
    myB2.addEventListener("click", remove_daily_task)
    let myButtons = document.createElement("div");
    myButtons.className = "planning__task__buttons"
    myButtons.appendChild(checkbox);
    myButtons.appendChild(myB2);
    return myButtons;
}

function create_daily_task_body(myText, myButtons) {
    let myTaskBody = document.createElement("div");
    myTaskBody.className = "planning__task__entity";
    myTaskBody.appendChild(myText);
    myTaskBody.appendChild(myButtons);
    return myTaskBody;
}

function create_daily_tasks_list() {
    let myList = document.createElement("ul");
    myList.className = "planning__list_tasks";
    return myList;
}

