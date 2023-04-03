import React, { useCallback } from 'react'
import ResetStorage from '../../../components/ResetStorage'
import { useStore } from './Store'

const storageKeys = ["Artifact.Parameters", "Artifact.Sands", "Artifact.Goblet", "Artifact.Circlet"];

export default function StorageResetter() {
  const setStorage = useStore(() => { return })[1];
  const resetContext = useCallback(() => {
    setStorage(() => {
      return {
        mainstats: [0, 0],
        substats: [4, 7, 8, 9],
        starter: [2, 0],
        slidervals: [[0, 1], [0, 0], [0, 5], [0, 5]],
        resin: [20, 180],
        artichance: { permut: 0, mains: 0, upgrade: 0, set: 0, final: 0 },
        plotdata: { x: [], y: [] }
      };
    });
  }, [setStorage]);

  return (
    <ResetStorage storageKey={storageKeys} executeFunction={resetContext} />
  )
}
