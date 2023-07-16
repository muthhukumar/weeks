import { V2_MetaFunction, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { hoursLeftThisYear } from "~/utils";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Hours Left" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  return json({ hoursLeft: hoursLeftThisYear() });
};

export default function HoursLeft() {
  const { hoursLeft } = useLoaderData<typeof loader>();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="font-bold text-5xl">
        {hoursLeft} <span className="text-sm">hours left</span>
      </div>
    </div>
  );
}
