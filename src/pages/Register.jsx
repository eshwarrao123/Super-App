import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const Register = () => {
    const setUser = useStore((state) => state.setUser);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const tempErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;

        if (!formData.name.trim()) {
            tempErrors.name = "Name field cannot be left blank.";
        }
        if (!formData.username.trim()) {
            tempErrors.username = "Username field cannot be left blank.";
        }
        if (!emailPattern.test(formData.email)) {
            tempErrors.email = "Please input a valid email formatting schema.";
        }
        if (!phonePattern.test(formData.mobile)) {
            tempErrors.mobile = "Mobile field must encompass exactly 10 digital characters.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleFormSubmission = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setUser(formData);
            navigate("/categories");
        }
    };

    return (
        <form onSubmit={handleFormSubmission} className="form-container">
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
            </div>
            <div>
                <label>Email Address</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div>
                <label>Mobile Number</label>
                <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
                {errors.mobile && <span className="error-text">{errors.mobile}</span>}
            </div>
            <button type="submit">Submit Registration Details</button>
        </form>
    );
};

export default Register;