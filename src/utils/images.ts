const u = (id: string, w: number, q = 75) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&fm=webp&auto=format&fit=crop`;

const IDS = {
  nightPitch: "1431324155629-1a6deb1dec8d",
  dribble: "1574629810360-7efbbe195018",
  bootBall: "1579952363873-27f3bade9f55",
  player16: "1517466787929-bc90951d0974",
  stadium: "1522778119026-d647f0596c20",
  ballsLine: "1551958219-acbc608c6377",
  volley: "1560272564-c83b66b1ad12",
  duel: "1553778263-73a83bab9b0c",
  ballShadow: "1575361204480-aadea25e6e68",
  indoor: "1606925797300-0b35e9d1794e",
  bootsCorner: "1529900748604-07564a03e7a6",
  ballPitch: "1486286701208-1d58e9338013",
  pitchLine: "1459865264687-595d652de67e",
  matchAction: "1543326727-cf6c39e8f84c",
  ballBoots: "1511886929837-354d827aae26",
  touch: "1600679472829-3044539ce8ed",
  womenMatch: "1624880357913-a8539238245b",
  goalBlur: "1517927033932-b3d18e61fb3a",
  coachKids: "1526232761682-d26e03ac148e",
  tunnel: "1577223625816-7546f13df25d",
  ballGrass: "1589487391730-58f20eb2c308",
  ballNight: "1614632537190-23e4146777db",
  sunPitch: "1570498839593-e565b39455fc",
  aerial: "1556056504-5c7696c4c28d",
  stadiumNight: "1489944440615-453fc2b6a9a9",
  ballMarkings: "1516567727245-ad8c68f3ec93",
} as const;

export type ImgKey = keyof typeof IDS;

export const img = (k: ImgKey, size: "hero" | "grid" | "detail" = "grid") =>
  size === "hero" ? u(IDS[k], 2000, 80) : size === "detail" ? u(IDS[k], 1600, 80) : u(IDS[k], 900, 75);

export const FALLBACK = u(IDS.dribble, 1200, 75);
