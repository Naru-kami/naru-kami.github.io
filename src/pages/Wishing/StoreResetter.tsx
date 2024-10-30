import { useCallback } from 'react';
import ResetStorage from '../../components/ResetStorage';
import { useStore } from './Store';

const storageKeys = ["Wishing.Parameters"];

export default function StorageResetter() {
  const setStorage = useStore(() => { return })[1];
  const resetContext = useCallback(() => {
    setStorage(prev => {
      return {
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
        threads: prev.threads,
        plotdataSim: {
          changed: false,
          cumulative: false,
          progress: 100,
          x: [],
          y: []
        },
        plotdataCalc: {
          cumulative: false,
          x: [],
          y: []
        }
      };
    });
  }, [setStorage]);

  return (
    <ResetStorage storageKey={storageKeys} executeFunction={resetContext} />
  )
}