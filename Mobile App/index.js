import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-706f3-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ulList = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearField()
})

onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()){
      let listOfItems = Object.entries(snapshot.val()) 
           
        clearlist()

        for(let i=0; i<listOfItems.length; i++){
            let currentItem = listOfItems[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addList(currentItem)
        }
  
    }else {
        ulList.innerHTML = "No item in cart ... yet"
    }
    
  
})

function clearlist(){
    ulList.innerHTML = ""
}

function clearField(){
    inputFieldEl.value =""
}
function addList(item){
    // ulList.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let locationInDB = ref(database, `shoppingList/${itemID}`)
        remove(locationInDB)
    })

    ulList.append(newEl)
}
