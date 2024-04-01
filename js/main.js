let currentPage = 1;
// let rowsPerPage = 6; // Number of rows to show per page
function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dataTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
function filterTable() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; // Assuming filtering based on first column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
function showPage(page) {
    let table = document.getElementById("dataTable");
    let rows = table.getElementsByTagName("tr");
    let totalRows = rows.length - 1; // Excluding header row
    let totalPages = Math.ceil(totalRows / rowsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    let start = (page - 1) * rowsPerPage + 1;
    let end = start + rowsPerPage - 1;
    for (let i = 1; i < rows.length; i++) {
        if (i >= start && i <= end) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
    let pagination = document.getElementById("pagination");
    let paginationHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button ${i === page ? 'class="active"' : ''} onclick="showPage(${i})">${i}</button>`;
    }
    pagination.innerHTML = paginationHTML;
}
// Initial table setup
window.onload = function () {
    sortTable(0); // Sort table by first column initially
    showPage(1); // Show first page initially
};

let toggleThemeBtn = document.querySelector(".toggle-theme");
let isDark = false; 
let root = document.querySelector(":root");

const toggleTheme = () => {
    if(isDark) {
        root.style.setProperty("--main-bg", "#060818")
        root.style.setProperty("--main-color", "#6969ff")
        root.style.setProperty("--card-bg", "#0e1726")
        root.style.setProperty("--table-header", "#1a2941")
        root.style.setProperty("--card-header", "linear-gradient(to right top, #1a2941 , #1a2941)")
        root.style.setProperty("--text-color", "#fff")
        root.style.setProperty("--main-shadow", "0px 5px 20px 0px #ccc")
        root.style.setProperty("--card-shadow", "0px 10px 10px 0px #071122")
        root.style.setProperty("--span-color", "#aaa")
        root.style.setProperty("--asset-img-hovererd", "rgb(0, 0, 15)")
        toggleThemeBtn.classList.toggle("dark");
        isDark = false;
    }else{
        root.style.setProperty("--main-bg", "#fafafa")
        root.style.setProperty("--main-color", "#0002f8")
        root.style.setProperty("--card-bg", "#fff")
        root.style.setProperty("--table-header", "#637381")
        root.style.setProperty("--card-header", "linear-gradient(to right top, #1a2941 , #1a2941)")
        root.style.setProperty("--text-color", "#000")
        root.style.setProperty("--main-shadow", "0px 5px 20px 0px #ccc")
        root.style.setProperty("--card-shadow", "0px 2px 10px 0px #ccc")
        root.style.setProperty("--span-color", "#333")
        root.style.setProperty("--asset-img-hovererd", "#eee")
        toggleThemeBtn.classList.toggle("dark");
        isDark = true;
    }
}
window.onload = () => {
    toggleTheme();
}
toggleThemeBtn.onclick = () =>  {
    toggleTheme();
}

let quickActionsBtns = document.querySelectorAll(".quick-actions button")
let popupsContainer = document.querySelector(".pop-ups")
let popups = document.querySelectorAll(".pop-ups .pop-up");
let popupsContainerOverlay = document.querySelector(".pop-ups .pop-up-oveylay")
let popupCloseBtns = document.querySelectorAll(".close-pop-up")
let popupCloseInputs = document.querySelectorAll(".pop-up input[type='reset']")
let addAssestsBtn  = document.querySelector("button.assets");
const closePopup = () => {
    popupsContainer.classList.add("hidden")
    setTimeout(() => {
        popupsContainer.classList.add("removed")
    }, 200);
}
const openPopup = () => {
    popupsContainer.classList.remove("removed")
    setTimeout(() => {
        popupsContainer.classList.remove("hidden")
    }, 200);
}

popups.forEach((popup, index) => {
    // popup.style.display = "none"
})
quickActionsBtns.forEach((btn,index) => {
    btn.onclick = () => {
        openPopup()
        popups.forEach((popup) => {
            popup.style.display = "none"
        })
        popups[index].style.display = "block"
    }
})
popupCloseBtns.forEach((popupCloseBtn) => {
    popupCloseBtn.onclick = () => {
        closePopup();
    }
})
popupCloseInputs.forEach((popupCloseInput) => {
    popupCloseInput.onclick = () => {
        closePopup();
    }
})
popupsContainerOverlay.onclick = () => {
    closePopup();
}

let infoPairWrapper = document.querySelectorAll("*:has(> .main-card-info-pair)")

infoPairWrapper.forEach((pairWrapper) => {
    let infoPair = pairWrapper.querySelectorAll(".main-card-info-pair")
    console.log(infoPair)
    infoPair.forEach((pair) => {
        pair.style.cssText = `
            height: calc((100% / ${infoPair.length}));
        `
    })
})

let assetTypeBtns = document.querySelectorAll(".pop-up .asset-type")
let animatedWrapper = document.querySelector(".animated-wrapper")
let popUpBack = document.querySelector(".pop-ups .pop-up:has(.assets-types-wrapper) form .back-icon")
assetTypeBtns.forEach((btn) => {
    btn.onclick = () => {
        animatedWrapper.classList.add("to-left");
    }
})
popUpBack.onclick = () => {
    animatedWrapper.classList.remove("to-left");
}