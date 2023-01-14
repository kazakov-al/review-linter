import { useState } from 'react';

import api from '../../utils/api';
import './DragDropForm.css';

function DragDropForm() {
  const [ dragActive, setDragActive ] = useState(false);

  function handleDrag(e) {
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave" || e.type === "dragend") {
      setDragActive(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    setDragActive(false);

    if (e.target['file'].files && e.target['file'].files[0]) {
      api.upload(e.target['file'].files[0])
        .then(data => {
          console.log(1);
        })
        .catch(console.error);
    }
  }

  return (
    <form
      className={`drag-drop-form ${dragActive ? 'drag-drop-form_drag' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={onSubmit}
      onSubmit={onSubmit}
    >
      <label>
        <input
          type="file"
          accept=".zip"
          name="file"
        />
      </label>

      <p>Drag and drop your file here or</p>
      <button className="">Upload a file</button>
    </form>
  );
}

export default DragDropForm;
