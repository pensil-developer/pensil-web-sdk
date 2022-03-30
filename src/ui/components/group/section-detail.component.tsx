import React, { useState, useEffect } from 'react';
import { PensilService } from '../../../services';
import { PostModel } from '../../../types';
import { withPensilWrapper } from '../../hoc/pensil-app.wrapper';
import file from "../../../assets/file.png";

interface SectionDetailProps {
    service: PensilService;
    children?: any;
    communityId?: string;
    groupId: string;
    sectionId: string;
}

function SectionDetailComponent(props: SectionDetailProps) {

    // get the group
    const [group, setGroup] = useState<any>(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // get group details
        props.service.services.group.getGroupDetail(props.groupId).then((response) => {
            setGroup(response.groups);
        }).catch((err) => {
            console.error("err fetching group", err);
        });
    }, [])

    useEffect(() => {
        if (group) {
            props.service.services.group.getSectionPostsPaginated(props.groupId, props.sectionId)
                .then(res => {
                    setPosts(res.posts);
                })
                .catch(err => {
                    console.log("err fetching posts", err);
                });
        }
    }, [group]);



    return (
        <div className="SectionDetail">
            Hello
            <img src={file} alt=""/>
            {group ? group.name : props.groupId}
            {
                posts.map((post: PostModel, index) => (
                    <div key={index} className="pensiltw-bg-green-500">
                        {post.title}
                        {post.description}
                    </div>
                ))
            }
        </div>
    )
}

const SectionDetail = withPensilWrapper(SectionDetailComponent);

export { SectionDetail };