export const MypageSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-[18px] font-bold h-[40px] leading-[40px]]">
        마이페이지
      </h2>
      <div className="bg-gray-200 h-[100px] w-[100px] rounded-[50%]"></div>
      <div>
        <p className="bg-gray-200 rounded-md h-[26px] w-[200px] mb-[3px]"></p>
        <p className="bg-gray-200 rounded-md h-[19px] w-[200px]"></p>
      </div>
      <form className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="변경할 닉네임을 입력해주세요"
          className="border border-gray-200 rounded-md h-[40px] w-full pl-4"
        />
        <button
          type="submit"
          className="bg-black text-white h-[40px] rounded-md w-full"
        >
          닉네임 변경
        </button>
      </form>
      <button className="border border-gray-300 rounded-md h-[40px] w-full">
        로그아웃
      </button>
    </div>
  );
};
