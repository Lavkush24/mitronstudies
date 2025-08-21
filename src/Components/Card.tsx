
export const Card = ({link}: {link:string}) => {
    return <div className="h-64 w-64 bg-opacity-20 bg-inherit rounded-lg text-center p-6 content-end z-30 shadow-black shadow-md hover:cursor-pointer">
        {link}
    </div>
}