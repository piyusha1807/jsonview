import React, { useEffect, useRef, useState } from "react";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import ReactJson from "react-json-view";
import CodeMirror from "@uiw/react-codemirror";
import Editor from "@monaco-editor/react";
import { EditorView } from "@codemirror/view";
import { json as jsonLang } from "@codemirror/lang-json";
import * as monaco from "monaco-editor";
import Split from "react-split";
import * as gtag from "../../lib/gtag";
import styled from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputData,
  setInputError,
  setOutputData,
} from "@/store/actions/dashboardAction";

const DynamicReactJson = dynamic(() => import("react-json-view"), {
  ssr: false, // Render only on the client-side
});

const borderRadius = EditorView.theme({
  "&": {
    outline: "none !important",
  },
  // "&.ͼ2 .cm-gutters": {
  //   backgroundColor: "#c1c1c1",
  // },
});

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  autoIndent: "full",
  automaticLayout: true,
  contextmenu: true,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  selectOnLineNumbers: true,
  minimap: {
    enabled: false,
  },
  readOnly: false,
  scrollbar: {
    horizontalSliderSize: 18,
    verticalSliderSize: 18,
  },
};

function Jsontool({
  inputVal,
  outputVal,
  onInputVal,
  onOutputVal,
  onError,
  theme = "dark",
  changeTheme,
}: any) {
  const dispatch = useDispatch();
  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, outputData } = dashboard;
  const [initialSizes, setInitialSizes] = useState([40, 60]);

  const editorRef: any = useRef(null);

  const handleEditorChange: any = (value: string, event: any) => {
    try {
      onError("");
      // const formattedInputVal = prettier.format(value, {
      //   parser: "json",
      //   tabWidth: 2,
      //   printWidth: 30,
      //   plugins: [parserBabel],
      // });
      dispatch(setInputData(value));
      // onInputVal(formattedInputVal);

      let obj = "";
      if (value) {
        obj = JSON.parse(value);
      }
      // onOutputVal(obj);
      dispatch(setOutputData(obj));

      gtag.event({
        action: "format",
        category: "button",
        label: "Format",
        value: "format",
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setInputError(error.message));
        // onError(error.message);
        // onOutputVal("");
        dispatch(setOutputData(""));
      }
    }
  };

  const handleMinify = () => {
    try {
      onError("");
      let minifyInputVal = "";
      if (inputData) {
        minifyInputVal = JSON.stringify(JSON.parse(inputData));
      }
      onInputVal(minifyInputVal);

      if (minifyInputVal) {
        minifyInputVal = JSON.parse(minifyInputVal);
      }
      onOutputVal(minifyInputVal);
      gtag.event({
        action: "minify",
        category: "button",
        label: "Minify",
        value: "minify",
      });
    } catch (error) {
      if (error instanceof Error) {
        onError(error.message);
        onOutputVal("");
      }
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const handleResize = (sizes: any) => {
    setInitialSizes(sizes);
  };

  return (
    <div>
      <Split
        className={styled.container}
        sizes={initialSizes}
        onDragEnd={handleResize}
        direction="horizontal"
        gutterSize={2}
      >
        <div className={styled.inputArea}>
          <Editor
            height="100%"
            language="json"
            value={inputData}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={MONACO_OPTIONS}
            theme="vs-dark"
          />
        </div>
        <div className={styled.outputArea}>
          {outputData && typeof outputData === "object" && (
            <DynamicReactJson
              src={outputData}
              theme={theme === "light" ? "rjv-default" : "google"}
              displayDataTypes={false}
              indentWidth={2}
              collapsed={2}
              enableClipboard={false}
              groupArraysAfterLength={0}
              quotesOnKeys={false}
              style={{
                height: "100%",
                overflow: "auto",
              }}
            />
          )}
        </div>
      </Split>
    </div>
  );
}

export default Jsontool;
