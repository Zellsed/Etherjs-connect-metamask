import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Image from "next/image";

import imageEth from "../public/img/ether.png";
import creator from "../public/img/creator.png";

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState("");

  const failMesssage = "Please install MetaMask & connect your MetaMask";
  const successMessage = "Your Account Successfully connected to MetaMask";

  const INFURA_ID = "9c481e1168e54cd39869bd50daa755bd";
  const provider = new ethers.providers.JsonRpcProvider(
    `https://blast-mainnet.infura.io/v3/${INFURA_ID}`
  );

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) {
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("Fail");
    }

    const address = "0x7e2a2FA2a064F693f0a55C5639476d913Ff12D05";
    const balance = await provider.getBalance(address);
    const showBalance = `${ethers.utils.formatEther(balance)} ETH\n`;

    setBalance(showBalance);
  };

  const CWallet = async () => {
    if (!window.ethereum) return console.log(failMesssage);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  useEffect(() => {
    checkIfWalletConnected();
  });

  useEffect(() => {
    async function accountChanged() {
      window.ethereum.on("accountsChanged", async function () {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          window.location.reload();
        }
      });
    }
    accountChanged();
  }, []);

  return (
    <div className="card-container">
      {!currentAccount ? "" : <span className="pro">PRO</span>}
      <Image src={creator} alt="profile" width={80} height={80} />
      <h3>Check Ether</h3>

      {!currentAccount ? (
        <div>
          <div className="message">
            <p>{failMesssage}</p>
          </div>

          <Image src={imageEth} alt="ether" width={100} height={100} />
          <p>Welcome to ether account balance checker</p>
        </div>
      ) : (
        <div>
          <h6>
            Verified
            <span className="tick">&#10004;</span>
          </h6>
          <p>
            Ether account and balance Checker <br /> find account details
          </p>
          <div className="buttons">
            <button className="primary ghost" onClick={() => {}}>
              Ether Account Details
            </button>
          </div>
        </div>
      )}
      {!currentAccount && !connect ? (
        <div className="buttons">
          <button className="primary" onClick={() => CWallet()}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="skills">
          <h6>Your Ether</h6>
          <ul>
            <li>Account</li>
            <li>{currentAccount}</li>
            <li>Balance</li>
            <li>{balance}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
