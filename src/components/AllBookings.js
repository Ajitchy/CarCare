import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/bookings`)
      .then((res) => res.json())
      .then((resp) => {
        if (Object.keys(resp).length === 0) {
          toast.error('Failed to fetch');
        } else {
          setBookings(resp);
        }
      })
      .catch((err) => {
        toast.error('Failed:' + err.message);
      });
  }, []); // Empty array ensures the effect runs once after the initial render

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:4000/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Booking deleted successfully, update the state
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
        setDeleteMessage(`The booking for Booking ID: ${bookingId} is deleted`);
        toast.success('Booking deleted successfully');

        // Clear the success message after 5 seconds
        setTimeout(() => {
          setDeleteMessage(null);
        }, 5000);
      } else {
        setDeleteMessage('Something went wrong. Booking not deleted');
        toast.error('Failed to delete booking');

        // Clear the error message after 5 seconds
        setTimeout(() => {
          setDeleteMessage(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      setDeleteMessage('Something went wrong. Booking not deleted');
      toast.error('Error deleting booking');

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setDeleteMessage(null);
      }, 5000);
    }
  };

  return (
    <div className='mt-auto'>
      <div className='mb-1 mx-5 my-4 container row'>
        <h2>List of All Bookings</h2>
        {deleteMessage && <p className="text-danger">{deleteMessage}</p>}
      </div>
      <div className='row row-cols-1 row-cols-md-3 mx-3 my-3 g-4'>
        {bookings.map((booking) => (
          <div key={booking.id} className='col mb-4'>
            <div className='container'>
              <div className='card w-60'>
                <div className='row no-gutters'>
                  <div className='col mx-2 my-2 text-start'>
                    <div className='card-block px-2'>
                      <h5 className='card-title'>Booking Id:{booking.id}</h5>
                      <p>
                        Service Name: {booking.serviceName}<br />
                        Email Id: {booking.emailId}<br />
                        Booking Date: {booking.bookedOn}
                      </p>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm'
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
