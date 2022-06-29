let notes = {}
let noteTab = ""

const textInput = document.getElementById("text-input")
const tabInfo = document.getElementById("tab-info")
const saveNote = document.getElementById("save-note")
const addTab = document.getElementById("add-tab")
const list = document.getElementById("list")

saveNote.addEventListener("click", function() {
    notes[textInput.value] = noteTab
    console.log(notes)
    show(notes)
})

addTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        noteTab = tabs[0].url
        tabInfo.textContent = noteTab
    })
    
})

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