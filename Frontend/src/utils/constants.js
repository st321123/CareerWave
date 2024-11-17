const API_URL = import.meta.env.VITE_API_URL;
console.log("base url...", API_URL);
export const userUrl = `${API_URL}/api/v1/user`;
export const jobUrl = `${API_URL}/api/v1/job`;
export const applicationUrl = `${API_URL}/api/v1/application`;
export const companyUrl = `${API_URL}/api/v1/company`;
