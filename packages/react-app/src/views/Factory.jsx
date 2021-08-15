import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, InputNumber, List, Progress, Slider, Spin, Switch, notification } from "antd";
import React, { useState } from "react";
import { AddressInput, NFTUpload } from "../components";
import { useEventListener } from "../hooks";

export default function Factory({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [mintCount, setMintCount] = useState(1);
  const [nftStored, setNftStored] = useState("");
  const [royaltyRecipient, setRoyaltyRecipient] = useState(null);
  const [royaltyBPS, setRoyaltyBPS] = useState(null);

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: "70vw", margin: "auto", marginTop: 64 }}>
        <h2>Mint an NFT</h2>
        <Divider />
        <NFTUpload {...{ nftStored, setNftStored }} />
        <Input
          placeholder="NFT metadata CID"
          type="text"
          value={nftStored}
          onChange={e => {
            setNftStored(e.target.value);
          }}
        />
        <Input
          placeholder="# of NFTs to mint"
          type="number"
          onChange={e => {
            setMintCount(e.target.value);
          }}
        />
        <AddressInput placeholder="royalty recipient (can be a splitter)" onChange={e => {
          setRoyaltyRecipient(e);
        }} />
        <h3>Sell-on royalty percentage:</h3>
        <InputNumber type="" placeholder="Sell-on royalty percentage" 
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={value => {setRoyaltyBPS((value*10000)/100)}} />
        <Button
          onClick={async () => {
            if (mintCount < 1 || nftStored == "" || !utils.isAddress(royaltyRecipient) || royaltyBPS == 0) {
              console.error("Fill the full form, please");
            } else {
              console.log("Attempting mint", address, nftStored);
              try{
              const result = await tx(writeContracts.ERC1155Tradable.mintToWithRoyalty(
                address, 
                mintCount, 
                nftStored,
                royaltyRecipient,
                royaltyBPS
                ), update => {
                  console.log("📡 Transaction Update:", update);
                }
              );
              const transferSingle = (await result.wait()).events.find(e => e.event == "TransferSingle");
              notification["success"]({
                id: "transferComplete",
                message: "Your NFT was minted",
                duration: 0,
                description: <>Check it out <a target="_blank" href={`https://testnets.opensea.io/assets/${transferSingle.address}/${transferSingle.args.id.toString()}`} >on OpenSea.</a></>,
              });
              }
              catch(e) {}
            }
          }}
        >
          Deploy
        </Button>
      </div>
    </div>
  );
}
