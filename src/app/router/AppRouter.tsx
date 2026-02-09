import { Routes, Route } from 'react-router-dom'

import { SearchRoutes } from '../modules/search/routes/SearchRoutes';
import { ContabilityRoutes } from '../modules/contability/routes/ContabilityRoutes';
import { CalendarRoutes } from '../modules/calendar/routes/CalendarRoutes';
import { ClientRoutes } from '../modules/client/routes/ClientRoutes';
import { ClinicalDiaryRoutes } from '../modules/clinical-diary/routes/ClinicalDiaryRoutes';
import { TariffRoutes } from '../modules/tariff/routes/TariffRoutes';
import { UserRoutes } from '../modules/users/routes/UserRoutes';
import { Home } from '../modules/home/pages/Home';
import { DocumentRoutes } from '../modules/documents/routes/DocumentRoutes';
import { StatisticsRoutes } from '../modules/statistics/router/StatisticsRoutes';

export const AppRouter = () => {
  return (
    <Routes>
         {/* <Route path="/*" element={ <Home /> } /> */}
        <Route path="/" element={ <CalendarRoutes /> } />
        <Route path="/accounting-folder/*" element={ <ContabilityRoutes /> } />
        <Route path="/calendar/*" element={ <CalendarRoutes /> } />
        <Route path="/client/*" element={ <ClinicalDiaryRoutes /> } />
        <Route path="/new-client/*" element={ <ClientRoutes /> } />
        <Route path="/search-client/*" element={ <SearchRoutes /> } />
        <Route path="/tariff/*" element={ <TariffRoutes /> } />
        <Route path="/users/*" element={ <UserRoutes /> } />
        <Route path="/documents/*" element={ <DocumentRoutes /> } />
        <Route path="/statistics/*" element={ <StatisticsRoutes /> } />
    </Routes>
  )
}
