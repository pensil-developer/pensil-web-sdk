import { useEffect, useState } from "react";
import { GroupService } from "../../services/group.service";

/**
 * Return group details
 * @param {GroupService} groupService
 * @param {string} groupId
 * @returns
 */

export default function UseGroupDetail(
  groupService: GroupService,
  groupId: string
) {
  const [group, setGroup] = useState<any>(null);
  const [isLoadingGroup, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    // get group details
    setIsLoading(true);
    groupService
      .getGroupDetail(groupId)
      .then((response) => {
        setGroup(response.groups);
      })
      .catch((err) => {
        console.error("err fetching group", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [groupId]);

  return { group, isLoadingGroup };
}
