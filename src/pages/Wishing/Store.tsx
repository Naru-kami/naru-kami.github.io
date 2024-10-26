import createFastContext from "../../components/FastContext";

export type WishingStore = {
  mode: "distribution" | "fixed",
  char: {
    enabled: boolean,
    goal: number,
    pity: number,
    guaranteed: boolean,
    radiance: number
  },
  weap: {
    enabled: boolean,
    goal: number,
    pity: number,
    guaranteed: boolean
  },
  starglitter: {
    enabled: boolean,
    count: number,
    cons: number[]
  },
  samplesize: number,
  threads: number,
  plotdataSim: {
    changed: boolean,
    cumulative: boolean,
    progress: number
    x: number[],
    y: number[]
  },
  plotdataCalc: {
    cumulative: boolean,
    x: number[],
    y: number[]
  }
}
const StoreKey = "Wishing.Parameters";

function isArtifact(wishing: WishingStore): wishing is WishingStore {
  return (
    typeof wishing === "object" && wishing !== null &&
    "mode" in wishing && (wishing.mode === "distribution" || wishing.mode === "fixed") &&
    "char" in wishing && typeof wishing.char === 'object' &&
    "enabled" in wishing.char && typeof wishing.char.enabled == 'boolean' &&
    "goal" in wishing.char && typeof wishing.char.goal == 'number' &&
    "pity" in wishing.char && typeof wishing.char.pity == 'number' &&
    "guaranteed" in wishing.char && typeof wishing.char.guaranteed == 'boolean' &&
    "radiance" in wishing.char && typeof wishing.char.radiance == "number" &&
    "weap" in wishing && typeof wishing.weap === 'object' &&
    "enabled" in wishing.weap && typeof wishing.weap.enabled == 'boolean' &&
    "goal" in wishing.weap && typeof wishing.weap.goal == 'number' &&
    "pity" in wishing.weap && typeof wishing.weap.pity == 'number' &&
    "guaranteed" in wishing.weap && typeof wishing.weap.guaranteed == 'boolean' &&
    "starglitter" in wishing && typeof wishing.starglitter == 'object' &&
    "enabled" in wishing.starglitter && typeof wishing.starglitter.enabled == 'boolean' &&
    "count" in wishing.starglitter && typeof wishing.starglitter.count == 'number' &&
    "cons" in wishing.starglitter && Array.isArray(wishing.starglitter.cons) &&
    "guaranteed" in wishing.char && typeof wishing.char.guaranteed == 'boolean' &&
    "samplesize" in wishing && typeof wishing.samplesize == 'number' &&
    "plotdataSim" in wishing && typeof wishing.plotdataSim == 'object' &&
    "changed" in wishing.plotdataSim && typeof wishing.plotdataSim.changed == 'boolean' &&
    "cumulative" in wishing.plotdataSim && typeof wishing.plotdataSim.cumulative == 'boolean' &&
    "progress" in wishing.plotdataSim && typeof wishing.plotdataSim.progress == 'number' &&
    "x" in wishing.plotdataSim && Array.isArray(wishing.plotdataSim.x) &&
    "y" in wishing.plotdataSim && Array.isArray(wishing.plotdataSim.y) &&
    "plotdataCalc" in wishing && typeof wishing.plotdataCalc == 'object' &&
    "cumulative" in wishing.plotdataSim && typeof wishing.plotdataSim.cumulative == 'boolean' &&
    "x" in wishing.plotdataCalc && Array.isArray(wishing.plotdataCalc.x) &&
    "y" in wishing.plotdataCalc && Array.isArray(wishing.plotdataCalc.y) &&
    "threads" in wishing && typeof wishing.threads == 'number'
  );
}

const storedWish = localStorage.getItem('Wishing.Parameters');
let Wish: WishingStore;

if (storedWish) {
  try {
    console.log("Try parsing stored values.");
    Wish = JSON.parse(storedWish);
    if (!isArtifact(Wish)) {
      console.log("Failed parsing.");
      throw new Error('Stored invalid object');
    }
    console.log("Successful parsing.");
  } catch (e) {
    console.log(`${e}. Resetting to default values.`);
    Wish = {
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
      samplesize: 500000,
      threads: 4,
      plotdataSim: {
        changed: false,
        cumulative: true,
        progress: 0,
        x: [],
        y: []
      },
      plotdataCalc: {
        cumulative: true,
        x: [],
        y: []
      }
    };
    localStorage.setItem(StoreKey, JSON.stringify(Wish));
  }
} else {
  console.log("No stored values found. Using default values.");
  Wish = {
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
    samplesize: 500000,
    threads: 4,
    plotdataSim: {
      changed: false,
      cumulative: true,
      progress: 0,
      x: [],
      y: []
    },
    plotdataCalc: {
      cumulative: true,
      x: [],
      y: []
    }
  };
  localStorage.setItem(StoreKey, JSON.stringify(Wish));
}

const { Provider, useStore } = createFastContext(Wish, StoreKey);

export { useStore };
export default Provider;
