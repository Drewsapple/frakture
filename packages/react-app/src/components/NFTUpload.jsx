import { Input, Upload, Button, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";

// For nfts
import { NFTStorage, File } from "nft.storage";

const nftStorageKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA2YTVkM0ExODczRDgxMzFBNDhDNDAxNzY5Q2Q2N0NlODA4ZUZhM0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODYzMDk0NTE1MCwibmFtZSI6IkZyYWt0dXJlIn0._-v4lPdFwncb0TdaWciVifNtEhqGgGWEE08-e1Go6x4";
const nftSotrageClient = new NFTStorage({ token: nftStorageKey });

const { Dragger } = Upload;

export default function NFTUpload({nftStored, setNftStored}) {
  const [uploadedFile, setUploadedFile] = useState([]);
  const [title, setTitle] = useState("My NFT");
  const [description, setDescription] = useState("");


  const onUpload = async (file) => {
    if(file) {
        setUploadedFile(new File([await file.arrayBuffer()], file.name, {type: file.type}));
    }
    return false;
  };

  const submitNFT = async () => {
      if (uploadedFile) {
        // console.log("title: ", title);
        // console.log("description: ", description)
        // console.log(uploadedFile)
        const key = 'nftStatus'
        notification['info']({
            key,
            duration: null,
            message: "NFT processing",
            description: (<>
            Currently uploading and pinning
            </>)
        });
        try {
            const metadata = await nftSotrageClient.store({
              name: title,
              description: description,
              image: uploadedFile,
          });
          notification['success']({
              key,
              message: "NFT pinned",
              description: (<>
              Hosted via NFT.Storage at {metadata.url}
              </>)
          });
          setNftStored(metadata.ipnft);
        }
        catch( err ) {
          notification['warn']({
            key,
            message: "NFT pinning failed",
            description: (<>
            err.
            </>)
        });
        }
      }
  }

  return (
    <>
        <Dragger
        action=""
        beforeUpload={onUpload}
        >
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">These will be uploaded to nft.storage</p>
        </Dragger>
        <Input
          placeholder="NFT Title"
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          placeholder="NFT Description"
          onChange={e => setDescription(e.target.value)}
        />
        <Button onClick={submitNFT}>Store to IPFS</Button>
    </>
  );
}
