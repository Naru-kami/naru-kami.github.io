import _ from "lodash";
import createFastContext from "../../../components/FastContext";
import { z, ZodError } from "zod";

const StoreKey = "Artifact.Parameters";

const ArtifactStoreSchema = z.object({
  mainstats: z.array(z.number()),
  substats: z.array(z.number()),
  supplementary: z.array(z.number()),
  substatBounds: z.array(z.array(z.number())),
  unit: z.number().min(0).max(2),
  chances: z.object({
    mainstatConfig: z.number(),
    substatConfig: z.number(),
    fourLinerUpgrade: z.number(),
    threeLinerUpgrade: z.number(),
    onsetChance: z.number(),
    doubleDropRate: z.number(),
    initialAffixCount: z.object({
      3: z.number(),
      4: z.number()
    }),
    final: z.number()
  }),
  plotdata: z.object({
    x: z.array(z.number()),
    y: z.array(z.number())
  })
});

export type ArtifactStore = z.infer<typeof ArtifactStoreSchema>

function validStore(store: ArtifactStore): ArtifactStore {
  return ArtifactStoreSchema.parse(store);
}

export const defaultArtifact = Object.freeze({
  mainstats: [0, 0],
  substats: [4, 7, 8, 9],
  //      set, initial, source, resin
  supplementary: [2, 0, 0, 180],
  substatBounds: [[0, 1], [0, 0], [0, 5], [0, 5]],
  unit: 0,
  chances: {
    mainstatConfig: 0,
    substatConfig: 0,
    fourLinerUpgrade: 0,
    threeLinerUpgrade: 0,
    onsetChance: 0,
    doubleDropRate: 0,
    initialAffixCount: { 3: 0, 4: 0 },
    final: 0
  },
  plotdata: { x: [], y: [] }
} satisfies ArtifactStore);

const storedArtifact = localStorage.getItem('Artifact.Parameters');
let Artifact: ArtifactStore = _.cloneDeep(defaultArtifact);

if (storedArtifact) {
  try {
    console.log("Parsing stored values.");
    Artifact = validStore(JSON.parse(storedArtifact));
    console.log("Successful parsing.");
  } catch (e) {
    if (e instanceof ZodError) {
      e.issues.forEach(issue => console.error(issue.message));
    }

    console.log(`${e}. Resetting to default values.`);
    localStorage.setItem(StoreKey, JSON.stringify(Artifact));
  }
} else {
  console.log("No stored values found. Using default values.");
  localStorage.setItem(StoreKey, JSON.stringify(Artifact));
}

const { Provider, useStore, readStore } = createFastContext(Artifact, StoreKey);

export { useStore, readStore };
export default Provider;
