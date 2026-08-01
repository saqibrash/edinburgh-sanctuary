import ServicePage from "@/components/ServicePage";
import { treatmentBySlug } from "@/data/site";

const ScalpMassage = () => <ServicePage treatment={treatmentBySlug("/rebalancing-scalp-massage")!} />;

export default ScalpMassage;
