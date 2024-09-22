import { useQuery } from "@tanstack/react-query";
import { cityState, districtState } from "../stores/states";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useAddress = () => {
  const city = useRecoilValue(cityState);
  const setDistrict = useSetRecoilState(districtState);

  const fetchAddressData = () => {
    const { data: cityData } = useQuery({
      queryKey: ["getCity"],
      queryFn: async () => {
        const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm").then(
          (res) => res.json()
        );

        return response.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
      },
    });

    console.log("cityData", cityData);

    return cityData;
  };

  const fetchDistrictData = () => {
    const { data: districtData } = useQuery({
      queryKey: ["getDistrict", city],
      queryFn: async () => {
        const response = await fetch(
          `https://esgoo.net/api-tinhthanh/2/${city}.htm`
        ).then((res) => res.json());
        return response.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
      },
      enabled: !!city,
    });
    setDistrict(districtData);
    return districtData;
  };

  return {
    fetchAddressData,
    fetchDistrictData,
  };
};
