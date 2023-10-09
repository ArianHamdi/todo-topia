import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function getCookie(name) {
                const value = "; " + document.cookie;
                const parts = value.split("; " + name + "=");
                if (parts.length === 2) return parts.pop().split(";").shift();
              }

              const theme = getCookie('theme') || 'light';
              document.documentElement.dataset.theme = theme;

              const urlParams = new URLSearchParams(window.location.search);
              const backgroundColor = urlParams.get('backgroundColor');
              
              if (backgroundColor) {
                document.documentElement.style.setProperty('--primary-color', backgroundColor);
              }
          `,
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
