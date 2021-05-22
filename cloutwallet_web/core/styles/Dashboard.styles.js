import styled from "styled-components";

export const Sidebar = styled.div`
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #101010;
    overflow-x: hidden;
    padding-top: 20px;
    width: 350px;
    padding: 1rem;

    @media (max-width: 1500px) {
        width: 200px;
    }
`;

export const Menu = styled.div`
    width: 100%;
    color: white !important;

    a {
        background-color: transparent;
        margin: 0 0 2rem 0;
        display: block;
        padding: 1rem 1rem 1rem 2rem;
        text-decoration: none;
        font-size: 1.2rem;
        color: white !important;
    }

    a:hover {
        opacity: 0.7;
    }

    a.active {
        border-left: 5px solid blue;
        color: rgba(0, 91, 255, 1) !important;
    }
`;

export const Main = styled.div`
    margin-left: 350px;
    padding: 2rem 4rem;

    @media (max-width: 1500px) {
        margin-left: 200px;
    }
`;

export const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: ". .";
`;

export const StatsSection = styled.div`
    text-align: left;
    background: rgba(240, 242, 245, 0.75);
    border-radius: 20px;
    padding: 2rem;
    height: 14rem;
    width: 21rem;
`;

export const StatsHeader = styled.h1`
    font-weight: 500;
    color: rgba(0, 91, 255, 1);
    margin-top: 0.5rem;
`;

export const StatsSubHeader = styled.h4`
    color: black;
    font-weight: bold;
    margin-top: -1rem;
`;

export const StatsText = styled.h4`
    color: black;
    align-self: baseline;
    margin-top: 4rem;
`;

export const TableSection = styled.div`
    margin-top: 5rem;
`;
