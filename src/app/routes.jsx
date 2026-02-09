import { Routes, Route } from 'react-router-dom';
import FeeSchemes from '../pages/FeeSchemes';
import FamilyAdvocacySchemePage from '../pages/FamilyAdvocacySchemePage';
import PrivateFamilyLawRepresentationSchemePage from '../pages/PrivateFamilyLawRepresentationSchemePage';
import CareProceedingsGraduatedFeeSchemePage from '../pages/CareProceedingsGraduatedFeeSchemePage';
import CertificationDatePage from '../pages/CertificationDatePage'
import AspectOfWork from '../pages/AspectOfWork';
import ProcessCompletePage from '../pages/ProcessCompletePage';
import ProviderLocationDatePage from '../pages/ProviderLocationPage';

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
      <Route path="/process-complete" element={<ProcessCompletePage />} />
    </Routes>
  );
};

export default AppRoutes;
