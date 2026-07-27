import ServicePage from "@/components/ServicePage";
import { treatmentBySlug } from "@/data/site";

const FootRitual = () => <ServicePage treatment={treatmentBySlug("/foot-ritual")!} />;

export default FootRitual;
