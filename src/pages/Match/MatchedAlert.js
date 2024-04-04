import { XMarkIcon } from '@heroicons/react/24/solid'
const MatchedAlert = ({ userId, imgUrl, setMatchedUserData }) => {
    return (
        <>
            <XMarkIcon
                className="h-9 w-9 absolute top-4 left-4 text-[white] z-30"
                onClick={() => {
                    setMatchedUserData(null)
                }}
            />
            <div
                className="blur-sm absolute left-0 top-0 z-10 h-screen w-screen bg-center bg-cover bg-no-repeat flex justify-center items-center "
                style={{
                    backgroundImage: 'url(' + imgUrl + ')',
                }}
            ></div>
            <div className="absolute left-0 top-0 z-11 h-screen w-screen flex justify-center items-center p-8 rounded-lg shadow-lg text-purple-bell">
                <div className="z-30">
                    <div className="text-4xl drop-shadow-2xl italic font-bold text-center">
                        It's a{' '}
                        <span className="text-8xl uppercase">match!</span>
                    </div>
                    <div className="mt-4 text-center text-xl">
                        <a
                            className=" bg-purple-100 text-[color:black] p-4 underline italic"
                            href="./chat"
                        >
                            Start Chatting
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MatchedAlert
