import { Routes, Route } from 'react-router-dom';
import AdvocateClaimOverview from '../pages/AdvocateClaimOverview';
import FeeSchemes from '../pages/FeeSchemes';
import FamilyAdvocacySchemePage from '../pages/FamilyAdvocacySchemePage';
import PrivateFamilyLawRepresentationSchemePage from '../pages/PrivateFamilyLawRepresentationSchemePage';
import CareProceedingsGraduatedFeeSchemePage from '../pages/CareProceedingsGraduatedFeeSchemePage';
import ProceedingTypes from '../pages/ProceedingTypes';
import AdvocatesMeetingsPage from '../pages/advocates-meetings/AdvocatesMeetingsPage';
import Hearing from '../pages/Hearing';

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
    </Routes>
  );
};

export default AppRoutes;
