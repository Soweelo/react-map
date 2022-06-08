import React, { useState } from "react";
import "./legend.css";

export default function Legend({ setMapId }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="legendContainer" style={{ left: open ? "0px" : "-185px" }}>
      <div className="legendWrapper">
        <ul className="list">
          <li
            className="listitem"
            data-map="landscapeMap"
            onClick={(e) => {
              setMapId(e.target.getAttribute("data-map"));


            }}
          >
            Production
          </li>
          <li
            className="listitem"
            data-map="watercolorMap"
            onClick={(e) => {
              setMapId(e.target.getAttribute("data-map"));

            }}
          >
            Stockage
          </li>
          <li className="listitem">Transport</li>
          <li className="listitem">Usage</li>
        </ul>
      </div>
      <div
        className="controlIconContainer"
        onClick={() => setOpen(!open)}
      >
        <div className="controlIconWrapper">
          <span
            className={
              "controlIconItem " +
              (open ? "opened" : "closed")
            }
          ></span>
          <span
            className={
              "controlIconItem " +
              (open ? "opened" : "closed")
            }
          ></span>
        </div>
      </div>
    </div>
  );
}
