export interface District {
    name: string;
    code: string;
    division_type: string;
    codename: string;
    province_code: string;
  }
  
export  interface HanoiResponse {
    name: string;
    code: string;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: District[];
  }
