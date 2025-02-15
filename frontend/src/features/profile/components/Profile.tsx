import ProfileSidebar from "../../auth/components/ProfileSidebar";
import UpdateUserInfos from "../../auth/components/UpdateUserInfos";

export default function Profile() {
    return (
        <div className="row my-5">
            <ProfileSidebar />
            <UpdateUserInfos profile={true} />
        </div>
    )
}