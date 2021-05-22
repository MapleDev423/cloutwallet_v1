import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
    Header,
    Main,
    StatsSection,
    StatsHeader,
    StatsSubHeader,
    StatsText,
    TableSection,
} from "../core/styles/Dashboard.styles";
import Sidebar from "../components/Sidebar.ui";
import { columns, data } from "../core/testing/ColumnData.provider";

import { Table } from "antd";

export default function Home() {
    return (
        <>
            <Head>
                <title>CloutWallet</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Sidebar />
            <Main>
                <div>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <StatsSection>
                            <StatsHeader>14,460.00</StatsHeader>
                            <StatsSubHeader>69 $btclt</StatsSubHeader>
                            <StatsText>BC1s3xYxXxCul . . . </StatsText>
                        </StatsSection>
                        <div style={{ display: "flex" }}>
                            <img
                                width="54"
                                height="54"
                                src="https://i.ibb.co/tBJbtVq/sampleuser.png"
                                style={{ marginRight: "0.75rem" }}
                            />
                            <div style={{ display: "inline-block" }}>
                                <h3>iaan</h3>
                                <p style={{ marginTop: "-0.5rem" }}>$420.00</p>
                            </div>
                        </div>
                    </div>
                    <TableSection>
                        <Table columns={columns} dataSource={data} />
                    </TableSection>
                </div>
            </Main>
        </>
    );
}
