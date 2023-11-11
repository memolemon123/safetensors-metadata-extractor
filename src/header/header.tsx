import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from '@mui/icons-material/GitHub';
import { CivitAiIcon } from "./civitai-icon/civitai-icon";

export function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
                        Safetensors Metadata Extractor
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="github link"
                        sx={{ mr: 2 }}
                        href="https://github.com/memolemon123"
                        target="_blank"
                    >
                        <GitHubIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="civitai mypage link"
                        sx={{ mr: 2 }}
                        href="https://civitai.com/user/memolemon123"
                        target="_blank"
                    >
                        <CivitAiIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}