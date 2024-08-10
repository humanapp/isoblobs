export enum Algorithm {
  ISOBLOBS,
}

export type IsoblobsParams = {
  // Value in 0-1 range
  speedScalar: number;
  // Value in 0-1 range
  horizontal: number;
  // Value in 0-1 range
  vertical: number;
};

export const initialIsoblobsParams: IsoblobsParams = {
  speedScalar: 0.5,
  horizontal: 0.7,
  vertical: 0.4,
};

export const AlgorithmNames = {
  [Algorithm.ISOBLOBS]: "iso blobs",
};
