import { DatePlanner, PlannerProvider, SendDatesButton } from "./DatePlanner";

/** The closing "Send us your dates" band, shared by the homepage and most inner pages: a working date planner beside the WhatsApp button. */
export default function CloseBand() {
  return (
    <section className="close" aria-labelledby="close-h">
      <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoB" /></svg>
      <PlannerProvider>
        <div className="wrap grid">
          <div>
            <h2 id="close-h"><span className="a">Send us</span> <span className="b">your dates.</span></h2>
            <p>Tell us when, and how many. We'll tell you what's free.</p>
            <SendDatesButton>
              {" "}
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.3 4.8 4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.9a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
              </svg>
              {" "}Check dates on WhatsApp{" "}
            </SendDatesButton>
          </div>
          <DatePlanner />
        </div>
      </PlannerProvider>
    </section>
  );
}
