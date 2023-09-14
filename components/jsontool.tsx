import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import Split from "react-split";
import * as gtag from "../lib/gtag";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputData,
  setInputError,
  setOutputData,
} from "@/store/actions/dashboardAction";
import { Box, useMantineColorScheme } from "@mantine/core";

const DynamicReactJson = dynamic(() => import("react-json-view"), {
  ssr: false, // Render only on the client-side
});

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
  fontFamily: "MonoLisa, monospace",
  fontSize: 14,
  autoIndent: "full",
  automaticLayout: true,
  contextmenu: true,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  selectOnLineNumbers: true,
  // renderLineHighlight: "none",
  // overviewRulerBorder: false,
  // wordWrap: "on",
  // wrappingStrategy: "advanced",
  minimap: {
    enabled: false,
  },
  readOnly: false,
  scrollbar: {
    horizontalSliderSize: 18,
    verticalSliderSize: 18,
  },
};

function Jsontool() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, outputData, monacoConfig, settingsConfig } = dashboard;
  const { colorScheme } = useMantineColorScheme();
  const [initialSizes, setInitialSizes] = useState([40, 60]);
  const editorRef: any = useRef(null);

  useEffect(() => {
    handleEditorChange(inputData);
  }, []);

  const handleEditorChange: any = (value: string) => {
    try {
      dispatch(setInputError(""));
      dispatch(setInputData(value));

      let obj = "";
      if (value) {
        obj = JSON.parse(value);
      }
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
      <Split
        className="container"
        sizes={initialSizes}
        onDragEnd={handleResize}
        direction="horizontal"
        gutterSize={5}
      >
        <div className="inputArea">
          <Editor
            height="100%"
            className="editor"
            language="json"
            value={inputData}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{...MONACO_OPTIONS, ...monacoConfig}}
            theme={colorScheme === "light" ? "light" : "vs-dark"}
          />
        </div>
        <div className="outputArea">
          {outputData && typeof outputData === "object" && (
            <DynamicReactJson
              src={outputData}
              theme={colorScheme === "light" ? "rjv-default" : "chalk"}
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
  );
}

export default Jsontool;
