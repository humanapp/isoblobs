import * as lightCookie1 from "./light_cookie_1.json";
import * as lightCookie2 from "./light_cookie_2.json";
import * as lightCookie3 from "./light_cookie_3.json";

export enum AlgorithmId {
  ISOBLOBS,
  PERLINWIND,
  LIGHTCOOKIES,
  PLASMA,
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

export type Pixel = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Image = {
  width: number;
  height: number;
  pixels: Pixel[];
};

export type LightCookieLayer = {
  cookie: Image;
  offset: {
    x: number;
    y: number;
  };
  scale: number;
  low: number;
  high: number;
  factor: number;
  blur: {
    enabled: boolean;
    directions: number;
    quality: number;
    size: number;
  };
};

export type LightCookiesParams = {
  layers: LightCookieLayer[];
};

export type PlasmaParams = {
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

export const initialLightCookiesParams: LightCookiesParams = {
  layers: [
    {
      cookie: lightCookie1,
      offset: { x: 25, y: 4 },
      scale: 0.5,
      low: 0,
      high: 0.29,
      factor: -1.2,
      blur: {
        enabled: true,
        directions: 16,
        quality: 3,
        size: 15,
      },
    },
    {
      cookie: lightCookie2,
      offset: { x: 0, y: 5 },
      scale: 0.5,
      low: 0,
      high: 0.34,
      factor: 1.35,
      blur: {
        enabled: true,
        directions: 16,
        quality: 3,
        size: 15,
      },
    },
    {
      cookie: lightCookie3,
      offset: { x: 0, y: 0 },
      scale: 1,
      low: 0,
      high: .5,
      factor: 0.1,
      blur: {
        enabled: false,
        directions: 16,
        quality: 2,
        size: 15,
      },
    },
  ],
};

export const initialPlasmaParams: PlasmaParams = {
};

export const Algorithms = {
  [AlgorithmId.ISOBLOBS]: {
    id: AlgorithmId.ISOBLOBS,
    name: "iso blobs",
  },
  [AlgorithmId.PERLINWIND]: {
    id: AlgorithmId.PERLINWIND,
    name: "perlin clouds",
  },
  [AlgorithmId.LIGHTCOOKIES]: {
    id: AlgorithmId.LIGHTCOOKIES,
    name: "light cookies",
  },
  [AlgorithmId.PLASMA]: {
    id: AlgorithmId.PLASMA,
    name: "plasma",
  },
};
