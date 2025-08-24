import _ from "lodash";
import createFastContext from "../../components/FastContext";
import { z, ZodError } from "zod";

const STORE_KEY = "Wishing.Parameters";

const WishingStoreSchema = z.object({
  mode: z.enum(["distribution", "fixed"]),
  char: z.object({
    enabled: z.boolean(),
    goal: z.number(),
    pity: z.number(),
    guaranteed: z.boolean(),
    radiance: z.number()
  }),
  weap: z.object({
    enabled: z.boolean(),
    goal: z.number(),
    pity: z.number(),
    guaranteed: z.boolean()
  }),
  starglitter: z.object({
    enabled: z.boolean(),
    count: z.number(),
    cons: z.array(z.number())
  }),
  samplesize: z.number(),
  threads: z.number(),
  plotdataSim: z.object({
    changed: z.boolean(),
    cumulative: z.boolean(),
    progress: z.number(),
    x: z.array(z.number()),
    y: z.array(z.number())
  }),
  plotdataCalc: z.object({
    cumulative: z.boolean(),
    x: z.array(z.number()),
    y: z.array(z.number())
  })
});

export type WishingStore = z.infer<typeof WishingStoreSchema>;

function validStore(store: unknown): WishingStore {
  return WishingStoreSchema.parse(store);
}

export const defaultWishConfig = Object.freeze({
  mode: "distribution",
  char: {
    enabled: true,
    goal: 0,
    pity: 0,
    guaranteed: false,
    radiance: 0
  },
  weap: {
    enabled: true,
    goal: 1,
    pity: 0,
    guaranteed: false
  },
  starglitter: {
    enabled: false,
    count: 0,
    cons: [-1, -1, -1, -1]
  },
  samplesize: 1_000_000,
  threads: 4,
  plotdataSim: {
    changed: false,
    cumulative: false,
    progress: 0,
    x: [],
    y: []
  },
  plotdataCalc: {
    cumulative: false,
    x: [],
    y: []
  }
} satisfies WishingStore);

const storedWish = localStorage.getItem('Wishing.Parameters');
let WishConfig: WishingStore = _.cloneDeep(defaultWishConfig);

if (storedWish) {
  try {
    console.log("Try to parse stored values.");
    WishConfig = validStore(JSON.parse(storedWish));
    console.log("Successful parsing.");
  } catch (e) {
    if (e instanceof ZodError) {
      e.issues.forEach(issue => console.error(issue.message));
    }

    console.error(`Stored invalid object. Resetting to default values.`);
    localStorage.setItem(STORE_KEY, JSON.stringify(WishConfig));
  }
} else {
  console.log("No stored values found. Using default values.");
  localStorage.setItem(STORE_KEY, JSON.stringify(WishConfig));
}

const { Provider, useStore, readStore } = createFastContext(WishConfig, STORE_KEY);

export { useStore, readStore };
export default Provider;
