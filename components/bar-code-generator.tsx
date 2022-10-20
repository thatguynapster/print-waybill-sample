import { FC } from "react";
import { useBarcode } from "react-barcodes";

import { IShippingLabel } from "../types";

const BarCodeGen: FC<IShippingLabel> = ({ qr_code, label_id }) => {
  const { inputRef } = useBarcode({
    value: qr_code,
    options: {
      displayValue: false,
      format: "CODE128",
    },
  });

  return (
    <div>
      <canvas id={`bar_${label_id}`} ref={inputRef} />
    </div>
  );

  // return (
  //   <div>
  //     <Barcode id={label_id} value={qr_code} />
  //   </div>

  // )
};

export default BarCodeGen;
