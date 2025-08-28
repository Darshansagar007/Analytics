export interface ApplicationsPerProgram {
  program: string;
  count: number;
}

export interface ApplicationTrends {
  date: string;
  count: number;
}

export interface AdmissionsData {
  totalApplicants: number;
  verifiedApplicants: number;
  rejectedApplicants: number;
  applicationsPerProgram: ApplicationsPerProgram[];
  applicationTrends: ApplicationTrends[];
}
