export interface District {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    wards: Ward[];
  }
  
export  interface City {
    name: string;
    code: string;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: District[];
  }

  export interface Ward {
    name: string,
    code: number,
    division_type: string,
    codename: string,
    district_code: number;
  }

