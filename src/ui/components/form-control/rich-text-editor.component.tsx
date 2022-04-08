import React from "react";
import cx from "classnames";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import BalloonEditor from "@chaharshubhamsingh/ckeditor5-custom-build";


export default function RichTextEditor({
  text = "<p>Hi, guys!</p>",
  setText = function (_: string) {},
  getMentionsFeed = async () => {
    return [];
  },
  placeholder = "Write something...",
  className = "",
  uploadImage = true,
  insertTable = true,
  showInfoText = true,
}) {
  return (
    <div className={cx("RichTextEditor" + className)}>
      <CKEditor
        editor={BalloonEditor}
        data={text}
        onReady={() => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor);
        }}
        onChange={(_: any, editor: any) => {
          // set text
          const data = editor.getData();
          // setText(html2md(data));
          setText(data);
        }}
        config={{
          toolbar: {
            items: [
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "outdent",
              "indent",
              "|",
              uploadImage ? "uploadImage" : null,
              "blockQuote",
              insertTable ? "insertTable" : null,
              // "mediaEmbed"
            ],
            location: "bottom",
          },
          placeholder: placeholder,
          extraPlugins: [MyCustomUploadAdapterPlugin, MentionLinks],
          mention: {
            feeds: [
              {
                marker: "@",
                feed: getMentionsFeed,
                minimumCharacters: 1,
                itemRenderer: customItemRenderer,
              },
            ],
          },
        }}
        onBlur={(event: any, editor: any) => {
          console.log("Blur.", editor, event);
        }}
        onFocus={(event: any, editor: any) => {
          console.log("Focus.", event, editor);
        }}
      />
      {showInfoText ? (
        <span className="theme-text-subtitle-2 text-xs">
          Double click or select text to access formatting options.
        </span>
      ) : null}
    </div>
  );
}

/*
 * Customizes the way the list of user suggestions is displayed.
 * Each user has an @id, a name and an avatar.
 */
function customItemRenderer(item: any) {
  const itemElement = document.createElement("span");
  const avatar = document.createElement("img");
  const userNameElement = document.createElement("div");
  const fullNameElement = document.createElement("div");

  itemElement.classList.add("flex");
  itemElement.classList.add("items-center");

  avatar.src = item.picture;
  avatar.style.width = "32px";
  avatar.style.height = "32px";

  const detailHolder = document.createElement("div");
  detailHolder.style.padding = "0 6px";
  // userNameElement.style.color = '#fffa';
  userNameElement.style.fontSize = "smaller";
  userNameElement.textContent = item.id;

  // fullNameElement.style.color = 'white';
  fullNameElement.textContent = item.name;

  itemElement.appendChild(avatar);
  itemElement.appendChild(detailHolder);
  detailHolder.appendChild(fullNameElement);
  detailHolder.appendChild(userNameElement);

  return itemElement;
}

/*
 * This plugin customizes the way mentions are handled in the editor model and data.
 * Instead of a classic <span class="mention"></span>,
 */
function MentionLinks(editor: any) {
  // The upcast converter will convert a view
  //
  //		<a href="..." class="mention" data-mention="...">...</a>
  //
  // element to the model "mention" text attribute.
  editor.conversion.for("upcast").elementToAttribute({
    view: {
      name: "a",
      key: "data-mention",
      classes: "mention",
      attributes: {
        href: true,
      },
    },
    model: {
      key: "mention",
      value: (viewItem: any) =>
        editor.plugins.get("Mention").toMentionAttribute(viewItem),
    },
    converterPriority: "high",
  });

  // Downcast the model "mention" text attribute to a view
  //
  //		<a href="..." class="mention" data-mention="...">...</a>
  //
  // element.
  editor.conversion.for("downcast").attributeToElement({
    model: "mention",
    view: (modelAttributeValue: any, { writer }: any) => {
      // Do not convert empty attributes (lack of value means no mention).
      if (!modelAttributeValue) {
        return;
      }

      let href;
      // User mentions are downcasted as mailto: links. Tags become normal URLs.
      if (modelAttributeValue.id[0] === "@") {
        // TODO: Implement user mention downcast.
        // href = `${createUserWallPageRoute(modelAttributeValue.userId)}`;
      }
      console.log(
        writer.createAttributeElement(
          "a",
          {
            class: "mention",
            "data-mention": modelAttributeValue.id,
            href,
            innerText: modelAttributeValue.name,
          },
          {
            // Make mention attribute to be wrapped by other attribute elements.
            priority: 20,
            // Prevent merging mentions together.
            id: modelAttributeValue.uid,
          }
        )
      );

      return writer.createAttributeElement(
        "a",
        {
          class: "mention",
          "data-mention": modelAttributeValue.id,
          href,
          innerText: modelAttributeValue.name,
        },
        {
          // Make mention attribute to be wrapped by other attribute elements.
          priority: 20,
          // Prevent merging mentions together.
          id: modelAttributeValue.uid,
        }
      );
    },
    converterPriority: "high",
  });
}

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  loader: any;
  url: any;
  headers: any;
  xhr: any;

  constructor(props: any) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    // this.url = endpoints.misc.uploadImage;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open("POST", this.url, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("pensil.user") ?? "").token
    );
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve: any, reject: any) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      if (!(response && response.s3Url)) {
        return reject(
          response && response.errors && response.errors.image
            ? response.errors.image[0]
            : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.s3Url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt: any) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();

    this.loader.file.then((result: any) => {
      data.append("image", result);
      this.xhr.send(data);
    });
  }
  // https://medium.com/swlh/ckeditor5-with-custom-image-uploader-on-react-67b4496cb07d
}
