let tablebody = document.getElementById("table-body");
let searchstring = document.getElementById("search-input");

let tbodyMale = document.getElementById("tbodyMale");
let tableM = document.getElementById("tableM");

//Generate Table
function computeTable(students) {
    tableM.style.display = "none";
    students.forEach((student) => {
        let row = document.createElement("tr");
        let fullName = `${student.first_name} ${student.last_name}`;
        let passing = student.passing ? "Passed" : "Failed";
        row.innerHTML = `<td>${student.id}</td>
                           <td><div class="imge"><img src="${student.img_src}">
                               ${fullName}</div>
                             </td>
                          <td>${student.gender}</td>
                          <td>${student.class}</td>
                          <td>${student.marks}</td>
                          <td>${passing}</td>
                          <td>${student.email}</td>`;
        tablebody.appendChild(row);
    })
}



//sort the buttons sorta-z
async function sortAZ() {
    let students = await load();
    tablebody.innerHTML = " ";
    students.forEach(function (student) {
        student.fullName = student.first_name + " " + student.last_name;
    });
    students.sort(function (a, b) {
        if (a.fullName < b.fullName) {
            return -1;
        }
        else if (a.fullName > b.fullName) {
            return 1;
        }
        else {
            return 0;
        }
    });
    computeTable(students);
}


//sort z-a
async function sortZA() {
    let students = await load();
    tablebody.innerHTML = " ";
    students.forEach(function (student) {
        student.fullName = student.first_name + " " + student.last_name;
    });
    students.sort(function (a, b) {
        if (a.fullName > b.fullName) {
            return -1;
        }
        else if (a.fullName < b.fullName) {
            return 1;
        }
        else {
            return 0;
        }
    });
    computeTable(students);
}

//sort by marks

async function sortByMarks() {
    let students = await load();
    tablebody.innerHTML = " ";
    students.sort((a, b) => {
        return a.marks - b.marks;
    })
    computeTable(students);
}


//sort by class
async function sortByClass() {
    let students = await load();
    tablebody.innerHTML = " ";
    students.sort((a, b) => {
        return a.class - b.class;
    })
    computeTable(students);
}

//sort by passing

async function sortByPassing() {
    let students = await load();
    tablebody.innerHTML = " ";
    let results = students.filter((student) => {
        if (student.passing) {
            return true;
        }
    })
    computeTable(results);
}





//sort by gender
async function sortByGender() {
    let students = await load();
    tablebody.innerHTML = " ";
    let f = students.filter((student) => {
        if (student.gender === "Female") {
            return true;
        }
    })
    computeTable(f);
    let m = students.filter((student) => {
        if (student.gender === "Male") {
            return true;
        }
    })
    tableM.style.display = "table";

    tbodyMale.innerHTML = " ";
    m.forEach((student) => {
        let row = document.createElement("tr");
        let fullName = `${student.first_name} ${student.last_name}`;
        let passing = student.passing ? "Passed" : "Failed";
        row.innerHTML = `<td>${student.id}</td>
                  <td><div class="imge"><img src="${student.img_src}">
                      ${fullName}</div>
                    </td>
                  <td>${student.gender}</td>
                  <td>${student.class}</td>
                  <td>${student.marks}</td>
                  <td>${passing}</td>
                  <td>${student.email}</td>`;
        tbodyMale.appendChild(row);
    })
}
//search by input value

async function filterByName() {
    let data = await load();
    tablebody.innerHTML = " ";
    let results = data.filter((student) => {
        let value = searchstring.value.toLowerCase();
        let val = value.trim();
        if (val === `${student.first_name}`.toLowerCase() || val === `${student.last_name}`.toLowerCase() || val === `${student.email}`.toLowerCase()) {
            return true;
        }
    })
    computeTable(results);
}
(async function load() {
    let url = `./file.json`;
    let response = await fetch(url);
    let students = await response.json();
    computeTable(students);
})();


async function load() {
    let url = `./file.json`;
    let response = await fetch(url);
    let students = await response.json();
    return students;
}
// let url = `https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json`;

// let students = [];
// async function load() {
    
//     fetch("file.json")
//         .then(response => response.json())
//         .then(data => {
//             students = data;
//             //    console.log(data);
//         })
//         .catch(error => console.error(error));

//         return students;
// }
// (async function load() {
    
//     fetch("file.json")
//         .then(response => response.json())
//         .then(data => {
//             students = data;
//             //    console.log(data);
//         })
//         .catch(error => console.error(error));

//         computeTable(students);
// })();
