import Head from "next/head";

export default function Prelude() {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="description" content="A simple web OS created in React, inspired by Linux." />
            <meta name="keywords" content="lynix" />
            <meta name="author" content="cursorsdottsx" />
            <meta name="robots" content="follow" />
            <meta name="theme-color" content="#000000" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://cursorsdottsx.github.io/lynix/" />
            <meta property="og:site_name" content="lynix" />
            <meta property="og:keywords" content="lynix" />
            <meta property="og:locale" content="en-US" />
            <meta property="og:title" content="lynix" />
            <meta property="og:description" content="A simple web OS created in React, inspired by Linux." />
            <meta
                property="og:image"
                content="https://og-image.vercel.app/**cursorsdottsx**%2Flynix.png?theme=light&md=1&fontSize=125px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&widths=auto&heights=350"
            />
            <title>lynix</title>
            <link rel="shortcut icon" href="/lynix.svg" type="image/x-icon" />
        </Head>
    );
}
