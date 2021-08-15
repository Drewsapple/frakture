import { SyncOutlined } from "@ant-design/icons";
import { utils, Contract, ethers } from "ethers";
import { Button, Card, DatePicker, Divider, Input, List, notification, Progress, Slider, Spin, Switch } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { Address, AddressInput, Balance, DistributionTable, NFTUpload } from "../components";


export default function Dist({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const [mintCount, setMintCount] = useState(1);
  const [nftStored, setNftStored] = useState("");
  const [newDistName, setNewDistName] = useState("");
  const [newDistSymbol, setNewDistSymbol] = useState("");
  const [list, setList] = useState([]);

  const [freshContract, setFreshContract] = useState(null);

  const copyContract = address => {
    setFreshContract(new Contract(address, writeContracts.ERC777Distributor.interface, writeContracts.ERC777Distributor.signer));
  };

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: "70vw", margin: "auto", marginTop: 64 }}>
        <h2>Manage Distributions</h2>
        <Divider />
        New royalty splitter token options
        <Input
          type="text"
          onChange={e => setNewDistName(e.target.value)}
          placeholder={"New royalty splitter token name"}
        />
        <Input type="text" onChange={e => setNewDistSymbol(e.target.value)} placeholder={"symbol"} />
        <Button
          disabled={newDistName == "" || newDistSymbol == ""}
          onClick={async () => {
            const result = await tx(
              writeContracts.DistributorFactory.createDistributor(newDistName, newDistSymbol, []),
              async update => {
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
              },
            );
            copyContract((await result.wait()).events.find(e => e.event == "AddressCreated").args._address);
          }}
        >
          Deploy Another
        </Button>
        <Divider />
        <Input
          type="text"
          onChange={e => copyContract(e.target.value)}
          placeholder="Paste distributor address or deploy another"
        />
        <Address
          address={readContracts && freshContract ? freshContract.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <br />
        <Button
          disabled={!freshContract}
          onClick={async () => {
            const result = await tx(
              writeContracts.ISuperfluid.callAgreement(
                writeContracts.IInstantDistributionAgreementV1.address,
                writeContracts.IInstantDistributionAgreementV1.interface.encodeFunctionData("claim", [
                  "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90",
                  freshContract.address,
                  1,
                  address,
                  "0x",
                ]),
                "0x",
              ),
              update => {},
            );
          }}
        >
          Claim Distribution
        </Button>
        <Divider />
        <DistributionTable setList={setList} />
        <Button
          disabled={(list.filter(elt => elt.amount != "").length < 1) || !freshContract}
          onClick={async () => {
            let addrs, amts;
            try{
              addrs = list.map(i => utils.getAddress(i.address));
              amts = list.map(i => utils.parseUnits(i.amount, 18));
            }
            catch(e) {
              console.error("Couldn't parse distributions from form")
              return;
            }
            const result = await tx(freshContract.batchMint(addrs, amts),
            update => {
              console.log(update)
            });
          }}
        >
          Mint to beneficiaries
        </Button>
      </div>
    </div>
  );
}
