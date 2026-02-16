import { Routes, Route } from 'react-router-dom';
import AdvocateClaimOverview from '../pages/AdvocateClaimOverview';
import FeeSchemes from '../pages/FeeSchemes';
import FamilyAdvocacySchemePage from '../pages/FamilyAdvocacySchemePage';
import PrivateFamilyLawRepresentationSchemePage from '../pages/PrivateFamilyLawRepresentationSchemePage';
import PrivateFamilyLawRepresentationFeeTypePage from '../pages/PrivateFamilyLawRepresentationFeeTypePage';
import CareProceedingsGraduatedFeeSchemePage from '../pages/CareProceedingsGraduatedFeeSchemePage';
import ProceedingTypes from '../pages/ProceedingTypes';
import AdvocatesMeetingsPage from '../pages/advocates-meetings/AdvocatesMeetingsPage';
import Hearing from '../pages/Hearing';
import CertificationDatePage from "../pages/CertificationDatePage";
import ProviderLocationDatePage from "../pages/ProviderLocationPage";
import CalculateFeesPage from "../pages/CalculateFeesPage";
import BillTypePage from "../pages/BillTypePage";
import CourtTypePage from "../pages/CourtTypePage";
import LevelOfWorkDonePage from "../pages/LevelOfWorkDonePage";
import FeeSummaryPage from '../pages/FeeSummaryPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdvocateClaimOverview />} />
      <Route path="/fee-schemes" element={<FeeSchemes />} />
      <Route path="/family-advocacy-scheme" element={<FamilyAdvocacySchemePage />} />
      <Route path="/private-family-law-representation-scheme" element={<PrivateFamilyLawRepresentationSchemePage />} />
      <Route path="/care-proceedings-graduated-fee-scheme" element={<CareProceedingsGraduatedFeeSchemePage />} />
      <Route path="/proceeding-types" element={<ProceedingTypes />} />
      <Route path="/hearing" element={<Hearing />} />
      <Route path="/advocates-meetings" element={<AdvocatesMeetingsPage />} />
      <Route path="/certification-date" element={<CertificationDatePage />} />
      <Route path="/provider-location" element={<ProviderLocationDatePage />} />
      <Route path="/private-family-law-representation-fee-type" element={<PrivateFamilyLawRepresentationFeeTypePage />} />
      <Route path="/calculate-fees" element={<CalculateFeesPage />} />
      <Route path="/bill-type" element={<BillTypePage />} />
      <Route path="/court-type" element={<CourtTypePage />} />
      <Route path="/level-of-work-done" element={<LevelOfWorkDonePage />} />
      <Route path="/fee-summary" element={<FeeSummaryPage />} />
    </Routes>
  );
};

export default AppRoutes;
