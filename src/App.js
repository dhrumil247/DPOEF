import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import Button from './Button'
import useLocalStorage from './local'



function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
 
  const [myLang, setMyLang] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className = "buttonpane">
      <Button
        onClick={() => {
          setMyLang("html");
        }}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--medium"
      >
        HTML
      </Button>
      <Button
        onClick={() => {
          setMyLang("css");
        }}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--medium"
      >
        CSS
      </Button>
      <Button
        onClick={() => {
          setMyLang("js");
        }}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--medium"
      >
        JS
      </Button>
      </div>
      <div className = "author">
      By Dhrumil Prakash Makhija 18BCE0843
      </div>
      <div className="pane top-pane">
      {myLang === "html" && (
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
      )}
      {myLang === "css" && (
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
      )}
      {myLang === "js" && (
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      )}
      </div>
           
      
      
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
        </>
  )
}

export default App;