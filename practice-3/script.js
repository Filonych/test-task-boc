let posts = [];
let filteredPosts = [];
let order = 'asc';

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Произошла ошибка');
        }
        posts = await response.json();
        filteredPosts = posts;
        renderTable(posts);
    } catch (error) {
        console.error(error);
    }
}

function renderTable(postsToRender) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    postsToRender.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
        `;
        tbody.appendChild(row);
    });
}

function sortTable(column) {
    order = order === 'asc' ? 'desc' : 'asc';

    const postsToSort = filteredPosts.length > 0 ? filteredPosts : posts;

    postsToSort.sort((a, b) => {
        if (typeof a[column] === 'string') {
            return order === 'asc'
                ? a[column].localeCompare(b[column])
                : b[column].localeCompare(a[column]);
        }
        if (typeof a[column] === 'number') {
            return order === 'asc' ? a[column] - b[column] : b[column] - a[column];
        }
    });

    renderTable(postsToSort);
}

function filterTable() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    filteredPosts = posts.filter(post => {
        return (
            post.title.toLowerCase().includes(searchValue) ||
            post.body.toLowerCase().includes(searchValue)
        );
    });
    renderTable(filteredPosts);
}

document.getElementById('searchInput').addEventListener('input', function () {
    if (this.value.length >= 3 || this.value.length === 0) {
        filterTable();
    }
});

document.querySelectorAll('[data-column]').forEach(th => {
    th.addEventListener('click', () => sortTable(th.getAttribute('data-column')));
});

fetchPosts();
