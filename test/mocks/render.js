export const render = (opts) => {
  const {
    title,
    body,
    stylesheet,
    favicon,
    bundle,
  } = opts;
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="E=edge" />
      <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
      <title>${title}</title>
      <link rel="shortcut icon" href="${favicon}" />}
      <link rel="stylesheet" href="${stylesheet}" />}
    </head>
    <body>
      <div id="root">
      ${body}
      </div>
      <script src="${bundle}"" />
    </body>
  </html>
  `;
};

export const simpleRender = (opts) => {
  const {
    body,
    bundle,
  } = opts;
  return `<html>${body}<script src="${bundle}"></script></html>`;
};
