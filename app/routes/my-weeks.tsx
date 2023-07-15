import {
  json,
  LoaderArgs,
  redirect,
  type V2_MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";

import {
  addDayToDate,
  calculateWeeksBetweenDate,
  generateUniqueId,
  splitArrayIntoChunks,
} from "~/utils";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "My Weeks" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);

  const dateOfBirth = url.searchParams.get("date-of-birth");

  if (!dateOfBirth) {
    return redirect("/");
  }

  const birthDate = new Date(dateOfBirth).toString();

  const date85YrFromToday = addDayToDate(birthDate, 85);

  const totalWeeksFromBirthady = calculateWeeksBetweenDate(
    birthDate,
    new Date().toString()
  );

  const totalWeeks = calculateWeeksBetweenDate(
    birthDate,
    date85YrFromToday.toString()
  );

  const result = Array.from({ length: totalWeeks })
    .fill(true, 0, totalWeeksFromBirthady - 1)
    .fill(false, totalWeeksFromBirthady, totalWeeks - 1)
    .map((active) => ({ id: generateUniqueId(), active }));

  return json({
    weeks: splitArrayIntoChunks(result, 52),
    today: new Date(),
  });
};

export default function Index() {
  const { weeks } = useLoaderData<typeof loader>();

  return (
    <div className="my-8 px-4">
      <h1 className="text-center mb-8 text-5xl font-bold">My Life in weeks</h1>
      <div className="flex flex-col gap-1 w-fit mx-auto">
        {weeks.map((week, idx) => {
          return (
            <div
              key={idx}
              className={clsx("relative flex justify-start gap-1", {
                "mb-2 pb-2": (idx + 1) % 10 == 0,
              })}
            >
              {week.map((w, i) => {
                return (
                  <div
                    key={w.id}
                    className={clsx("w-4 h-4 rounded-sm border border-1", {
                      "border-black bg-black": w.active,
                      "border-black":
                        (!w.active && week[i + 1]) || i == week.length - 1,
                      "bg-purple-500 border-purple-500":
                        !w.active && week[i - 1]?.active,
                      "mr-2": (i + 1) % 4 == 0,
                    })}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
