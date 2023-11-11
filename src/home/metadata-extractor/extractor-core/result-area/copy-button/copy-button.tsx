import IconButton from "@mui/material/IconButton";
import ContentCopy from '@mui/icons-material/ContentCopy';
import { useState } from "react";

export function CopyButton({ jsoncontent }: { jsoncontent: string }) {
    const [color, setColor] = useState("#FFFFFF")
    const handleClick = () => {
        navigator.clipboard.writeText(jsoncontent);
        setColor("green");
        setTimeout(() => {
            setColor("#FFFFFF");
        }, 3000);
    };
    return (
        <IconButton
            size="large"
            edge="start"
            aria-label="github link"
            sx={{ mr: 2, position: "absolute", top: "15px", right: "0px" }}
            onClick={handleClick}
        >
            <ContentCopy sx={{ color: color }} />
        </IconButton>
    );
}