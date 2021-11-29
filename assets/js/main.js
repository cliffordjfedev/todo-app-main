var TODO = /** @class */ (function () {
    function TODO(totalItems) {
        this.total = totalItems;
        this.setTotalItem();
    }
    TODO.prototype.setTotalItem = function () {
        document.querySelector('#totalItems').textContent = this.total.toString();
    };
    TODO.prototype.getTotalItems = function () {
        var container = document.getElementById('todoList');
        if (container.children.length > 0) {
            var unCompleted = document.querySelectorAll('.line-added');
            var listUncompleted_1 = [];
            unCompleted.forEach(function (element) {
                if (!element.classList.contains('completed')) {
                    listUncompleted_1.push(element);
                }
                else { }
                ;
            });
            toggleButtons('all');
            // return listUncompleted.length;
            this.total = listUncompleted_1.length;
        }
        else {
            var nav = document.querySelector('.todo-list-nav');
            nav.style.display = 'none';
            var p = "\n               <p id=\"emptyList\" class=\"text-center my-3 text-muted\"> Please add a new Todo.</p>\n            ";
            container.innerHTML = p;
            this.total = container.children.length;
        }
        this.setTotalItem();
    };
    TODO.prototype.addTodo = function (text) {
        if (text.trim() !== '') {
            var lineAdded = document.querySelectorAll('.line-added');
            var myObj_1 = [];
            if (localStorage && text !== '') {
                var template = "\n\n            <div class=\"line-added border-bottom active\">\n                <div class=\"d-flex\">\n                <div class=\"rounded-circle\"></div>\n                <p>" + text + "</p>\n                </div>\n                <button class=\"btn delete-btn\" title=\"Delete\"><img src=\"./images/icon-cross.svg\" alt=\"\"></button>\n            </div>\n                ";
                if (localStorage.getItem('myTodos') !== null) {
                    var data = JSON.parse(localStorage.getItem('myTodos'));
                    data.forEach(function (element) {
                        myObj_1.push(element);
                    });
                    myObj_1.push({ id: lineAdded.length, template: template });
                    localStorage.setItem('myTodos', JSON.stringify(myObj_1));
                }
                else {
                    myObj_1.push({ id: lineAdded.length, template: template });
                    localStorage.setItem('myTodos', JSON.stringify(myObj_1));
                }
                this.getTotalItems();
                this.toggleNav('show');
            }
        }
    };
    TODO.prototype.removeTodo = function (element) {
        var container = document.getElementById('todoList');
        if (container.children.length > 1) {
            element.closest('.line-added').remove();
        }
        else {
            var p = "\n               <p id=\"emptyList\" class=\"text-center my-3 text-muted\"> Please add a new Todo.</p>\n            ";
            container.innerHTML = p;
            this.toggleNav('hide');
        }
    };
    /**
     * Show or Hide Todo-list nav
     */
    TODO.prototype.toggleNav = function (showHide) {
        var nav = document.querySelector('.todo-list-nav');
        if (showHide.toLowerCase().trim() === 'show') {
            nav.style.display = 'flex';
        }
        else {
            nav.style.display = 'none';
        }
    };
    return TODO;
}());
/**
 * Show or Hide Todo-list nav Buttons
 */
function toggleButtons(btnID) {
    var list = document.querySelectorAll('.line-added');
    var activeClass = document.querySelectorAll("." + btnID).length;
    var completed = document.querySelectorAll('.completed').length;
    var active = document.querySelectorAll('.active').length;
    var btnSelected = document.querySelector("#" + btnID);
    var btnActive = document.getElementById('active');
    var btnAll = document.getElementById('all');
    var btnCompleted = document.getElementById('completed');
    if (btnID !== 'all') {
        if (activeClass > 0) {
            document.getElementById(btnID).removeAttribute('disabled');
        }
        else {
            btnSelected.setAttribute('disabled', 'disabled');
            btnSelected.classList.remove('btn-selected');
            btnAll.classList.add('btn-selected');
            list.forEach(function (element) {
                element.classList.remove('d-none');
            });
        }
    }
    else {
        var clearCompleted = document.getElementById('clearCompleted');
        active > 0 ? btnActive.removeAttribute('disabled') : btnActive.setAttribute('disabled', 'disabled');
        completed > 0 ? (btnCompleted.removeAttribute('disabled'),
            clearCompleted.removeAttribute('disabled')) : (btnCompleted.setAttribute('disabled', 'disabled'),
            clearCompleted.setAttribute('disabled', 'disabled'));
    }
}
/**
 * Check if there is Todo or no in the list
 */
function checkContainer() {
    var container = document.querySelectorAll('#todoList .line-added');
    var smDevice = document.querySelector('.sm-device');
    if (container.length > 0) {
        smDevice.classList.remove('d-none');
    }
    else {
        smDevice.classList.add('d-none');
    }
}
/**
 * Separate uncomplete todos from completed
 */
function loadContent() {
    var container = document.getElementById('todoList');
    loadFromLS();
    loadSwitchMode();
    if (container.children.length > 0) {
        var unCompleted = document.querySelectorAll('.line-added');
        var listUncompleted_2 = [];
        unCompleted.forEach(function (element) {
            if (!element.classList.contains('completed')) {
                listUncompleted_2.push(element);
            }
            else { }
            ;
        });
        toggleButtons('all');
        return listUncompleted_2.length;
    }
    else {
        var nav = document.querySelector('.todo-list-nav');
        nav.style.display = 'none';
        var p = "\n               <p id=\"emptyList\" class=\"text-center my-3 text-muted\"> Please add a new Todo.</p>\n            ";
        container.innerHTML = p;
        return container.children.length;
    }
}
var myTodo = new TODO(loadContent());
var inputText = document.getElementById('addText');
function removeElement(elementId) {
    var element = document.getElementById(elementId);
    if (element !== null) {
        element.remove();
    }
}
/**
 * Event to add a new Todo
 */
inputText.addEventListener('keydown', function (e) {
    var text = this.value;
    var btnSelected = document.querySelector('.btn-selected').getAttribute('id').toString();
    if (e.key === 'Enter') {
        //e.preventDefault();
        myTodo.addTodo(text);
        this.value = '';
        removeElement('emptyList');
        toggleButtons(btnSelected);
        toggleBtnFooter();
    }
});
/**
 * Event to delete Todo
 */
document.querySelectorAll('.delete-btn').forEach(function (element) {
    element.addEventListener('click', function (e) {
        var btnSelected = document.querySelector('.btn-selected').getAttribute('id').toString();
        myTodo.removeTodo(element);
        myTodo.getTotalItems();
        toggleButtons(btnSelected);
        toggleBtnFooter();
        updateLS();
    });
});
/**
 * Hide or Show Todos
 */
function navButtons(elementThis, className) {
    var lineAdded = document.querySelectorAll('.line-added');
    if (elementThis !== '') {
        document.querySelector('.btn-selected').classList.remove('btn-selected');
        elementThis.classList.add('btn-selected');
    }
    lineAdded.forEach(function (element) {
        if (element.classList.contains(className)) {
            element.classList.remove('d-none');
        }
        else {
            element.classList.add('d-none');
        }
    });
}
document.getElementById('completed').addEventListener('click', function (e) {
    navButtons(this, 'completed');
});
document.getElementById('all').addEventListener('click', function (e) {
    navButtons(this, 'line-added');
});
document.getElementById('active').addEventListener('click', function (e) {
    navButtons(this, 'active');
});
document.getElementById('clearCompleted').addEventListener('click', function (e) {
    var completed = document.querySelectorAll('.completed');
    var btnCompleted = document.getElementById('completed');
    completed.forEach(function (element) { element.remove(); });
    this.setAttribute('disabled', 'disabled');
    btnCompleted.setAttribute('disabled', 'disabled');
    toggleButtons('completed');
    myTodo.getTotalItems();
    updateLS();
    toggleBtnFooter();
});
document.querySelectorAll('.line-added .rounded-circle').forEach(function (element) {
    element.addEventListener('click', function (e) {
        var btnSelected = document.querySelector('.btn-selected').getAttribute('id').toString();
        var icon = "\n            <img src=\"./images/icon-check.svg\" class=\"white-check\" alt=\"White check\">\n        ";
        element.classList.add('rounded-selected');
        element.closest('.line-added').classList.add('completed');
        element.closest('.line-added').classList.remove('active');
        myTodo.getTotalItems();
        element.innerHTML = icon;
        if (btnSelected !== 'all') {
            navButtons('', 'active');
        }
        toggleButtons(btnSelected);
        updateLS();
    });
});
document.getElementById('switchMode').addEventListener('click', function (e) {
    var darkMode = document.querySelectorAll('.dark-mode');
    var lightMode = document.querySelectorAll('.light-mode');
    var img = document.querySelector('#switchMode img');
    var switchObj = { mode: '', iconSrc: '', iconAlt: '' };
    //: { mode: string, iconSrc:string, iconAlt:string };
    // let myObj: Array<{ id: any, template: any }> = [];
    if (darkMode.length > 0) {
        darkMode.forEach(function (element) {
            element.classList.remove('dark-mode');
            element.classList.add('light-mode');
            img.setAttribute('src', './images/icon-moon.svg');
            img.setAttribute('alt', 'Icon Moon');
        });
        switchObj.mode = 'light-mode';
        switchObj.iconSrc = './images/icon-moon.svg';
        switchObj.iconAlt = 'light mode';
    }
    else {
        lightMode.forEach(function (element) {
            element.classList.remove('light-mode');
            element.classList.add('dark-mode');
            img.setAttribute('src', './images/icon-sun.svg');
            img.setAttribute('alt', 'Icon Sun');
        });
        switchObj.mode = 'dark-mode';
        switchObj.iconSrc = './images/icon-sun.svg';
        switchObj.iconAlt = 'dark mode';
    }
    localStorage.setItem('SwitchMode', JSON.stringify(switchObj));
});
/**
 * Show or Hide nav Buttons in Small devices
 */
function toggleBtnFooter() {
    var width = this.innerWidth;
    var btnFooter = document.querySelectorAll('#btnFooter button');
    var btnList = document.querySelectorAll('#btnList button');
    var smDevice = document.querySelector('.sm-device');
    if (width > 400) {
        smDevice.classList.add('d-none');
        btnFooter.forEach(function (element) { document.getElementById('btnList').append(element); });
        btnFooter.forEach(function (element) { element.remove; });
    }
    else {
        smDevice.classList.remove('d-none');
        btnList.forEach(function (element) { document.getElementById('btnFooter').append(element); });
        btnList.forEach(function (element) { element.remove; });
        checkContainer();
    }
}
window.addEventListener('resize', function (e) {
    toggleBtnFooter();
});
window.addEventListener('load', function (e) {
    toggleBtnFooter();
});
function loadFromLS() {
    if (localStorage.getItem('myTodos') !== null) {
        var data = JSON.parse(localStorage.getItem('myTodos'));
        var list_1 = document.getElementById('todoList');
        data.forEach(function (element, index) {
            list_1.innerHTML += element.template;
        });
    }
}
function updateLS() {
    var lineAdded = document.querySelectorAll('.line-added');
    var myObj = [];
    if (localStorage.getItem('myTodos') !== null) {
        if (lineAdded.length > 0) {
            lineAdded.forEach(function (element, i) {
                if (!element.classList.contains('sortable-fallback')) {
                    myObj.push({ id: i, template: element.outerHTML });
                    localStorage.setItem('myTodos', JSON.stringify(myObj));
                }
            });
        }
        else {
            localStorage.removeItem('myTodos');
        }
    }
}
function loadSwitchMode() {
    var darkMode = document.querySelectorAll('.dark-mode');
    var lightMode = document.querySelectorAll('.light-mode');
    var img = document.querySelector('#switchMode img');
    var activeState = JSON.parse(localStorage.getItem('SwitchMode'));
    if (darkMode.length > 0) {
        darkMode.forEach(function (element) {
            if (localStorage.getItem('SwitchMode') !== null) {
                element.classList.remove('dark-mode');
                element.classList.add("" + activeState.mode);
                img.setAttribute('src', "" + activeState.iconSrc);
                img.setAttribute('alt', "" + activeState.iconAlt);
            }
        });
    }
    else {
        lightMode.forEach(function (element) {
            element.classList.remove('light-mode');
            element.classList.add('dark-mode');
            img.setAttribute('src', './images/icon-sun.svg');
            img.setAttribute('alt', 'Icon Sun');
            element.classList.add("" + activeState.mode);
            img.setAttribute('src', "" + activeState.iconSrc);
            img.setAttribute('alt', "" + activeState.iconAlt);
        });
    }
}
document.addEventListener('change', function () {
    updateLS();
});
