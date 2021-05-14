import fetch from "node-fetch";
import { getManagementToken } from "@contentful/node-apps-toolkit";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

var __dirname = fs.realpathSync('.');
const { APP_ID, CONTENT_TYPE_ID, BASE_URL, PRIVATE_APP_KEY } = process.env;
if (!APP_ID || !PRIVATE_APP_KEY) {
  throw new Error(
    "APP ID or private key not specified. Make sure to run app setup first."
  );
}

const privateKey = fs.readFileSync(
    path.join("/Users/rileyzammit/Documents/headless_builds/contentful_sandbox/contentful_poc_riley", "/", PRIVATE_APP_KEY),
    { encoding: "utf8" }
  );
//get access token 
const spaceId = 'on1kn6r2sa5d';
const environmentId = 'master';
const appAccessToken = await getManagementToken(privateKey, {
appInstallationId: APP_ID,
spaceId,
environmentId,
});

const appInstallation = await fetch(
    `${BASE_URL}/spaces/${spaceId}/environments/${environmentId}/app_installations/${APP_ID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appAccessToken}`,
        "Content-Type": "application/json",
      },
    }
  ).then((r) => {
    return r.json()
  }).then((json)=>{
      debugger;
      console.log(json)
  });