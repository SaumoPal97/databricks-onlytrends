import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { API_URL } from "@/lib/utils";
import InputTags from "./InputTags";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string(),
  namespace: z.string(),
});

const ReportUpload = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      tags: [],
      imageUrl: "",
      namespace: "",
    },
  });

  const onSubmit = async (values) => {
    const namespace = values.url.split("/").reverse()[0].split(".")[0];
    try {
      await fetch(`${API_URL}/report/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          namespace,
        }),
      });
      toast.info("Successfully Uploaded!");
    } catch (err) {
      toast.error("Upload Failed!");
    }
  };

  return (
    <div className="flex flex-col pt-24">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center text-5xl">
        <span className="mb-2 font-bold">Upload a Report</span>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="p-8 w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Tag(s)</FormLabel>
                    <FormControl>
                      <InputTags {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Image Url</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ReportUpload;
