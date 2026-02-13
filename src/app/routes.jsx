import { Routes, Route } from 'react-router-dom';
import AdvocateClaimOverview from '../pages/AdvocateClaimOverview';
import FeeSchemes from '../pages/FeeSchemes';
import FamilyAdvocacySchemePage from '../pages/FamilyAdvocacySchemePage';
import PrivateFamilyLawRepresentationSchemePage from '../pages/PrivateFamilyLawRepresentationSchemePage';
import PrivateFamilyLawRepresentationFeeTypePage from '../pages/PrivateFamilyLawRepresentationFeeTypePage';
import CareProceedingsGraduatedFeeSchemePage from '../pages/care-proceedings-graduated-fee-scheme/CareProceedingsGraduatedFeeSchemePage';
import ProceedingTypes from '../pages/ProceedingTypes';
import AdvocatesMeetingsPage from '../pages/advocates-meetings/AdvocatesMeetingsPage';
import Hearing from '../pages/Hearing';
import CertificationDatePage from "../pages/CertificationDatePage";
import ProcessCompletePage from "../pages/ProcessCompletePage";
import ProviderLocationDatePage from "../pages/ProviderLocationPage";
import CalculateFeesPage from "../pages/CalculateFeesPage";
import BillTypePage from "../pages/BillTypePage";
import CourtTypePage from "../pages/CourtTypePage";
import LevelOfWorkDonePage from "../pages/LevelOfWorkDonePage";
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeeSchemeFgfCounselAdvocacy from '../pages/care-proceedings-graduated-fee-scheme/FeeSchemeFgfCounselAdvocacy';
import FeeSchemeFasAdvocacy from '../pages/care-proceedings-graduated-fee-scheme/FeeSchemeFasAdvocacy';
import ProfitCosts from '../pages/care-proceedings-graduated-fee-scheme/ProfitCosts';
import PersonRepresented from '../pages/care-proceedings-graduated-fee-scheme/PersonRepresented';


const AppRoutes = () => {
  return (
    <>
    <Header />
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
      <Route path="/process-complete" element={<ProcessCompletePage />} />
      <Route path="/fee-scheme-fgf-counsel-advocacy" element={<FeeSchemeFgfCounselAdvocacy />} />
      <Route path="/fee-scheme-fas-advocacy" element={<FeeSchemeFasAdvocacy />} />
      <Route path="/profit-costs" element={<ProfitCosts />} />
      <Route path="/person-represented" element={<PersonRepresented />} />
    </Routes>
    <Footer />
    </>
  );
};

export default AppRoutes;
