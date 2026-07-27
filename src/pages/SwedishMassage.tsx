import ServicePage from "@/components/ServicePage";
import { treatmentBySlug } from "@/data/site";

const SwedishMassage = () => <ServicePage treatment={treatmentBySlug("/swedish-massage")!} />;

export default SwedishMassage;
