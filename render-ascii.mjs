import { readFileSync, writeFileSync } from "node:fs";

const lines = readFileSync("ascii-pfp.txt", "utf8").trimEnd().split("\n");
const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const render = ({ background, foreground, output }) => {
  const lineHeight = 10.5;
  const padding = 20;
  const width = 470;
  const height = 470;
  const rows = lines.map((line, index) =>
    `    <tspan x="${padding}" y="${padding + 8 + index * lineHeight}">${escapeXml(line)}</tspan>`
  ).join("\n");

  writeFileSync(output, `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="ASCII portrait of Yohance">
  <style>
    text { font: 8px ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; white-space: pre; }
  </style>
  <rect width="100%" height="100%" rx="12" fill="${background}"/>
  <text fill="${foreground}">
${rows}
  </text>
</svg>
`);
};

render({ background: "#f6f8fa", foreground: "#24292f", output: "ascii-light.svg" });
render({ background: "#0d1117", foreground: "#c9d1d9", output: "ascii-dark.svg" });
