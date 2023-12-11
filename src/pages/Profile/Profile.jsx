import React, { useCallback, useEffect, useState } from "react";
import s from "./Profile.module.scss";
import Header from "../../components/Header/Header";
import productService from "../../services/productService";
import { toast } from "react-toastify";
import { Spinner } from "../../components/Loader/Loader";
import Purchase from "../../components/Purchase/Purchase";
import MarkUp from "../../components/MarkUp/MarkUp";
import stockService from "../../services/stockService";
import InfoSales from "../../components/InfoSales/InfoSales";
import AnalysisData from "../../components/AnalysisData/AnalysisData";

import Web3 from "web3";
import { ContractABI } from "../../contracts/Wallet";

const Profile = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userData")));
  const [cart, setCart] = useState([]);
  const [stock, setStock] = useState([]);

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [contractBalance, setContractBalance] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContract, setIsLoadingContract] = useState(true);

  const getCart = useCallback(async () => {
    if (userInfo === null) return;
    setIsLoading(true);
    const params = { id: userInfo.userId };
    try {
      const response = await productService.getCart(params);
      setCart(response);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [userInfo]);

  const getStockItems = async () => {
    setIsLoading(true);
    const params = { type: "lego" };
    try {
      const stockItems = await stockService.getStock(params);
      setStock(stockItems);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const initContract = async () => {
    setIsLoadingContract(true);
    try {
      const web3Instance = new Web3("http://127.0.0.1:7545");
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();

      const balances = await Promise.all(
        accounts.map(async (account) => {
          const balance = await web3Instance.eth.getBalance(account);
          return {
            address: account,
            balance: web3Instance.utils.fromWei(balance, "ether"),
          };
        })
      );
      setAccounts(balances);

      const contractInstance = new web3Instance.eth.Contract(
        ContractABI,
        "0x26E35C4b226d8Fb2AB33b168aE6c3ff05E5D5c29"
      );
      setContract(contractInstance);

      const contractBalance = await web3Instance.eth.getBalance(
        contractInstance.options.address
      );
      setContractBalance(web3Instance.utils.fromWei(contractBalance, "ether"));
    } catch (error) {
      console.error("Error initializing web3", error);
    } finally {
      setIsLoadingContract(false);
    }
  };

  useEffect(() => {
    getCart();
    getStockItems();
    initContract();
  }, [getCart]);

  if (isLoading || isLoadingContract) return <Spinner />;

  return (
    <div className={s["profile"]}>
      <Header />
      <div className={s["container"]}>
        <Purchase
          cart={cart}
          web3={web3}
          contract={contract}
          accounts={accounts}
          contractBalance={contractBalance}
        />
        <MarkUp stock={stock} />
        <InfoSales stock={stock} />
        <AnalysisData />
      </div>
    </div>
  );
};

export default Profile;
