import BookingForm from "./BookingForm";
import { DatePlanner, PlannerProvider } from "./DatePlanner";

/** The closing "Send us your dates" band, shared by the homepage and most inner pages: the date planner (with booked nights) beside the booking enquiry form. */
export default function CloseBand() {
  return (
    <section className="close" id="book" aria-labelledby="close-h">
      <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoB" /></svg>
      <PlannerProvider>
        <div className="wrap grid">
          <div className="close-head">
            <h2 id="close-h"><span className="a">Send us</span> <span className="b">your dates.</span></h2>
            <p>Pick your nights on the calendar, tell us who's coming, and we'll confirm by email or WhatsApp.</p>
          </div>
          <DatePlanner />
          <BookingForm />
        </div>
      </PlannerProvider>
    </section>
  );
}
