import Head from "next/head";
import { FC, useEffect, useState } from "react";

import { IHeaderProps } from "../types";
import { SEOConfig } from "../configs/global_variables";

export const HeadFile: FC<IHeaderProps> = ({ title, canonical }) => {
  const [pageCanonical, setPageCanonical] = useState<string>("");

  useEffect(() => {
    setPageCanonical(window.location.href);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="keywords" content="" />

        <meta httpEquiv="Pragma" content="no-store" />
        <meta httpEquiv="Expires" content="0" />
        <meta httpEquiv="cache-control" content="no-store" />

        <title>{title}</title>
      </Head>
    </>
  );
};

export default HeadFile;
