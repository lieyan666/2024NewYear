/*
 * @Author: Lieyan
 * @Date: 2023-12-31 20:40:02
 * @LastEditors: Lieyan
 * @LastEditTime: 2023-12-31 21:10:51
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

// 获取随机句子的函数
async function getRandomSentence() {
  const sentences = await readSentencesFromFile();
  if (sentences.length === 0) {
    return "No sentences available.";
  }
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

// 定义 API
app.get("/api/random-sentence", async (req, res) => {
  const randomSentence = await getRandomSentence();
  res.json({ sentence: randomSentence });
});

app.get("/web", (req, res) => {
  const filePath = path.join(__dirname, "web.html");
  res.sendFile(filePath);
});

app.get("/", async (req, res) => {
  res.send("2024 New Year Event. API By Chy Lieyan");
});

// 启动服务
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
