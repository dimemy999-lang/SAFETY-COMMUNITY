export type IncidentCategory =
  | 'physical_safety'
  | 'facility_hazard'
  | 'process_safety'
  | 'environmental'
  | 'cybersecurity'
  | 'workplace_suggestion';

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface UrlAttachment {
  id: string;
  url: string;
  label: string;
  iconType: 'jira' | 'video' | 'doc' | 'link';
}

export interface ReportFormData {
  anonymous: boolean;
  firstName: string;
  lastName: string;
  workEmail: string;
  department: string;
  employeeId: string;
  facilitySite: string;
  avatarUrl: string;
  avatarTitle: string;
  category: IncidentCategory;
  severity: SeverityLevel;
  observationDate: string;
  observationTime: string;
  zoneLocation: string;
  headline: string;
  narrative: string;
  attachments: UrlAttachment[];
}

export interface RecentReport {
  id: string;
  ticketId: string;
  title: string;
  status: 'Resolved' | 'Under Review' | 'In Triage' | 'Action Scheduled';
  pointsBadge?: string;
  meta: string;
  category: string;
  date: string;
  severity: SeverityLevel;
}

export interface LeaderboardMember {
  rank: number;
  name: string;
  role: string;
  department: string;
  points: number;
  reportsSubmitted: number;
  badges: string[];
  avatarUrl: string;
}
