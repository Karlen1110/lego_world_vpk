import React, { useState } from "react";
import Loader from "../Loader/Loader";

import s from "./AnalysisData.module.scss";
import Button from "../Button/Button";
import DynamicAnalysisDrawer from "../DynamicAnalysisDrawer/DynamicAnalysisDrawer";
import analysisService from "../../services/analysisService";
import { toast } from "react-toastify";
import AbcAnalysisDrawer from "../AbcAnalysisDrawer/AbcAnalysisDrawer";
import XyzAnalysisDrawer from "../XyzAnalysisDrawer/XyzAnalysisDrawer";

const AnalysisData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicInfo, setDynamicInfo] = useState({});
  const [abcInfo, setAbcInfo] = useState([]);
  const [xyzInfo, setXyzInfo] = useState([]);
  const [isDynamicDrawerOpen, setIsDynamicDraweOpen] = useState(false);
  const [isAbcDrawerOpen, setIsAbcDraweOpen] = useState(false);
  const [isXyzDrawerOpen, setIsXyzDraweOpen] = useState(false);

  const getDynamicInfo = async () => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem("info_data"));
    try {
      const response = await analysisService.dynamicAnalysis(data);
      toast.success("Анализ прошел успешно!");
      setDynamicInfo(response);
      setIsDynamicDraweOpen(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAbcInfo = async () => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem("info_data"));
    try {
      const response = await analysisService.abcAnalysis(data);
      toast.success("Анализ прошел успешно!");
      setAbcInfo(response);
      setIsAbcDraweOpen(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getXyzInfo = async () => {
    setIsLoading(true);
    const data = JSON.parse(localStorage.getItem("info_data"));
    try {
      const response = await analysisService.xyzAnalysis(data);
      toast.success("Анализ прошел успешно!");
      setXyzInfo(response);
      setIsXyzDraweOpen(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s["analysis"]}>
      <h3 className={s["analysis__title"]}>
        Сервис "Анализ данных о продажах"
      </h3>
      {isLoading && <Loader />}
      <DynamicAnalysisDrawer
        isDynamicDrawerOpen={isDynamicDrawerOpen}
        setIsDynamicDraweOpen={setIsDynamicDraweOpen}
        dynamicInfo={dynamicInfo}
      />
      <AbcAnalysisDrawer
        isAbcDrawerOpen={isAbcDrawerOpen}
        setIsAbcDraweOpen={setIsAbcDraweOpen}
        analysisInfo={abcInfo}
      />
      <XyzAnalysisDrawer
        isXyzDrawerOpen={isXyzDrawerOpen}
        setIsXyzDraweOpen={setIsXyzDraweOpen}
        analysisInfo={xyzInfo}
      />
      <div className={s["analysis__buttons"]}>
        <Button variant={"black"} onClick={getDynamicInfo}>
          Анализ динамики продаж
        </Button>
        <Button variant={"white"} onClick={getAbcInfo}>
          ABC-анализ продаж
        </Button>
        <Button variant={"black"} onClick={getXyzInfo}>
          XYZ-анализ продаж
        </Button>
      </div>
    </div>
  );
};

export default AnalysisData;
