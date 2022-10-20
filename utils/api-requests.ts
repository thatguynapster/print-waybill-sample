import { mkGetReq } from "./functions";

export async function getDeliveryDetails(_id: string) {
  let results: any = {};

  let result = await mkGetReq({
    endpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1.0/delivery/getdeliverydetails/${_id}`,
    queries: `limits=10&delivery_update=false&payment_options=true&country_code=GH`,
  });

  // console.log(result)

  if (result.code === 200) {
    results.success = true;
    results.message = result.message;
    results.data = result.responses;
  } else {
    results.code = result.code || 500;
    results.success = false;
    results.message = result.message || "Unexpected error occured";
  }

  return results;
}
