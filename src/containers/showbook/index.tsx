

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./index.module.scss";
// import ReactPaginate from 'react-paginate';

// const ShowBooks: React.FC = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [id, setId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [total, setTotal]=useState(512)
//   const [perpage, setPerpage]=useState(10);

//   const handlePageClick = async (page: { selected: number }) => {
//     const selectedPage = page.selected + 1;
//     setCurrentPage(selectedPage);
//     fetchData(selectedPage);
//   };

//   const fetchData = async (page: number) => {
//     try {
//       const token = localStorage.getItem("token");
//       const headers = {
//         Authorization: `Bearer ${token}`
//       };
//       const apiurl = `http://assignment.cyberboxer.com/books/list/${page}`;
//       const result = await axios.get(apiurl, { headers });
//       const res = result.data;
//       setData(res.data);
//       console.log(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (index: string) => {
//     setId(index);
//     const wantDelete = window.confirm("Are you sure you want to delete this book?");
//     if (!wantDelete) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("id", index);
//     try {
//       const token = localStorage.getItem("token");
//       const headers = {
//         Authorization: `Bearer ${token}`
//       };
//       const deleteApi = `http://assignment.cyberboxer.com/books/delete`;
//       const delResult = await axios.post(deleteApi, formData, { headers });
//       console.log(delResult.data);
//       const updatedBooks = data.filter((book: any) => book.id !== id);
//       setData(updatedBooks);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   return (
//     <>
//       <div className={styles.table_container}>
//         <table>
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Author</th>
//               <th>Image</th>
//               <th>Created_At</th>
//               <th>EDIT</th>
//               <th>DELETE</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(data) &&
//               data.map((item) => {
//                 return (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.name}</td>
//                     <td>{item.author}</td>
//                     <td>
//                       <img src={item.image} alt="Book cover" className={styles.image} />
//                     </td>
//                     <td>{item.cteated_at}</td>
//                     <td>
//                       <Link to={`/edit/${item.id}`}>Edit</Link>
//                     </td>
//                     <td>
//                       <button onClick={() => handleDelete(item.id)}>Delete</button>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//  <ReactPaginate
//           previousLabel={'Prev'}
//           nextLabel={'Next'}
//           breakLabel={'...'}
//           pageCount={Math.ceil(total / perpage)}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           //bootstrap design 
//      containerClassName={'pagination justify-content-center'}
//      pageClassName={'page-item'}
//      pageLinkClassName={'page-link'}
//      previousClassName={'page-item'}
//      previousLinkClassName={'page-link'}
//      nextClassName={'page-item'}
//      nextLinkClassName={'page-link'}
//      breakClassName={'page-item'}
//      breakLinkClassName={'page-link'}
//      activeClassName={'page-item active'}
//      />
//       </div>
//     </>
//   );
// };

// export default ShowBooks;
///////////////////////////////////////////////////////////////////////////////



import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import ReactPaginate from 'react-paginate';
import DeleteConfirmation from "../deleteConfirmation";

const ShowBooks: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal]=useState<any>()
  const [perpage, setPerpage]=useState(10);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePageClick = async (page: { selected: number }) => {
    const selectedPage = page.selected + 1;
    setCurrentPage(selectedPage);
    fetchData(selectedPage);
  };

  const fetchData = async (page: number) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const apiurl = `http://assignment.cyberboxer.com/books/list/${page}`;
      const result = await axios.get(apiurl, { headers });
      const res = result.data;
       const resu=result.data.total; //total data in api
      // console.warn(resu);
       setTotal(resu);
      setData(res.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ...

const handleDeleteFinal = async (id: string) => {
  console.log("FINAL");
  const formData = new FormData();
  formData.append("id", id);
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const deleteApi = `http://assignment.cyberboxer.com/books/delete`;
    const delResult = await axios.post(deleteApi, formData, { headers });
    console.log(delResult.data);
    const updatedBooks = data.filter((book: any) => book.id !== id);
    setData(updatedBooks);
    
  } catch (error) {
    console.log(error);
  }
};

///confirmation 
const handleDelete = (id: string) => {
  setId(id);
  setShowConfirmation(true);
};

const handleCancelFinal = () => {
  setId("");
  setShowConfirmation(false);
};


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className={styles.table_container}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Author</th>
              <th>Image</th>
              <th>Created_At</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.author}</td>
                    <td>
                      <img src={item.image} alt="Book cover" className={styles.image} />
                    </td>
                    <td>{item.cteated_at}</td>
                    <td>
                      <Link to={`/edit/${item.id}`}><button className={styles.edit}>Edit data</button></Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.id)} className={styles.delete}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
 <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(total/ perpage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          //bootstrap design 
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'page-item active'}
     />
      </div>
      {/* deleteConfirmation */}
      {showConfirmation && <DeleteConfirmation message={"Are you sure to delete this book?"}  onConfirm={() => handleDeleteFinal(id)}
    onCancel={handleCancelFinal} setShowConfirmation={setShowConfirmation} // Pass setShowConfirmation as a prop
      />}
    </>
  );
};

export default ShowBooks;