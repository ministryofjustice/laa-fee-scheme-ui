import { Routes, Route } from "react-router-dom";
import FeeSchemes from "../pages/FeeSchemes";
import FamilyAdvocacySchemePage from "../pages/FamilyAdvocacySchemePage";
import PrivateFamilyLawRepresentationSchemePage from "../pages/PrivateFamilyLawRepresentationSchemePage";
import PrivateFamilyLawRepresentationFeeTypePage from "../pages/PrivateFamilyLawRepresentationFeeTypePage";
import CareProceedingsGraduatedFeeSchemePage from "../pages/CareProceedingsGraduatedFeeSchemePage";
import CertificationDatePage from "../pages/CertificationDatePage";
import AspectOfWork from "../pages/AspectOfWork";
import ProcessCompletePage from "../pages/ProcessCompletePage";
import ProviderLocationDatePage from "../pages/ProviderLocationPage";
import CalculateFeesPage from "../pages/CalculateFeesPage";
import BillTypePage from "../pages/BillTypePage";
import CourtTypePage from "../pages/CourtTypePage";
import LevelOfWorkDonePage from "../pages/LevelOfWorkDonePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FeeSchemes />} />
      <Route path="/family-advocacy-scheme" element={<FamilyAdvocacySchemePage />} />
      <Route path="/private-family-law-representation-scheme" element={<PrivateFamilyLawRepresentationSchemePage />} />
      <Route path="/care-proceedings-graduated-fee-scheme" element={<CareProceedingsGraduatedFeeSchemePage />} />
      <Route path="/aspect-of-work" element={<AspectOfWork />} />
      <Route path="/certification-date" element={<CertificationDatePage />} />
      <Route path="/provider-location" element={<ProviderLocationDatePage />} />
      <Route path="/private-family-law-representation-fee-type" element={<PrivateFamilyLawRepresentationFeeTypePage />} />
      <Route path="/calculate-fees" element={<CalculateFeesPage />} />
      <Route path="/bill-type" element={<BillTypePage />} />
      <Route path="/court-type" element={<CourtTypePage />} />
      <Route path="/level-of-work-done" element={<LevelOfWorkDonePage />} />
      <Route path="/process-complete" element={<ProcessCompletePage />} />
    </Routes>
  );
};

export default AppRoutes;
