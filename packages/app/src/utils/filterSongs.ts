import { Song } from "../store/types";

const filterSongs = (data: Song[] | undefined, searchFor: string) => {
  let filteredData = data ? data : [];
  if (filteredData) {
    filteredData = filteredData.reduce((acc: Song[], curr) => {
      if (curr.name.toLowerCase().includes(searchFor.toLowerCase())) {
        acc.push(curr);
      }
      return acc;
    }, []);
  }
  return filteredData;
};

export { filterSongs };
