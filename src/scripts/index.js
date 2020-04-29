import "../styles/index.scss";

import {
    RestuarantRepository
} from "../scripts/Repository/RestaurantRepository.js";
import {
    Restuarant
} from "../scripts/models/Restuarant.js";
import {
    cuisine
} from "../scripts/cuisine.js";
import "bootstrap";
import "../styles/app.scss";
// let res1 = new Restuarant(200, "intercontinental", "lagos", cuisine.OYO);
let Repoexcute = new RestuarantRepository();
// console.log(Repoexcute.gRestuarant);
// console.log(Repoexcute.gRestuarantMethod());

let table = document.querySelector("#table-head");

// initialize empty restaurant
let restaurants = [];
restaurants = Repoexcute.gRestuarant;
//console.log("testing table", table);

// console.log(Repoexcute.gRestuarant);

let headskey = Object.keys(restaurants[0]);
//console.log("object keys", headskey);

//var table = document.querySelector('#tablehead');

var submitInput = document.querySelector("#myForm");

//console.log("dfffffffffffffff", submitInput);
submitInput.addEventListener("submit", function (e) {
    var newId = document.getElementById("newRestuarantId").value;
    console.log("i am new identity", newId);
    var name = document.getElementById("RestauarantName").value;

    var location = document.getElementById("RestaurantLocation1").value;

    var cuisine = document.getElementById("RestuarantCuisine1").value;

    var varieties = document.getElementById("RestuarantVarieties1").value;

    e.preventDefault();

    if (parseInt(newId)) {
        let newlyID = parseInt(newId);
        let newDataRestaurant = restaurants.find((x) => x.ID == newlyID);
        newDataRestaurant.NAME = name;
        newDataRestaurant.LOCATION = location;
        newDataRestaurant.CUISINE = cuisine;
        newDataRestaurant.VARIETIES = varieties;


        restaurants.splice(newlyID - 1, 1, newDataRestaurant);

        resetForm();

        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
    }


    if ((newId === "")) {
        let temp = 0;
        let reponew = Repoexcute.gRestuarant;
        let repoNewLength = reponew.length;
        for (let i = 0; i < repoNewLength; i++) {
            if (reponew[i].ID > temp) {
                temp = reponew[i].ID;
            }
        }

        var newProp = {
            ID: temp + 1,
            name: name,
            location: location,
            cuisine: cuisine,
            varieties: varieties,
        };

        let newlyCreatedRestuarant = new Restuarant(
            newProp.ID,
            newProp.name,
            newProp.location,
            newProp.cuisine,
            newProp.varieties
        );

        restaurants.push(newlyCreatedRestuarant);
        // console.log("newlyrEST", newlyCreatedRestuarant);
        // console.log("newly created", newlyCreatedRestuarant);

        let newlyTableRow = table.insertRow();
        let newCreatedObectValues = Object.values(newlyCreatedRestuarant);

        //console.log('hoooooooooooooooooooooooooooooooo', newCreatedObectValues);

        let newCreatedObectValuesLength = newCreatedObectValues.length;
        for (let i = 0; i < newCreatedObectValuesLength; i++) {
            let newCell = newlyTableRow.insertCell();
            let text1 = document.createTextNode(newCreatedObectValues[i]);
            // let button = document.createElement("button");
            // button.textContent = textContent;

            newCell.appendChild(text1);

            if (i == 4) {
                AddingEditButtonToTableRow(newlyCreatedRestuarant, newlyTableRow);
                AddingDeleteButtonToTableRow(newlyCreatedRestuarant, newlyTableRow);

                resetForm();

                while (table.hasChildNodes()) {
                    table.removeChild(table.firstChild);
                }
            }

        }
    }

    TableHeadGenerator();
    TableBody();

    if (parseInt(newId)) {
        window.alert('Restaurant Data Updated sucessfully!!!');
    }
    if ((newId === "")) {
        window.alert('Restaurant Added Successfully!!!');
    }



});

function resetForm() {
    submitInput.reset();
}

document.addEventListener("DOMContentLoaded", function () {
    TableHeadGenerator();
    TableBody();
});

// table body implementation

function TableBody() {
    for (const element of restaurants) {
        let row = table.insertRow();
        for (let key in element) {
            if (key == "ID") {
                continue;
            } else {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);

                if (key == "VARIETIES") {
                    AddingEditButtonToTableRow(element, row);

                    AddingDeleteButtonToTableRow(element, row);
                }
            }
        }
    }
    querySelectedButtons();
    QuerySelectedEditButton();
}

//table head hfuction implementation
function TableHeadGenerator() {
    let tablehead = table.createTHead();
    let tr = tablehead.insertRow();

    for (const head of headskey) {
        if (head == "ID") {
            continue;
        } else {
            let th = document.createElement("th");
            var text = document.createTextNode(head);
            //console.log("text", text);
            th.appendChild(text);
            tr.appendChild(th);
        }
    }

    //console.log("t-head", tr);

    let newCell = tr.insertCell();
    let textExit = document.createTextNode("Edit Action");
    newCell.appendChild(textExit);

    let newCell1 = tr.insertCell();
    let textDel = document.createTextNode("Delete Action");
    newCell1.appendChild(textDel);
}

function creatbuttonElement(textcontent, classname, classcustom, elementid) {
    let button = document.createElement("Button");
    button.textContent = textcontent;
    button.className = `btn btn-${classname} btn-sm ${classcustom}`;
    button.setAttribute("data-id", elementid);

    return button;
}

function AddingEditButtonToTableRow(element, row) {
    let cell = row.insertCell();
    let button = creatbuttonElement("Edit", "primary", "RowEdit", element.ID);

    cell.appendChild(button);
}

function AddingDeleteButtonToTableRow(element, row) {
    let CellDel = row.insertCell();
    let button = creatbuttonElement("Delete", "danger", "RowDelete", element.ID);

    CellDel.appendChild(button);
}

function QuerySelectedEditButton() {
    let buttons = document.querySelectorAll(".RowEdit");

    buttons.forEach(function (button) {
        //console.log("Query selector", button);
        button.addEventListener("click", function (event) {
            //    alert(event.target);
            event.preventDefault();

            var editedButtonId = button.getAttribute("data-id");
            let myEditedButtonViaId = restaurants.find((m) => m.ID == editedButtonId);

            // console.log(myEditedButtonViaId);

            let name = (document.getElementById("RestauarantName").value =
                myEditedButtonViaId.NAME);

            let location = (document.getElementById("RestaurantLocation1").value =
                myEditedButtonViaId.LOCATION);

            let cuisine = (document.getElementById("RestuarantCuisine1").value =
                myEditedButtonViaId.CUISINE);

            let varieties = (document.getElementById("RestuarantVarieties1").value =
                myEditedButtonViaId.VARIETIES);

            // console.log('.......', y);

            let id = (document.getElementById("newRestuarantId").value =
                myEditedButtonViaId.ID);

            console.log("Edited object to see", {
                id: id,
                name: name,
                location: location,
                cuisine: cuisine,
                varieties: varieties,
            });
        });
    });
}

function querySelectedButtons() {
    let buttons = document.querySelectorAll(".RowDelete");

    buttons.forEach(function (button) {
        //console.log("Query selector", button);
        button.addEventListener("click", function (event) {
            //    alert(event.target);
            event.preventDefault();

            if (window.confirm("Are you sure you want to delete?")) {
                ButtonDeletedConfirmed(button);
            }
        });
    });

    function ButtonDeletedConfirmed(button) {
        let attributeCon = button.classList.contains("RowDelete");

        if (attributeCon === true) {
            let MyID = button.getAttribute("data-id");

            var restuarantNew = restaurants.find((x) => x.ID == MyID);

            var i = button.parentNode.parentNode.rowIndex;

            table.deleteRow(i);

            restaurants.splice(restuarantNew.ID - 1, 1);
        }
    }
}