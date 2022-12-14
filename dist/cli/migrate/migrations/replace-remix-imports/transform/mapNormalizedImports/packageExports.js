/**
 * @remix-run/dev v1.7.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const defaultAdapterExports = {
  value: ["createRequestHandler"],
  type: ["GetLoadContextFunction", "RequestHandler"]
};
const defaultRuntimeExports = {
  value: ["createCookie", "createCookieSessionStorage", "createMemorySessionStorage", "createRequestHandler", "createSession", "createSessionStorage", "isCookie", "isSession", "json", "MaxPartSizeExceededError", "redirect", "unstable_composeUploadHandlers", "unstable_createMemoryUploadHandler", "unstable_parseMultipartFormData"],
  type: ["ActionFunction", "AppData", "AppLoadContext", "Cookie", "CookieOptions", "CookieParseOptions", "CookieSerializeOptions", "CookieSignatureOptions", "CreateRequestHandlerFunction", "DataFunctionArgs", "EntryContext", "ErrorBoundaryComponent", "HandleDataRequestFunction", "HandleDocumentRequestFunction", "HeadersFunction", "HtmlLinkDescriptor", "HtmlMetaDescriptor", "LinkDescriptor", "LinksFunction", "LoaderFunction", "MemoryUploadHandlerFilterArgs", "MemoryUploadHandlerOptions", "MetaDescriptor", "MetaFunction", "PageLinkDescriptor", "RequestHandler", "RouteComponent", "RouteHandle", "ServerBuild", "ServerEntryModule", "Session", "SessionData", "SessionIdStorageStrategy", "SessionStorage", "UploadHandler", "UploadHandlerPart"]
};
const packageExports = {
  architect: {
    value: [...defaultAdapterExports.value, "createArcTableSessionStorage"],
    type: [...defaultAdapterExports.type]
  },
  cloudflare: {
    value: [...defaultRuntimeExports.value, "createCloudflareKVSessionStorage"],
    type: [...defaultRuntimeExports.type]
  },
  "cloudflare-pages": {
    value: [...defaultAdapterExports.value, "createPagesFunctionHandler"],
    type: [...defaultAdapterExports.type, "createPagesFunctionHandlerParams"]
  },
  "cloudflare-workers": {
    value: [...defaultAdapterExports.value, "createEventHandler", "handleAsset"],
    type: [...defaultAdapterExports.type]
  },
  express: {
    value: [...defaultAdapterExports.value],
    type: [...defaultAdapterExports.type]
  },
  netlify: {
    value: [...defaultAdapterExports.value],
    type: [...defaultAdapterExports.type]
  },
  node: {
    value: [...defaultRuntimeExports.value, "AbortController", "createFileSessionStorage", "createReadableStreamFromReadable", "fetch", "FormData", "Headers", "installGlobals", "NodeOnDiskFile", "readableStreamToString", "Request", "Response", "unstable_createFileUploadHandler", "writeAsyncIterableToWritable", "writeReadableStreamToWritable"],
    type: [...defaultRuntimeExports.type, "HeadersInit", "RequestInfo", "RequestInit", "ResponseInit"]
  },
  react: {
    value: ["Form", "Link", "Links", "LiveReload", "Meta", "NavLink", "Outlet", "PrefetchPageLinks", "RemixBrowser", "RemixServer", "Scripts", "ScrollRestoration", "useActionData", "useBeforeUnload", "useCatch", "useFetcher", "useFetchers", "useFormAction", "useHref", "useLoaderData", "useLocation", "useMatches", "useNavigate", "useNavigationType", "useOutlet", "useOutletContext", "useParams", "useResolvedPath", "useSearchParams", "useSubmit", "useTransition"],
    type: ["FormEncType", "FormMethod", "FormProps", "HtmlLinkDescriptor", "HtmlMetaDescriptor", "LinkProps", "NavLinkProps", "RemixBrowserProps", "RemixServerProps", "ShouldReloadFunction", "SubmitFunction", "SubmitOptions", "ThrownResponse"]
  },
  vercel: {
    value: [...defaultAdapterExports.value],
    type: [...defaultAdapterExports.type]
  }
};

exports.packageExports = packageExports;
