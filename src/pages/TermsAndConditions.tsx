import LegalLayout from "@/components/LegalLayout";
import Seo from "@/components/Seo";

const EMAIL = "therestorationroom85@gmail.com";
const PHONE = "07570 161699";

const TermsAndConditions = () => (
  <LegalLayout title="Terms &amp; Conditions" updated="July 2026">
    <Seo
      title="Terms & Conditions | The Restoration Room, Edinburgh"
      description="Booking terms for The Restoration Room by Camilla in Silverknowes, Edinburgh — Fresha bookings, 50% deposit, 48-hour cancellation policy and health information."
      path="/terms-and-conditions"
    />

    <p>
      These terms apply to treatments booked with The Restoration Room by Camilla, Silverknowes, EH4,
      Edinburgh. Please read them before booking.
    </p>

    <section>
      <h2>Booking your treatment</h2>
      <p>
        All treatments are booked through our Fresha booking page. Bookings are confirmed once you
        receive confirmation from Fresha. If you would prefer to arrange an appointment directly,
        please call <a href="tel:+447570161699">{PHONE}</a> or email{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </section>

    <section>
      <h2>Deposits</h2>
      <p>
        A 50% deposit may be required to secure your appointment. Any deposit is taken through Fresha
        and is deducted from the balance due on the day of your treatment.
      </p>
    </section>

    <section>
      <h2>Cancellations and missed appointments</h2>
      <ul>
        <li>We ask for at least 48 hours' notice if you need to cancel or reschedule.</li>
        <li>Where 48 hours' notice is given, any deposit paid can be refunded or moved to a new appointment.</li>
        <li>
          Late cancellations, changes made with less than 48 hours' notice, and missed appointments
          may result in the deposit being retained.
        </li>
        <li>Please arrive on time; late arrivals may result in a shortened treatment.</li>
      </ul>
    </section>

    <section>
      <h2>Health and medical information</h2>
      <p>
        The treatment information on this website is general in nature and is not medical advice. It
        does not replace advice from your GP or another qualified healthcare professional.
      </p>
      <p>
        Please tell us about any relevant medical conditions, injuries, allergies, medication or if
        you are pregnant, before your treatment begins. Some conditions may mean a treatment needs to
        be adapted, postponed, or that we ask you to check with your GP first. We reserve the right
        to decline a treatment where it would not be safe or appropriate.
      </p>
    </section>

    <section>
      <h2>Prices and treatments</h2>
      <p>
        Prices and treatment times shown on this website are correct at the time of publication and
        may change. The prices shown on our Fresha booking page at the time of booking apply.
      </p>
    </section>

    <section>
      <h2>Questions</h2>
      <p>
        If anything here is unclear, please get in touch on{" "}
        <a href="tel:+447570161699">{PHONE}</a> or{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> before booking.
      </p>
    </section>
  </LegalLayout>
);

export default TermsAndConditions;
