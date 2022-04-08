import moment from "moment";
import React from "react";
import { CreatedBy, Event } from "../../../types";
import { Avatar } from "../atom/avatar.atom";
import IconMenu from "../atom/icon-menu.atom";
// import PostDescription from "./post-description.component";

interface PostEventInfoProps {
  event: Event;
  user: CreatedBy;
}
/**
 * Show event info
 * @param {*} event
 * @returns
 */
export default function PostEventInfo({ event, user }: PostEventInfoProps) {
  if (event == null) {
    return null;
  }
  const sample = moment
    .duration(moment(new Date()).diff(moment(event.createdAt)))
    .asDays();
  return (
    <div>
      {/* event banner */}
      {event.banner && (
        <div className="flex relative place-content-center theme-bg-disable eventBannerImage">
          <div className="absolute top-0 left-0 w-full h-full">
            <img
              src={event.banner}
              className="absolute w-full h-full top-0 left-0 object-cover"
              alt=""
              // style={{maxWidth:"100%", maxHeight:"56.49%", height:'auto',width:'auto'}}
            />
          </div>
        </div>
      )}
      {/* Post Header */}
      <div className="PostHeader flex justify-between items-center mt-2">
        <Avatar
          name={event.createdBy.name}
          picture={event.createdBy.picture}
          extraInfo={
            sample < 1
              ? moment(event.createdAt).fromNow()
              : moment(event.createdAt).format("DD MMM YYYY")
          }
          size={42}
          className="cursor-pointer"
          // tag={
          //   event.createdBy.groupRole === "admin" ? (
          //     <div className="theme-theme-bg-primary-light theme-text-primary mx-2 font-semibold text-xxs px-1 rounded">
          //       Admin
          //     </div>
          //   ) : event.createdBy.groupRole === "moderator" ? (
          //     <div className="bg-green-50 mx-2 font-semibold text-green-500 text-xxs px-1 rounded">
          //       Moderator
          //     </div>
          //   ) : event.createdBy.groupRole === "user" ? (
          //     <></>
          //   ) : (
          //     <></>
          //   )
          // }
          onClick={() => {
            // open the user page
            window
              .open
              // createUserWallPageRoute(event.createdBy.id, "activity")
              ();
          }}
        />
        <div className="flex items-center">
          {/* show more options only if user logged in */}
          {user ? (
            <>
              {/* more options */}
              <IconMenu
                dropdownClassName={event.isBookmarkedByMe ? "w-56" : "w-40"}
                icon="menu-dots"
                hideOnEmpty
                actions={[
                  {
                    // Toggle bookmark
                    icon: "",
                    solidIcon: event.isBookmarkedByMe,
                    label: "Go to event",
                    onClick: () => {
                      // history.push(createEventDetailPageRoute(event.id));
                    },
                  },
                ]}
              ></IconMenu>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* event title */}
      <div
        className="PostTitle font-semibold text-xl my-4 focus:outline-none cursor-pointer"
        onClick={(_) => {
          // history.push(createEventDetailPageRoute(event.id));
        }}
      >
        {event.title ? event.title : ""}
      </div>
      {/* event time */}
      <div className="flex">
        <i className="fi fi-rr-calendar font-semibold text-sm pr-2" />
        <div className="font-semibold">
          {moment(event.startTime).format("DD MMM, YYYY, h:mm A")} -{" "}
          {moment(event.endTime).format("DD MMM, YYYY, h:mm A")}
        </div>
      </div>
      {/* <PostDescription post={event} user={user} isEvent={true} /> */}
      {/* Event badge */}
      {/* <div className="flex flex-row items-center mt-4 mb-2">
          {user ? (
            <Link
              className="theme-bg-primary px-4 py-2 rounded flex justify-center"
              to={user ? createEventDetailPageRoute(event.id) : undefined}>
              <p className=" theme-text-on-primary text-sm">View this event</p>
            </Link>
          ) : (
            <span
              className="bg-indigo-400 w-14 h-4 px-2 text-xs space-x-1 rounded flex justify-center"
              to={user ? createEventDetailPageRoute(event.id) : undefined}>
              <img
                className="inline"
                src="/assets/vectors/calender-outlined-icon.svg"
                alt="event"
              />
              <p className=" theme-text-on-primary text-xs">Event</p>
            </span>
          )}
        </div> */}
    </div>
  );
}
