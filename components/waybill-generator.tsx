import React, { FC } from "react";
import {
  Document,
  Page,
  Image,
  Text,
  View,
  Svg,
  Path,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";

// Create Document Component
const WaybillGenerator: FC<{ deliveries: any[] }> = ({ deliveries = [] }) => {
  const resultArray = deliveries?.map((delivery) => {
    console.log(delivery);

    let qrCanvas = document.getElementById(
      `qr_${delivery.qr_code}`
    ) as HTMLCanvasElement;
    let barCodeCanvas = document.getElementById(
      `bar_${delivery.qr_code}`
    ) as HTMLCanvasElement;

    return {
      ...delivery,
      id: delivery.qr_code,
      qr_code: qrCanvas.toDataURL(),
      bar_code: barCodeCanvas.toDataURL(),
    };
  });

  return (
    <Document
      title={`delivery-waybill_${moment().format("D-MM-yyyy")}.pdf`}
      subject={`delivery-waybill_${moment().format("D-MM-yyyy")}.pdf`}
    >
      {resultArray.map((dataURl, i) => {
        return (
          <Page
            key={`PageId_${i}`}
            style={styles.page}
            size={"A4"}
            orientation="portrait"
          >
            <View style={styles.mainView}>
              <View style={styles.borderedPartition}>
                <View style={styles.niceBox}>
                  <Text style={styles.centeredText}> </Text>
                  {/* notification for paid or pending */}
                  <Text style={styles.centeredText}> </Text>
                  {/* cash spent */}
                </View>
                <View style={styles.cascadeLeft}>
                  <View style={styles.horizontalBox}>
                    <Text style={styles.trackingCode}>Tracking Code: </Text>
                    <Text style={styles.trackingCodeText}>
                      #{dataURl.tracking_code}
                    </Text>
                    {/*place tracking code here ^ */}
                  </View>
                  <Text style={styles.text}>
                    Need help? visit:{" "}
                    <Text style={{ textDecoration: "underline" }}>
                      www.help.swoove.delivery
                    </Text>{" "}
                  </Text>
                  <Text style={styles.text}>Or call 059 379 4633</Text>
                </View>
              </View>
              <View style={styles.borderedPartition}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image style={styles.QRImage} src={dataURl.qr_code} />
                <View style={styles.barcodeAllignment}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image style={styles.BarCodeImage} src={dataURl.bar_code} />
                  <View style={styles.LabelCodeView}>
                    {/* <Text fixed>CODE:</Text>{" "} */}
                    <Text
                      fixed
                      style={{
                        textAlign: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {dataURl.id}
                    </Text>
                  </View>
                </View>
                <View style={styles.barcodeAllignment}>
                  <View style={styles.ZoneView}>
                    <Text
                      fixed
                      style={{
                        textAlign: "right",
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontSize: "50px",
                      }}
                    >
                      {dataURl.centers?.dropoff?.center?.display_name ??
                        dataURl.dropoff_center.display_name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.partition}>
                <View style={styles.cascadeLeft}>
                  <Text style={styles.text}>Recievers Details </Text>
                  {/* place recievers data here */}
                  <Text style={styles.placeText}>
                    {dataURl.dropoff.contact.name}
                  </Text>
                  <Text style={styles.placeText}>
                    {dataURl.dropoff.contact.mobile}
                  </Text>
                  <Text style={styles.placeText}>
                    {dataURl.dropoff.location}
                  </Text>
                  <Text style={styles.placeText}>
                    {dataURl.centers?.dropoff?.center?.display_name ??
                      dataURl.dropoff_center.display_name}
                  </Text>
                </View>
                <View style={styles.cascadeLeft}>
                  <Text style={styles.text}>Senders Details </Text>
                  {/* place senders data here */}
                  <Text style={styles.placeText}>
                    {dataURl.pickup.contact.name}
                  </Text>
                  <Text style={styles.placeText}>
                    {dataURl.pickup.contact.mobile}
                  </Text>
                  <Text style={styles.placeText}>
                    {dataURl.pickup.location}
                  </Text>
                  <Text style={styles.placeText}>
                    {dataURl.centers?.pickup.center?.display_name ??
                      dataURl.pickup_center.display_name}
                  </Text>
                </View>
              </View>
              <View style={styles.borderedPartition}>
                {/* <View style={styles.cascadeLeft}>
                  <Text style={styles.placeText}>Type:</Text>
                  <Text style={styles.placeText}>Size:</Text>
                  <Text style={styles.placeText}>Weight:</Text>
                  <Text style={styles.placeText}>Item value:</Text>
                </View>
                <View style={styles.cascadeLeft}>
                  <Text id="Type" style={styles.placeText}>
                    {dataURl.items[0].itemName}
                  </Text>
                  <Text id="Size" style={styles.placeText}>
                    {dataURl.items[0].itemSize ?? "Small"}
                  </Text>
                  <Text id="Weight" style={styles.placeText}>
                    {dataURl.items[0].itemWeight
                      ? `${dataURl.items[0].itemWeight}kg`
                      : "N/A"}
                  </Text>
                  <Text id="Item_value" style={styles.placeText}></Text>
                </View> */}
                <View style={styles.cascadeLeft}>
                  <Text style={styles.placeText}>Type: </Text>
                  <Text style={styles.placeText}>Size: </Text>
                  <Text style={styles.placeText}>Weight: </Text>
                  <Text style={styles.placeText}>Item value: </Text>
                </View>
                <View style={styles.cascadeLeft}>
                  <Text id="Delivery_Type" style={styles.placeText}>
                    {dataURl.items[0].itemName}
                  </Text>
                  <Text id="Delivery_Fee" style={styles.placeText}>
                    {dataURl.items[0].itemSize ?? "Small"}
                  </Text>
                  <Text style={styles.placeText}>
                    {dataURl.items[0].itemWeight
                      ? `${dataURl.items[0].itemWeight}kg`
                      : "N/A"}
                  </Text>
                  <Text style={styles.placeText}> </Text>
                </View>

                <View style={styles.cascadeLeft}>
                  <Text style={styles.placeText}>Delivery Type: </Text>
                  <Text style={styles.placeText}>Delivery Fee: </Text>
                  <Text style={styles.emptyText}> </Text>
                  <Text style={styles.emptyText}> </Text>
                </View>
                <View style={styles.cascadeLeft}>
                  <Text id="Delivery_Type" style={styles.placeText}>
                    {dataURl.delivery_type}
                  </Text>
                  <Text id="Delivery_Fee" style={styles.placeText}>
                    {`GHS ${dataURl.full_price.value.toFixed(2)}`}
                  </Text>
                  <Text style={styles.emptyText}> </Text>
                  <Text style={styles.emptyText}> </Text>
                </View>
              </View>
              <View style={styles.partition}>
                <View style={styles.attemptView}>
                  <View style={styles.attempt}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.text}>Attempt 1</Text>
                    <View style={styles.views}></View>
                    <View style={styles.views}></View>
                  </View>
                  <View style={styles.attempt}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.text}>Attempt 2</Text>
                    <View style={styles.views}></View>
                    <View style={styles.views}></View>
                  </View>
                  <View style={styles.attempt}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.text}>Attempt 3</Text>
                    <View style={styles.views}></View>
                    <View style={styles.views}></View>
                  </View>
                </View>
              </View>
              <View style={styles.partition}>
                <View style={styles.logoView}>
                  {/* @ts-ignore */}
                  <Svg
                    style={styles.logo}
                    width="134px"
                    height="32px"
                    viewBox="0 0 100 30"
                  >
                    <Path
                      d="M53.6599 20.8132L52.9828 17.0049C54.2907 17.2345 55.4763 17.4421 56.7907 17.6721C56.4804 18.0051 56.2244 18.2051 56.0749 18.466C55.9789 18.6335 55.9414 18.9791 56.0453 19.0933C57.3284 20.5021 58.6438 21.9039 60.6336 22.28C63.2104 22.7679 65.4694 22.1382 67.1801 20.0958C69.1387 17.758 69.3672 14.7682 67.7237 12.2398C66.4675 10.307 64.6347 9.29024 62.2559 9.19691C59.858 9.10279 58.1827 10.3065 56.6159 11.8909C53.7264 14.8132 50.8036 17.7024 47.8791 20.5892C46.6915 21.762 45.4806 22.8975 43.7923 23.3701C39.9557 24.4453 35.4236 22.6372 34.0058 18.4866C32.5274 14.16 34.774 9.76541 38.7578 8.38465C41.6404 7.38519 44.3796 7.82159 46.6996 9.92703C47.9598 11.071 49.1519 12.2893 50.3574 13.4916C50.5447 13.6779 50.7272 13.9512 50.7441 14.196C50.7556 14.3636 50.5017 14.6573 50.3195 14.7018C50.1973 14.718 50.0731 14.7082 49.955 14.673C49.8369 14.6379 49.7275 14.5781 49.6341 14.4977C48.6492 13.5713 47.6933 12.6146 46.7316 11.6641C45.7134 10.6575 44.6575 9.71268 43.1988 9.38656C38.8897 8.42367 35.4171 11.1325 34.8952 14.8465C34.3658 18.6157 36.7366 21.7882 40.4694 22.3677C42.6216 22.7028 44.5544 22.072 46.1485 20.4853C49.6816 16.9692 53.2453 13.4834 56.8011 9.98911C58.2672 8.54832 60.0928 7.87018 62.096 7.88989C66.0254 7.92823 69.1607 10.5242 69.8981 14.2921C70.7121 18.4517 68.191 22.4534 64.0655 23.4451C61.2797 24.1153 58.7302 23.519 56.6159 21.4775C56.1737 21.0497 55.7349 20.6193 55.2946 20.1899C54.9457 19.8498 54.6165 19.7884 54.2789 20.2202C54.1321 20.4084 53.9327 20.5556 53.6599 20.8132Z"
                      fill="#EB6630"
                      stroke="#EB6630"
                      stroke-width="0.5"
                    />
                    <Path
                      d="M100.498 18.8746C99.989 20.1787 99.3391 21.3033 98.3134 22.1701C96.3074 23.8653 93.9595 24.3847 91.3831 24.1778C88.1998 23.9215 84.8193 21.5872 84.1994 17.1311C83.56 12.533 86.2308 8.51731 90.8299 7.64716C95.5328 6.7575 100.085 9.43102 100.875 14.4081C100.944 14.8383 100.95 15.2772 100.993 15.7113C101.032 16.1132 100.884 16.2533 100.456 16.2521C96.0041 16.239 91.5518 16.2473 87.0996 16.2495C86.8356 16.2495 86.5715 16.2474 86.3078 16.2511C85.6782 16.2601 85.5883 16.3627 85.6735 16.9629C85.8961 18.4844 86.6266 19.8859 87.7464 20.9397C88.8661 21.9936 90.3093 22.6379 91.8415 22.7679C94.9164 23.0391 97.2325 21.8701 98.7736 19.1811C98.8787 18.9977 99.1601 18.8412 99.3782 18.8129C99.7163 18.7681 100.07 18.8436 100.498 18.8746ZM92.4893 14.8123V14.8221C94.5802 14.8221 96.6714 14.8371 98.762 14.8135C99.455 14.8056 99.4815 14.7018 99.3036 14.0204C98.5093 10.9732 95.3061 8.37523 91.5966 8.95365C88.6164 9.41853 86.402 11.3954 85.7453 14.286C85.643 14.736 85.7929 14.8138 86.1642 14.8135C88.2727 14.8116 90.3811 14.8112 92.4893 14.8124V14.8123Z"
                      fill="#152DA0"
                      stroke="#152DA0"
                      stroke-width="0.5"
                    />
                    <Path
                      d="M22.5194 13.0742C22.4442 13.2446 22.3565 13.4105 22.2955 13.5856C21.1699 16.8206 20.0353 20.053 18.9384 23.2976C18.7807 23.7633 18.5228 23.8334 18.1204 23.8083C17.718 23.7833 17.3294 23.9077 17.1183 23.3282C15.3124 18.3662 13.4703 13.4176 11.6411 8.46408C11.582 8.30432 11.5471 8.13591 11.4785 7.89248C11.9605 7.89248 12.3852 7.84219 12.7865 7.91611C12.962 7.94804 13.1553 8.20951 13.23 8.40889C13.9391 10.2899 14.6245 12.18 15.3167 14.067C16.1293 16.2828 16.9425 18.4987 17.7563 20.7147C17.8194 20.8882 17.9389 21.0356 18.0956 21.1333C18.2915 20.6236 18.5007 20.1182 18.6809 19.603C19.7492 16.5507 20.8127 13.4965 21.8713 10.4404C21.9994 10.0699 22.2295 9.9246 22.6203 9.92706C23.0192 9.93032 23.2424 10.0439 23.3874 10.4612C24.5521 13.8111 25.7455 17.1509 26.9325 20.4935C27.0077 20.7047 27.1035 20.9099 27.2446 21.2506C27.3894 20.9563 27.5009 20.7744 27.5725 20.5787C29.0788 16.4749 30.5867 12.3717 32.0962 8.26904C32.141 8.17781 32.2054 8.09758 32.2848 8.03406C32.3642 7.97054 32.4565 7.92529 32.5554 7.90153C32.9117 7.84496 33.2834 7.88459 33.7264 7.88459C33.6909 8.11086 33.6413 8.33471 33.5779 8.55479C32.2161 12.2458 30.8508 15.9349 29.4822 19.622C29.0214 20.8674 28.5494 22.1087 28.1185 23.3644C27.9968 23.7186 27.8153 23.8446 27.4681 23.8058C27.3633 23.7898 27.2568 23.7898 27.1521 23.8058C26.6606 23.9028 26.4453 23.6758 26.2887 23.2212C25.2181 20.1161 24.1225 17.0187 23.0316 13.9196C22.9299 13.631 22.8049 13.3507 22.6902 13.0662L22.5194 13.0742Z"
                      fill="#152DA0"
                      stroke="#152DA0"
                      stroke-width="0.5"
                    />
                    <Path
                      d="M6.03938 7.47806C8.30339 7.47038 9.9132 8.67056 10.3964 10.7501C10.4682 11.0921 10.4938 11.4423 10.4725 11.7911C10.4678 11.9022 10.2941 12.0619 10.1678 12.0997C9.99037 12.153 9.78281 12.0974 9.59151 12.1187C9.11707 12.1707 8.98215 11.9224 8.96431 11.5007C8.87748 9.45666 7.29517 8.72635 5.74066 8.88955C4.60727 9.00782 3.63758 9.49743 3.23952 10.6212C2.60935 12.4002 3.35946 13.6055 5.18451 14.291C6.06668 14.6222 6.9932 14.8346 7.88296 15.1473C9.8245 15.8293 10.7745 17.2162 10.8967 19.2477C11.0612 21.9813 8.93385 24.3104 5.93274 24.2223C3.55341 24.1519 1.53766 22.7207 1.11249 20.4591C1.05235 20.115 1.01521 19.7672 1.00132 19.4181C0.984863 19.1059 1.12097 18.9171 1.47498 18.9532C1.63291 18.9666 1.79173 18.9659 1.94952 18.951C2.26993 18.9261 2.40879 19.0372 2.45127 19.3846C2.59526 20.5639 2.94405 21.6493 4.06078 22.3009C5.70478 23.2597 8.60882 23.0077 9.32541 20.4102C9.77493 18.7814 9.09203 17.2015 7.51948 16.5635C6.5015 16.1507 5.42429 15.8857 4.38749 15.5153C3.06143 15.0423 2.02768 14.2272 1.70678 12.7918C1.04666 9.84665 2.9881 7.48871 6.03938 7.47806Z"
                      fill="#152DA0"
                      stroke="#152DA0"
                      stroke-width="0.5"
                    />
                    <Path
                      d="M69.9697 7.88397C70.3905 7.88397 70.7068 7.90683 71.0183 7.87796C71.3934 7.84307 71.5774 7.99002 71.7189 8.33979C72.6177 10.5581 73.5404 12.7677 74.4549 14.9796C75.2827 16.983 76.111 18.9864 76.9397 20.9897C77.0157 21.1842 77.1421 21.355 77.3059 21.4844C77.5342 20.9732 77.7744 20.4664 77.9888 19.9501C79.5883 16.0913 81.1826 12.2303 82.7716 8.36717C82.9209 8.00252 83.1143 7.83842 83.5119 7.87646C83.8234 7.90692 84.1399 7.88248 84.533 7.88248C84.4956 8.04446 84.4498 8.2044 84.3957 8.36159C82.9925 11.7541 81.5876 15.1458 80.1812 18.537C79.5405 20.0866 78.9106 21.6409 78.2755 23.1934C78.0582 23.7247 76.9851 24.0667 76.5175 23.7381C76.4175 23.668 76.3713 23.5103 76.3196 23.3855C74.2647 18.4306 72.2121 13.4743 70.1616 8.51669C70.0909 8.34511 70.0525 8.15924 69.9697 7.88397Z"
                      fill="#152DA0"
                      stroke="#152DA0"
                      stroke-width="0.5"
                    />
                    <Path
                      d="M47.7295 6.82487C47.7295 5.81675 47.7286 4.94387 47.7295 4.07037C47.7312 2.91313 47.7236 0 47.7236 0C47.7236 0 47.966 0.0144187 48.3514 0.0131375C49.7409 0.00656716 51.1306 0.00258285 52.5203 0.00120307C53.609 -0.000866595 54.6975 0.000384982 55.8262 0.000384982V6.82554C55.1324 6.52909 53.9264 6.01496 53.9264 6.01496L51.775 5.19163L49.5931 6.05149C49.5931 6.05149 48.4139 6.54133 47.7295 6.82487Z"
                      fill="#152DA0"
                    />
                  </Svg>
                  <View
                    style={{
                      ...styles.cascadeLeft,
                      borderLeft: "2px solid #000",
                      paddingLeft: "16px",
                    }}
                  >
                    <Text style={styles.text}>
                      Get the most affordable and reliable deliveries{" "}
                    </Text>
                    <Text style={styles.text}>www.swoove.delivery *713*5#</Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default WaybillGenerator;

// Create styles

const styles = StyleSheet.create({
  page: {
    display: "none",
    backgroundColor: "white",
    height: "100%",
  },
  mainView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "99%",
    width: "100%",
  },
  borderedPartition: {
    height: "20%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    borderBottom: "4px",
    padding: "20px",
  },
  partition: {
    height: "20%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px",
    borderColor: "#ccc",
    padding: "20px",
  },
  niceBox: {
    width: "30%",
    height: "100%",
    display: "flex",
    border: "2px",
    borderRadius: "16px",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  attemptView: {
    width: "100%",
  },
  horizontalBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  attempt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  checkbox: {
    height: "15px",
    width: "15px",
    border: "1px",
  },
  logoView: {
    width: "100%",
    flexDirection: "row",
    paddingRight: "10px",
  },
  logo: {
    display: "flex",
    borderColor: "black",
  },
  cascadeLeft: {
    width: "100%",
    marginLeft: "10px",
    marginRight: "10px",
    flexDirection: "column",
  },
  centeredText: {
    overflowWrap: "break-word",
    textAlign: "center",
    fontSize: "15px",
    padding: "0px",
  },
  text: {
    textAlign: "left",
    marginTop: "5px",
    fontSize: "13px",
  },
  trackingCode: {
    textAlign: "left",
    marginTop: "5px",
    fontSize: "18px",
    fontWeight: "ultrabold",
  },
  trackingCodeText: {
    fontSize: "18px",
  },
  placeText: {
    textAlign: "left",
    marginTop: "5px",
    fontSize: "13px",
    textTransform: "capitalize",
  },
  emptyText: {
    textAlign: "left",
    marginTop: "5px",
    fontSize: "13px",
  },
  QRImage: {
    marginTop: "10px",
    width: "100px",
    height: "100px",
    display: "flex",
    // marginLeft: "auto",
    // marginRight: "auto",
    marginBottom: "10px",
  },
  BarCodeImage: {
    marginTop: "10px",
    width: "150px",
    height: "75px",
    // marginLeft: "auto",
    // marginRight: "auto",
  },
  LabelCodeView: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    // marginLeft: "auto",
    // marginRight: "auto",
  },
  ZoneView: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",

    // marginLeft: "auto",
    // marginRight: "auto",
  },
  barcodeAllignment: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "48px",
  },
  views: {
    borderBottom: "1px",
    borderColor: "black",
    width: "35%",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    marginTop: "10px",
    height: "15px",
    fontWeight: "bold",
  },
});
