import { District,Ward,City } from "@/interface/location1";
import toast from "react-hot-toast";

export class locationService {
    private hostURL: string | undefined = process.env.NEXT_PUBLIC_FRONTEND_BSAE_URL;
    private cityData: City | null = null;

    constructor() {
      this.loadCityData();
    }
    
    private async loadCityData() {
        try {
          const response = await fetch(`${this.hostURL}location.json`);
          this.cityData = await response.json();
        } catch (error) {
          toast.error("Lỗi khi tải dữ liệu thành phố:");
          throw error;
        }
    }

    public getAllDistricts(): District[] {
      if (!this.cityData) {
        console.error("Dữ liệu thành phố chưa được tải.");
        return [];
      }
      return this.cityData.districts;
    }
    public getDistrictByCode(code: number): District | null {
        if (!this.cityData) {
          console.error("Dữ liệu thành phố chưa được tải.");
          return null;
        }
    
        const district = this.cityData.districts.find(d => d.code === code);
        return district || null;
    }

     // Tìm ward theo code
    public getWardByCode(code: number): Ward | null {
        if (!this.cityData) {
        console.error("Dữ liệu thành phố chưa được tải.");
        return null;
        }

        for (const district of this.cityData.districts) {
        const ward = district.wards.find(w => w.code === code);
        if (ward) return ward;
        }
        return null;
    }

    public getWardsInDistrict(districtCode: number): Ward[] {
        if (!this.cityData) {
        console.error("Dữ liệu thành phố chưa được tải.");
        return [];
        }

        const district = this.getDistrictByCode(districtCode);
        return district ? district.wards : [];
    }

}