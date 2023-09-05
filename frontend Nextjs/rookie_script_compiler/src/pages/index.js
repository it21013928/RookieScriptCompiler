import Head from "next/head";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import $ from "jquery";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export default function Home() {
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState("");

  useEffect(() => {
    function executeCode() {
      $.ajax({
        url: "/api/compiler",
        method: "POST",
        data: {
          language,
          code,
        },
        success: function (response) {
          $(".output").text(response);
        },
      });
    }

    $(".btn").on("click", executeCode);
  }, [language, code]);

  return (
    <div>
      <Head>
        <title>Codeboard Online IDE</title>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <div className="header">RookieScript</div>
      <div className="control-panel">
        Select Language: &nbsp; &nbsp;
        <select
          id="languages"
          className="languages"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="php">PHP</option>
          <option value="python">Python</option>
          <option value="node">Node JS</option>
        </select>
      </div>
      <AceEditor
        mode={language === "node" ? "javascript" : language}
        theme="monokai"
        name="editor"
        editorProps={{ $blockScrolling: true }}
        value={code}
        onChange={(newCode) => setCode(newCode)}
        style={{ height: "400px" }}
      />
      <div className="button-container">
        <button className="btn">Run</button>
      </div>
      <div className="output"></div>
    </div>
  );
}
