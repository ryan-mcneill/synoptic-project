import { BasicDetails } from "../store/types";

export const artistsToString = (artists: Partial<BasicDetails>[]): string =>
  artists
    .reduce((acc, { name }) => {
      // @ts-ignore
      acc.push(name);
      return acc;
    }, [])
    .join(", ");
