const express = require('express');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const { authMiddleware } = require('../middlewares/auth');
const router = express.Router();
router.use(authMiddleware);


router.post('/book', async (req, res) => {
  const { trainId, source, destination } = req.body;

  if (!trainId || !source || !destination) {
    return res.status(400).json({ status: 'ERROR', message: 'Missing required fields' });
  }

  let transaction;

  try {
  
    transaction = await Train.sequelize.transaction();


    const train = await Train.findOne({
      where: { trainId, source, destination },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!train) {
      await transaction.rollback();
      return res.status(404).json({ status: 'ERROR', message: 'Train not found' });
    }

    if (train.totalSeats <= 0) {
      await transaction.rollback();
      return res.status(400).json({ status: 'NO_SEATS', message: 'No available seats' });
    }

    train.totalSeats -= 1;
    await train.save({ transaction });

    const booking = await Booking.create(
      {
        trainId,
        seatStatus: 'booked',
        source,
        destination,
      },
      { transaction }
    );

    await transaction.commit();

    return res.status(201).json({ status: 'SUCCESS', bookingId: booking.bookingId });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

router.use(authMiddleware);
router.get('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      const booking = await Booking.findByPk(bookingId, {
        include: [{ model: Train, attributes: ['trainName', 'trainId'] }], 
      });
      console.log(booking);
  
      if (!booking) {
        return res.status(404).json({ status: 'ERROR', message: 'Booking not found' });
      }
  
      const { source, destination, seatStatus } = booking;
      const { trainName, trainId } = booking.Train;
  
      const bookingDetails = {
        source,
        destination,
        trainName,
        trainId,
        status: seatStatus,
      };
  
      return res.status(200).json({ status: 'SUCCESS', bookingDetails });
    } catch (error) {
      return res.status(500).json({ status: 'ERROR', message: error.message });
    }
  });


module.exports = router;