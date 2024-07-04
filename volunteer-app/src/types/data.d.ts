import { components, paths } from "@/types/api";

type SignInData = paths["/login"]["post"]["requestBody"]["content"]["application/json"];

type RequestCodeData =
  paths["/auth/request-code"]["post"]["requestBody"]["content"]["application/json"];

type VerifyCodeData =
  paths["/auth/verify-code"]["post"]["requestBody"]["content"]["application/json"];

type ProfileData = paths["/auth/user"]["patch"]["requestBody"]["content"]["application/json"];

type User = components["schemas"]["User"];

type Activity = components["schemas"]["Activity"];
type Experience = components["schemas"]["Experience"];
type Organization = components["schemas"]["Organization"];

type ActivityFilters = NonNullable<paths["/activities"]["get"]["parameters"]["query"]>;

type RecentSearches = {
  experiences: string[];
  organizations: string[];
};
