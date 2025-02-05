import styled from "styled-components";

export const MainContainer = styled.div`
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
`;

export const Button = styled.button`
    background-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.background};
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;
