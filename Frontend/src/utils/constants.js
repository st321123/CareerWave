const BASE_URL = import.meta.env.VITE_API_URL;
console.log("base url...", BASE_URL);
export const userUrl = `${BASE_URL}/api/v1/user`;
export const jobUrl = `${BASE_URL}/api/v1/job`;
export const applicationUrl = `${BASE_URL}/api/v1/application`;
export const companyUrl = `${BASE_URL}/api/v1/company`;
