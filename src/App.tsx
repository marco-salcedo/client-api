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
// import { mockFetch } from "@/lib/utils";
// import { HugeComponent } from "@/components/HugeComponent";

// TODO1: Implement component state to display the request made inside "Request Container" (recent request only)
// TODO2: Make use of mockFetch (uncomment above) to send requests and display responses inside "Response Container"
// TODO3: Trigger an error response by including "error" in the URL, and display errors differently in "Response Container"
// TODO4: Imagine that on component mount, you need to make a call to "https://on-mount.com/status" to check the status of this tool, make it so that no UI is shown until a response is received
// TODO5: The Product team has asked you to add a huge component (uncomment at top and bottom of this file) to the page and it is slowing re-renders and initial load, how would you optimize for this?
// --------- Extra Credit Ideas ---------
// BONUS: Input validation
// BONUS: Use the html <form> element and handle the submit event
// BONUS: Implement a11y features where possible

export default function App() {
  return (
    <section className="flex min-h-screen min-w-screen items-center justify-center">
      <div className="flex flex-col w-full max-w-screen-lg mx-auto">
        <div className="flex flex-row gap-4">
          <h1 className="text-2xl font-bold text-left">Mini API Client</h1>
          <Spinner size="medium" />
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                GET
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>API Methods</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GET</DropdownMenuItem>
              <DropdownMenuItem>POST</DropdownMenuItem>
              <DropdownMenuItem>PATCH</DropdownMenuItem>
              <DropdownMenuItem>DELETE</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input className="flex-1" type="text" placeholder="Request URL" />
          <Button>
            SEND
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 mt-4">
          <Textarea
            placeholder="Request Body"
            className="font-mono bg-[#2d2d2d] text-white min-h-[100px] resize-y"
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
          Print Your Request Here When You Send
        </div>
        <Separator className="my-4" />
        <h2 className="text-lg font-bold text-left">Response Container</h2>
        <div className="flex mt-4 border rounded-md p-4 font-mono bg-[#2d2d2d] text-white min-h-[200px] resize-y">
          Await and Print Your Response Here
        </div>
        {/* <div className="border mt-4 rounded-md border-red-500 max-w-40">
          <span className="text-red-500">Huge Component</span>
          <HugeComponent />
        </div> */}
      </div>
    </section>
  );
}
