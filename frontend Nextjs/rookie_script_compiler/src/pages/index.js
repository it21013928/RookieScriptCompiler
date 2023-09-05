import Head from "next/head";
import { useEffect } from "react";

import AceEditor from "react-ace"; // Import the AceEditor component
import "ace-builds/src-noconflict/theme-monokai"; // Import the Ace theme
import "ace-builds/src-noconflict/mode-c_cpp"; // Import the Ace mode for C/C++
import "ace-builds/src-noconflict/mode-php"; // Import the Ace mode for PHP
import "ace-builds/src-noconflict/mode-python"; // Import the Ace mode for Python
import "ace-builds/src-noconflict/mode-javascript"; // Import the Ace mode for JavaScript
import $ from "jquery";

export default function Home() {
  useEffect(() => {
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");

    function changeLanguage() {
      const language = $("#languages").val();
      if (language === "c" || language === "cpp")
        editor.session.setMode("ace/mode/c_cpp");
      else if (language === "php") editor.session.setMode("ace/mode/php");
      else if (language === "python") editor.session.setMode("ace/mode/python");
      else if (language === "node")
        editor.session.setMode("ace/mode/javascript");
    }

    function executeCode() {
      $.ajax({
        url: "/api/compiler",
        method: "POST",
        data: {
          language: $("#languages").val(),
          code: editor.getSession().getValue(),
        },
        success: function (response) {
          $(".output").text(response);
        },
      });
    }

    $("#languages").on("change", changeLanguage);
    $(".btn").on("click", executeCode);
  }, []);

  return (
    <div>
      <Head>
        <title>Codeboard Online IDE</title>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <div className="header">RookieScript</div>
      <div className="control-panel">
        Select Language: &nbsp; &nbsp;
        <select id="languages" className="languages">
          {/* ... */}
        </select>
      </div>
      <AceEditor
        mode="c_cpp" // Set the default mode here
        theme="monokai" // Set the default theme here
        name="editor"
        editorProps={{ $blockScrolling: true }}
      />

      <div className="button-container">
        <button className="btn">Run</button>
      </div>
      <div className="output"></div>
    </div>
  );
}
