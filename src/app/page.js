"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import robot from "../../public/robot.png";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  const genAI = new GoogleGenerativeAI("AIzaSyDem7aCeq6F1k16klOsd28WuXHuQsxMiTc");

  const handleChange = (e) => {
    setQuestion(e.target.value); // Update the question state
  };

  const runAI = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = question;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setAnswer(text);
  };

  return (
    <>
      <div className="h-full w-screen flex justify-center items-center">
        <div
          className="flex flex-col sm:flex-row gap-4 w-full sm:h-full p-3 sm:p-10"
          style={{
            background: "linear-gradient(to left top, #F5F6FA, #F4F6FE)",
          }}
        >
          <div className="kiri sm:w-1/2 p-4 flex flex-col gap-3">
            <h1 className="text-[#5296A6] drop-shadow-xl stroke-black font-bold text-center sm:hidden text-[3em]">Tanya Piwpiw</h1>
            <div
              className=" rounded-xl text-black shadow-xl p-4 sm:p-2 h-[80vh] max-h-[80vh] sm:h-3/4 w-full"
              style={{
                overflowY: "auto",
                maxHeight: "100%",
                whiteSpace: "pre-wrap",
              }}
            >
              {answer}
            </div>
            <form className="gap-3 w-full flex" onSubmit={runAI}>
              <input type="text" onChange={handleChange} placeholder="Sok tanyain...." className="input text-black bg-white input-bordered w-full" />
              <button type="submit" className="btn font-bold text-white bg-[#5296A6]">
                ASK
              </button>
            </form>
          </div>
          <div className="kanan sm:w-1/2 sm:pr-6">
            <Image className="h-[15em] w-[20em] object-cover" src={robot} alt="" />
            <h1 className="text-black font-bold text-[3em]">Tanya Piwpiw</h1>
            <p className="text-black">Kenalin aku Piwpiw, Asisten AI yang Siap Menjawab Semua Pertanyaan Kamu! sok tanyain apa aja yang bikin kamu pusing dan butuh aku bantu</p>
            <p className="text-black pt-[6em]">© Copyright All Right Reserved | Danu Wardana</p>
          </div>
        </div>
      </div>
    </>
  );
}
