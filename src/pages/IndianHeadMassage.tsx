import ServicePage from "@/components/ServicePage";
import { treatmentBySlug } from "@/data/site";

const IndianHeadMassage = () => <ServicePage treatment={treatmentBySlug("/indian-head-massage")!} />;

export default IndianHeadMassage;
