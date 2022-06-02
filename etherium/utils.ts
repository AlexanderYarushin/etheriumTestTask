import { config } from "../config";
import fetch from "node-fetch";
import { EtheriumBlock } from "./types";

export const FAILED_REQUEST = "NOTOK";

export const getEtheriumBlock = async (tag: number) => {
  return getRequest(config.etheriumApiUrl.replace("%1", tag.toString(16)));
};

export const getLastEtheriumBlock = async (): Promise<EtheriumBlock> => {
  return getRequest(config.lastEtheriumBlockUrl);
};

export const getRequest = async (url: string) => {
  return (await fetch(url, { method: "GET" })).json();
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
