import { useCallback } from 'react';
import ResetStorage from '../../components/ResetStorage';
import { defaultWishConfig, useStore } from './Store';
import _ from 'lodash';

const storageKeys = ["Wishing.Parameters"];

export default function StorageResetter() {
  const setStorage = useStore(() => { return })[1];
  const resetContext = useCallback(() => {
    setStorage(() => _.cloneDeep(defaultWishConfig));
  }, [setStorage]);

  return (
    <ResetStorage storageKey={storageKeys} executeFunction={resetContext} />
  )
}