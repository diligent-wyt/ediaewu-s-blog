"use client";

import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4200927_g2tscsqctji.js",
});

export function BlogHeaderIcon() {
  return (
    <IconFont
      type="icon-chaiquan"
      style={{ fontSize: "19px", marginRight: "8px" }}
    />
  );
}

export function BlogPageIcon() {
  return (
    <IconFont
      type="icon-shangyiye"
      style={{ fontSize: "14px", marginRight: "8px" }}
    />
  );
}

export function BlogPageRightIcon() {
  return (
    <IconFont
      type="icon-xiayiye"
      style={{ fontSize: "14px", marginLeft: "8px" }}
    />
  );
}

export function BlogSearchIcon() {
  return (
    <IconFont
      type="icon-sousuo"
      style={{ fontSize: "14px", marginLeft: "8px" }}
    />
  );
}
