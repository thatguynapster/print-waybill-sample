export async function mkGetReq(reqOptions: {
  endpoint: string;
  queries: string;
  token?: string;
  appId?: string;
  extraHeaders?: {}[];
}) {
  const options: {
    method: string;
    cors: string;
    headers: any;
  } = {
    method: "GET",
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
      // 'x-user-agent': 'Swoove Business Panel 1.0.0' //TODO: change this to the current app/platform
    },
  };
  reqOptions.token &&
    (options.headers["Authorization"] = `Bearer ${reqOptions.token}`);
  reqOptions.appId && (options.headers["app-id"] = `${reqOptions.appId}`);

  const request = await fetch(
    `${reqOptions.endpoint}?platform=business_portal${
      reqOptions.queries ? `&${reqOptions.queries}` : ""
    }`,
    options
  );
  const results = await request.json();

  return results;
}

export function sentenceCase(str: string) {
  let _tmp = str.toLowerCase();
  let result = _tmp
    .replace(/[a-z]/i, function (letter) {
      return letter.toUpperCase();
    })
    .trim();

  return result;
}

export function openInNewTab(url: string) {
  // console.log(url);
  if (typeof window !== "undefined") {
    var win = window.open(url, "_blank");
    win?.focus();
  }
}

export function sendParentWindowMsg(message: any) {
  if (typeof window !== "undefined") {
    var parentWindow = window.parent;
    parentWindow.postMessage(message, "*");
  }
}

export function sendIframeMsg(iframeId: string, message: any) {
  if (typeof window !== "undefined") {
    var iframeWindow = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframeWindow && iframeWindow.contentWindow) {
      iframeWindow.contentWindow.postMessage(message, "*");
    }
  }
}

export const isIFrame = (
  input: HTMLElement | null
): input is HTMLIFrameElement => input !== null && input.tagName === "IFRAME";

export function getQuery(_query: string) {
  var urlParams = new URLSearchParams(window.location.search);
  var urlQuery = urlParams.get(_query);

  return urlQuery;
}
