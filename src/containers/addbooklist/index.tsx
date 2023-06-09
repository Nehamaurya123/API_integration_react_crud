

import React, { useState } from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBooks: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();

  const handleForm = async () => {
    const formData = new FormData();
    formData.append("image", image as File);
    formData.append("name", name);
    formData.append("author", author);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const saveApi = "http://assignment.cyberboxer.com/books/save";
      const saveResult = await axios.post(saveApi, formData, { headers });
      console.log(saveResult.data);
      
      navigate("/show");
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <div className={styles.addbook_container}>
        <form>
          <div className={styles.login}>Add Books List here...</div>
          Image
          <div className={styles.image}>
            <input
              type="file"
              id="image"
              className={styles.img}
              onChange={handleImageChange}
            />
          </div>
          name
          <div className={styles.name}>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          Author
          <div className={styles.author}>
            <input
              className={styles.input}
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter Author"
            />
          </div>
          <button onClick={handleForm} type="button">Add Books</button>
        </form>
        <div>
          
        </div>
      </div>
    </>
  );
};

export default AddBooks;
