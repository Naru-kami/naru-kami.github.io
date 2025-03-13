import { createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Box, Button, ButtonProps, Tooltip, Typography } from "@mui/material";
import Primogem from "../assets/Item_Primogem.png";
import Fate from "../assets/Item_Intertwined_Fate.png";
import styled from "@emotion/styled";

const SwitcherContext = createContext<{ usePrimogem: boolean, setUsePrimogem: (value: boolean | ((prevState: boolean) => boolean)) => void } | null>(null);

function SwitcherProvider({ children }: { children: React.ReactNode }) {
  const [usePrimogem, setUsePrimogem] = useLocalStorage("usePrimogem", false);
  return <SwitcherContext.Provider value={{ usePrimogem, setUsePrimogem }}>{children}</SwitcherContext.Provider>;
}

function userPrimogemSwitcher() {
  const store = useContext(SwitcherContext);
  if (!store) {
    throw new Error("Store not found");
  }
  return [store.usePrimogem, store.setUsePrimogem] as const;
}

const StyledButton = styled(Button)(() => ({
  minWidth: 0,
  padding: 4,
  backgroundColor: '#529ef8',
  backgroundImage: 'linear-gradient(135deg, #f583cc, transparent)',
}))

export default function CurrencySwitcher(props: ButtonProps) {
  const [usePrimogem, setUsePrimogem] = userPrimogemSwitcher();
  const handleClick = useCallback(() => {
    setUsePrimogem(prev => !prev);
  }, [setUsePrimogem]);

  return <Tooltip arrow placement="top" title={<Typography variant="body2">{usePrimogem ? "Using Primogems" : "Using Fates"}</Typography>}>
    <StyledButton onClick={handleClick} variant='contained' {...props} aria-label={usePrimogem ? "switch to fates" : "switch to primogems"} >
      <Box component="img" src={usePrimogem ? Primogem : Fate} sx={{ width: 32, height: 32 }} alt={usePrimogem ? "Primogem" : "Fate"} />
    </StyledButton>
  </Tooltip>
}

export { SwitcherProvider, userPrimogemSwitcher }