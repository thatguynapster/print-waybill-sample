import type { NextPage } from "next";
import dynamic from "next/dynamic";
import moment from "moment";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useSWR from "swr";
import { PrinterIcon } from "@heroicons/react/24/solid";

import HeadFile from "../components/head-file";
import { SEOConfig } from "../configs/global_variables";
import { useCallback, useEffect, useState } from "react";
import { getQuery } from "../utils/functions";
import { IDeliveries } from "../types/deliveries";
import { getDeliveryDetails } from "../utils/api-requests";
import WaybillGenerator from "../components/waybill-generator";
import BarCodeGen from "../components/bar-code-generator";
import QRCodeGen from "../components/qr-code-generator";

const Home: NextPage = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null
  );

  useEffect(() => {
    let _deliveries = getQuery("deliveries");
    console.log(_deliveries);

    let _dels: any[] = [];

    if (_deliveries) {
      _deliveries.split(",").map((_d) => {
        _dels.push(
          new Promise(async (resolve, reject) => {
            let res = await getDeliveryDetails(_d);
            console.log(res);
            res.data.qr_code;
            resolve(res.data);
          })
        );
      });
      console.log(_dels);

      Promise.all(_dels).then((values) => {
        console.log(values);
        setDeliveries(values);
      });
    }

    setIsClient(true);
  }, []);

  return (
    <>
      <HeadFile title={SEOConfig.title} />
      <div className="flex w-screen h-screen items-center justify-center">
        {isClient && deliveries.length > 0 && (
          <div className="flex flex-col gap-8 items-center justify-center w-screen h-[95vh]">
            {deliveries.map((valueString: any) => {
              return (
                <div
                  className="hidden"
                  key={`labelGenerator_${valueString.qr_code}`}
                >
                  <div>
                    <QRCodeGen
                      qr_code={valueString.qr_code}
                      label_id={valueString.qr_code}
                    />
                  </div>

                  <div>
                    <BarCodeGen
                      qr_code={valueString.qr_code}
                      label_id={valueString.qr_code}
                    />
                  </div>
                </div>
              );
            })}
            <PDFDownloadLink
              document={<WaybillGenerator {...{ deliveries }} />}
              fileName={`delivery-waybill_${moment().format("D-MM-yyyy")}.pdf`}
            >
              {({ loading }) => (
                <div className="focus:ring-2 outline-none w-full rounded-lg text-sm font-medium px-4 py-2 hover:bg-neutral-secondary-background border border-neutral-border text-neutral-active hover:text-neutral-active capitalize cursor-pointer">
                  <span className="flex flex-row gap-2 items-center">
                    {loading ? (
                      "Loading Document..."
                    ) : (
                      <>
                        <PrinterIcon className="w-4 h-4 text-current" />
                        {`Download Shipping Label${
                          deliveries.length > 1 ? "s" : ""
                        }`}
                      </>
                    )}
                  </span>
                </div>
              )}
            </PDFDownloadLink>

            <PDFViewer
              className="hidden md:flex md:w-[60vw] w-screen h-full shadow-md"
              showToolbar={true}
            >
              <WaybillGenerator {...{ deliveries }} />
            </PDFViewer>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
