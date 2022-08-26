import { Controller, useForm } from "react-hook-form";

const PostForm = () => {
  const methods = useForm<any>({
    defaultValues: {},
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 h-3/4 rounded-md bg-white shadow-md p-4"
      >
        <div>
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
            name="title"
            control={control}
            render={({ field }) => (
              <div className="mt-1 appearance-none w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-plazablue500 focus:border-plazablue500 text-sm focus:ring-1">
                <textarea
                  className="w-full flex-1 rounded-md border-0 px-3 py-2 text-sm focus:outline-none"
                  minLength={140}
                  maxLength={2400}
                  {...field}
                />
              </div>
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
              <div>
                {field.value ? (
                  <div className="flex h-40 w-40 justify-center overflow-hidden rounded border bg-black">
                    {/* <div className="relative h-full">
                      <img
                        className="h-full object-contain"
                        alt=""
                        src={filePreview}
                      />
                      {uploadProgress !== 100 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CircularProgressbar
                            value={uploadProgress}
                            className="h-20 w-20"
                          />
                        </div>
                      )}
                    </div> */}
                  </div>
                ) : (
                  <div className="h-40 w-40 rounded border">
                    <div className="flex h-full flex-col items-center justify-center">
                      {/* <PlusIcon className="mb-2 h-8" /> */}
                      <input id="media" type="file" className="hidden" />
                      <label
                        htmlFor="media"
                        className="text-center cursor-pointer text-gray-500 text-sm"
                      >
                        Click to choose
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          />
        </div>
        {/* <div className="flex justify-end pt-4">
          <PlazaSubmitButton
            mode="contained"
            theme="primary"
            size="medium"
            btnState={getBtnState(isSubmitSuccessful, isSubmitting)}
          >
            <UpdateIcon />
            <span className="ml-1">{mode === "EDIT" ? "Update" : "Add"}</span>
          </PlazaSubmitButton>
        </div> */}
      </form>
    </div>
  );
};

export default PostForm;
