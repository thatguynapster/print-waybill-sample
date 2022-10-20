export interface IDeliveries {
  id: string;
  tracking_code: string;
  total_price: string | number;
  label_code: string;
  zone: string;
  pickup_details: {
    name: string;
    mobile: string;
    location: string;
    zone: string;
    date: EpochTimeStamp;
  };
  dropoff_details: {
    name: string;
    mobile: string;
    location: string;
    zone: string;
    date: EpochTimeStamp;
  };
  item_details: {
    name: string;
    price: string | number;
    size: string;
    weight: string | number;
  };
  delivery_type: string;
  delivery_fee: string | number;
}
