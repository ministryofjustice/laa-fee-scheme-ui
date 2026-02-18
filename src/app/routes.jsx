import { Routes, Route } from 'react-router-dom';
import { SchemeUIProvider } from '../context/SchemeUIContext';
import SummaryPane from '../components/SummaryPane';
import AdvocateClaimOverview from '../pages/AdvocateClaimOverview';
import FeeSchemes from '../pages/FeeSchemes';
import FamilyAdvocacySchemePage from '../pages/FamilyAdvocacySchemePage';
import PrivateFamilyLawRepresentationSchemePage from '../pages/PrivateFamilyLawRepresentationSchemePage';
import PrivateFamilyLawRepresentationFeeTypePage from '../pages/PrivateFamilyLawRepresentationFeeTypePage';
import CareProceedingsGraduatedFeeSchemePage from '../pages/CareProceedingsGraduatedFeeSchemePage';
import ProceedingTypes from '../pages/AdvocacyEventType';
import AdvocatesMeetingsPage from '../pages/advocates-meetings/AdvocatesMeetingsPage';
import Hearing from '../pages/hearing/HearingPage';
import Bolton from '../pages/bolton/BoltonPage';
import CertificationDatePage from "../pages/CertificationDatePage";
import ProcessCompletePage from "../pages/ProcessCompletePage";
import ProviderLocationDatePage from "../pages/ProviderLocationPage";
import CalculateFeesPage from "../pages/CalculateFeesPage";
import BillTypePage from "../pages/BillTypePage";
import CourtTypePage from "../pages/CourtTypePage";
import LevelOfWorkDonePage from "../pages/LevelOfWorkDonePage";
import FinalSummaryPage from '../pages/FinalSummaryPage';
import SubmissionConfirmationPage from '../pages/SubmissionConfirmationPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppRoutes = () => {
  return (
    <SchemeUIProvider>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 170px)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Routes>
            <Route path="/" element={<AdvocateClaimOverview />} />
            <Route path="/fee-schemes" element={<FeeSchemes />} />
            <Route path="/family-advocacy-scheme" element={<FamilyAdvocacySchemePage />} />
            <Route path="/private-family-law-representation-scheme" element={<PrivateFamilyLawRepresentationSchemePage />} />
            <Route path="/care-proceedings-graduated-fee-scheme" element={<CareProceedingsGraduatedFeeSchemePage />} />
            <Route path="/proceeding-types" element={<ProceedingTypes />} />
            <Route path="/hearing" element={<Hearing />} />
            <Route path="/advocates-meetings" element={<AdvocatesMeetingsPage />} />
            <Route path="/bolton" element={<Bolton />} />
            <Route path="/certification-date" element={<CertificationDatePage />} />
            <Route path="/provider-location" element={<ProviderLocationDatePage />} />
            <Route path="/private-family-law-representation-fee-type" element={<PrivateFamilyLawRepresentationFeeTypePage />} />
            <Route path="/calculate-fees" element={<CalculateFeesPage />} />
            <Route path="/bill-type" element={<BillTypePage />} />
            <Route path="/court-type" element={<CourtTypePage />} />
            <Route path="/level-of-work-done" element={<LevelOfWorkDonePage />} />
            <Route path="/final-summary" element={<FinalSummaryPage />} />
            <Route path="/submission-confirmation" element={<SubmissionConfirmationPage />} />
            <Route path="/process-complete" element={<ProcessCompletePage />} />
          </Routes>
        </div>
        <SummaryPane />
      </div>
      <Footer />
    </SchemeUIProvider>
  );
};

export default AppRoutes;
