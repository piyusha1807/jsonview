import React, { useEffect, useRef, useState } from "react";
import Split from "react-split";
import * as gtag from "../lib/gtag";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputData,
  setInputError,
  setOutputData,
} from "@/store/actions/dashboardAction";
import { useMantineColorScheme } from "@mantine/core";
import JsonView from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="loading">Loading...</div>,
});

const Quote = JsonView.Quote;

const customLightTheme = {
  ...lightTheme,
  "--w-rjv-background-color": "#f1f3f5",
};

const customDarkTheme = {
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-string": "#9cdcfe",
  "--w-rjv-background-color": "#25262b",
  "--w-rjv-line-color": "#36334280",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-edit-color": "#9cdcfe",
  "--w-rjv-info-color": "#9c9c9c7a",
  "--w-rjv-update-color": "#9cdcfe",
  "--w-rjv-copied-color": "#9cdcfe",
  "--w-rjv-copied-success-color": "#28a745",

  "--w-rjv-curlybraces-color": "#d4d4d4",
  "--w-rjv-colon-color": "#d4d4d4",
  "--w-rjv-brackets-color": "#d4d4d4",
  "--w-rjv-quotes-color": "#9cdcfe",
  "--w-rjv-quotes-string-color": "#ce9178",

  "--w-rjv-type-string-color": "#ce9178",
  "--w-rjv-type-int-color": "#b5cea8",
  "--w-rjv-type-float-color": "#b5cea8",
  "--w-rjv-type-bigint-color": "#b5cea8",
  "--w-rjv-type-boolean-color": "#569cd6",
  "--w-rjv-type-date-color": "#b5cea8",
  "--w-rjv-type-url-color": "#3b89cf",
  "--w-rjv-type-null-color": "#569cd6",
  "--w-rjv-type-nan-color": "#859900",
  "--w-rjv-type-undefined-color": "#569cd6",
};

const MONACO_OPTIONS = {
  fontFamily: "MonoLisa, monospace",
  fontSize: "15",
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

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.updateOptions({ tabSize: 2 });
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
          options={{ ...MONACO_OPTIONS, ...monacoConfig }}
          theme={colorScheme === "light" ? "light" : "vs-dark"}
        />
      </div>
      <div className="outputArea" id="text-container">
        {outputData && typeof outputData === "object" && (
          <JsonView
            value={outputData}
            displayDataTypes={false}
            collapsed={2}
            enableClipboard={false}
            displayObjectSize={settingsConfig?.displayChildrenCount ?? true}
            style={{
              ...(colorScheme === "light" ? customLightTheme : customDarkTheme),
              height: "100%",
              overflow: "auto",
              fontSize: "15px",
              fontFamily: "MonoLisa, monospace",
            }}
          >
            <Quote>
              <span />
            </Quote>
          </JsonView>
        )}
      </div>
    </Split>
  );
}

export default Jsontool;
