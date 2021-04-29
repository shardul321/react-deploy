import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";
import Header from "./Header";
import {analytics} from "../firebase/firebase";

const FireStoreData = () => {
  const [todo, setTodo] = useState("");
  const [dataList, setDataList] = useState([]);
  const [currentid, setCurrentid] = useState("");
  const [dataId, setDataId] = useState("")
  const ref = firebase.firestore().collection("data");
  
  const clearData = () => {
    setTodo("");
  }

  useEffect(() => {
      ref.onSnapshot((Snapshot) => {
      const item =[];
      Snapshot.forEach((doc) => {
        const {todo} = doc.data();
        item.push({
          key:doc.id,
          todo
        })
      })
      setDataList(item);
      localStorage.setItem("todoData",JSON.stringify(item));
    });
  
  // catch{
  //   console.warn(`erorororrororor`)
  //     let collection = JSON.parse(localStorage.getItem("todoData"));
  //     setDataList(collection);
  //   }
  }, []);

  useEffect(() => {
    analytics.logEvent({eventName: "Firestorepage_visited"})

  }, []);
 
  useEffect(() => {
    if(currentid == ""){
      setTodo(todo)
    }else{
      setTodo(dataList[dataId].todo)
    }
  }, [dataId,currentid])
  const addOrEdit = () => {
    if(currentid == ""){
      ref
      .add({ todo })
      .then((docRef) => {
        // console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
      clearData();
    }else{
      ref.doc(currentid).update({todo})
    }

  };

  const handleDelete = (key) => {
    ref.doc(key).delete()
   };
   const handleSubmit = () => {
     addOrEdit();
   }
   
  return (
    <div>
      <div>
        <Header />
      </div>
      <br />
      <div className="mt-9">
        <label>Add Todo :-</label>
        <input
          type="text"
          name="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleSubmit}>{currentid == ""? 'Save' : 'Update'}</button>
        <hr />
        <div className="col-md-9 mt-5">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>TODO LIST</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
               {dataList.map((v,id) => {
                return (
                  <tr key={id}>
                    <td>{v.todo}</td>
                    <td>
                      {
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                              setCurrentid(v.key);
                              setDataId(id);
                          }}
                        >
                          Edit
                        </button>
                      }
                    </td>
                    <td>
                      {
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(v.key)
                          }}
                        >
                          Delete
                        </button>
                      }
                    </td>
                  </tr>
                );
            })}
            </tbody> 
          </table>
        </div>
      </div>
    </div>
  );
};

export default FireStoreData;
