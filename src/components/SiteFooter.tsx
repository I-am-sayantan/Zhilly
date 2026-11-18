import Link from "next/link";
import { site } from "@/lib/site";
import Pending from "./Pending";

export default function SiteFooter() {
  return (
    <footer className="ink">
      <div className="wrap grid">
        <div>
          <p className="fm">Zhilly</p>
          <p>A small social hostel and café in Kalimpong, West Bengal.</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>WhatsApp <Pending value={site.whatsappNumber && site.phoneDisplay} label="verified number" /></p>
          <p>Email <Pending value={site.email} label="address" /></p>
          <p>Instagram <Pending value={site.instagram} label="@handle" /></p>
        </div>
        <div>
          <h3>Address</h3>
          <p><Pending value={site.address} label="Address to confirm" /></p>
          <p>{site.town} {site.pin}</p>
        </div>
        <div>
          <h3>Small print</h3>
          <ul><li><Link href="/policies/">Policies</Link></li><li><Link href="/privacy/">Privacy</Link></li></ul>
        </div>
      </div>
      <div className="wrap legal">
        <span>Zhilly is operated by {site.operator}.</span>
        {!site.launched && <span>Concept draft · not a live website</span>}
      </div>
    </footer>
  );
}
