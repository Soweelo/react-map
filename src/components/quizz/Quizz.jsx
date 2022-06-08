import React, { useEffect, useRef, useState } from "react";
import "./quizz.css"
import moveIframe from "../../functions/moveIframe";
export default function Quizz({ showModal }) {
  const isMounted = useRef(false);
  const iframe = useRef();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      moveIframe("#iFrameResizer0", "#testNosgestesClimats");
    }
  }, []);
  useEffect(() => {
    if (iframe.current) {
      setIsLoading(false);
    }
  }, [iframe]);
  // console.log(iframe.current);
  return (
    <div className="container" id="quizzContainer">
      {/*<h2>iframe paramétré</h2>*/}
      {/*<p>Ci-dessous , nosgestesclimat.fr intégré comme un iframe paramétré.</p>*/}
      {isLoading && (
        <div className={"loaderWrapper"}>
          <span className="loader"></span>
        </div>
      )}
      <div
        id="testNosgestesClimats"
        ref={iframe}
        className="testWrapper"
      ></div>
    </div>
  );
}
