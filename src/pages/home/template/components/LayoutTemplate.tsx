import { Box } from "@mui/material";
import HeaderTemplate from "./HeaderTemplate";
import FooterTemplete from "./FooterTemplate";

interface LayoutTemplateProps {
    children: React.ReactNode;
}

const LayoutTemplate = ({ children }: LayoutTemplateProps) => {
    return (
        <>
            <HeaderTemplate />

            <Box component="main">
                {children}
            </Box>

            <FooterTemplete />
        </>
    );
};

export default LayoutTemplate;
