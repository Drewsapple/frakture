import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance, NFTUpload } from "../components";
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
  const events = useEventListener(writeContracts, "NFTFactory", "Transfer", localProvider, 1);

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Mint an NFT</h2>
        <Divider />
        <NFTUpload {...{nftStored, setNftStored}}/>
        <Input
          placeholder="# of NFTs to mint"
          type="number"
          onChange={e => {setMintCount(e.target.value)}}
        />
        <Input
          placeholder="# of distribution tokens to mint"
          onChange={e => {}}
        />
        <Input
          placeholder="Sell-on royalty percentage"
          onChange={e => {}}
        />
        <Button onClick={async () => {
          if(mintCount < 1 || nftStored == "") {
            console.error("Fill the full form, please")
          }
          else {
            console.log("Attempting mint", address, nftStored);
            const result = tx(writeContracts.NFTFactory.mint(1, address, nftStored), update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                console.log(
                  " ⛽️ " +
                  update.gasUsed +
                  "/" +
                  (update.gasLimit || update.gas) +
                  " @ " +
                  parseFloat(update.gasPrice) / 1000000000 +
                  " gwei",
                );
              }
            })
          }
        }}>
          Deploy
        </Button>

        <Divider />
        Your Address:
        <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        <h2>Your Balance:</h2>
        <Balance address={address} provider={localProvider} price={price} />
        <Divider />
        Your Contract Address:
        <Address
          address={readContracts && readContracts.ERC777Distributor ? readContracts.ERC777Distributor.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
      </div>

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in YourContract.sol! )
      */}
      <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
        <h2>Events:</h2>
        <List
          bordered
          dataSource={events}
          renderItem={item => {
            return (
              <List.Item key={item.blockNumber + "_" + item.sender + "_" + item.purpose}>
                <Address address={item[1]} ensProvider={mainnetProvider} fontSize={16} />
                {item[2]}
              </List.Item>
            );
          }}
        />
      </div>

    </div>
  );
}
