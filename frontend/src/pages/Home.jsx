import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import '../styles/Home.css'


const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else alert("failed to delete a note");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    if(content && title){
      api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to create note");
        getNotes();
      })
      .catch((err) => alert(err));
      setTitle('');
      setContent('');
    }else{
      alert('Add title and text')
    }
  };

  return (
    <div>
      <h2>Create a Note</h2>
       <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="titile"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Notes</h2>
        {notes.map((item) => (
          <Note key={item.id} note={item} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
};

export default Home;
