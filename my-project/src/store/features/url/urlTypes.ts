export interface UrlSearchDataTypes {
  query: string;
  format: string;
  level?: "basic" | "medium";
}

export interface UrlDataType {
  companyName: string;
  websiteURL: string;
  snippet: string;
  tagline?: string;
  address?: string;
  socialLinks?: string[];
}

export interface UrlState {
  urlData: UrlDataType[];
  loading: boolean;
  fetchLoading: boolean;
  error: string | null;
}
