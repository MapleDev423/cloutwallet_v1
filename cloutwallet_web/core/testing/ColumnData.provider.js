import React from "react";
import { Tag, Space } from "antd";
import "antd/dist/antd.css";

export const columns = [
    {
        title: "Creator Coins",
        dataIndex: "creatorCoins",
        key: "creatorCoins",
        render: text => <a>{text}</a>,
    },
    {
        title: "",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
            // We probably want better logic here (especially for the colors of the tag and the actual value as well):
            <>
                {tags.map(tag => {
                    let color = tag.includes("+") ? "green" : "volcano";
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Coin Held",
        dataIndex: "coinHeld",
        key: "coinHeld",
    },
    {
        title: "Market Value",
        dataIndex: "marketValue",
        key: "marketValue",
    },
    {
        title: "Supply Held",
        dataIndex: "supplyHeld",
        key: "supplyHeld",
    },
    {
        title: "Portfolio %",
        dataIndex: "porfolioPercentage",
        key: "portfolioPercentage",
    },
    // {
    //     title: "Action",
    //     key: "action",
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

/*
  This is what is actually fed into the table component. You can get data from the API and map it through here (as it is hard-coded now). Dince it's an array of objects, however, that process should be easy.
  */
export const data = [
    {
        key: "1",
        creatorCoins: "@apepit",
        tags: ["+10.3%"],
        coinHeld: 1.0,
        marketValue: "$1042.00",
        supplyHeld: "2.27%",
        porfolioPercentage: "7.75%",
    },
    {
        key: "1",
        creatorCoins: "@apepit",
        tags: ["-10.3%"],
        coinHeld: 1.0,
        marketValue: "$1042.00",
        supplyHeld: "2.27%",
        porfolioPercentage: "7.75%",
    },
    {
        key: "1",
        creatorCoins: "@apepit",
        tags: ["+10.3%"],
        coinHeld: 1.0,
        marketValue: "$1042.00",
        supplyHeld: "2.27%",
        porfolioPercentage: "7.75%",
    },
    {
        key: "1",
        creatorCoins: "@apepit",
        tags: ["+10.3%"],
        coinHeld: 1.0,
        marketValue: "$1042.00",
        supplyHeld: "2.27%",
        porfolioPercentage: "7.75%",
    },
    {
        key: "1",
        creatorCoins: "@apepit",
        tags: ["+10.3%"],
        coinHeld: 1.0,
        marketValue: "$1042.00",
        supplyHeld: "2.27%",
        porfolioPercentage: "7.75%",
    },
];
