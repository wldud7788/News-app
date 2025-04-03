export const CommentLoading = () => {
  return (
    <>
      <div className="p-4 bg-[#e7e7e7a1] rounded-lg relative mt-5">
        <div className="flex gap-5 items-center mb-3 ">
          <div className="rounded-full w-[50px] h-[50px] flex-shrink-0 object-cover bg-[#e7e7e7a1]" />
          <div className="w-full h-full">
            <p className="font-medium bg-[#e5e7eb] h-[18px] w-[30%] rounded-lg"></p>
            <p
              className="text-sm text-gray-500 bg-[#e5e7eb] h-[18px] mt-1 rounded-lg
            "
            ></p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-[#e7e7e7a1] rounded-lg relative mt-3">
        <div className="flex gap-5 items-center mb-3 ">
          <div className="rounded-full w-[50px] h-[50px] flex-shrink-0 object-cover bg-[#e7e7e7a1]" />
          <div className="w-full h-full">
            <p className="font-medium bg-[#e5e7eb] h-[18px] w-[30%] rounded-lg"></p>
            <p
              className="text-sm text-gray-500 bg-[#e5e7eb] h-[18px] mt-1 rounded-lg
            "
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};
