# requirements.md

# Novaterra Waste & Recycling Intelligence Platform — POC Requirements

## 1. Purpose

This document defines the functional and non-functional requirements for a **Proof of Concept (POC)** of the Novaterra waste and recycling platform.

The POC should demonstrate how a shared regional platform can connect:
- citizens
- municipalities
- regional authorities
- waste management operators
- smart bins
- smart trucks
- sorting / recycling centers

The goal is to prove that integrated data, simple workflows, and targeted dashboards can improve:
- recycling rates
- contamination levels
- collection efficiency
- citizen engagement
- reporting quality
- intervention design and measurement

---

## 2. Project context

### 2.1 Regional context
The solution is designed for a fictional region, **Novaterra**, with:
- 37 municipalities
- large municipal waste volumes
- rising waste generation
- fragmented data and reporting
- low visibility into what actions actually improve recycling
- uneven local performance
- a need for citizen education, operational optimization, and regulatory reporting

### 2.2 Core problem to solve
The current waste management model is fragmented across stakeholders. Data is not connected, making it difficult to:
- identify problem areas
- improve citizen sorting behavior
- optimize collection
- monitor contamination by waste stream
- compare municipalities
- forecast risks and penalties
- understand which interventions actually work

### 2.3 POC objective
The POC must validate that a central platform can:
1. collect and consolidate data from core actors
2. provide useful dashboards for each stakeholder
3. support key citizen and operator workflows
4. generate actionable insights
5. enable privacy-conscious reporting across the region

---

## 3. POC scope

## In scope
- central platform and shared data model
- citizen app prototype
- municipality dashboard
- regional authority dashboard
- operator dashboard
- simplified smart bin data integration
- simplified smart truck data integration
- incident reporting workflow
- waste pickup schedule display
- sorting guidance workflow
- hotspot mapping
- KPI tracking
- route optimization prototype logic
- reporting and data aggregation
- basic rules/logic for education recommendations
- basic rules/logic for penalty forecasting
- privacy-by-design aggregation concept

## Out of scope for the POC
- production-grade IoT deployment
- real hardware integration at scale
- advanced ML model training
- complex citizen identity management
- full billing/pay-as-you-throw implementation
- full regulatory submission automation
- enterprise-grade security certification
- complete integration with all municipal systems

---

## 4. Users and stakeholders

### 4.1 Citizen
Needs:
- know pickup times
- know how to sort items
- report issues
- understand local recycling performance
- receive incentives and education

### 4.2 Municipality user
Needs:
- local KPIs
- hotspot visibility
- complaint and incident management support
- education targeting
- insight on where more bins are needed
- recycling target monitoring
- penalty risk visibility

### 4.3 Regional authority user
Needs:
- municipality-level aggregated reporting
- regional comparison
- action effectiveness measurement
- support for policy/regulatory oversight

### 4.4 Waste operator user
Needs:
- collection optimization
- overflow prevention
- route planning
- complaint visibility
- waste flow volume tracking
- contamination/recycling monitoring

### 4.5 Admin / platform operator
Needs:
- configure municipalities, waste streams, zones, users
- manage data sources
- manage permissions
- monitor platform health

---

## 5. Product vision

A single regional platform that creates a closed feedback loop:

1. citizens receive guidance and report issues  
2. smart bins and trucks provide operational data  
3. operators collect and process waste  
4. municipalities and regional authorities see KPIs and hotspots  
5. actions are launched (education, bin placement, routing changes, campaigns)  
6. the platform measures whether outcomes improve  

---

## 6. Functional requirements

## 6.1 Central platform

### FR-001 Data ingestion layer
The platform must ingest data from:
- citizen app
- municipality datasets
- operator datasets
- smart bin sensors
- smart truck telemetry
- sorting center / waste flow records

### FR-002 Data unification
The platform must unify data into a common model across:
- municipality
- zone / neighborhood
- waste stream
- incident type
- bin
- truck
- date / time
- intervention / campaign

### FR-003 Privacy-by-design aggregation
The platform must support aggregation rules so that:
- citizen-level data is not exposed to unauthorized users
- municipality dashboards show local operational detail
- regional dashboards show aggregated cross-municipality data
- personally identifiable information is minimized in the POC

### FR-004 Role-based access
The platform must support separate access for:
- citizen
- municipality user
- regional authority user
- waste operator user
- platform admin

### FR-005 Audit trail
The platform should log:
- key user actions
- data imports
- dashboard refreshes
- changes to configuration

---

## 6.2 Citizen mobile app

### FR-101 Waste pickup schedule
The app must show the local waste pickup schedule by:
- municipality
- address / service area
- waste stream
- date

Minimum POC behaviors:
- display upcoming pickups
- display stream type (mixed, organic, paper, plastic, glass, etc.)
- show simple reminders/status

### FR-102 Incident reporting
The app must allow users to report issues such as:
- overflowing bin
- missed pickup
- illegal dumping
- damaged bin
- contamination concern
- other service complaint

Minimum POC behaviors:
- select incident type
- select or capture location
- add short description
- optionally attach photo placeholder
- submit incident into triage queue

### FR-103 Sorting guidance
The app must help citizens understand where an item goes.

POC may use:
- searchable item directory
- rules-based wizard
- mock scanner / CV workflow

Minimum POC behaviors:
- search for item
- return recommended waste stream
- provide short sorting guidance
- flag ambiguous or prohibited items

### FR-104 Education section
The app must provide educational content on:
- local sorting rules
- common contamination mistakes
- municipality-specific recommendations
- campaign content

### FR-105 Incentives and engagement
The app should support simple engagement mechanics:
- gamification points or badges
- community/team challenge concept
- educational nudges
- visibility of “economic cost of not sorting”

### FR-106 Notifications
The app should support notifications for:
- upcoming pickup
- educational campaign
- incident status update
- local recycling reminders

---

## 6.3 Smart bins

### FR-201 Fill level monitoring
The platform must receive and display fill level status for smart bins.

Minimum POC data:
- bin ID
- municipality
- location
- waste stream
- fill %
- timestamp

### FR-202 RFID / identification placeholder
The POC should include a conceptual field or mock event for RFID / bin identification to demonstrate future extensibility.

### FR-203 Bin status monitoring
The system should support:
- normal
- almost full
- full / overflow risk
- offline / no signal

### FR-204 Bin hotspot analysis
The municipality and operator dashboards must show bins or areas with repeated fill-level problems.

---

## 6.4 Smart trucks

### FR-301 GPS telemetry
The platform must ingest or simulate truck GPS position data.

### FR-302 Weight data
The platform must ingest or simulate truck load / weight data.

### FR-303 Route tracking
The operator dashboard must display:
- current/last route
- completed stops
- missed or delayed stops
- route efficiency indicators

### FR-304 Route optimization prototype
The POC should provide a simple logic or recommendation engine to:
- prioritize full bins
- reduce unnecessary pickups
- suggest optimized collection order/frequency

---

## 6.5 Waste operator / sorting center functions

### FR-401 Waste flow tracking
The platform must track waste volumes by:
- municipality
- waste stream
- collection period
- processing destination

### FR-402 Recycling rate tracking
The platform must calculate or display recycling rates per municipality / region.

### FR-403 Contamination monitoring
The platform must display contamination levels per waste stream and/or area.

### FR-404 Complaint visibility
The operator must be able to view complaints/incidents relevant to collection operations.

### FR-405 Operational recommendations
The platform should generate operator recommendations such as:
- change collection frequency
- route full bins first
- investigate specific hotspot areas
- adjust servicing pattern

---

## 6.6 Municipality dashboard functions

### FR-501 Local KPI dashboard
The municipality dashboard must show key KPIs including:
- recycling rate
- contamination rate
- incident volume
- overflow incidents
- collection performance
- target status
- education engagement metrics
- complaint trends

### FR-502 Map of problematic areas
The municipality dashboard must visualize problem areas by:
- incident density
- contamination hotspot
- overflow hotspot
- low recycling performance area

### FR-503 Report triage
The municipality must be able to view and triage incoming reports by:
- type
- severity
- location
- status
- ownership

### FR-504 Education recommendations
The dashboard must recommend “what to educate about” based on:
- common incorrect sorting issues
- contamination patterns
- repeated citizen confusion categories
- municipality-specific trends

### FR-505 Bin placement recommendations
The dashboard must identify where more bins may be needed based on:
- recurring overflow
- incident density
- collection stress
- convenience gaps

### FR-506 Recycling target status
The dashboard must show progress versus local targets.

### FR-507 Penalty forecasting
The dashboard should show a simple forecast or risk indicator for potential penalties or non-compliance risk based on:
- target gap
- contamination trend
- service performance

### FR-508 Frequent incident types by area
The dashboard must show the most frequent incident types by neighborhood/zone.

### FR-509 Intervention tracking
The municipality should be able to log or tag interventions such as:
- education campaign
- bin deployment
- route adjustment
- local pilot

### FR-510 Action effectiveness measurement
The municipality dashboard should compare before/after performance for selected interventions.

---

## 6.7 Regional authority dashboard functions

### FR-601 Municipality aggregated reports
The regional dashboard must display municipality-level aggregated reporting suitable for oversight and regulatory use.

### FR-602 Cross-municipality comparison
The regional authority must be able to compare municipalities on:
- recycling rate
- contamination
- target progress
- incident volume
- intervention outcomes

### FR-603 Regional hotspot map
The dashboard must show a regional map of problematic areas and municipality performance.

### FR-604 Action effectiveness view
The dashboard must support the question:
- which actions actually improve recycling?

This may include comparison of intervention types against performance trends.

### FR-605 Education priority insights
The dashboard must summarize top regional education priorities.

### FR-606 Regulatory reporting support
The POC must provide exportable or viewable aggregated report outputs that demonstrate how required reporting could be produced.

---

## 6.8 Waste operator dashboard functions

### FR-701 Real-time operations dashboard
The operator dashboard must display:
- current bin fill states
- active routes
- route issues
- service backlog
- incident alerts

### FR-702 Route optimization view
The dashboard must show route optimization recommendations and/or simulated optimized routes.

### FR-703 Overflow prevention view
The dashboard must highlight bins/areas at risk of overfill.

### FR-704 Complaints view
The dashboard must display complaints linked to operations.

### FR-705 Volumes per waste flow
The dashboard must show total and trend volumes by waste stream.

### FR-706 Recycling target status
The dashboard should show how operator performance contributes to target achievement.

### FR-707 Regional recycling and contamination view
The dashboard should show:
- recycling rates per region/municipality
- contamination level per waste stream

### FR-708 Cost-saving indicators
The dashboard should estimate:
- reduced unnecessary trips
- labor savings
- overflow avoidance impact

---

## 6.9 Admin functions

### FR-801 User and role management
Admin must be able to create and manage:
- municipalities
- zones
- user roles
- dashboard access

### FR-802 Master data configuration
Admin must be able to configure:
- waste streams
- incident categories
- intervention types
- KPI definitions

### FR-803 Data source configuration
Admin should be able to configure/import:
- mock IoT feeds
- CSV uploads
- operator records
- municipality reference data

---

## 7. Dashboard requirements

## 7.1 Dashboard 1 — Regional Authority Dashboard
Purpose: oversight, regional comparison, regulation support

Required sections:
- regional summary KPIs
- municipality comparison table
- municipality aggregated reports
- map of problematic areas
- action effectiveness analysis
- top education priorities
- recycling target status by municipality
- export/report view for regulatory use

Required visualizations:
- KPI cards
- trend lines
- municipality comparison chart
- regional map / choropleth / hotspot layer
- intervention outcome comparison
- reporting table/export

---

## 7.2 Dashboard 2 — Municipality Dashboard
Purpose: local planning, issue management, intervention design

Required sections:
- local KPI overview
- recycling target status
- frequent incident types by area
- problem hotspot map
- report triage queue
- education recommendation panel
- recommended new bin locations
- penalty forecast / risk indicator
- intervention tracking and before/after view

Required visualizations:
- KPI cards
- trend charts
- area heatmap
- incident table
- map with filters
- recommendation widgets
- target progress chart

---

## 7.3 Dashboard 3 — Waste Operator Dashboard
Purpose: service operations, route and collection optimization

Required sections:
- route optimization
- current bin fill risk
- complaints and service issues
- volumes per waste flow
- recycling rates by region
- contamination by stream
- collection performance summary
- estimated labor/cost savings

Required visualizations:
- route map
- fill-level alert list
- volume charts
- contamination trend charts
- service issue queue
- cost-saving indicators

---

## 8. Core workflows

## 8.1 Citizen sorting workflow
1. Citizen opens app
2. Searches/scans an item
3. App returns correct disposal stream
4. Citizen follows guidance
5. Aggregated usage data contributes to education analytics

### POC acceptance
- user can search at least a predefined item list
- app returns one recommended stream and guidance text

---

## 8.2 Citizen incident reporting workflow
1. Citizen opens incident reporting
2. Selects issue type
3. Provides location and details
4. Submits report
5. Report enters municipality/operator triage
6. Dashboard reflects issue and hotspot update

### POC acceptance
- report is visible in municipality triage queue
- issue appears in simple map/list analytics

---

## 8.3 Smart bin monitoring workflow
1. Bin sends fill-level status
2. Platform updates bin status
3. Operator dashboard flags critical bins
4. Route recommendation updates
5. Municipality can see overflow hotspots

### POC acceptance
- simulated bins update statuses
- critical bins appear in alert view

---

## 8.4 Smart truck workflow
1. Truck route and weight data are ingested/simulated
2. Operator dashboard shows route progress
3. Platform estimates service efficiency
4. Waste flow volumes update relevant KPIs

### POC acceptance
- at least one mock route is shown
- route can be compared with a simple optimized alternative

---

## 8.5 Municipality intervention workflow
1. Municipality reviews KPIs and hotspot map
2. Municipality identifies issue
3. Municipality logs an intervention
4. Platform tracks relevant before/after KPIs
5. Dashboard indicates whether outcome improved

### POC acceptance
- intervention record can be created
- dashboard shows at least one before/after comparison

---

## 8.6 Regional oversight workflow
1. Municipality data is aggregated
2. Regional dashboard updates regional KPIs
3. Authority compares municipalities
4. Authority identifies priority areas and effective interventions

### POC acceptance
- dashboard shows multiple municipalities
- comparison and aggregation views function correctly

---

## 9. Data requirements

## 9.1 Minimum POC entities
The data model should include:
- Region
- Municipality
- Zone / neighborhood
- Citizen report
- Waste stream
- Bin
- Bin reading
- Truck
- Truck route event
- Waste flow record
- Sorting / contamination record
- KPI snapshot
- Intervention
- Education topic
- User / role

## 9.2 Minimum POC fields
Suggested minimum fields:

### Municipality
- municipality_id
- name
- target_recycling_rate
- population
- region_id

### Zone
- zone_id
- municipality_id
- name
- geometry / coordinates placeholder

### Incident report
- report_id
- timestamp
- municipality_id
- zone_id
- type
- severity
- status
- source
- description
- lat
- lon

### Bin
- bin_id
- municipality_id
- zone_id
- waste_stream
- lat
- lon
- status

### Bin reading
- reading_id
- bin_id
- timestamp
- fill_percent
- signal_status

### Truck
- truck_id
- operator_id
- status

### Truck event
- event_id
- truck_id
- timestamp
- lat
- lon
- load_weight
- route_id

### Waste flow record
- record_id
- municipality_id
- date
- waste_stream
- collected_volume
- processed_volume
- recycled_volume

### Contamination record
- record_id
- municipality_id
- date
- waste_stream
- contamination_rate

### Intervention
- intervention_id
- municipality_id
- type
- start_date
- end_date
- target_zone
- description

### KPI snapshot
- date
- municipality_id
- recycling_rate
- contamination_rate
- incident_count
- overflow_count
- target_status
- penalty_risk_score

---

## 10. Analytics and KPI requirements

### Required KPIs
- recycling rate
- contamination rate
- recycling target attainment
- waste volume by stream
- incident count
- incident type distribution
- overflow count
- average bin fill by area
- route efficiency proxy
- complaint count
- education topic frequency
- intervention impact proxy
- penalty risk score

### Required derived insights
- hotspot areas
- top contamination drivers
- most frequent citizen confusion topics
- areas needing more bins
- municipalities at risk of target miss
- interventions correlated with improvement

---

## 11. Recommendation logic for the POC

The POC does not need advanced AI. Simple rules-based logic is acceptable.

### 11.1 Education recommendations
The system should recommend education topics when:
- contamination in a stream exceeds threshold
- repeated item-search confusion is observed
- repeated reports indicate misunderstanding

### 11.2 Bin placement recommendations
Recommend new bins when:
- overflow incidents exceed threshold
- fill levels remain high over time
- service complaints cluster in an area

### 11.3 Penalty forecast
Use a simple logic combining:
- current target gap
- negative trend in recycling rate
- contamination above threshold
- operational performance issues

### 11.4 Route optimization
Use a simple prioritization model:
- highest fill % first
- cluster nearby high-priority bins
- deprioritize low-fill bins
- incorporate truck capacity placeholder

---

## 12. Non-functional requirements

### NFR-001 Usability
The POC must be simple enough for demo use by non-technical stakeholders.

### NFR-002 Performance
Dashboards should load within acceptable demo time using sample data.

### NFR-003 Modularity
Citizen app, dashboards, and data ingestion should be separable for future scaling.

### NFR-004 Security
The POC should demonstrate basic authentication and role-based access.

### NFR-005 Privacy
The POC must avoid exposing personal data unnecessarily and should demonstrate aggregated reporting principles.

### NFR-006 Explainability
All recommendations in the POC should be explainable with simple logic.

### NFR-007 Demo readiness
The POC should support a coherent end-to-end demo using preloaded sample data.

---

## 13. Suggested technical architecture for the POC

### Front end
- citizen app prototype
- 3 web dashboards
- admin/configuration interface

### Back end
- API layer
- rules/analytics service
- authentication/authorization
- reporting service

### Data layer
- relational database
- sample geospatial layer
- mock IoT event ingestion
- KPI aggregation tables

### Integration layer
- CSV/API mock imports
- sensor event simulator
- route simulator

---

## 14. POC screens / pages

### Citizen app
- home
- pickup schedule
- sorting guidance
- incident reporting
- education
- rewards / community engagement

### Municipality dashboard
- overview
- incidents
- hotspot map
- education insights
- bin planning
- target & penalty view
- intervention tracking

### Regional authority dashboard
- regional overview
- municipality comparison
- hotspot map
- effectiveness analysis
- reporting/export

### Operator dashboard
- operations overview
- route optimization
- bin alerts
- complaints
- waste flow analytics
- contamination & recycling view

### Admin
- users/roles
- master data
- data uploads/integrations

---

## 15. Acceptance criteria

The POC will be successful if it can demonstrate:

1. **Citizen utility**
   - users can check schedules
   - users can get sorting guidance
   - users can report incidents

2. **Municipality decision support**
   - municipality dashboard shows local KPIs, hotspots, triage, recommendations, target status, and penalty risk

3. **Regional oversight**
   - regional authority dashboard compares municipalities and shows action-effectiveness insights

4. **Operational optimization**
   - operator dashboard shows fill levels, route optimization, complaints, and waste-flow analytics

5. **Integrated workflows**
   - at least one end-to-end workflow works from data input to dashboard insight

6. **Privacy-aware aggregation**
   - local operational data and regional aggregated reporting are clearly separated

---

## 16. Nice-to-have features if time permits

- photo upload for incident reporting
- push notification engine
- citizen reward leaderboard
- more advanced route optimization
- predictive overflow alerts
- multilingual support
- scenario simulation for policy changes
- downloadable PDF or slide-style summary reports

---

## 17. Open assumptions

The following assumptions are made for the POC:
- real hardware is replaced by simulated smart bin and truck data
- regulatory reporting is demonstrated through mock exports
- citizen identity can be simplified or mocked
- municipality boundaries and hotspot maps can use fictional/sample geodata
- CV/scanning can be mocked using a searchable catalog and simplified classifier behavior

---

## 18. Recommended build order

### Phase 1 — foundation
- shared data model
- API/backend
- sample data
- authentication/roles

### Phase 2 — core user flows
- citizen schedule
- citizen sorting guidance
- incident reporting
- municipality triage

### Phase 3 — dashboards
- municipality dashboard
- regional dashboard
- operator dashboard

### Phase 4 — intelligence layer
- hotspot mapping
- recommendations
- target tracking
- penalty risk logic
- intervention effectiveness view

### Phase 5 — polish
- demo storyline
- admin configuration
- data refresh scripts
- presentation-ready UX

---

## 19. Demo storyline suggestion

A strong demo should show:
1. citizen checks pickup schedule
2. citizen uses sorting guidance
3. citizen reports overflow incident
4. smart bin data confirms fill issue
5. operator dashboard reprioritizes route
6. municipality dashboard shows hotspot and recommends more bins / education
7. regional dashboard shows municipality status and intervention effect

---

## 20. Final summary

The POC should prove that the Novaterra platform can act as a **shared intelligence and coordination layer** for waste management across the region.

It must include:
- a citizen app
- smart bin and truck data simulation
- a municipality dashboard
- a regional authority dashboard
- an operator dashboard
- core workflows for reporting, sorting guidance, monitoring, optimization, and intervention tracking

The emphasis should be on **clarity, integration, actionability, and demo readiness**, not full production complexity.
