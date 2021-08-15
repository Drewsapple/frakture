import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/drewsapple/frakture" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="frakture"
        subTitle="a scaffold-eth app for NFT Royalties"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
