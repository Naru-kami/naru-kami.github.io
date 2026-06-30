import { useCallback } from 'react';
import ResetStorage from '../../components/ResetStorage';
import { getDefaultWishConfig, useStore } from './Store';

const storageKeys = ["Wishing.Parameters"];

export default function StorageResetter() {
  const setStorage = useStore(() => { return })[1];
  const resetContext = useCallback(() => {
    setStorage(getDefaultWishConfig);
  }, [setStorage]);

  return (
    <ResetStorage storageKey={storageKeys} executeFunction={resetContext} />
  )
}