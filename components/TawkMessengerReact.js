import React from 'react'

import Script from "next/script";

const TawkMessengerReact = () => {
  return (
    <Script id="tawk" strategy="lazyOnload">
          {`

      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://tawk.to/chat/67138b002480f5b4f58ff64a/1iai5dup9';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();

        `}
        </Script>
  )
}

export default TawkMessengerReact