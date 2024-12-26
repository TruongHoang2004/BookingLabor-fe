import { District, Ward, City } from "@/interface/location1";
import locationData from "./location.json";

const cityData: City = locationData as City;

export const getAllDistricts = (): District[] => {
  return cityData.districts;
};

export const getDistrictByCode = (code: number): District | null => {
  const district = cityData.districts.find((d) => d.code === code);
  return district || null;
};

export const getWardByCode = (code: number): Ward | null => {
  for (const district of cityData.districts) {
    const ward = district.wards.find((w) => w.code === code);
    if (ward) return ward;
  }
  return null;
};

export const getWardsInDistrict = (districtCode: number): Ward[] => {
  const district = getDistrictByCode(districtCode);
  return district ? district.wards : [];
};
