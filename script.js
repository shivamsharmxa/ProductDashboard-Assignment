  // Function to add a new row to the table
  
  document.getElementById('addRowBtn').addEventListener('click', () => {
    const tableBody = document.querySelector('#data-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <input type="checkbox" class="form-checkbox text-indigo-600 mr-3">
                <input type="text" class="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Brand Name">
            </div>
        </td>
        <td class="px-6 py-4">
            <input type="text" class="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Description">
        </td>
        <td class="px-6 py-4">
            <input type="text" class="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Members">
        </td>
        <td class="px-6 py-4">
            <input type="text" class="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Categories">
        </td>
        <td class="px-6 py-4">
            <input type="text" class="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Tags">
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <input type="text" class="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Next Meeting">
        </td>
    `;
    tableBody.appendChild(newRow);
});
document.getElementById('searchBtn').addEventListener('click', function() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('data-table');
    let tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those that don't match the search query
    for (let i = 1; i < tr.length; i++) { // start at 1 to skip the header row
        let tds = tr[i].getElementsByTagName('td');
        let rowContainsFilter = Array.from(tds).some(td => {
            if (td.textContent.toUpperCase().indexOf(filter) > -1) {
                return true;
            }
            return false;
        });

        if (rowContainsFilter) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
});

// Optional: Trigger search on input event as well
document.getElementById('searchInput').addEventListener('input', function() {
    document.getElementById('searchBtn').click();
});


// Function to toggle the brands dropdown visibility
function toggleDropdown() {
    const dropdownMenu = document.getElementById('brandsMenu');
    dropdownMenu.classList.toggle('hidden');
}

// Attaching click event to the dropdown button
document.getElementById('brandsDropdown').addEventListener('click', toggleDropdown);

// Function to populate the dropdown with brands from the table
function populateBrandsDropdown() {
    const table = document.getElementById('data-table');
    const rows = table.getElementsByTagName('tr');
    const menu = document.getElementById('brandsMenu').querySelector('.py-1');
    let brands = new Set();

    // Start at 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
        let brandName = rows[i].cells[0].innerText.trim(); // Assuming brand name is in the first column
        brands.add(brandName);
    }

    brands.forEach(brand => {
        const item = document.createElement('a');
        item.href = '#';
        item.classList.add('block', 'px-4', 'py-2', 'text-sm', 'text-gray-700', 'hover:bg-gray-100');
        item.innerText = brand;
        item.addEventListener('click', (event) => {
            event.preventDefault();
            filterTableByBrand(brand);
            toggleDropdown();
        });
        menu.appendChild(item);
    });
}

// Function to filter table by brand
function filterTableByBrand(brandName) {
    const table = document.getElementById('data-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].innerText.trim() === brandName) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Initial population of the brands dropdown
document.addEventListener('DOMContentLoaded', populateBrandsDropdown);
