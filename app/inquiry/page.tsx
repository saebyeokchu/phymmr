export default function Inquiry() {
    return (
        <div className="bg-white container my-24 mx-auto md:px-6">
            <section className="mb-32 text-center">
                <h2 className="mb-12 text-3xl font-bold">하우스투어 신청하기</h2>
                <a href="http://pf.kakao.com/_bQMkG">
                    <button
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="mb-6 inline-block w-full bg-yellow-300 rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-500">
                        <span className="text-lg ">카카오톡 연결</span>
                    </button>
                </a>
            </section>
        </div>
    )
}