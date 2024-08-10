export enum AlgorithmId {
  ISOBLOBS,
  PERLINWIND,
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
  speedScalar: 0.2,
  horizontal: 0.35,
  vertical: 0.4,
  count: 5,
};

export const initialPerlinWindParams: PerlinWindParams = {
  speedScalar: 0.2,
  direction: 0.5,
  turbulence: 0.5,
};

export const Algorithms = {
  [AlgorithmId.ISOBLOBS]: {
    id: AlgorithmId.ISOBLOBS,
    name: "iso blobs",
  },
  [AlgorithmId.PERLINWIND]: {
    id: AlgorithmId.PERLINWIND,
    name: "perlin wind",
  },
};
