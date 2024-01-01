import React, { useState } from 'react';

export default function CreateBooking() {
  const [formData, setFormData] = useState({
    serviceName: '',
    emailId: '',
    bookedOn: '',
  });

  const [formErrors, setFormErrors] = useState({
    serviceName: '',
    emailId: '',
    bookedOn: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === '') &&
      Object.values(formData).every((value) => value !== '')
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Perform validation checks and update errors instantly
    let error = '';
    if (name === 'emailId') {
      error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : 'Please enter a valid emailId address';
    } else if (name === 'bookedOn') {
      const selectedDate = new Date(value);
      const today = new Date();
      error =
        value !== '' && selectedDate >= today
          ? ''
          : 'Booking date should be after today\'s date';
    } else {
      error = value !== '' ? '' : 'This field is required';
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Assuming you have a server endpoint at http://localhost:4000/bookings
      fetch('http://localhost:4000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to submit booking');
          }
        })
        .then((data) => {
          setSubmissionStatus(`Booking is successfully created with bookingId: ${data.id}`);
        })
        .catch((error) => {
          console.error('Error submitting booking:', error);
          setSubmissionStatus('Something went wrong.');
        });
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 mx-auto bg-light shadow">
        <div className="bg-light shadow p-3 mb-5 rounded">
          <h2 className="mb-4">Book Your Service</h2>
        </div>
        {submissionStatus && (
          <div className={`alert ${submissionStatus.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {submissionStatus}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="serviceName" className="form-label">
              Type of Service:
            </label>
            <select
              className="form-select"
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Service
              </option>
              <option value="carWash">Car Wash</option>
              <option value="wheelAlignment">Wheel Alignment</option>
              <option value="dentingPainting">Denting Painting</option>
            </select>
            <div className="invalid-feedback">{formErrors.serviceName}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="emailId" className="form-label">
              emailId:
            </label>
            <input
              type="text"
              className={`form-control ${formErrors.emailId ? 'is-invalid' : ''}`}
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{formErrors.emailId}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="bookedOn" className="form-label">
              Booking Date:
            </label>
            <input
              type="date"
              className={`form-control ${formErrors.bookedOn ? 'is-invalid' : ''}`}
              id="bookedOn"
              name="bookedOn"
              value={formData.bookedOn}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{formErrors.bookedOn}</div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
