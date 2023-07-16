import {
  ActionArgs,
  redirect,
  type V2_MetaFunction,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Button, Divider } from "~/components";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "My Weeks" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const dateOfBirth = formData.get("date-of-birth");

  if (!formData) {
    return redirect("/");
  }

  return redirect(`/my-weeks?date-of-birth=${dateOfBirth}`);
};

export default function Index() {
  return (
    <div className="my-8 px-4 text-sm">
      <div className="gap-4 max-w-2xl mx-auto my-6 ">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-2 text-2xl font-bold">My Life in weeks</h1>
          <Form
            className="flex items-center gap-3 w-fit"
            action=""
            method="POST"
          >
            <h3 className="bg-black text-white px-4 py-2 rounded-md border-black">
              Date of Birth
            </h3>
            <input
              type="date"
              className="border rounded-md px-4 py-2"
              title="date-of-birth"
              name="date-of-birth"
            />
            <div>
              <Button>My Weeks</Button>
            </div>
          </Form>
        </div>
        <Divider />
        <div className="flex flex-col">
          <a href="/hours-left" className="text-xl font-bold">
            Hours Left
          </a>
        </div>
      </div>
    </div>
  );
}
