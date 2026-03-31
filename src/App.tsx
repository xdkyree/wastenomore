import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "@/pages/LandingPage"

// Citizen
import { CitizenLayout } from "@/components/layout/CitizenLayout"
import CitizenHome from "@/pages/citizen/CitizenHome"
import PickupSchedule from "@/pages/citizen/PickupSchedule"
import SortingGuidance from "@/pages/citizen/SortingGuidance"
import IncidentReporting from "@/pages/citizen/IncidentReporting"
import Education from "@/pages/citizen/Education"
import Rewards from "@/pages/citizen/Rewards"
import Payments from "@/pages/citizen/Payments"

// Municipality
import { AppLayout } from "@/components/layout/AppLayout"
import MunicipalityOverview from "@/pages/municipality/MunicipalityOverview"
import MunicipalityIncidents from "@/pages/municipality/MunicipalityIncidents"
import MunicipalityMap from "@/pages/municipality/MunicipalityMap"
import MunicipalityEducation from "@/pages/municipality/MunicipalityEducation"
import MunicipalityBins from "@/pages/municipality/MunicipalityBins"
import MunicipalityTargets from "@/pages/municipality/MunicipalityTargets"
import MunicipalityInterventions from "@/pages/municipality/MunicipalityInterventions"

// Regional
import RegionalOverview from "@/pages/regional/RegionalOverview"
import RegionalComparison from "@/pages/regional/RegionalComparison"
import RegionalMap from "@/pages/regional/RegionalMap"
import RegionalEffectiveness from "@/pages/regional/RegionalEffectiveness"
import RegionalReporting from "@/pages/regional/RegionalReporting"

// Operator
import OperatorOverview from "@/pages/operator/OperatorOverview"
import OperatorRoutes from "@/pages/operator/OperatorRoutes"
import OperatorBinAlerts from "@/pages/operator/OperatorBinAlerts"
import OperatorComplaints from "@/pages/operator/OperatorComplaints"
import OperatorWasteFlow from "@/pages/operator/OperatorWasteFlow"
import OperatorContamination from "@/pages/operator/OperatorContamination"

// Admin
import AdminUsers from "@/pages/admin/AdminUsers"
import AdminMasterData from "@/pages/admin/AdminMasterData"
import AdminUploads from "@/pages/admin/AdminUploads"

function CitizenApp() {
  return (
    <CitizenLayout>
      <Routes>
        <Route index element={<CitizenHome />} />
        <Route path="schedule" element={<PickupSchedule />} />
        <Route path="sort" element={<SortingGuidance />} />
        <Route path="report" element={<IncidentReporting />} />
        <Route path="education" element={<Education />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="pay" element={<Payments />} />
      </Routes>
    </CitizenLayout>
  )
}

function MunicipalityApp() {
  return (
    <AppLayout role="municipality" userName="Alex Verdana" municipalityName="Verdana">
      <Routes>
        <Route index element={<MunicipalityOverview />} />
        <Route path="incidents" element={<MunicipalityIncidents />} />
        <Route path="map" element={<MunicipalityMap />} />
        <Route path="education" element={<MunicipalityEducation />} />
        <Route path="bins" element={<MunicipalityBins />} />
        <Route path="targets" element={<MunicipalityTargets />} />
        <Route path="interventions" element={<MunicipalityInterventions />} />
      </Routes>
    </AppLayout>
  )
}

function RegionalApp() {
  return (
    <AppLayout role="regional" userName="Sarah Novaterra">
      <Routes>
        <Route index element={<RegionalOverview />} />
        <Route path="comparison" element={<RegionalComparison />} />
        <Route path="map" element={<RegionalMap />} />
        <Route path="effectiveness" element={<RegionalEffectiveness />} />
        <Route path="reporting" element={<RegionalReporting />} />
      </Routes>
    </AppLayout>
  )
}

function OperatorApp() {
  return (
    <AppLayout role="operator" userName="Johan Waste">
      <Routes>
        <Route index element={<OperatorOverview />} />
        <Route path="routes" element={<OperatorRoutes />} />
        <Route path="bins" element={<OperatorBinAlerts />} />
        <Route path="complaints" element={<OperatorComplaints />} />
        <Route path="flow" element={<OperatorWasteFlow />} />
        <Route path="contamination" element={<OperatorContamination />} />
      </Routes>
    </AppLayout>
  )
}

function AdminApp() {
  return (
    <AppLayout role="admin" userName="Tom Admin">
      <Routes>
        <Route index element={<AdminUsers />} />
        <Route path="master" element={<AdminMasterData />} />
        <Route path="uploads" element={<AdminUploads />} />
      </Routes>
    </AppLayout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/citizen" replace />} />
        <Route path="/roles" element={<LandingPage />} />
        <Route path="/citizen/*" element={<CitizenApp />} />
        <Route path="/municipality/*" element={<MunicipalityApp />} />
        <Route path="/regional/*" element={<RegionalApp />} />
        <Route path="/operator/*" element={<OperatorApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/citizen" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
