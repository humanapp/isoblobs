export enum Algorithm {
  ISOBLOBS,
  //PERLINWIND,
}

export type IsoblobsParams = {
  // Value in 0-1 range
  speedScalar: number;
  // Value in 0-1 range
  horizontal: number;
  // Value in 0-1 range
  vertical: number;
  // Value in 0-ISOBLOBS_MAX_COUNT range
  count: number;
};

export type PerlinWindParams = {
  // Value in 0-1 range
  speedScalar: number;
  // Value in 0-1 range
  direction: number;
  // Value in 0-1 range
  turbulence: number;
};

export const initialIsoblobsParams: IsoblobsParams = {
  speedScalar: 0.5,
  horizontal: 0.3,
  vertical: 0.3,
  count: 3,
};

export const AlgorithmNames = {
  [Algorithm.ISOBLOBS]: "iso blobs",
  //[Algorithm.PERLINWIND]: "perlin wind",
};
