import { useState, useEffect, Suspense, memo, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { mockFetch } from "@/lib/utils";

// TODO-5: Lazy load + Memoize HugeComponent: Tests the candidate knowledge of code-splitting andcommon react optimization practices
// The "complete solution" requires both lazy loading and memoization since the requirement states intial load and re-render issues
const HugeComponent = lazy(() =>
  import("./components/HugeComponent").then((component) => ({
    default: memo(component.default),
  }))
);
// The solution below is more readable but it would create an additional component in the react tree
// I think while incorrect it does demonstrate the candidate's knowledge of code-splitting and memoization well enough
// const LazyHugeComponent = lazy(() => import("./components/HugeComponent"));
// const HugeComponent = memo(LazyHugeComponent);

// TODO-0: Implement TypeScript types/interfaces: Tests the candidate's ability to implement TypeScript types/interfaces
interface RequestState {
  method: string;
  url: string;
  body?: string;
}

interface ResponseState {
  isError: boolean;
  data: {
    message: string;
    data: {
      url: string;
      method: string;
      body: string;
    };
  };
}

interface ApiStatus {
  isLoading: boolean;
  isOnline: boolean;
}

export default function App() {
  // TODO-1: Tests the candidate's ability to implement state management
  // There are many possible solutions here, but the candidate should be able to implement a simple state management system that fits the requirement, useState would be sufficient for this
  const [request, setRequest] = useState<RequestState>({
    method: "GET",
    url: "",
    body: "",
  });
  const [displayedRequest, setDisplayedRequest] = useState<RequestState | null>(
    null
  );
  const [responseIsLoading, setResponseIsLoading] = useState<boolean>(false);

  // TODO-2: Tests the candidate's ability to implement async functionality into a React component
  // The main goal here is to create something like function "handleSend" (below) which gets called when the request is submitted
  const [response, setResponse] = useState<ResponseState | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    isLoading: true,
    isOnline: false,
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await mockFetch("https://on-mount.com/status", "GET");
        /* eslint-disable @typescript-eslint/no-unused-vars */
        // @ts-expect-error - no need to use data
        const data = await response.json();
        setApiStatus({ isLoading: false, isOnline: true });
      } catch (error) {
        setApiStatus({ isLoading: false, isOnline: false });
      }
    };

    checkStatus();
  }, []);

  const handleMethodChange = (method: string) => {
    setRequest((prev) => ({ ...prev, method }));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest((prev) => ({ ...prev, url: e.target.value }));
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequest((prev) => ({ ...prev, body: e.target.value }));
  };

  const handleSend = async () => {
    try {
      setResponseIsLoading(true);
      setDisplayedRequest(request);
      // Add loading state for requests
      setResponse(null); // Clear previous response while loading
      const response = await mockFetch(
        request.url,
        request.method,
        request.body
      );
      const data = await response.json();
      setResponse({
        isError: false,
        data: { ...data, data: { ...data.data, body: data.data.body ?? "" } },
      });
    } catch (error) {
      // TODO-3: Tests the candidate's ability to implement error handling
      // The main goals is here is to observe how the candidate implements error handling, there are many ways to do this, should be a quick follow up from last task
      setResponse({
        isError: true,
        data: {
          message: (error as Error).message,
          data: {
            url: request.url,
            method: request.method,
            body: request.body ?? "",
          },
        },
      });
    } finally {
      setResponseIsLoading(false);
    }
  };

  // TODO-4: Tests the candidate's ability to implement loading states
  if (apiStatus.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="medium" />
      </div>
    );
  }

  if (!apiStatus.isOnline) {
    return <div>API is offline. Please try again later.</div>;
  }

  return (
    <section className="flex min-h-screen min-w-screen items-center justify-center">
      <div className="flex flex-col w-full max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold text-left">Mini API Client</h1>
        <div className="flex flex-row gap-4 mt-4">
          {/* BONUS: add an additional html <form> element here and handle the submit event */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {request.method}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>API Methods</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* BONUS: Map > hard-coding to keep code DRY */}
              {["GET", "POST", "PATCH", "DELETE"].map((method) => (
                <DropdownMenuItem
                  key={method}
                  onClick={() => handleMethodChange(method)}
                >
                  {method}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            className="flex-1"
            type="text"
            placeholder="Request URL"
            value={request.url}
            onChange={handleUrlChange}
          />
          <Button onClick={handleSend}>
            SEND
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 mt-4">
          <Textarea
            placeholder="Request Body"
            className="font-mono bg-[#2d2d2d] text-white min-h-[100px] resize-y"
            value={request.body}
            onChange={handleBodyChange}
            style={{
              padding: "0.5rem",
              lineHeight: "1.5",
              tabSize: 2,
            }}
          />
        </div>
        <Separator className="my-4" />
        <h2 className="text-lg font-bold text-left">Request Container</h2>
        <div className="flex mt-4 border rounded-md p-4 font-mono bg-[#2d2d2d] text-white min-h-[200px] resize-y">
          {/* BONUS: Knowledge and use of <pre>, <code>, JSON.stringify */}
          {displayedRequest && (
            <pre>
              {JSON.stringify(
                {
                  method: displayedRequest.method,
                  url: displayedRequest.url,
                  body: displayedRequest.body,
                },
                null,
                2
              )}
            </pre>
          )}
        </div>
        <Separator className="my-4" />
        <h2 className="text-lg font-bold text-left">Response Container</h2>
        <div
          className={`flex mt-4 border rounded-md p-4 font-mono bg-[#2d2d2d] text-white min-h-[200px] resize-y ${
            response?.isError ? "border-red-500" : ""
          }`}
        >
          {response ? (
            <pre className={response.isError ? "text-red-500" : ""}>
              {JSON.stringify(response.data, null, 2)}
            </pre>
          ) : (
            <div className="flex w-full items-center justify-center">
              {responseIsLoading ? (
                <Spinner className="text-white" size="medium" />
              ) : (
                <span className="text-gray-500">Awaiting response...</span>
              )}
            </div>
          )}
        </div>
        <Suspense fallback={<div>Loading huge component...</div>}>
          <div className="border mt-4 rounded-md border-red-500 max-w-40">
            <span className="text-red-500">Huge Component</span>
            <HugeComponent />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
