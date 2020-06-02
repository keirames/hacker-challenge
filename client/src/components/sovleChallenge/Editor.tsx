import React from "react";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-min-noconflict/ext-language_tools";

const Editor: React.FC<{ code: string; onCode: (value: string) => void }> = ({
  code,
  onCode,
}) => {
  return (
    <>
      <AceEditor
        placeholder="Placeholder Text"
        mode="javascript"
        theme="tomorrow"
        name="UNIQUE_ID_OF_DIV"
        onLoad={() => {}}
        onChange={(value: string) => onCode(value)}
        fontSize={18}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        style={{ width: "100%", minHeight: "50vh" }}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </>
  );
};

export default Editor;
