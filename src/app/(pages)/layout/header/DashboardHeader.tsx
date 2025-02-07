// MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// Components
import ProfileDropdown from "./ProfileDropdown";

function DashboardHeader() {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          disableGutters
        >
          <Typography
            variant="h5"
            noWrap
            sx={{
              letterSpacing: ".3rem",
            }}
          >
            Jobai
          </Typography>
          <ProfileDropdown />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default DashboardHeader;
