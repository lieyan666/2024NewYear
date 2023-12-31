/*
 * @Author: Lieyan
 * @Date: 2023-12-31 20:40:02
 * @LastEditors: Lieyan
 * @LastEditTime: 2023-12-31 22:14:36
 * @FilePath: /2024NewYear/app.js
 * @Description:
 * @Contact: QQ: 2102177341  Website: lieyan.space  Github: @lieyan666
 * @Copyright: Copyright (c) 2023 by lieyanDevTeam, All Rights Reserved.
 */
const express = require("express");
const fs = require("fs/promises"); // 使用 fs.promises 进行异步文件操作
const path = require("path");
const app = express();

const port = 52024;

var cntS = 0;
var cntN = 0;

// 从文件中读取句子
async function readSentencesFromFile() {
  try {
    const data = await fs.readFile("sentences.txt", "utf-8");
    return data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
  } catch (error) {
    console.error("Error reading sentences from file:", error.message);
    return [];
  }
}
async function readNamesFromFile() {
    try {
      const data = await fs.readFile("names.txt", "utf-8");
      return data
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
    } catch (error) {
      console.error("Error reading names from file:", error.message);
      return [];
    }
  }

// 获取随机句子
async function getRandomSentence() {
  const sentences = await readSentencesFromFile();
  if (sentences.length === 0) {
    return "No sentences available.";
  }
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}
// 获取随机名字
async function getRandomName() {
    const names = await readNamesFromFile();
    if (names.length === 0) {
      return "No name available.";
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

function getTime() {
  // 获取当前时间
  const currentTime = new Date();
  const formattedTime = `${currentTime.getFullYear()}-${(
    currentTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentTime
    .getDate()
    .toString()
    .padStart(2, "0")} ${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`;
  return formattedTime;
}

// 定义 API
app.get("/api/random-sentence", async (req, res) => {
  const randomSentence = await getRandomSentence();
  let time = getTime();
  console.log(`{${++cntS}} [${time}] : ${randomSentence}`);
  res.json({ sentence: randomSentence });
});
app.get("/api/random-name", async (req, res) => {
    const randomName = await getRandomName();
    let time = getTime();
    console.log(`{${++cntN}} [${time}] : ${randomName}`);
    res.json({ name: randomName });
  });

app.get("/web", (req, res) => {
  const filePath = path.join(__dirname, "web.html");
  // 获取时间和ip
  const time = getTime();
  const ip = req.ip;
  console.log(`[${time}] [${ip}] Get Web Page`);
  res.sendFile(filePath);
});

app.get("/", async (req, res) => {
  res.send("2024 New Year Event. API By Chy Lieyan");
});

// 启动服务
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});