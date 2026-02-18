import { Routes, Route } from 'react-router-dom';
import { SchemeUIProvider } from '../context/SchemeUIContext';
import SummaryPane from '../components/SummaryPane';
import AdvocateClaimOverview from '../pages/AdvocateClaimOverview';
import FeeSchemes from '../pages/FeeSchemes';
import FamilyAdvocacySchemePage from '../pages/FamilyAdvocacySchemePage';
import PrivateFamilyLawRepresentationSchemePage from '../pages/PrivateFamilyLawRepresentationSchemePage';
import PrivateFamilyLawRepresentationFeeTypePage from '../pages/PrivateFamilyLawRepresentationFeeTypePage';
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
import CareProceedingsGraduatedFeeSchemePage from '../pages/care-proceedings-graduated-fee-scheme/CareProceedingsGraduatedFeeSchemePage';
import FeeSchemeFgfCounselAdvocacy from '../pages/care-proceedings-graduated-fee-scheme/FeeSchemeFgfCounselAdvocacy';
import FeeSchemeFasAdvocacy from '../pages/care-proceedings-graduated-fee-scheme/FeeSchemeFasAdvocacy';
import ProfitCosts from '../pages/care-proceedings-graduated-fee-scheme/ProfitCosts.jsx';
import PersonRepresented from '../pages/care-proceedings-graduated-fee-scheme/PersonRepresented';
import NumberOfClients from '../pages/care-proceedings-graduated-fee-scheme/NumberOfClients';
import ConsiderRegionOfProvider from '../pages/care-proceedings-graduated-fee-scheme/ConsiderRegionOfProvider.jsx';
import ConsiderTransferOfProvider from '../pages/care-proceedings-graduated-fee-scheme/ConsiderTransferOfProvider.jsx';
import ConsiderWorkDone from '../pages/care-proceedings-graduated-fee-scheme/ConsiderWorkDone.jsx';
import WorkDoneQuantity from '../pages/care-proceedings-graduated-fee-scheme/WorkDoneQuantity.jsx';
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
            <Route path="/fee-scheme-fgf-counsel-advocacy" element={<FeeSchemeFgfCounselAdvocacy />} />
            <Route path="/fee-scheme-fas-advocacy" element={<FeeSchemeFasAdvocacy />} />
            <Route path="/profit-costs" element={<ProfitCosts />} />
            <Route path="/person-represented" element={<PersonRepresented />} />
            <Route path="/number-of-clients" element={<NumberOfClients />} />
            <Route path="/consider-provider-region" element={<ConsiderRegionOfProvider />} />
            <Route path="/consider-transfer-provider" element={<ConsiderTransferOfProvider />} />
            <Route path="/consider-work-done" element={<ConsiderWorkDone />} />
            <Route path="/work-done-quantity" element={<WorkDoneQuantity />} />
          </Routes>
        </div>
        <SummaryPane />
      </div>
      <Footer />
    </SchemeUIProvider>
  );
};

export default AppRoutes;
