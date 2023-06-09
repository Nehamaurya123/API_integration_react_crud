import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useNavigate,  useParams} from "react-router-dom";
import axios from "axios";

type BookData = {
  id: string;
  name: string;
  author: string;
  image?: string;
};

const EditbookList: React.FC = () => {
  const [book, setBook] = useState<BookData>({ id: "", name: "", author: "" });
  const [name, setName]=useState("");
  const [author, setAuthor]=useState("");
  const [id, setId]=useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const params = useParams();
  console.log('params', params);
  useEffect(() => {
    fetchBook();
  }, []);

const fetchBook = async () => {
      const apiurl = `http://assignment.cyberboxer.com/books/book/${params.id}`;
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      try {
    const response = await axios.get(apiurl, { headers });
    setBook(response.data.data);
    setName(response.data.data.name);
    setAuthor(response.data.data.author);
    setId(response.data.data.id);

  } catch (error) {
    console.error(error);
      }
    };

 const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };
  const handleImageChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    setImage(event.target.files?.[0] || null)
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("author", author);
  formData.append("id",id);
  if (image) {
    formData.append("image", image as File);
  }

  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const apiurl = `http://assignment.cyberboxer.com/books/update/${params.id}`;
    const result = await axios.post(apiurl, formData, { headers });
    console.log(result.data.data);
    //setBook(result.data.data);
    setName(result.data.data.name);
    setAuthor(result.data.data.author);
    setImage(result.data.data.image);
    navigate("/show");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
      <div className={styles.edit_container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login}>Edit Books List here...</div>
          Image
          <div className={styles.image}>
            {book.image ? (
              <img src={book.image} alt={book.name}/>
            ) : (
              <div className={styles.no_image}>No image</div>
            )}
            <input
              type="file"
              onChange={handleImageChange}
            />
          </div>
          Name
          <div className={styles.name}>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={handleNameChange}
              
            />
          </div>
          Author
          <div className={styles.author}>
            <input
              className={styles.input}
              type="text"
              value={author}
             onChange={handleAuthorChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditbookList;


///////////////////////////////////////////////////////////////

