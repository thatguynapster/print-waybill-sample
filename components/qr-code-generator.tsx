import { FC } from "react";
import QRCode from "qrcode.react";

import { IShippingLabel } from "../types";

const QRCodeGen: FC<IShippingLabel> = ({ qr_code, label_id }) => {
  return (
    <div>
      <QRCode
        id={`qr_${label_id}`}
        value={qr_code}
        size={480}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        includeMargin={false}
      />
    </div>
  );
};

export default QRCodeGen;
