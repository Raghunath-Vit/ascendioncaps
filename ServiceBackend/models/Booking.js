const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  bookingDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Closed'], default: 'Pending' },
  beforeWorking: { type: String },  
  afterWorking: { type: String },
  otp: String,
  rating:{
    type:Number,
    min:0,
    max:5,
    default:0
  },
  totalRatingScore: { type: Number, default: 0 }, // Sum of all ratings
  numberOfRatings: { type: Number, default: 0 }, // Count of ratings
});

// Update booking rating
bookingSchema.methods.updateRating = async function (newRating) {
  this.totalRatingScore += newRating; // Add the new rating to the total score
  this.numberOfRatings += 1; // Increment the number of ratings
  this.rating = this.totalRatingScore / this.numberOfRatings; // Calculate the average rating
  await this.save(); // Save the booking with the updated values
};


module.exports = mongoose.model('Booking', bookingSchema);
