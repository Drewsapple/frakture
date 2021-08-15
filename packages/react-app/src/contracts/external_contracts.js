// if (typeof module === "undefined") module = {};
const ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];
const DAIABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId_",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: true,
    inputs: [
      {
        indexed: true,
        internalType: "bytes4",
        name: "sig",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "arg1",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "arg2",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "LogNote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "deny",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "move",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "pull",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "push",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
    ],
    name: "rely",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "wards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const ISuperfluidABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "code",
        type: "address",
      },
    ],
    name: "AgreementClassRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "code",
        type: "address",
      },
    ],
    name: "AgreementClassUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "AppRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ISuperfluidGovernance",
        name: "oldGov",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract ISuperfluidGovernance",
        name: "newGov",
        type: "address",
      },
    ],
    name: "GovernanceReplaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reason",
        type: "uint256",
      },
    ],
    name: "Jail",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ISuperTokenFactory",
        name: "newFactory",
        type: "address",
      },
    ],
    name: "SuperTokenFactoryUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperToken",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "code",
        type: "address",
      },
    ],
    name: "SuperTokenLogicUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "getGovernance",
    outputs: [
      {
        internalType: "contract ISuperfluidGovernance",
        name: "governance",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidGovernance",
        name: "newGov",
        type: "address",
      },
    ],
    name: "replaceGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClassLogic",
        type: "address",
      },
    ],
    name: "registerAgreementClass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClassLogic",
        type: "address",
      },
    ],
    name: "updateAgreementClass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "isAgreementTypeListed",
    outputs: [
      {
        internalType: "bool",
        name: "yes",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
    ],
    name: "isAgreementClassListed",
    outputs: [
      {
        internalType: "bool",
        name: "yes",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "getAgreementClass",
    outputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bitmap",
        type: "uint256",
      },
    ],
    name: "mapAgreementClasses",
    outputs: [
      {
        internalType: "contract ISuperAgreement[]",
        name: "agreementClasses",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bitmap",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "addToAgreementClassesBitmap",
    outputs: [
      {
        internalType: "uint256",
        name: "newBitmap",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bitmap",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "agreementType",
        type: "bytes32",
      },
    ],
    name: "removeFromAgreementClassesBitmap",
    outputs: [
      {
        internalType: "uint256",
        name: "newBitmap",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSuperTokenFactory",
    outputs: [
      {
        internalType: "contract ISuperTokenFactory",
        name: "factory",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSuperTokenFactoryLogic",
    outputs: [
      {
        internalType: "address",
        name: "logic",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperTokenFactory",
        name: "newFactory",
        type: "address",
      },
    ],
    name: "updateSuperTokenFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "token",
        type: "address",
      },
    ],
    name: "updateSuperTokenLogic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "configWord",
        type: "uint256",
      },
    ],
    name: "registerApp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "configWord",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "registrationKey",
        type: "string",
      },
    ],
    name: "registerAppWithKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "isApp",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "getAppLevel",
    outputs: [
      {
        internalType: "uint8",
        name: "appLevel",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "getAppManifest",
    outputs: [
      {
        internalType: "bool",
        name: "isSuperApp",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isJailed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "noopMask",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
    ],
    name: "isAppJailed",
    outputs: [
      {
        internalType: "bool",
        name: "isJail",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "targetApp",
        type: "address",
      },
    ],
    name: "allowCompositeApp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "contract ISuperApp",
        name: "targetApp",
        type: "address",
      },
    ],
    name: "isCompositeAppAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "isAppAllowed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "isTermination",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAppBeforeCallback",
    outputs: [
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "isTermination",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAppAfterCallback",
    outputs: [
      {
        internalType: "bytes",
        name: "appCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "appAllowanceGranted",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "appAllowanceUsed",
        type: "int256",
      },
      {
        internalType: "contract ISuperfluidToken",
        name: "appAllowanceToken",
        type: "address",
      },
    ],
    name: "appCallbackPush",
    outputs: [
      {
        internalType: "bytes",
        name: "appCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "int256",
        name: "appAllowanceUsedDelta",
        type: "int256",
      },
    ],
    name: "appCallbackPop",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "appAllowanceWantedMore",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "appAllowanceUsedDelta",
        type: "int256",
      },
    ],
    name: "ctxUseAllowance",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "reason",
        type: "uint256",
      },
    ],
    name: "jailApp",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "callAgreement",
    outputs: [
      {
        internalType: "bytes",
        name: "returnedData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
    ],
    name: "callAppAction",
    outputs: [
      {
        internalType: "bytes",
        name: "returnedData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperAgreement",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAgreementWithContext",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "returnedData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperApp",
        name: "app",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "callAppActionWithContext",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "decodeCtx",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "appLevel",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "callType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "msgSender",
            type: "address",
          },
          {
            internalType: "bytes4",
            name: "agreementSelector",
            type: "bytes4",
          },
          {
            internalType: "bytes",
            name: "userData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "appAllowanceGranted",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "appAllowanceWanted",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "appAllowanceUsed",
            type: "int256",
          },
          {
            internalType: "address",
            name: "appAddress",
            type: "address",
          },
          {
            internalType: "contract ISuperfluidToken",
            name: "appAllowanceToken",
            type: "address",
          },
        ],
        internalType: "struct ISuperfluid.Context",
        name: "context",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "isCtxValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "operationType",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct ISuperfluid.Operation[]",
        name: "operations",
        type: "tuple[]",
      },
    ],
    name: "batchCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "operationType",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct ISuperfluid.Operation[]",
        name: "operations",
        type: "tuple[]",
      },
    ],
    name: "forwardBatchCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const IInstantDistributionAgreementV1ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexSubscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexUnitsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexUnsubscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "oldIndexValue",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "newIndexValue",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "totalUnitsPending",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "totalUnitsApproved",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "IndexUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "SubscriptionApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "SubscriptionRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "userData",
        type: "bytes",
      },
    ],
    name: "SubscriptionUnitsUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "realtimeBalanceOf",
    outputs: [
      {
        internalType: "int256",
        name: "dynamicBalance",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "owedDeposit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "agreementType",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "createIndex",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
    ],
    name: "getIndex",
    outputs: [
      {
        internalType: "bool",
        name: "exist",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "indexValue",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "totalUnitsApproved",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "totalUnitsPending",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "calculateDistribution",
    outputs: [
      {
        internalType: "uint256",
        name: "actualAmount",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "newIndexValue",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "uint128",
        name: "indexValue",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "updateIndex",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "distribute",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "approveSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "revokeSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "updateSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
    ],
    name: "getSubscription",
    outputs: [
      {
        internalType: "bool",
        name: "exist",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "pendingDistribution",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
    ],
    name: "getSubscriptionByID",
    outputs: [
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "units",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "pendingDistribution",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
    ],
    name: "listSubscriptions",
    outputs: [
      {
        internalType: "address[]",
        name: "publishers",
        type: "address[]",
      },
      {
        internalType: "uint32[]",
        name: "indexIds",
        type: "uint32[]",
      },
      {
        internalType: "uint128[]",
        name: "unitsList",
        type: "uint128[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "deleteSubscription",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluidToken",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "indexId",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Mainnet DAI, Optimism and Arbitrium Rollup Contracts with local addresses
module.exports = {
  1: {
    contracts: {
      DAI: {
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        abi: DAIABI,
      },
      UNI: {
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        abi: ERC20ABI,
      },
    },
  },
  4: {
    contracts: {
      ISuperfluid: {
        address: "0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6",
        abi: ISuperfluidABI,
      },
      IInstantDistributionAgreementV1: {
        address: "0x32E0ecb72C1dDD92B007405F8102c1556624264D",
        abi: IInstantDistributionAgreementV1ABI,
      },
    },
  },
};
