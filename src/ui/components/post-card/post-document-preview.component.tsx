import React from "react";
import UIcon from "../atom/uicon.atom";

interface PostDocumentPreviewProps {
  document: any;
  subDocument: any;
  setDocument: (document: any) => void;
  setSubDocument: (subDocument: any) => void;
  isSubComment: boolean;
}

export default function PostDocumentPreview({
  document = null,
  subDocument = [],
  setDocument,
  setSubDocument,
  isSubComment = false,
}: PostDocumentPreviewProps) {
  return (
    <>
      {!isSubComment && document ? (
        <div className="selectedDocumentPreview my-3 relative">
          <a
            download
            target="_blank"
            rel="noreferrer"
            href={document}
            title="Open file"
            className="flex items-center space-x-2 border-2 theme-border-default rounded px-4 font-semibold py-2 ">
            <UIcon icon="document" className="text-3xl h-9" />
            <div className="flex items-center justify-between flex-grow space-x-4">
              <div className="items-center ">
                <div>{document.name}</div>
                <div className="uppercase text-xs">
                  {document.name.split(".").pop()}
                </div>
              </div>
              <span className="flex-none">
                <UIcon icon="download" className="text-xl" />
              </span>
            </div>
          </a>
          <div
            onClick={(_) => {
              // remove the videos
              setDocument(null);
            }}
            className="remove">
            &times;
          </div>
        </div>
      ) : isSubComment && subDocument.length > 0 ? (
        <div className="SelectedDocumentPreview my-3 relative">
          <a
            download
            target="_blank"
            rel="noreferrer"
            href={subDocument}
            title="Open file"
            className="flex items-center space-x-2 border-2 theme-border-default rounded px-4 font-semibold py-2 ">
            <UIcon icon="document" className="text-3xl h-9" />
            <div className="flex items-center justify-between flex-grow space-x-4">
              <div className="items-center ">
                <div>{subDocument[0].name}</div>
                <div className="uppercase text-xs">
                  {subDocument[0].name.split(".").pop()}
                </div>
              </div>
              <span className="flex-none">
                <UIcon icon="download" className="text-xl" />
              </span>
            </div>
          </a>

          <div
            onClick={(_) => {
              // remove the videos
              setSubDocument([]);
            }}
            className="remove">
            &times;
          </div>
        </div>
      ) : (
        <></>
      )}
    
    </>
  );
}
