import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
         ref ,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyAYFieLOiRw_ESvUtw81Ebns1CRlUboBO4",
    authDomain: "leads-tracker-analytics.firebaseapp.com",
    projectId: "leads-tracker-analytics",
    storageBucket: "leads-tracker-analytics.firebasestorage.app",
    messagingSenderId: "26911336686",
    appId: "1:26911336686:web:7cac37905bb5d708b7abff",
    databaseURL:"https://leads-tracker-analytics-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

const refernceInDb = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")



function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(refernceInDb)
    ulEl.innerHTML = ""

})

onValue (refernceInDb,function(snapshot){

    const snapshotDoesExist = snapshot.exists()

    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()

        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

inputBtn.addEventListener("click", function() {
    push(refernceInDb, inputEl.value)
    inputEl.value = ""
})
