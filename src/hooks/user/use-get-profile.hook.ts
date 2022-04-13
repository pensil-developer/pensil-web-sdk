import { useEffect, useState } from "react";
import { ProfileService } from "../../services/profile-service";
import { User } from "../../types/user.type";


export default function UseGetProfile(profileService: ProfileService) {
    const [user, setUser] = useState<User>();
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    useEffect(() => {
        // get user profile
        setIsLoadingProfile(true);
        profileService.getUserProfile()
            .then((res) => {
                setUser(res.user);
            })
            .catch((err) => {
                console.log("err fetching posts", err);
            })
            .finally(() => {
                setIsLoadingProfile(false);
            });
    }, []);

    return { user, isLoadingProfile };


}