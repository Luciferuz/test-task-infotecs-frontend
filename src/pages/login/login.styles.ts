import styled from "styled-components";
import {Card} from "antd";

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const StyledCard = styled(Card)`
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;