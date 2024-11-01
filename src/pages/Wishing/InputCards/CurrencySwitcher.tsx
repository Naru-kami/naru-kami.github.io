import { createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Box, Button, ButtonProps, Tooltip, Typography } from "@mui/material";
import Primogem from "../assets/Item_Primogem.png";
import Fate from "../assets/Item_Intertwined_Fate.png";

const SwitcherContext = createContext<{ usePrimogem: boolean, setUsePrimogem: (value: boolean | ((prevState: boolean) => boolean)) => void } | null>(null);

function SwitcherProvider({ children }: { children: React.ReactNode }) {
  const [usePrimogem, setUsePrimogem] = useLocalStorage("usePrimogem", false);
  return <SwitcherContext.Provider value={{ usePrimogem, setUsePrimogem }}>{children}</SwitcherContext.Provider>;
}

function userPrimogemSwitcher(): [boolean, (value: boolean | ((prevState: boolean) => boolean)) => void] {
  const store = useContext(SwitcherContext);
  if (!store) {
    throw new Error("Store not found");
  }
  return [store.usePrimogem, store.setUsePrimogem];
}

export default function CurrencySwitcher(props: ButtonProps) {
  const [usePrimogem, setUsePrimogem] = userPrimogemSwitcher();
  const handleClick = useCallback(() => {
    setUsePrimogem(prev => !prev);
  }, [setUsePrimogem]);

  return <Tooltip arrow placement="top" title={<Typography variant="body2">{usePrimogem ? "Using Primogems" : "Using Fates"}</Typography>}>
    <Button onClick={handleClick} variant='contained' {...props} sx={{ minWidth: 0, p: 0.5, backgroundColor: '#529ef8', backgroundImage: 'linear-gradient(135deg, #f583cc, transparent)', ...props.sx }}>
      <Box component="img" src={usePrimogem ? Primogem : Fate} sx={{ width: 32, height: 32 }} />
    </Button>
  </Tooltip>
}

export { SwitcherProvider, userPrimogemSwitcher }