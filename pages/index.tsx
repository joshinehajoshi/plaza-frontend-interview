import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface IPostForm {
  title: string;
  content: string;
  media: { status: string; media: string };
}

const PostForm = () => {
  const { handleSubmit, control, watch } = useForm<IPostForm>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const contentChars = watch("content");

  const handleImageUpload = (
    event: React.ChangeEvent,
    onChange: (image: IPostForm["media"]) => void
  ) => {
    const media = (event.target as HTMLInputElement).files?.[0];
    if (media) {
      const reader = new FileReader();
      reader.readAsDataURL(media);
      reader.onload = (ev) => {
        if (ev.target?.result) {
          onChange({
            status: "UPLOADING",
            media: ev.target.result as string,
          });
        }
      };
    }
  };

  const onSubmit = (data: IPostForm) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 rounded-md bg-white shadow-md p-4"
      >
        <div className="mt-4">
          <label className="block text-sm font-light text-gray-700">
            Post Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div className="mt-1 appearance-none w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-plazablue500 focus:border-plazablue500 text-sm focus:ring-1">
                <input
                  className="w-full flex-1 rounded-md border-0 px-3 py-2 text-sm focus:outline-none"
                  minLength={6}
                  maxLength={12}
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-light text-gray-700">
            Post Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <>
                <div className="mt-1 appearance-none w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-plazablue500 focus:border-plazablue500 text-sm focus:ring-1">
                  <textarea
                    className="w-full flex-1 rounded-md border-0 px-3 py-2 text-sm focus:outline-none"
                    minLength={140}
                    maxLength={2400}
                    {...field}
                  />
                </div>
                {contentChars && (
                  <p className="mt-1 flex justify-end text-xs text-gray-500">
                    {2400 - contentChars.length} characters left
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-light text-gray-700">
            Media
          </label>
          <Controller
            name="media"
            control={control}
            render={({ field }) => (
              <div className="flex h-40 w-40 justify-center rounded border relative">
                {!field.value && (
                  <div className="flex h-full flex-col items-center justify-center">
                    <input
                      id="media"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      max={1}
                      onChange={(event: React.ChangeEvent) =>
                        handleImageUpload(event, field.onChange)
                      }
                    />
                    <label
                      htmlFor="media"
                      className="text-center cursor-pointer text-gray-500 text-sm"
                    >
                      Click to choose
                    </label>
                  </div>
                )}
                {field.value && field.value?.status !== "UPLOADING" && (
                  <div className="relative h-full">
                    <img
                      className="h-full object-contain"
                      alt=""
                      src={field.value.media}
                    />
                  </div>
                )}
                {field.value?.status === "UPLOADING" && (
                  <ImageUpload onChange={field.onChange} value={field.value} />
                )}
              </div>
            )}
          />
        </div>
        <div className="mt-8">
          <button className="flex items-center justify-center rounded-md font-medium shadow-sm focus:outline-none text-white bg-gray-800 hover:bg-black focus:ring-gray-900 focus:ring-1 focus:ring-offset-1 px-4 py-2 text-sm w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const ImageUpload = ({
  value,
  onChange,
}: {
  value: IPostForm["media"];
  onChange: (val: IPostForm["media"]) => void;
}) => {
  useEffect(() => {
    const uploadTimeout = setTimeout(() => {
      onChange({ ...value, status: "UPLOADED" });
    }, 4000);

    return () => {
      clearTimeout(uploadTimeout);
    };
  }, [onChange, value]);

  return (
    <div className="absolute flex items-center justify-center inset-0">
      <div className="loader"></div>
    </div>
  );
};

export default PostForm;
