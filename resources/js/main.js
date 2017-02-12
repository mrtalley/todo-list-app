var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
        todo: [],
        completed: []
};
// Remove and Complete icons in SVG format
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>'
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>'

init();


function add(event){
    var elem = document.getElementById('item');
    if (event.keyCode){
        if(event.keyCode == 13 && elem.value){
            addElementToList(elem);
            document.getElementById('item').value = '';
            data.todo.push(elem.value);
            dataObjectUpdated();
        }
    }
    else{
        if(elem.value) {
            addElementToList(elem);
            document.getElementById('item').value = '';
            data.todo.push(elem.value);
            dataObjectUpdated();
        }
    }
}

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

function updatePosition() {
    // add your code to update the position when your browser
    // is resized or scrolled
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function init() {
    document.getElementById('add').addEventListener('click', add);
    document.getElementById('item').addEventListener('keyup', add);

    if(!data.todo.length && !data.completed.length) return;

    for(var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addTextToList(value);
    }

    for(var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addTextToList(value, true);
    }

}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if(id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    }
    else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }

    dataObjectUpdated();

    parent.removeChild(item);
    document.getElementById('');
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if(id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        addElementToList(item, true);
        data.completed.push(value);
    }
    else {
        data.completed.splice(data.completed.indexOf(value), 1);
        addElementToList(item, false);
        data.todo.push(value);
    }
    parent.removeChild(item);
    dataObjectUpdated();
}

function addElementToList(element, completed) {
    var text = (completed == null) ? element.value: element.innerText;
    var item = addTextToList(text, completed);
    //Animations
    animateItem(item, element);
}

function addTextToList(text, completed) {
    var list = (completed) ? document.getElementById('complete'):document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for removeing item
    remove.addEventListener('click', removeItem);


    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    // Add click evemt for completing item
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    //list.appendChild(item);
    list.insertBefore(item, list.childNodes[0]);
    return item;
}

function animateItem(to, from) {
    if(to && from){
        to.style.opacity = 0;
        var animation = document.createElement('div');

        var toStyle = window.getComputedStyle(to);
        document.body.appendChild(animation);
        /*
        * This block assigns the animation div to keep all the important values from the object that is imitating.
        */
        var fromPos = getPosition(from);
        animation.innerText = from.value ? from.value: from.innerText;
        animation.style.position = 'absolute';
        animation.style.top =  fromPos.y + 'px';
        animation.style.left = fromPos.x + 'px';
        animation.style.width = to.offsetWidth + 'px';
        animation.style.height = to.offsetHeight+'px';
        animation.style.lineHeight = toStyle.lineHeight;
        animation.style.padding = toStyle.padding;
        animation.style.fontWeight = toStyle.fontWeight;
        animation.style.fontSize = toStyle.fontSize;
        animation.style.color = toStyle.color;
        animation.style.backgroundColor = toStyle.backgroundColor;
        animation.style.borderRadius = toStyle.borderRadius;
        animation.style.zIndex = '99';
        console.log(animation.style.left, animation.style.top);


        var targetTop = getPosition(to).y;
        var targetLeft = getPosition(to).x;
        var length = Math.abs(targetTop - fromPos.y);
        var width = Math.abs(targetLeft - fromPos.x);
        var offset = Math.ceil(Math.max(length/30, width/30));

        var id = setInterval(frame, 10, offset);
        function frame(offset) {
            // console.log(animation.offsetLeft, animation.offsetTop, targetLeft, targetTop, from.offsetLeft, from.offsetTop, getPosition(from).x, getPosition(from).y);
            if (Math.abs(animation.offsetTop - targetTop) < offset && Math.abs(animation.offsetLeft - targetLeft) < offset){
                clearInterval(id);
                animation.parentNode.removeChild(animation);
                to.style.opacity = 100;
            }
            else{
                if(Math.abs(animation.offsetTop - targetTop) >= offset){
                    animation.style.top  = (animation.offsetTop - targetTop) > 0 ? (animation.offsetTop-offset) + 'px': (animation.offsetTop+offset) + 'px';
                }
                if(Math.abs(animation.offsetLeft - targetLeft) >= offset){
                    animation.style.left  = (animation.offsetLeft - targetLeft) > 0 ? (animation.offsetLeft-offset) + 'px': (animation.offsetLeft+offset) + 'px';
                }
            }
        }
    }
}