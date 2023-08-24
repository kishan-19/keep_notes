const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="opration">
            <span class="btn-opration">
            <button class="save ${text ? "hidden" : ""}"><i class="fas fa-save"></i></button>
            <button class="edite ${text ? "" : "hidden"}"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </span>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}" placeholder=" 🖊 Keep your note here..." ></textarea> <div>  `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    // getting the Reference

    const editeButton = note.querySelector('.edite');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');
    const saveButton = note.querySelector('.save');

    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

  editeButton.addEventListener('click', () => {
            editeButton.style.display = 'none';
            saveButton.style.display='inline-block';

  });

  saveButton.addEventListener('click', () => {
    saveButton.style.display = 'none';
    editeButton.style.display='inline-block';

});

  saveButton.addEventListener('click', () => {
    mainDiv.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
  });

    textarea.value = text;
    mainDiv.innerHTML = text;

    editeButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');

    });

    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })

    document.body.appendChild(note);
}

// getting data back from localStorage

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) { notes.forEach((note) => addNewNote(note)) }

addButton.addEventListener('click', () => addNewNote());