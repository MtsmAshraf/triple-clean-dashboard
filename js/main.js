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