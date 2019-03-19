'use strict'

const { dialog } = require('electron').remote;
const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

// create add todo window button
document.getElementById('selectFileBtn').addEventListener('click', () => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, function (files) {
        if (files !== undefined) {
            document.getElementById('fileNameLbl').innerHTML = files[0];
            fillList(files[0]);
        }
    });
})


function fillList(filepath) {

    readFile(filepath, (data) => {

        var object = JSON.parse(data);

        // get the jsonList ul
        const jsonList = document.getElementById('jsonList')

        // create html string
        const jsonItems = object.Data.reduce((html, item) => {
            html += `<li class="todo-item">${item.Name}</li>`

            return html
        }, '')

        // set list html to the todo items
        jsonList.innerHTML = jsonItems;
    });

}

function readFile(filepath, callBack) {
    fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        // Change how to handle the file content
        console.log("The file content is : " + data);

        callBack(data);
    });
}



