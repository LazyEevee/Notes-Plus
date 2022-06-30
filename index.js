// object to save notes and links
let notes = {}
// variable for tab to display
let noteTab = ""

// text box
const textInput = document.getElementById("text-input")
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

// check if anything is in local storage and add to notes object
if (localStorageNotes) {
    notes = localStorageNotes
    show(notes)
}

// event listener for Save Note button
saveNote.addEventListener("click", function() {
    notes[textInput.value] = noteTab
    textInput.value = ""
    noteTab = ""
    tabInfo.textContent = ""
    localStorage.setItem("notes", JSON.stringify(notes))
    show(notes)
})

// event listener for Add Tab button
addTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        noteTab = tabs[0].url
        tabInfo.textContent = noteTab
    })
})

// event listener for Remove Tab button
removeTab.addEventListener("click", function() {
    noteTab = ""
    tabInfo.textContent = ""
})

// event listener for Clear All button
clearBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    notes = {}
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
            </li>
        `
    }
    list.innerHTML = items
}