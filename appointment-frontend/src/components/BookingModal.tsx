import React, { useState } from 'react';
import { createAppointment } from '../services/api';
import { useMutation } from '@tanstack/react-query';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../types';

interface BookingModalProps {
  shopId: number;
  shopName: string;
  isOpen: boolean;
  onClose: () => void;
}

// Define the input type for the mutation explicitly
interface BookingVariables {
  shopId: number;
  startAt: string;
  endAt: string;
  notes: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ shopId, shopName, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [notes, setNotes] = useState('');
  
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  });

  // Mock time slots (In a real app, fetch availability from backend)
  const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
  ];

  // Explicitly type the useMutation hook: <ResponseData, ErrorType, VariablesType>
  const mutation = useMutation<Appointment, Error, BookingVariables>({
    mutationFn: (data) => createAppointment(data),
    onSuccess: () => {
      alert("Appointment Booked Successfully!");
      onClose();
    },
    onError: (err) => {
      alert("Failed to book appointment.");
      console.error(err);
    }
  });

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedDate || !selectedSlot) return;

    // Construct backend expected ISO strings
    const startAt = new Date(`${selectedDate}T${selectedSlot}:00`).toISOString();
    
    // Assuming 1 hour duration default
    const endDate = new Date(`${selectedDate}T${selectedSlot}:00`);
    endDate.setHours(endDate.getHours() + 1);
    const endAt = endDate.toISOString();

    const bookingData: BookingVariables = {
      shopId,
      startAt,
      endAt,
      notes
    };

    mutation.mutate(bookingData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-indigo-600 p-6 flex justify-between items-start text-white">
          <div>
            <h2 className="text-xl font-bold">Book Appointment</h2>
            <p className="text-indigo-200 text-sm mt-1">{shopName}</p>
          </div>
          <button onClick={onClose} className="hover:bg-indigo-500 rounded p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} /> Select Date
            </label>
            <div className="grid grid-cols-4 gap-2">
              {dates.slice(0, 4).map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2 rounded-lg text-xs font-medium border ${
                    selectedDate === date 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selection */}
          {selectedDate && (
            <div className="animate-in slide-in-from-left-4 fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Clock size={16} /> Available Slots
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-md text-sm border ${
                      selectedSlot === slot 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-500' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              rows={3}
              placeholder="Any specific requests?"
            />
          </div>

          <button
            onClick={handleBook}
            disabled={!selectedDate || !selectedSlot || mutation.isPending}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {mutation.isPending ? 'Booking...' : (
              <>
                <CheckCircle size={18} /> Confirm Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;