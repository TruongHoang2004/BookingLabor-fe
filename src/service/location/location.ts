import { District, Ward, City } from "@/interface/location1";
import locationData from "./location.json";

export class locationService {
  private cityData: City;

  constructor() {
    this.cityData = locationData as City;
  }

  public getAllDistricts(): District[] {
    return this.cityData.districts;
  }

  public getDistrictByCode(code: number): District | null {
    const district = this.cityData.districts.find((d) => d.code === code);
    return district || null;
  }

  public getWardByCode(code: number): Ward | null {
    for (const district of this.cityData.districts) {
      const ward = district.wards.find((w) => w.code === code);
      if (ward) return ward;
    }
    return null;
  }

  public getWardsInDistrict(districtCode: number): Ward[] {
    const district = this.getDistrictByCode(districtCode);
    return district ? district.wards : [];
  }
}
