import React, { useState } from "react";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import ReactJson from "react-json-view";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { json as jsonLang } from "@codemirror/lang-json";
import Split from "react-split";
import * as gtag from "../lib/gtag";
import styled from "@/styles/Home.module.css";

const borderRadius = EditorView.theme({
  ".cm-scroller, &": {
    borderRadius: "0px",
  },
  "&": {
    border: "1px solid transparent",
  },
});

function Jsontool() {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      setError("");
      setInputVal(
        prettier.format(inputVal, {
          parser: "json",
          tabWidth: 2,
          printWidth: 30,
          plugins: [parserBabel],
        })
      );

      if (inputVal) {
        const obj = JSON.parse(inputVal);
        setOutputVal(obj);
      }

      gtag.event({
        action: "format",
        category: "button",
        label: "Format",
        value: "format",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleMinify = () => {
    try {
      setError("");
      setInputVal(JSON.stringify(JSON.parse(inputVal)));
      gtag.event({
        action: "minify",
        category: "button",
        label: "Minify",
        value: "minify",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return (
    <div>
      <div className={styled.header}>
        <h2 className={styled.title}>JSON Viewer</h2>
        <div className={styled.controls}>
          <button
            type="button"
            className={styled.controls__button}
            onClick={handleFormat}
          >
            Format & View
          </button>
          <button
            type="button"
            className={styled.controls__button}
            onClick={handleMinify}
          >
            Remove white spaces
          </button>
        </div>
        {error && <div className={styled.error}>{error}</div>}
      </div>
      <Split className={styled.container}>
        <div className={styled.inputArea}>
          <CodeMirror
            extensions={[jsonLang(), borderRadius]}
            height="100%"
            style={{ height: "100%" }}
            placeholder="Enter your JSON here..."
            value={inputVal}
            onChange={(val: any) => setInputVal(val)}
          />
        </div>
        <div className={styled.outputArea}>
          {error && <pre className={styled.outputError}>{error}</pre>}

          {outputVal && typeof outputVal === "object" && (
            <ReactJson
              src={outputVal}
              theme="rjv-default"
              displayDataTypes={false}
              collapsed={true}
              enableClipboard={false}
            />
          )}
        </div>
      </Split>
    </div>
  );
}

export default Jsontool;
