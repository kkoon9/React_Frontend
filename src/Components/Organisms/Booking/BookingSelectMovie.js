import React from "react";
import CarouselCalendar from "../../Molecules/CarouselCalendar";
import Calendar from "../../Molecules/Calendar";
import BookingMovieList from "../../Molecules/BookingMovieList";
import BookingTheaterList from "../../Molecules/BookingTheaterList";
import BookingMovieSchedules from "../../Molecules/BookingMovieSchedules";

import "./style/BookingSelectMovie.scss";
import BookingFastTitle from "../../Atoms/BookingFastTitle";

const BookingSelectMovie = () => {
  return (
    <div className="bookingSelectMovieContainer">
      <BookingFastTitle />
      <div className="calendarsContainer">
        <CarouselCalendar />
        <Calendar />
      </div>
      <div className="bookingInfoLists">
        <BookingMovieList />
        <BookingTheaterList />
        <BookingMovieSchedules />
      </div>
    </div>
  );
};

export default BookingSelectMovie;
