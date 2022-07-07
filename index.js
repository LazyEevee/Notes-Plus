// object to save notes and links
let notes = {}
// variable for tab to display
let noteTab = ""

let delBtn = []

let currentColour = ""

const hexRe = /^#[0-9a-f]{6}$/i

const colourInput = document.getElementById("colour-input") 
const colourBtn = document.getElementById("colour-btn")
const colourWarn = document.getElementById("colour-warning")

// text box
const textInput = document.getElementById("text-input")
// warning text
const warning = document.getElementById("warning")
// current tab element
const tabInfo = document.getElementById("tab-info")
// Save Note button
const saveNote = document.getElementById("save-note")
// Add Tab button
const addTab = document.getElementById("add-tab")
// Remove Tab button
const removeTab = document.getElementById("remove-tab")
// list of notes
const list = document.getElementById("list")
// Clear All button
const clearBtn = document.getElementById("clear-btn")
// Local Storage on browser
const localStorageNotes = JSON.parse(localStorage.getItem("notes"))

const localStorageColour = JSON.parse(localStorage.getItem("colour"))

// check if anything is in local storage and add to notes object
if (localStorageNotes) {
    notes = localStorageNotes
    show(notes)
    for (i=0; i<Object.keys(notes).length; i++) {
        delBtn[i] = document.getElementById("Object.keys(notes)[i]")
    }
}

if (localStorageColour) {
    currentColour = localStorageColour
    updateColour()
}

document.addEventListener('click', function (event) {
	if (event.target.matches('.del-btn')) {
		selected = event.target.id
        delete notes[selected]
        localStorage.setItem("notes", JSON.stringify(notes))
        show(notes)
    }
})

// event listener for Colour Button
colourBtn.addEventListener("click", function() {
        if(hexRe.test(colourInput.value)) {
            currentColour = colourInput.value
            localStorage.setItem("colour", JSON.stringify(currentColour))
            colourWarn.textContent = ""
            updateColour()
        } else {
            colourWarn.textContent = "# 6 digit hex code required"
        }
    })

function updateColour() {
    document.getElementById("colour-btn").style.background = currentColour
    document.getElementById("colour-warning").style.background = currentColour
    document.getElementById("title").style.color = currentColour
    document.getElementById("warning").style.background = currentColour
    document.getElementById("tab-info").style.color = currentColour
    document.getElementById("save-note").style.background = currentColour
    document.getElementById("add-tab").style.background = currentColour
    document.getElementById("remove-tab").style.background = currentColour
    document.getElementById("list").style.color = currentColour
    document.getElementById("clear-btn").style.background = currentColour
    colourInput.value = currentColour
    console.log(currentColour)
}

// event listener for Save Note button
saveNote.addEventListener("click", function() {
    if (textInput.value) {
        if (!(textInput.value in notes)) {
            notes[textInput.value] = noteTab
            textInput.value = ""
            noteTab = ""
            tabInfo.textContent = ""
            warning.textContent = ""
            localStorage.setItem("notes", JSON.stringify(notes))
            show(notes)
        } else {
            warning.textContent = "Note Already Exists"
        }
    } else {
        warning.textContent = "Note Text Input Needed"
    }
    
})

// event listener for Add Tab button
addTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        noteTab = tabs[0].url
        tabInfo.textContent = noteTab
        warning.textContent = ""
    })
})

// event listener for Remove Tab button
removeTab.addEventListener("click", function() {
    noteTab = ""
    tabInfo.textContent = ""
    warning.textContent = ""
})

// event listener for Clear All button
clearBtn.addEventListener("click", function() {
    localStorage.clear()
    notes = {}
    warning.textContent = ""
    show(notes)
})

// function to show notes list on app
function show(notes) {
    let items = ""
    for (let i=0; i<Object.keys(notes).length; i++) {
        items += `
            <li>
                ${Object.keys(notes)[i]}
                <a href="${Object.values(notes)[i]}" target="_blank">
                    ${Object.values(notes)[i]}
                </a>
                <button class="del-btn" id="${Object.keys(notes)[i]}">x</button>
            </li>
        `
    }
    list.innerHTML = items
}

