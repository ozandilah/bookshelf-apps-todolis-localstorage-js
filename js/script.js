(() => {
  let array = [];
  function generateTodoObjek(todo) {
    todo.preventDefault();
    const title = document.querySelector("#inputBookTitle"),
      auth = document.querySelector("#inputBookAuthor"),
      tahun = document.querySelector("#inputBookYear"),
      compCheck = document.querySelector("#inputBookIsComplete"),
      generate = {
        id: +new Date(),
        title: title.value,
        author: auth.value,
        year: tahun.value,
        isComplete: compCheck.checked,
      };
    console.log(generate),
      array.push(generate),
      document.dispatchEvent(new Event("ubahBuku"));
  }
  function search(todo) {
    todo.preventDefault();
    const searchBookTitle = document.querySelector("#searchBookTitle");
    (query = searchBookTitle.value),
      query
        ? searchTitle(
            array.filter(function (search) {
              return search.title.toLowerCase().includes(query.toLowerCase());
            })
          )
        : searchTitle(array);
  }
  // tambah data
  function findTodo(todo) {
    const tambah = Number(todo.target.id),
      add = array.findIndex(function (search) {
        return search.id === tambah;
      });
    -1 !== add &&
      ((array[add] = { ...array[add], isComplete: !0 }),
      document.dispatchEvent(new Event("ubahBuku")));
  }
  function findTodoIndex(todo) {
    const todoIndex = Number(todo.target.id),
      indexTodo = array.findIndex(function (index) {
        return index.id === todoIndex;
      });
    -1 !== indexTodo &&
      ((array[indexTodo] = { ...array[indexTodo], isComplete: !1 }),
      document.dispatchEvent(new Event("ubahBuku")));
  }
  function removeIndex(todo) {
    const remove = Number(todo.target.id),
      indexRemove = array.findIndex(function (index) {
        return index.id === remove;
      });
    -1 !== indexRemove &&
      (array.splice(indexRemove, 1),
      document.dispatchEvent(new Event("ubahBuku")));
  }
  function searchTitle(todo) {
    const incompliteBook = document.querySelector("#incompleteBookshelfList"),
      compliteBook = document.querySelector("#completeBookshelfList");
    (incompliteBook.innerHTML = ""), (compliteBook.innerHTML = "");
    for (const makeTodo of todo) {
      const bookArtikel = document.createElement("article");
      bookArtikel.classList.add("book_item");
      const textTitle = document.createElement("h2");
      textTitle.innerText = makeTodo.title;
      const textAuth = document.createElement("p");
      textAuth.innerText = "Penulis: " + makeTodo.author;
      const buku = document.createElement("p");
      if (
        ((buku.innerText = "Tahun: " + makeTodo.year),
        bookArtikel.appendChild(textTitle),
        bookArtikel.appendChild(textAuth),
        bookArtikel.appendChild(buku),
        makeTodo.isComplete)
      ) {
        const container = document.createElement("div");
        container.classList.add("action");
        const tombol = document.createElement("button");
        (tombol.id = makeTodo.id),
          (tombol.innerText = "Belum Selesai dibaca"),
          tombol.classList.add("green"),
          tombol.addEventListener("click", findTodoIndex);
        const tombolHapus = document.createElement("button");
        (tombolHapus.id = makeTodo.id),
          (tombolHapus.innerText = "Hapus buku"),
          tombolHapus.classList.add("red"),
          tombolHapus.addEventListener("click", removeIndex),
          container.appendChild(tombol),
          container.appendChild(tombolHapus),
          bookArtikel.appendChild(container),
          compliteBook.appendChild(bookArtikel);
      } else {
        const container = document.createElement("div");
        container.classList.add("action");
        const tombol = document.createElement("button");
        (tombol.id = makeTodo.id),
          (tombol.innerText = "Selesai dibaca"),
          tombol.classList.add("green"),
          tombol.addEventListener("click", findTodo);
        const tombolHapus = document.createElement("button");
        (tombolHapus.id = makeTodo.id),
          (tombolHapus.innerText = "Hapus buku"),
          tombolHapus.classList.add("red"),
          tombolHapus.addEventListener("click", removeIndex),
          container.appendChild(tombol),
          container.appendChild(tombolHapus),
          bookArtikel.appendChild(container),
          incompliteBook.appendChild(bookArtikel);
      }
    }
  }
  function finish() {
    !(function (todo) {
      localStorage.setItem("books", JSON.stringify(todo));
    })(array),
      searchTitle(array);
  }
  window.addEventListener("load", function () {
    (array = JSON.parse(localStorage.getItem("books")) || []),
      searchTitle(array);
    const finishBook = document.querySelector("#inputBook"),
      searchFinish = document.querySelector("#searchBook");
    finishBook.addEventListener("submit", generateTodoObjek),
      searchFinish.addEventListener("submit", search),
      document.addEventListener("ubahBuku", finish);
  });
})();
