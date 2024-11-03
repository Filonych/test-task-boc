async function fetchPosts() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts')
		if (!response.ok) {
			throw new Error('Произошла ошибка')
		}
		const posts = await response.json()
		renderTable(posts)
	} catch (error) {
		console.error(error)
	}
}

function renderTable(posts) {
	const tbody = document.getElementById('tableBody');
	posts.forEach(post => {
		const row = document.createElement('tr')
		row.innerHTML = `
							<td>${post.id}</td>
							<td>${post.title}</td>
							<td>${post.body}</td>
					`
		tbody.appendChild(row)
	})
}

fetchPosts()
