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

              function getFragmentValue(key) {
                const hash = window.location.hash.substring(1);
                
                const decodedHash = decodeURIComponent(hash);
                
                const pattern = new RegExp(key + "=(.*?)(?:&|$)", 'g');
                
                let match = pattern.exec(decodedHash);
                
                if (match) {
                  return match[1];
                }
                
                return null;
              }

              function getBgColor() {
                // Get the tgWebAppThemeParams from the fragment
                const tgWebAppThemeParamsStr = getFragmentValue('tgWebAppThemeParams');
                
                // If tgWebAppThemeParams is present
                if (tgWebAppThemeParamsStr) {
                  // Parse the JSON string to an object
                  const tgWebAppThemeParamsObj = JSON.parse(tgWebAppThemeParamsStr);
                  
                  // Extract and return bg_color
                  return tgWebAppThemeParamsObj.bg_color;
                }
                
                return null;
              }

              const theme = getCookie('theme') || 'light';
              document.documentElement.dataset.theme = theme;

              const backgroundColor = getBgColor();

              console.log("backgroundColor",backgroundColor)
              
              if (backgroundColor) {
                document.documentElement.style.setProperty('--color-primary',backgroundColor);
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
