import React, { useState, useEffect } from "react";

const ContactForm = ({ addOrEdit, currentid, contactObject }) => {
  const initialState = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  };
  const [values, setValues] = useState(initialState);
  const { fullName, mobile, email, address } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      addOrEdit(values);
  }
  
  useEffect(() => {
    if(currentid == ""){
      setValues({
        ...initialState
      })
      
    }else{
      setValues({
              ...contactObject[currentid]
          })
      }
  }, [currentid,contactObject])
  
  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Full Name"
            name="fullName"
            onChange={handleChange}
            value={fullName}
          />
        </div>
        <div className="form-row">
          <div className="form-group input-group col-md-6">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-mobile"></i>
              </div>
            </div>
            <input
              className="form-control"
              placeholder="Mobile"
              name="mobile"
              onChange={handleChange}
              value={mobile}
            />
          </div>
          <div className="form-group input-group col-md-6">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-email"></i>
              </div>
            </div>
            <input
              className="form-control"
              placeholder="email"
              name="email"
              onChange={handleChange}
              value={email}
            />
          </div>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Address"
            name="address"
            onChange={handleChange}
            value={address}
          />
        </div>
        <div className="form-control">
          <input
            type="submit"
            value={currentid == ""? 'Save' : 'Update'}
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;