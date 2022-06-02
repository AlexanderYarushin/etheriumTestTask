import { config } from "../../config";
import { getAddressValueMap } from "./calculate";

const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../../api/template/index.html"));
});

app.use(express.static(__dirname + "/../../../api/template"));

app.post("/getData", async (req, res) => {
  console.log(`Start requests...`);
  const addresses = await getAddressValueMap();

  let maxValue = 0;
  let address: string;

  console.log(`Start calculate...`);
  addresses.forEach((value, key) => {
    if (Math.abs(value) > Math.abs(maxValue)) {
      address = key;
      maxValue = value;
    }
  });

  console.log(`Done`);

  res.send({ value: maxValue, address });
});

app.listen(config.apiPort, () => {
  console.log("Application listening on port 3333!");
});
