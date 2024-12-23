import { District, Ward } from "@/interface/location1";
import toast from "react-hot-toast";

const BASE_URL = "https://provinces.open-api.vn/api";

const  emptyDistrict = {
  name: '',
  code: 0,
  division_type: '',
  codename:  '',
  province_code: 0,
  wards: [],
}

const emptyWard = {
  name: "",
  code: -1,
  division_type: "",
  codename: "",
  district_code: -1,
}

export const locationService = {
  // Lấy danh sách tất cả các districts (quận/huyện)
  async getAllDistricts(): Promise<District[]> {
    try {
      const response = await fetch(`${BASE_URL}/p/1?depth=2`);
      if (!response.ok) {
        throw new Error("Failed to fetch districts");
      }
      const data = await response.json();
      return data.districts || [];
    } catch (error) {
      toast.error("Không thể lấy dữ liệu các quận/huyện");
      throw error;
      return [];
    }
  },

  // Lấy thông tin District (quận/huyện) theo mã code
  async getDistrictByCode(code: number): Promise<District> {
    try {
      const response = await fetch(`${BASE_URL}/d/${code}`);
      if (!response.ok) {
        throw new Error("Failed to fetch district by code");
      }
      const district = await response.json();
      return district || null;
    } catch (error) {
      toast.error("Không thể lấy dữ liệu quận/huyện theo mã code");
      throw error;
      return emptyDistrict;
    }
  },

  // Lấy thông tin Ward (phường/xã) theo mã code
  async getWardByCode(code: number): Promise<Ward> {
    try {
      const response = await fetch(`${BASE_URL}/w/${code}`);
      if (!response.ok) {
        throw new Error("Failed to fetch ward by code");
      }
      const ward = await response.json();
      return ward || null;
    } catch (error) {
      toast.error("Không thể lấy dữ liệu phường/xã theo mã code");
      throw error;
      return emptyWard;
    }
  },

  // Lấy danh sách Wards (phường/xã) trong một District (quận/huyện) theo districtCode
  async getWardsInDistrict(districtCode: number): Promise<Ward[]> {
    try {
      const response = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
      if (!response.ok) {
        throw new Error("Failed to fetch wards in district");
      }
      const data = await response.json();
      return data.wards || [];
    } catch (error) {
      toast.error("Không thể lấy danh sách phường/xã trong quận/huyện");
      throw error;
      return [];
    }
  }
};
