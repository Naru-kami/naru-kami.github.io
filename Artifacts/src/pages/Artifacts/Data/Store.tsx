import createFastContext from "../../../components/FastContext";

export type ArtifactStore = {
  mainstats: number[],
  substats: number[],
  starter: number[],
  slidervals: number[][],
  resin: number[],
  artichance: {
    permut: number,
    mains: number,
    upgrade: number,
    set: number,
    final: number
  },
  plotdata: {
    x: number[],
    y: number[]
  }
}
const StoreKey = "Artifact.Parameters";

function isArtifact(artifact: ArtifactStore): artifact is ArtifactStore {
  return (
    typeof artifact === "object" && artifact !== null &&
    "mainstats" in artifact && artifact.mainstats.constructor === Array &&
    "substats" in artifact && artifact.substats.constructor === Array &&
    "starter" in artifact && artifact.starter.constructor === Array &&
    "slidervals" in artifact && artifact.slidervals.constructor === Array && artifact.slidervals[0].constructor === Array &&
    "resin" in artifact && artifact.resin.constructor === Array &&
    "artichance" in artifact && typeof artifact.artichance === 'object' &&
    "permut" in artifact.artichance && !isNaN(artifact.artichance.permut) &&
    "mains" in artifact.artichance && !isNaN(artifact.artichance.mains) &&
    "upgrade" in artifact.artichance && !isNaN(artifact.artichance.upgrade) &&
    "set" in artifact.artichance && !isNaN(artifact.artichance.set) &&
    "final" in artifact.artichance && !isNaN(artifact.artichance.final) &&
    "plotdata" in artifact && typeof artifact.plotdata === 'object' &&
    "x" in artifact.plotdata && artifact.plotdata.x.constructor === Array &&
    "y" in artifact.plotdata && artifact.plotdata.y.constructor === Array
  );
}

const storedArtifact = localStorage.getItem('Artifact.Parameters');
let Artifact: ArtifactStore;

if (storedArtifact) {
  try {
    console.log("Try parsing stored values.");
    Artifact = JSON.parse(storedArtifact);
    if (!isArtifact(Artifact)) {
      console.log("Failed parsing.");
      throw new Error('Stored invalid object');
    }
    console.log("Successful parsing.");
  } catch (e) {
    console.log(`${e}. Resetting to default values.`);
    Artifact = {
      mainstats: [0, 0],
      substats: [4, 7, 8, 9],
      starter: [2, 0],
      slidervals: [[0, 1], [0, 0], [0, 5], [0, 5]],
      resin: [20, 180],
      artichance: { permut: 0, mains: 0, upgrade: 0, set: 0, final: 0 },
      plotdata: { x: [], y: [] }
    };
    localStorage.setItem(StoreKey, JSON.stringify(Artifact));
  }
} else {
  console.log("No stored values found. Using default values.");
  Artifact = {
    mainstats: [0, 0],
    substats: [4, 7, 8, 9],
    starter: [2, 0],
    slidervals: [[0, 1], [0, 0], [0, 5], [0, 5]],
    resin: [20, 180],
    artichance: { permut: 0, mains: 0, upgrade: 0, set: 0, final: 0 },
    plotdata: { x: [], y: [] }
  };
  localStorage.setItem(StoreKey, JSON.stringify(Artifact));
}

const { Provider, useStore } = createFastContext(Artifact, StoreKey);

export { useStore };
export default Provider;
