import { TbLoader3 } from "react-icons/tb";

const Loading = () => {
    return (
        <div className="mt-32 mx-auto">
            <TbLoader3 className="animate-spin" fontSize={25}/>
        </div>
    )
}

export default Loading;