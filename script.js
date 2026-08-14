/* =========================================================
   BIBLIOTECA DE STEFANY
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const ADMIN_CODE = "30-05-2007";

let books = [];

let users = [];

let currentUser = "";

let currentBookId = null;

let currentChapterId = null;

let isAdmin = false;


/* =========================================================
   ELEMENTOS
========================================================= */

const loginScreen =
    document.getElementById("loginScreen");

const app =
    document.getElementById("app");

const userName =
    document.getElementById("userName");

const enterButton =
    document.getElementById("enterButton");

const currentUserElement =
    document.getElementById("currentUser");

const welcomeName =
    document.getElementById("welcomeName");

const totalBooks =
    document.getElementById("totalBooks");

const totalChapters =
    document.getElementById("totalChapters");

const totalUsers =
    document.getElementById("totalUsers");

const recentBooks =
    document.getElementById("recentBooks");

const allBooks =
    document.getElementById("allBooks");

const peopleList =
    document.getElementById("peopleList");

const searchBooks =
    document.getElementById("searchBooks");

const filterGenre =
    document.getElementById("filterGenre");

const bookTitle =
    document.getElementById("bookTitle");

const bookAuthor =
    document.getElementById("bookAuthor");

const bookGenre =
    document.getElementById("bookGenre");

const bookDescription =
    document.getElementById("bookDescription");

const bookQuote =
    document.getElementById("bookQuote");

const createBookButton =
    document.getElementById("createBookButton");

const coverInput =
    document.getElementById("coverInput");

const coverPreview =
    document.getElementById("coverPreview");

const previewTitle =
    document.getElementById("previewTitle");

const bookFile =
    document.getElementById("bookFile");

const importStatus =
    document.getElementById("importStatus");

const bookDetail =
    document.getElementById("bookDetail");

const readerChapterList =
    document.getElementById("readerChapterList");

const readerTitle =
    document.getElementById("readerTitle");

const readerAuthor =
    document.getElementById("readerAuthor");

const readerGenre =
    document.getElementById("readerGenre");

const readerContent =
    document.getElementById("readerContent");

const adminControls =
    document.getElementById("adminControls");

const editBookButton =
    document.getElementById("editBookButton");

const deleteBookButton =
    document.getElementById("deleteBookButton");

const chapterList =
    document.getElementById("chapterList");

const chapterTitle =
    document.getElementById("chapterTitle");

const chapterEditor =
    document.getElementById("chapterEditor");

const editorWordCount =
    document.getElementById("editorWordCount");

const saveChapter =
    document.getElementById("saveChapter");

const newChapter =
    document.getElementById("newChapter");

const aiResponse =
    document.getElementById("aiResponse");

const themeButton =
    document.getElementById("themeButton");

const modal =
    document.getElementById("modal");

const modalBody =
    document.getElementById("modalBody");

const closeModal =
    document.getElementById("closeModal");

const toast =
    document.getElementById("toast");


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initialize
);


function initialize() {

    loadData();

    loadTheme();

    checkPreviousUser();

    renderAll();

}


/* =========================================================
   DATOS
========================================================= */

function loadData() {

    try {

        books =
            JSON.parse(
                localStorage.getItem(
                    "stephany_books"
                )
            ) || [];


        users =
            JSON.parse(
                localStorage.getItem(
                    "stephany_users"
                )
            ) || [];

    } catch {

        books = [];

        users = [];

    }

}


function saveData() {

    localStorage.setItem(
        "stephany_books",
        JSON.stringify(books)
    );


    localStorage.setItem(
        "stephany_users",
        JSON.stringify(users)
    );

}


/* =========================================================
   LOGIN
========================================================= */

enterButton.addEventListener(
    "click",
    enterLibrary
);


userName.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            enterLibrary();

        }

    }
);


function enterLibrary() {

    const name =
        userName.value.trim();


    if (!name) {

        showToast(
            "Por favor, ingresa tu nombre."
        );

        userName.focus();

        return;

    }


    currentUser =
        name;


    localStorage.setItem(
        "stephany_current_user",
        currentUser
    );


    addUser(
        currentUser
    );


    loginScreen.classList.add(
        "hidden"
    );


    app.classList.remove(
        "hidden"
    );


    currentUserElement.textContent =
        currentUser;


    welcomeName.textContent =
        currentUser;


    renderAll();


    showToast(
        `✨ Bienvenida, ${currentUser}`
    );

}


/* =========================================================
   USUARIOS
========================================================= */

function addUser(name) {

    const exists =
        users.some(
            user =>
                user.toLowerCase() ===
                name.toLowerCase()
        );


    if (!exists) {

        users.push(name);

        saveData();

    }

}


function checkPreviousUser() {

    const savedUser =
        localStorage.getItem(
            "stephany_current_user"
        );


    if (savedUser) {

        currentUser =
            savedUser;


        currentUserElement.textContent =
            currentUser;


        welcomeName.textContent =
            currentUser;


        loginScreen.classList.add(
            "hidden"
        );


        app.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   NAVEGACIÓN
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-page]"
            );


        if (!button) return;


        const page =
            button.dataset.page;


        showPage(
            page
        );

    }
);


function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(
            item => {

                item.classList.remove(
                    "active-page"
                );

            }
        );


    const selected =
        document.getElementById(
            page
        );


    if (!selected) return;


    selected.classList.add(
        "active-page"
    );


    document
        .querySelectorAll(".nav-button")
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.page === page
                );

            }
        );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (
        page === "booksPage"
    ) {

        renderBooks();

    }


    if (
        page === "homePage"
    ) {

        renderHome();

    }

}


/* =========================================================
   CREAR LIBRO
========================================================= */

coverInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) return;


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            showToast(
                "Selecciona una imagen."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            event => {

                coverPreview.style.backgroundImage =
                    `url("${event.target.result}")`;

                coverPreview.style.backgroundSize =
                    "cover";

                coverPreview.style.backgroundPosition =
                    "center";

                coverPreview.dataset.image =
                    event.target.result;

            };


        reader.readAsDataURL(
            file
        );

    }
);


bookTitle.addEventListener(
    "input",
    () => {

        previewTitle.textContent =
            bookTitle.value.trim() ||
            "Tu título";

    }
);


createBookButton.addEventListener(
    "click",
    createBook
);


function createBook() {

    const title =
        bookTitle.value.trim();


    const author =
        bookAuthor.value.trim() ||
        currentUser;


    if (!title) {

        showToast(
            "Escribe el título del libro."
        );

        bookTitle.focus();

        return;

    }


    const book = {

        id:
            Date.now(),

        title:
            title,

        author:
            author,

        genre:
            bookGenre.value,

        description:
            bookDescription.value.trim() ||
            "Una historia esperando ser descubierta.",

        quote:
            bookQuote.value.trim() ||
            "Toda historia comienza con una palabra.",

        cover:
            coverPreview.dataset.image ||
            "",

        owner:
            currentUser,

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString(),

        chapters: [

            {

                id:
                    Date.now() + 1,

                title:
                    "Capítulo 1",

                content:
                    ""

            }

        ]

    };


    books.unshift(
        book
    );


    saveData();


    resetBookForm();

    renderAll();


    showToast(
        "📚 Libro creado correctamente."
    );


    openBookDetail(
        book.id
    );

}


/* =========================================================
   REINICIAR FORMULARIO
========================================================= */

function resetBookForm() {

    bookTitle.value = "";

    bookAuthor.value =
        currentUser;

    bookGenre.value =
        "novela";

    bookDescription.value = "";

    bookQuote.value = "";

    previewTitle.textContent =
        "Tu título";


    coverPreview.style.backgroundImage =
        "";


    delete coverPreview.dataset.image;


    coverInput.value = "";

}


/* =========================================================
   RENDER GENERAL
========================================================= */

function renderAll() {

    renderHome();

    renderBooks();

    updateStats();

    renderPeople();

}


/* =========================================================
   INICIO
========================================================= */

function renderHome() {

    recentBooks.innerHTML = "";


    books
        .slice(0, 4)
        .forEach(
            book => {

                recentBooks.appendChild(
                    createBookCard(book)
                );

            }
        );


    if (
        books.length === 0
    ) {

        recentBooks.innerHTML =
            emptyLibrary();

    }

}


/* =========================================================
   LIBROS
========================================================= */

function renderBooks() {

    const search =
        searchBooks.value
            .toLowerCase()
            .trim();


    const genre =
        filterGenre.value;


    const filtered =
        books.filter(
            book => {

                const searchMatch =
                    book.title
                        .toLowerCase()
                        .includes(search)
                    ||
                    book.author
                        .toLowerCase()
                        .includes(search);


                const genreMatch =
                    genre === "all" ||
                    book.genre === genre;


                return (
                    searchMatch &&
                    genreMatch
                );

            }
        );


    allBooks.innerHTML = "";


    if (
        filtered.length === 0
    ) {

        allBooks.innerHTML =
            emptyLibrary();

        return;

    }


    filtered.forEach(
        book => {

            allBooks.appendChild(
                createBookCard(book)
            );

        }
    );

}


searchBooks.addEventListener(
    "input",
    renderBooks
);


filterGenre.addEventListener(
    "change",
    renderBooks
);


/* =========================================================
   TARJETA
========================================================= */

function createBookCard(book) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "book-card";


    const cover =
        document.createElement(
            "div"
        );


    cover.className =
        "card-cover";


    if (book.cover) {

        const image =
            document.createElement(
                "img"
            );


        image.src =
            book.cover;


        image.alt =
            book.title;


        cover.appendChild(
            image
        );

    }


    const text =
        document.createElement(
            "div"
        );


    text.className =
        "card-cover-text";


    const title =
        document.createElement(
            "strong"
        );


    title.textContent =
        book.title;


    const author =
        document.createElement(
            "small"
        );


    author.textContent =
        book.author;


    text.appendChild(
        title
    );


    text.appendChild(
        author
    );


    cover.appendChild(
        text
    );


    const information =
        document.createElement(
            "div"
        );


    information.className =
        "book-info";


    information.innerHTML = `

        <h4>
            ${escapeHTML(book.title)}
        </h4>

        <p>
            Por ${escapeHTML(book.author)}
        </p>

        <div class="book-meta">

            <span class="genre">
                ${formatGenre(book.genre)}
            </span>

            <span class="chapter-count">
                ${book.chapters.length} capítulos
            </span>

        </div>

    `;


    card.appendChild(
        cover
    );


    card.appendChild(
        information
    );


    card.addEventListener(
        "click",
        () => {

            openBookDetail(
                book.id
            );

        }
    );


    return card;

}


/* =========================================================
   PERSONAS
========================================================= */

function renderPeople() {

    peopleList.innerHTML = "";


    users.forEach(
        name => {

            const person =
                document.createElement(
                    "div"
                );


            person.className =
                "person";


            const avatar =
                document.createElement(
                    "div"
                );


            avatar.className =
                "person-avatar";


            avatar.textContent =
                name.charAt(0)
                    .toUpperCase();


            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                name;


            person.appendChild(
                avatar
            );


            person.appendChild(
                text
            );


            peopleList.appendChild(
                person
            );

        }
    );

}


/* =========================================================
   ESTADÍSTICAS
========================================================= */

function updateStats() {

    totalBooks.textContent =
        books.length;


    totalUsers.textContent =
        users.length;


    totalChapters.textContent =
        books.reduce(
            (sum, book) =>
                sum +
                book.chapters.length,
            0
        );

}


/* =========================================================
   DETALLE DEL LIBRO
========================================================= */

function openBookDetail(id) {

    const book =
        books.find(
            item =>
                item.id === id
        );


    if (!book) return;


    currentBookId =
        id;


    const cover =
        book.cover

            ? `
                <img
                    src="${book.cover}"
                    alt="${escapeHTML(book.title)}"
                >
              `

            : `

                <div
                    class="card-cover-text"
                    style="
                        height:100%;
                        width:100%;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        flex-direction:column;
                    "
                >

                    <strong>
                        ${escapeHTML(book.title)}
                    </strong>

                    <small>
                        ${escapeHTML(book.author)}
                    </small>

                </div>

              `;


    bookDetail.innerHTML = `

        <div class="detail-cover">

            ${cover}

        </div>


        <div class="detail-information">

            <span class="detail-label">
                ${formatGenre(book.genre)}
            </span>


            <h2>
                ${escapeHTML(book.title)}
            </h2>


            <div class="detail-author">

                Escrito por

                <strong>
                    ${escapeHTML(book.author)}
                </strong>

            </div>


            <p class="detail-description">

                ${escapeHTML(book.description)}

            </p>


            <div class="quote-box">

                “${escapeHTML(book.quote)}”

            </div>


            <div class="detail-stats">

                <div class="detail-stat">

                    <strong>
                        ${book.chapters.length}
                    </strong>

                    <span>
                        Capítulos
                    </span>

                </div>


                <div class="detail-stat">

                    <strong>
                        ${countWords(book)}
                    </strong>

                    <span>
                        Palabras
                    </span>

                </div>


                <div class="detail-stat">

                    <strong>
                        ${book.owner}
                    </strong>

                    <span>
                        Creado por
                    </span>

                </div>

            </div>


            <div class="detail-actions">

                <button
                    class="gold-button"
                    onclick="openReader(${book.id})"
                >
                    📖 Leer libro
                </button>


                <button
                    class="secondary-button"
                    onclick="showReference(${book.id})"
                >
                    ✦ Referencia
                </button>

            </div>

        </div>

    `;


    showPage(
        "bookDetailPage"
    );

}


/* =========================================================
   REFERENCIA
========================================================= */

function showReference(id) {

    const book =
        books.find(
            item =>
                item.id === id
        );


    if (!book) return;


    modalBody.innerHTML = `

        <div style="text-align:center">

            <div
                style="
                    font-size:45px;
                    color:#d8b46a;
                "
            >
                ✦
            </div>


            <p
                style="
                    color:#d8b46a;
                    letter-spacing:3px;
                    font-size:8px;
                    margin-top:15px;
                "
            >
                REFERENCIA
            </p>


            <h2
                style="
                    font-family:Cinzel,serif;
                    font-weight:400;
                    font-size:32px;
                    margin:15px 0;
                "
            >
                ${escapeHTML(book.title)}
            </h2>


            <p
                style="
                    color:#aaa;
                    font-size:12px;
                    line-height:2;
                "
            >
                ${escapeHTML(book.description)}
            </p>


            <div
                style="
                    margin-top:25px;
                    padding:20px;
                    border-left:
                        2px solid #d8b46a;
                    color:#d8b46a;
                    font-family:Georgia,serif;
                    font-style:italic;
                "
            >
                “${escapeHTML(book.quote)}”
            </div>


            <p
                style="
                    color:#777;
                    font-size:9px;
                    margin-top:25px;
                "
            >
                Autor:
                ${escapeHTML(book.author)}

                <br><br>

                Género:
                ${formatGenre(book.genre)}

                <br><br>

                Capítulos:
                ${book.chapters.length}

            </p>

        </div>

    `;


    modal.classList.add(
        "show"
    );

}


/* =========================================================
   LECTOR
========================================================= */

function openReader(id) {

    const book =
        books.find(
            item =>
                item.id === id
        );


    if (!book) return;


    currentBookId =
        id;


    renderReader(
        book
    );


    showPage(
        "readerPage"
    );

}


/* =========================================================
   RENDER LECTOR
========================================================= */

function renderReader(book) {

    readerTitle.textContent =
        book.title;


    readerAuthor.textContent =
        `Por ${book.author}`;


    readerGenre.textContent =
        formatGenre(
            book.genre
        ).toUpperCase();


    readerChapterList.innerHTML =
        "";


    book.chapters.forEach(
        (chapter,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                `${index + 1}. ${chapter.title}`;


            if (
                chapter.id ===
                currentChapterId
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    currentChapterId =
                        chapter.id;

                    renderReader(
                        book
                    );

                }
            );


            readerChapterList.appendChild(
                button
            );

        }
    );


    if (
        !currentChapterId &&
        book.chapters.length
    ) {

        currentChapterId =
            book.chapters[0].id;

    }


    const chapter =
        book.chapters.find(
            item =>
                item.id ===
                currentChapterId
        );


    readerContent.textContent =
        chapter
            ? chapter.content
            : "Este capítulo todavía está vacío.";


    adminControls.classList.add(
        "hidden"
    );

}


/* =========================================================
   EDITAR
========================================================= */

editBookButton.addEventListener(
    "click",
    () => {

        if (!isAdmin) {

            requestAdminCode(
                () => {

                    isAdmin = true;

                    adminControls.classList.remove(
                        "hidden"
                    );

                    showToast(
                        "🔐 Modo administrador activado."
                    );

                }
            );

            return;

        }


        editCurrentBook();

    }
);


function editCurrentBook() {

    const book =
        getCurrentBook();


    if (!book) return;


    bookTitle.value =
        book.title;


    bookAuthor.value =
        book.author;


    bookGenre.value =
        book.genre;


    bookDescription.value =
        book.description;


    bookQuote.value =
        book.quote;


    previewTitle.textContent =
        book.title;


    if (book.cover) {

        coverPreview.style.backgroundImage =
            `url("${book.cover}")`;

        coverPreview.style.backgroundSize =
            "cover";

        coverPreview.dataset.image =
            book.cover;

    }


    showPage(
        "createPage"
    );


    createBookButton.textContent =
        "✓ Guardar cambios";


    createBookButton.onclick =
        saveBookChanges;

}


/* =========================================================
   GUARDAR CAMBIOS DEL LIBRO
========================================================= */

function saveBookChanges() {

    if (!verifyAdmin()) return;


    const book =
        getCurrentBook();


    if (!book) return;


    book.title =
        bookTitle.value.trim();


    book.author =
        bookAuthor.value.trim();


    book.genre =
        bookGenre.value;


    book.description =
        bookDescription.value.trim();


    book.quote =
        bookQuote.value.trim();


    if (
        coverPreview.dataset.image
    ) {

        book.cover =
            coverPreview.dataset.image;

    }


    book.updatedAt =
        new Date().toISOString();


    saveData();


    createBookButton.textContent =
        "✦ Crear libro";


    createBookButton.onclick =
        createBook;


    renderAll();


    showToast(
        "✓ Libro actualizado."
    );


    openBookDetail(
        book.id
    );

}


/* =========================================================
   ELIMINAR LIBRO
========================================================= */

deleteBookButton.addEventListener(
    "click",
    () => {

        if (!verifyAdmin()) return;


        const book =
            getCurrentBook();


        if (!book) return;


        const confirmation =
            confirm(
                `¿Eliminar "${book.title}" definitivamente?`
            );


        if (!confirmation) return;


        books =
            books.filter(
                item =>
                    item.id !== book.id
            );


        currentBookId = null;

        currentChapterId = null;


        saveData();

        renderAll();


        showToast(
            "🗑️ Libro eliminado."
        );


        showPage(
            "booksPage"
        );

    }
);


/* =========================================================
   CÓDIGO ADMINISTRADOR
========================================================= */

function requestAdminCode(callback) {

    const code =
        prompt(
            "Ingresa el código de administrador:"
        );


    if (
        code === ADMIN_CODE
    ) {

        isAdmin = true;

        callback();

    } else {

        showToast(
            "Código incorrecto."
        );

    }

}


function verifyAdmin() {

    if (isAdmin) {

        return true;

    }


    let result = false;


    requestAdminCode(
        () => {

            result = true;

        }
    );


    return result;

}


/* =========================================================
   EDITOR
========================================================= */

function openEditor(id) {

    if (!isAdmin) {

        requestAdminCode(
            () => {

                isAdmin = true;

                openEditorAfterCode(
                    id
                );

            }
        );

        return;

    }


    openEditorAfterCode(
        id
    );

}


function openEditorAfterCode(id) {

    const book =
        books.find(
            item =>
                item.id === id
        );


    if (!book) return;


    currentBookId =
        id;


    currentChapterId =
        book.chapters[0]?.id ||
        null;


    renderChapterList();

    loadChapter();


    showPage(
        "editorPage"
    );

}


/* =========================================================
   CAPÍTULOS
========================================================= */

function renderChapterList() {

    const book =
        getCurrentBook();


    if (!book) return;


    chapterList.innerHTML =
        "";


    book.chapters.forEach(
        (chapter,index) => {

            const container =
                document.createElement(
                    "div"
                );


            container.style.display =
                "flex";


            container.style.alignItems =
                "center";


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "chapter-item";


            button.textContent =
                `${index + 1}. ${chapter.title}`;


            if (
                chapter.id ===
                currentChapterId
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    saveChapterData();

                    currentChapterId =
                        chapter.id;

                    renderChapterList();

                    loadChapter();

                }
            );


            container.appendChild(
                button
            );


            if (isAdmin) {

                const deleteButton =
                    document.createElement(
                        "button"
                    );


                deleteButton.textContent =
                    "×";


                deleteButton.style.background =
                    "transparent";


                deleteButton.style.border =
                    "0";


                deleteButton.style.color =
                    "#d56a6a";


                deleteButton.style.cursor =
                    "pointer";


                deleteButton.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();

                        deleteChapter(
                            chapter.id
                        );

                    }
                );


                container.appendChild(
                    deleteButton
                );

            }


            chapterList.appendChild(
                container
            );

        }
    );

}


/* =========================================================
   CARGAR CAPÍTULO
========================================================= */

function loadChapter() {

    const book =
        getCurrentBook();


    if (!book) return;


    const chapter =
        book.chapters.find(
            item =>
                item.id ===
                currentChapterId
        );


    if (!chapter) return;


    chapterTitle.value =
        chapter.title;


    chapterEditor.value =
        chapter.content;


    updateWordCount();

}


/* =========================================================
   NUEVO CAPÍTULO
========================================================= */

newChapter.addEventListener(
    "click",
    () => {

        if (!verifyAdmin()) return;


        saveChapterData();


        const book =
            getCurrentBook();


        if (!book) return;


        const chapter = {

            id:
                Date.now(),

            title:
                `Capítulo ${book.chapters.length + 1}`,

            content:
                ""

        };


        book.chapters.push(
            chapter
        );


        currentChapterId =
            chapter.id;


        saveData();


        renderChapterList();

        loadChapter();


        chapterTitle.focus();

    }
);


/* =========================================================
   GUARDAR CAPÍTULO
========================================================= */

saveChapter.addEventListener(
    "click",
    () => {

        if (!verifyAdmin()) return;


        saveChapterData();


        showToast(
            "✓ Guardado. El capítulo está listo."
        );


        openReader(
            currentBookId
        );

    }
);


function saveChapterData() {

    const book =
        getCurrentBook();


    if (!book) return;


    const chapter =
        book.chapters.find(
            item =>
                item.id ===
                currentChapterId
        );


    if (!chapter) return;


    chapter.title =
        chapterTitle.value.trim() ||
        "Capítulo sin título";


    chapter.content =
        chapterEditor.value;


    book.updatedAt =
        new Date().toISOString();


    saveData();

}


/* =========================================================
   ELIMINAR CAPÍTULO
========================================================= */

function deleteChapter(id) {

    if (!verifyAdmin()) return;


    const book =
        getCurrentBook();


    if (!book) return;


    if (
        book.chapters.length <= 1
    ) {

        showToast(
            "Un libro debe tener al menos un capítulo."
        );

        return;

    }


    const confirmation =
        confirm(
            "¿Eliminar este capítulo?"
        );


    if (!confirmation) return;


    book.chapters =
        book.chapters.filter(
            chapter =>
                chapter.id !== id
        );


    currentChapterId =
        book.chapters[0].id;


    saveData();


    renderChapterList();

    loadChapter();


    showToast(
        "🗑️ Capítulo eliminado."
    );

}


/* =========================================================
   CONTADOR
========================================================= */

chapterEditor.addEventListener(
    "input",
    updateWordCount
);


function updateWordCount() {

    const text =
        chapterEditor.value.trim();


    if (!text) {

        editorWordCount.textContent =
            "0";

        return;

    }


    editorWordCount.textContent =
        text
            .split(/\s+/)
            .length
            .toLocaleString("es-EC");

}


/* =========================================================
   IA
========================================================= */

function bookAI(action) {

    const book =
        getCurrentBook();


    if (!book) return;


    if (
        action === "idea"
    ) {

        aiResponse.innerHTML = `

            <h4>
                💡 Ideas para continuar
            </h4>

            <p>
                Tu historia podría introducir
                un secreto que cambie la manera
                en que el protagonista comprende
                lo ocurrido.
            </p>

            <p>
                También podemos crear un conflicto,
                un personaje nuevo o un giro
                inesperado.
            </p>

        `;

    }


    if (
        action === "continue"
    ) {

        const lastText =
            chapterEditor.value.slice(-500);


        aiResponse.innerHTML = `

            <h4>
                ✍️ Asistente de escritura
            </h4>

            <p>
                La IA puede analizar el último
                fragmento y ayudarte a continuar
                manteniendo el tono y los personajes.
            </p>

            <p>
                <strong>
                    Último fragmento:
                </strong>
            </p>

            <p>
                ${escapeHTML(lastText || "Todavía no has escrito nada.")}
            </p>

        `;

    }


    if (
        action === "improve"
    ) {

        aiResponse.innerHTML = `

            <h4>
                ✨ Mejorar texto
            </h4>

            <p>
                La IA podrá ayudarte con:
            </p>

            <ul>

                <li>Ortografía</li>

                <li>Gramática</li>

                <li>Diálogos</li>

                <li>Descripciones</li>

                <li>Ritmo</li>

                <li>Coherencia</li>

            </ul>

        `;

    }


    if (
        action === "characters"
    ) {

        aiResponse.innerHTML = `

            <h4>
                👤 Personajes
            </h4>

            <p>
                La IA puede detectar los
                personajes de tu historia y
                ayudarte a construir:
            </p>

            <ul>

                <li>Personalidad</li>

                <li>Objetivos</li>

                <li>Relaciones</li>

                <li>Conflictos</li>

                <li>Desarrollo</li>

            </ul>

        `;

    }

}


/* =========================================================
   IMPORTAR
========================================================= */

bookFile.addEventListener(
    "change",
    async event => {

        const file =
            event.target.files[0];


        if (!file) return;


        const extension =
            file.name
                .split(".")
                .pop()
                .toLowerCase();


        const title =
            file.name
                .replace(/\.[^/.]+$/, "")
                .replace(/[_-]/g, " ");


        let content = "";


        if (
            extension === "txt"
        ) {

            try {

                content =
                    await file.text();

            } catch {

                content = "";

            }

        }


        const book = {

            id:
                Date.now(),

            title:
                capitalize(title),

            author:
                currentUser,

            genre:
                "otros",

            description:
                "Libro ingresado desde un archivo externo.",

            quote:
                "Una historia más se incorpora a nuestra biblioteca.",

            cover:
                "",

            owner:
                currentUser,

            imported:
                true,

            fileName:
                file.name,

            fileType:
                extension,

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString(),

            chapters: [

                {

                    id:
                        Date.now() + 1,

                    title:
                        "Contenido importado",

                    content:
                        content

                }

            ]

        };


        books.unshift(
            book
        );


        saveData();

        renderAll();


        importStatus.innerHTML = `

            <strong>
                ✓ Libro ingresado
            </strong>

            <br><br>

            ${escapeHTML(book.title)}

            <br><br>

            <button
                class="gold-button"
                onclick="openBookDetail(${book.id})"
            >
                📖 Abrir libro
            </button>

        `;


        showToast(
            "📚 Libro agregado."
        );

    }
);


/* =========================================================
   TEMA
========================================================= */

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );


        const light =
            document.body.classList.contains(
                "light-mode"
            );


        localStorage.setItem(
            "stephany_theme",
            light
                ? "light"
                : "dark"
        );


        themeButton.textContent =
            light
                ? "☀"
                : "☾";

    }
);


function loadTheme() {

    const theme =
        localStorage.getItem(
            "stephany_theme"
        );


    if (
        theme === "light"
    ) {

        document.body.classList.add(
            "light-mode"
        );

        themeButton.textContent =
            "☀";

    }

}


/* =========================================================
   MODAL
========================================================= */

closeModal.addEventListener(
    "click",
    closeModalWindow
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModalWindow();

        }

    }
);


function closeModalWindow() {

    modal.classList.remove(
        "show"
    );

}


/* =========================================================
   UTILIDADES
========================================================= */

function getCurrentBook() {

    return books.find(
        book =>
            book.id ===
            currentBookId
    );

}


function countWords(book) {

    return book.chapters.reduce(
        (total, chapter) => {

            if (
                !chapter.content.trim()
            ) {

                return total;

            }


            return total +
                chapter.content
                    .trim()
                    .split(/\s+/)
                    .length;

        },
        0
    );

}


function formatGenre(genre) {

    const genres = {

        novela: "Novela",

        romance: "Romance",

        misterio: "Misterio",

        fantasia: "Fantasía",

        drama: "Drama",

        otros: "Otros"

    };


    return genres[genre] ||
        "Otros";

}


function capitalize(text) {

    if (!text) return "";


    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text ?? "";


    return div.innerHTML;

}


function emptyLibrary() {

    return `

        <div class="empty-library">

            <div class="empty-icon">
                📚
            </div>

            <h3>
                Todavía no hay libros
            </h3>

            <p>
                Sé la primera persona en crear
                una historia.
            </p>

            <button
                class="gold-button"
                data-page="createPage"
            >
                ✦ Crear libro
            </button>

        </div>

    `;

}


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =========================================================
   CERRAR MODAL CON ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModalWindow();

        }

    }
);


/* =========================================================
   CTRL + S
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();


            if (
                isAdmin &&
                currentBookId &&
                currentChapterId
            ) {

                saveChapterData();

                showToast(
                    "💾 Guardado."
                );

            }

        }

    }
);