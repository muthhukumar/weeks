import { V2_MetaArgs, V2_MetaFunction, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { hoursLeftToday } from "~/utils";

export const meta: V2_MetaFunction = ({ data }: V2_MetaArgs) => {
  return [
    { title: `${data.hoursLeft} hours left...` },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  return json({ hoursLeft: hoursLeftToday() });
};

export default function HoursLeft() {
  const { hoursLeft } = useLoaderData<typeof loader>();
  return (
    <div className="flex items-center justify-center h-screen">
      <script
        dangerouslySetInnerHTML={{
          __html: `console.log("Timeout is started", new Date().toTimeString());
  setTimeout(() => {
console.log("Page reloaded", new Date().toTimeString());
    location.reload();
  }, 60 * 60 * 1000); // 1 hour in milliseconds
`,
        }}
      ></script>

      <div className="font-bold text-5xl">
        {hoursLeft} <span className="text-sm">hours left...</span>
      </div>
    </div>
  );
}
