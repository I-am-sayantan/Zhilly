import BookingForm, { EmailEnquiry } from "./BookingForm";
import { site } from "@/lib/site";
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
            <p>Pick your nights on the calendar, and email them to us. We'll reply by email.</p>
          </div>
          <DatePlanner />
          {site.calendarApi ? <BookingForm /> : <EmailEnquiry />}
        </div>
      </PlannerProvider>
    </section>
  );
}
