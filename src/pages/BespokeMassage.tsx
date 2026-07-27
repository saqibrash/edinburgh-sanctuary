import ServicePage from "@/components/ServicePage";
import { treatmentBySlug } from "@/data/site";

const BespokeMassage = () => <ServicePage treatment={treatmentBySlug("/bespoke-massage")!} />;

export default BespokeMassage;
