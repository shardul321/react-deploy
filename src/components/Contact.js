import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { database } from "../firebase/firebase";
import Header from "./Header";
import {analytics} from "../firebase/firebase";

const Contact = () => {
  const [contactObject, setContactObject] = useState({});
  const [currentid, setCurrentid] = useState("");

  useEffect(() => {
    database.child("data").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setContactObject({
          ...snapshot.val(),
        });
      } else {
        setContactObject({});
      }
    });
  }, []);
  useEffect(() => {
    analytics.logEvent({eventName: "RealtimeDb_visited"})
  }, [])
  const addOrEdit = (obj) => {
    if (currentid == "") {
      database.child("data").push(obj, (err) => {
        if (err) {
          console.log(`err`, err);
        } else {
          setCurrentid("");
        }
      });
    } else {
      database.child(`data/${currentid}`).set(obj, (err) => {
        if (err) {
          console.log(`err`, err);
        } else {
          setCurrentid("");
        }
      });
    }
  };
  const handledelete = (key) => {
    if (window.confirm("Are you sure to delete this record???")) {
      database.child(`data/${key}`).remove((err) => {
        if (err) {
          console.log(`err`, err);
        } else {
          setCurrentid("");
        }
      });
    }
  };
  return (
    <div>
      <Header />
      <h1>CRUD with Realtime-database</h1>
      <div className="row">
        <div className="col-md-8">
          <ContactForm {...{ addOrEdit, currentid, contactObject }} />
        </div>
        <div className="col-md-9 mt-5">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObject).map((id) => {
                return (
                  <tr key={id}>
                    <td>{contactObject[id].fullName}</td>
                    <td>{contactObject[id].mobile}</td>
                    <td>{contactObject[id].email}</td>
                    <td>{contactObject[id].address}</td>
                    <td>
                      {
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setCurrentid(id);
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
                            handledelete(id);
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

export default Contact;