import type { AdmissionsData } from "../types";

export const fetchAdmissions = async (): Promise<AdmissionsData> => {
  const res = await fetch(
    "https://mocki.io/v1/cc94fb19-66de-4881-9cb3-6e57a5a475c5"
  );
  if (!res.ok) throw new Error("Failed to fetch admissions data");
  const data = await res.json();
  return data.admissions;
};
