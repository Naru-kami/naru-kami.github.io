import { useCallback } from 'react'
import ResetStorage from '../../../components/ResetStorage'
import { getDefaultArtifact, useStore } from './Store'

const storageKeys = ["Artifact.Parameters", "Artifact.Sands", "Artifact.Goblet", "Artifact.Circlet"];

export default function StorageResetter() {
  const setStorage = useStore(() => { return })[1];
  const resetContext = useCallback(() => {
    setStorage(getDefaultArtifact);
  }, [setStorage]);

  return (
    <ResetStorage storageKey={storageKeys} executeFunction={resetContext} />
  )
}
