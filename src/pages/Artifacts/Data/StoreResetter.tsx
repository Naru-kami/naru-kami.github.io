import { useCallback } from 'react'
import ResetStorage from '../../../components/ResetStorage'
import { defaultArtifact, useStore } from './Store'
import _ from 'lodash';

const storageKeys = ["Artifact.Parameters", "Artifact.Sands", "Artifact.Goblet", "Artifact.Circlet"];

export default function StorageResetter() {
  const setStorage = useStore(() => { return })[1];
  const resetContext = useCallback(() => {
    setStorage(() => _.cloneDeep(defaultArtifact));
  }, [setStorage]);

  return (
    <ResetStorage storageKey={storageKeys} executeFunction={resetContext} />
  )
}
