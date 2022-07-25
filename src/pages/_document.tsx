import {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'
import React from "react";

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Whiteboard Dev</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;600&display=swap"
                    rel="stylesheet"/>

            </Head>
            <body>
            <Main/>
            <NextScript/>
            <Script src="https://embed.runkit.com" strategy={"afterInteractive"} ></Script>
            <Script strategy={"lazyOnload"}>
                {`RunKit.createNotebook({ 
                   title: 'Snippet of the Week',
                   element: document.getElementById("code-display"),
                   source: document.getElementById("code-drop").innerText,
                   minHeight: '250px',
                   gutterStyle: 'inside',
                   nodeVersion: '16.16.0'
                })`}
            </Script>
            </body>
        </Html>
    )
}