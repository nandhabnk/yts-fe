import React, { useState } from "react";
import { tableHeadings } from "../../consts/channelSearchConst";
import { Table } from "antd";
import CommentsModal from "./CommentsModal";
import "./channelSearch.scss";

const ChannelSearch = (props: any) => {
  const [openComments, setOpenComments] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  const tableColumns = tableHeadings.map((heading: string) => {
    const headingText = heading.toLowerCase();
    let headingObj = {
      title: heading,
      dataIndex: headingText,
      key: headingText,
    };
    if (heading === "Thumbnail") headingObj.dataIndex = "thumbnail_url";

    if (heading === "Comments") headingObj.dataIndex = "id";

    switch (heading) {
      case "Thumbnail":
        Object.assign(headingObj, {
          render: (text: string) => <img src={text} alt={text} />,
        });
        break;
      case "Published_date":
        Object.assign(headingObj, {
          render: (text: string) => (
            <span>{new Date(text).toDateString()} </span>
          ),
        });
        break;
      case "Comments":
        Object.assign(headingObj, {
          render: (text: string) => (
            <a onClick={() => openCommentsModal(text)}>COMMENT LINK</a>
          ),
        });
        break;
      case "Video_link":
        Object.assign(headingObj, {
          render: (text: string) => (
            <a href={text} target="_blank">
              VIDEO LINK
            </a>
          ),
        });
        break;

      case "Video_status":
        Object.assign(headingObj, {
          render: (text: string | Number, record: any) => (
            <span>
              {text === 0 ? (
                "video download in queue"
              ) : text === -1 ? (
                <button
                  onClick={() =>
                    downloadVideoToS3(record.id, record.video_link)
                  }
                >
                  get video
                </button>
              ) : (
                <button onClick={() => console.log("button click")}>
                  download video
                </button>
              )}
            </span>
          ),
        });
        break;
    }
    return headingObj;
  });

  const downloadVideoToS3 = async (id: any, link: any) => {
    const response = await fetch(
      `http://159.89.238.69:8000/queue/scrap/video`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          link: link,
        }),
      }
    );
  };

  const openCommentsModal = async (id: any) => {
    const response = await fetch(
      `http://137.184.202.24:8000/queue/data?data=comment&id=${id}`
    );
    if (response.ok) {
      const resData = await response.json();
      setCommentsData(resData.data);
      setOpenComments(true);
    }
  };

  const closeCommentsModal = () => {
    setCommentsData([]);
    setOpenComments(false);
  };

  return (
    <React.Fragment>
      <div className="channelSearchContainer">
        <div className="channelSearchTable">
          <Table
            columns={tableColumns}
            dataSource={props.tableData}
            pagination={false}
            bordered
            title={() => "Channel search results"}
          />
        </div>
        <CommentsModal
          open={openComments}
          handleOkCancel={closeCommentsModal}
          commentsData={commentsData}
        />
      </div>
    </React.Fragment>
  );
};
export default ChannelSearch;
