import React, { Component } from 'react';
import Uploader from './uploader';
console.log("app");
export default function HtmlEditor(props){
  const [state,setState] =React.useState({
    process:"Please select a directory to upload.",disabled:false});
  const uploadFile = e => {
    console.log(e);
    console.log("uploadFile");
    setState((state)=>({...state,disabled:true}));
    setState((state)=>({...state,process:'0%'}))
    var files = e.target.files;
    var totalFiles = files.length;
    var filesSent = 0;
    if (totalFiles) {
      var uploader = new Uploader('ws://localhost:8000', ()=>{
        Array.prototype.slice.call(files, 0).forEach((file)=>{
        // files.map((file)=>{
          if (file.name === '.') {
            --totalFiles;
            return;
          }
          uploader.sendFile(file, (error)=>{
            if (error) {
              console.log(error);
              return;
            }
            ++filesSent;
            let progress_innerHTML = ~~((filesSent / totalFiles) * 100) + '%';
            setState(state=>({...state,process:progress_innerHTML}));
            console.log('Sent: ' + file.name);
          });
        });
      });
    }
    uploader.ondone = ()=>{
      uploader.close();
      let progress_innerHTML = '100% done, ' + totalFiles + ' files sent.';
      setState(state=>({...state,process:progress_innerHTML}));
      setState(state=>({...state,disabled:false}));
    };
  };
  let content = `<style>${state.css}</style>${state.html}`;
  return (
    <div>
      <button>toshow</button>
      <p>
        This example will upload an entire directory tree to the node.js
        server via a fast and persistent WebSocket connection.
      </p>
      <p>Note that the example is Chrome only for now.</p>
      <input onChange={uploadFile} type="file" webkitdirectory="true" disabled={state.disabled} />
      <br />
      <br />
      Upload status:
      <div id="progress">{state.process}</div>
    </div>
  );
}
