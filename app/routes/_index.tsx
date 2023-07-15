import {
  ActionArgs,
  redirect,
  type V2_MetaFunction,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

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
      <h1 className="text-center mb-8 text-2xl font-bold">My Life in weeks</h1>
      <div className="max-w-4xl mx-auto">
        <Form
          className="flex items-center gap-3 mx-auto w-fit"
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
            <button className="border rounded-md px-4 py-2 bg-black text-white border-black">
              My Weeks
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
