import { ArtistsAndAlbumsData } from "../store/types";

const filterData = (
  data: ArtistsAndAlbumsData | undefined,
  searchFor: string
) => {
  let filteredData = data ? { ...data } : data;
  if (filteredData) {
    // @ts-ignore
    filteredData = Object.keys(filteredData).reduce((acc: {}, curr) => {
      if (
        filteredData &&
        filteredData[curr] &&
        filteredData[curr].name.toLowerCase().includes(searchFor.toLowerCase())
      ) {
        acc = { ...acc, [curr]: filteredData[curr] };
      }
      return acc;
    }, {});
  }
  return filteredData;
};

export { filterData };
