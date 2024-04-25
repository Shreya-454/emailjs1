import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    number: "",
    email: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = {
      name: /^[a-zA-Z\s]+$/,
      number: /^\d{10}$/,
      email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/,
    };
    const errors = {};
    if (!regex.name.test(formData.name)) {
      errors.name = "Name is invalid.";
    }
    if (!regex.number.test(formData.number)) {
      errors.number = "Number is invalid.";
    }
    if (!regex.email.test(formData.email)) {
      errors.email = "email is invalid.";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setShowSuccessPopup(true);
    }
    emailjs
    .sendForm("service_y3mxtot","template_sgngerd", form.current, {
      publicKey: "GJQJ5xe8a3nmu8JrK",
    })
    .then(
      () => {
        console.log("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error.text);
      }
    );
};
  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    setFormData({
    name: "",
      number: "",
      email: "",
    });
    setFormErrors({
    name: "",
      number: "",
      email: "",
    });
  };
  if (showSuccessPopup) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  return (
    <div className=" flex justify-center mx-auto w-[500px] container items-center min-h-screen">
      <form
        ref={form}
        onSubmit={handleSubmit} 
        className=" w-full mx-auto"
      >
        <div className="w-full">
          <div className="w-full">
            <label htmlFor="name">Name</label>
          </div>
          <input type="text" name="name" className="border border-solid border-black h-[50px] w-full"  id="name"
            value={formData.name}
            onChange={handleChange} />
        </div>
        {formErrors.name && (
            <p className="text-base text-[red]">{formErrors.name}</p>
          )}
        <div className="w-full">
          <div className="w-full">
            <label htmlFor="numb">Number</label>
          </div>
          <input type="tel" name="number" id="numb" className="border border-solid border-black h-[50px] w-full"   value={formData.number}
            onChange={handleChange} />
        </div>
        {formErrors.number && (
                  <p className="text-[red] text-base ">{formErrors.number}</p>
                )}
        <div className="w-full">
          <div className="w-full">
            <label htmlFor="email1">Email</label>
          </div>
          <input id="email1" type="email" name="email" className="border border-solid border-black h-[50px] w-full "  value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className="text-[red] text-base">{formErrors.email}</p>
          )}
          </div>
        <div className="w-full">
          <div>
            <label>Message</label>
          </div>
          <textarea name="message" className="border border-solid border-black !h-[80px] w-full resize-none"/>
        </div>
        <div className="w-full">
          <input type="submit"  value="Send" className="bg-black text-white cursor-pointer rounded-md px-5 py-3" />
        </div>
        {showSuccessPopup && (
        <div>
          <div className="flex flex-col items-center">
            <p className="text-black pt-1 font-outfit" >Form submitted successfully!</p>
            <button className=" bg-btn-gradient text-black px-3 py-2 font-outfit font-semibold" onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
      </form>
    </div>
  );
};
