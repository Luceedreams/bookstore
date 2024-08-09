function toggleNav() {
    const Navlinks = document.getElementById("navLinks");
    Navlinks.classList.toggle("active");
}


function searchBooks() {
    console.log('Search function triggered');
    const query = document.getElementById('searchInput').value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(url)
        .then(response => {
            console.log('Response received');
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching the books:', error);
            document.getElementById('books').innerHTML = '<p>Error fetching books. Please try again later.</p>';
        });
}

function displayBooks(books) {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = ''; // Clear previous results

    if (!books || books.length === 0) {
        booksContainer.innerHTML = '<p>No books found. Please try a different search.</p>';
        return;
    }

    books.forEach(book => {
        const bookInfo = book.volumeInfo;

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.onclick = () => openModal(bookInfo);

        const bookImg = document.createElement('img');
        bookImg.src = bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';
        bookImg.alt = bookInfo.title;

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = bookInfo.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';

        const bookLink = document.createElement('a');
        bookLink.href = bookInfo.infoLink;
        bookLink.target = '_blank';
        // bookLink.textContent = 'View Details';

        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookLink);

        booksContainer.appendChild(bookDiv);
    });
}

function openModal(bookInfo) {
    const modal = document.getElementById('bookModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>${bookInfo.title}</h2>
        <img src="${bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${bookInfo.title}" style="width:100px;">
        <p><strong>Author(s):</strong> ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author'}</p>
        <p><strong>Description:</strong> ${bookInfo.description || 'No description available.'}</p>
        <a href="${bookInfo.infoLink}" target="_blank">View on Google Books</a>
    `;
     
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('bookModal');
    modal.style.display = 'none';
}

// Load default books when the page loads
function loadDefaultBooks() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=best+books`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Default Data:', data);
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching default books:', error);
            document.getElementById('books').innerHTML = '<p>Error fetching default books. Please try again later.</p>';
        });
}
