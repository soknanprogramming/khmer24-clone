import React from "react";

type ProfileStyleProps = {
    classUtilities?: string;
}

const ProfileStyle: React.FC<ProfileStyleProps> = ({classUtilities}) => {
    return (
        <div className={`rounded-full  ${classUtilities}`}>
            <img src="/profile/user-icon.webp" className="rounded-full" alt="" />
        </div>
    )
}


export default ProfileStyle;