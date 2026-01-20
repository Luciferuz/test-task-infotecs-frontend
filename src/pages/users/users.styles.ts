import styled from "styled-components";
import {Card, Layout} from "antd";

export const StyledHeader = styled(Layout.Header)`
    background: #fff;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px #f0f1f2;
`;

export const UserCard = styled(Card)`
    margin-bottom: 16px;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }
`;