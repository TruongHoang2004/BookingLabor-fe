import { District, HanoiResponse, Ward } from '@/interface/location';
import toast from 'react-hot-toast';

let districts: District[] = [];

const fetchDistricts = async () => {
  try {
    const response = await fetch('https://provinces.open-api.vn/api/p/01?depth=2');
    const data: HanoiResponse = await response.json();
    districts = data.districts;
  } catch (error) {
    toast.error('Lỗi khi tải dữ liệu quận huyện');
    throw error;
  }
};

export const locationService = {
  async getDistrict(codes: string): Promise<string> {
      try {
          if (districts.length === 0) {
              await fetchDistricts();
          }

          if (!codes) return 'No area specified';
          
          const districtCodes = codes.split(',')
              .map(code => code.trim())
              .map(code => parseInt(code));
              
          const districtNames = districtCodes.map(code => 
              districts.find(d => parseInt(d.code) === code)?.name || code.toString()
          );
          
          return districtNames.join(', ');
      } catch (error) {
          toast.error('Lỗi khi lấy dữ liệu quận huyện');
          throw error;
      }
  },
  async getWard(ward_code: string) {
      try {
        const response = await fetch(`https://provinces.open-api.vn/api/w/${ward_code}?depth=1`);
        const data = response.json();
        return data;
      } catch(error) {
        toast.error('Lỗi khi tải dữ liệu quận huyện');
        throw error;
      }
  }

};