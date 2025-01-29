import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="wp-block-library-styles"
      rel="stylesheet"
      href="https://studiosc.theremotecreative.com/wp-includes/css/dist/block-library/style.min.css"
    />,
    <link
      key="wp-block-theme-styles"
      rel="stylesheet"
      href="https://studiosc.theremotecreative.com/wp-includes/css/dist/block-library/theme.min.css"
    />,
  ]);
};
