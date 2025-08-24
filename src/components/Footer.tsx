import { Card, Link, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Footer() {
  return (
    <Card
      elevation={1}
      component={'footer'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        color: grey[600],
        p: '0.5rem 1rem', mt: 2,
        gap: 5,
        flexShrink: 1,
        backgroundColor: 'hsl(230, 80%, 5%)',
      }}>
      <Typography fontSize={12}>This is a fan made project, and is not affiliated with HoYoverse</Typography>
      <Typography fontSize={12}>
        Made with <Link href="https://react.dev/">React</Link> and <Link href="https://mui.com/">MUI</Link>. Build with <Link href="https://vite.dev/">Vite</Link>.
        Last Update: <Link href="https://github.com/Naru-kami/naru-kami.github.io">{
          new Intl.DateTimeFormat(undefined, { day: '2-digit', month: "short", year: "numeric" }).format(new Date(1756050142797))
        }</Link>
      </Typography>
    </Card>
  )
}