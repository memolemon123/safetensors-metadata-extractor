import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactComponent as CivitAiRow } from './civitai.svg';
export function CivitAiIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} component={CivitAiRow} viewBox='0 0 92 92'></SvgIcon>
    );
}