"use client";

import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4200927_u6hkw2egip.js",
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
export function BlogAboutIcon() {
  return (
    <IconFont
      type="icon-guanyuwo"
      style={{ fontSize: "16px", marginRight: "8px" }}
    />
  );
}

export function BlogSubcribeIcon() {
  return (
    <IconFont
      type="icon-dingyue"
      style={{ fontSize: "16px", marginRight: "8px" }}
    />
  );
}
